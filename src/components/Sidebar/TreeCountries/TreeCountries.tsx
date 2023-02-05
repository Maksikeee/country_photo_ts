import { FC, useState } from "react";
import { countryPhotos } from "../../../store/CountryPhotos";
import { TreeItem } from "./TreeItem/TreeItem";
import { SubTree } from "./SubTree/SubTree";
import { IContinent } from "./TreeCountries.interfaces";
import { items } from "./TreeCountriesUtils";
import sidebarObservable from "../SidebarObservable";
import "./styleTreeCountries.css";

type TreeCountriesProps = {
  searchValue: string;
};

export const TreeCountries: FC<TreeCountriesProps> = ({ searchValue }) => {
  const continentsItems = items(searchValue);
  const { mainTitle, setMainTitle, setCurrent, setBeadCrumb, breadCrumb } =
    countryPhotos;

  const [activeItem, setActiveItem] = useState<string>(mainTitle);

  const onClick = (searchCountry: string) => {
    if (breadCrumb[0] !== searchCountry) {
      sidebarObservable.getImg({
        query: searchCountry,
        urlPage: 1,
      });
      setMainTitle(searchCountry);
      setCurrent(1);
      setBeadCrumb(searchCountry);
      sidebarObservable.notifyObserversOnChange();
    }
  };

  const handleClick = (item: string) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  const subMenuHandleClick = (item: string) => {
    if (mainTitle !== item) {
      setActiveItem(item !== activeItem ? item : "");
      onClick(item);
    }
  };

  return (
    <aside className="sidebar__tree-countries">
      {continentsItems.map((item: IContinent) => (
        <div key={item.code}>
          {!item.countries && (
            <TreeItem
              key={item.__typename + item.code}
              onClick={subMenuHandleClick}
              name={item.name}
              isActive={activeItem === item.name}
              hasSubNav={!!item.countries}
            />
          )}
          {item.countries && (
            <>
              <TreeItem
                key={item.__typename + item.code}
                onClick={handleClick}
                name={item.name}
                isActive={false}
                hasSubNav={!!item.countries}
              />
              <SubTree
                key={item.code + item.__typename}
                activeItem={activeItem}
                handleClick={subMenuHandleClick}
                item={item}
              />
            </>
          )}
        </div>
      ))}
    </aside>
  );
};
