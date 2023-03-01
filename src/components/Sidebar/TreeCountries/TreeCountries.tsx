import { FC, useState } from "react";
import { RightOutlined } from "@ant-design/icons";

import { TreeItem } from "./TreeItem/TreeItem";

import { countryPhotosStore } from "../../../store/CountryPhotos";
import sidebarObservable from "../SidebarObservable";
import { getTreeItems } from "./TreeCountriesUtils";
import { IContinent, ICountry } from "./TreeCountries.interfaces";

import styles from "./styleTreeCountries.module.scss";

export const TreeCountries: FC<{ searchValue: string }> = ({ searchValue }) => {
  const treeItems = getTreeItems(searchValue);
  const { mainTitle, setMainTitle, setBeadCrumb, breadCrumb } =
    countryPhotosStore;

  const [activeItem, setActiveItem] = useState<string>(mainTitle);

  const onClick = (searchCountry: string) => {
    if (breadCrumb[0] !== searchCountry) {
      sidebarObservable.getImg({
        query: searchCountry,
        urlPage: 1,
      });
      setMainTitle(searchCountry);
      sidebarObservable.setCurrentPage(1);
      setBeadCrumb(searchCountry);
      sidebarObservable.notifyObserverPagination();
    }
  };

  const treeItemClick = (item: string) => {
    setActiveItem(item !== activeItem ? item : "");
    onClick(item);
  };

  return (
    <aside className={styles.sidebar__treeCountries}>
      {treeItems.map((item: IContinent) => {
        if (item.countries) {
          return (
            <details key={item.code}>
              <summary className={styles.continent}>
                <RightOutlined className={styles.continentBeforeArrow} />

                {item.name}
              </summary>
              {item.countries.map((country: ICountry) => (
                <TreeItem
                  key={country.__typename + country.code}
                  onClick={treeItemClick}
                  name={country.name}
                  isActive={activeItem === country.name}
                />
              ))}
            </details>
          );
        }

        if (!item.countries) {
          return (
            <TreeItem
              key={item.__typename + item.code}
              onClick={treeItemClick}
              name={item.name}
              isActive={activeItem === item.name}
            />
          );
        }
      })}
    </aside>
  );
};
