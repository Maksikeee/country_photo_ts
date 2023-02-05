import {ICountry, IContinent } from "./Menu.interfaces"

  function getItem(
    name: string,
    code: string,
    countries?: ICountry[]
  ): IContinent {
    return {
      name,
      code,
      countries,
    } as IContinent;
  }

export const items = (searchValue:string) => {
  const continentsData = JSON.parse(
    localStorage.getItem("continents") as string
  );
    let items: IContinent[] = [];
    let arr: IContinent[] = [];

    if (searchValue === "") {
      items = continentsData.continents.map((continent: IContinent) => {
        return getItem(
          continent.name,
          continent.code,
          continent.countries.map((country: ICountry) => {
            return getItem(country.name, country.name);
          })
        );
      });
      return items;
    } else {
      continentsData.continents.map((continent: IContinent) => {
        continent.countries.map((country) => {
          if (country.name.toLowerCase().includes(searchValue)) {
            arr = [...arr, getItem(country.name, country.name)];
          }
        });
      });
      return arr;
    }
  };