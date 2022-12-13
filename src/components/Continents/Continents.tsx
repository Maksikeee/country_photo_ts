import React, { useState } from "react";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import { Menu, Skeleton } from "antd";
import type { MenuProps } from "antd";
import { countryPhotos } from "../../store/CountryPhotos";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

type MenuItem = Required<MenuProps>["items"][number];
interface IProps {
  searchValue: string;
  onChange: (prop: string) => void;
}

export const Continents: React.FC<IProps> = ({ searchValue, onChange }) => {
  interface ICountry {
    code: string;
    name: string;
    _typename: string;
  }

  interface IContinent {
    code: string;
    name: string;
    countries: ICountry[];
    _typename: string;
  }

  const [continentsQuery] = useState<string>(`{
        continents {
          name
          code
          countries {
            name
            code
          }
        }
      }`);

  const LIST_COUNTRIES = gql`
    ${continentsQuery}
  `;

  const { breadCrumb, setBeadCrumb } = countryPhotos;

  const onClick = (e: { key: string; keyPath: string[] }): void => {
    if (breadCrumb[0] !== e.key) {
      onChange(e.key);
      setBeadCrumb(e.key);
    }
  };

  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return (
      <div>
        {error ? (
          error.message
        ) : (
          <Skeleton
            active
            title={false}
            paragraph={{
              rows: 7,
            }}
          />
        )}
      </div>
    );
  }

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items = () => {
    let items: MenuItem[] = [];
    let arr: MenuItem[] = [];

    if (searchValue === "") {
      items = data.continents.map((continent: IContinent) => {
        return getItem(
          continent.name,
          continent.code,
          null,
          continent.countries.map((country: ICountry) => {
            if (country.name.toLowerCase().includes(searchValue)) {
              arr = [...arr, getItem(country.name, country.name)];
              return getItem(country.name, country.name);
            }
            return null;
          })
        );
      });
      return items;
    } else {
      data.continents.map((continent: IContinent) => {
        return getItem(
          continent.name,
          continent.code,
          null,
          continent.countries.map((country: ICountry) => {
            if (country.name.toLowerCase().includes(searchValue)) {
              arr = [...arr, getItem(country.name, country.name)];
              return getItem(country.name, country.name);
            }
            return null;
          })
        );
      });
      return arr;
    }
  };

  return <>{<Menu onClick={onClick} mode="inline" items={items()} />}</>;
};
