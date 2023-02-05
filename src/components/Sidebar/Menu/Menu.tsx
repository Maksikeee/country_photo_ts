import { FC, useState } from "react";
import { countryPhotos } from "../../../store/CountryPhotos";
import { TreeItem } from "./TreeItem/TreeItem";
import { SubTree } from "./SubTree/SubTree";
import { IContinent } from "./Menu.interfaces";
import { items } from "./MenuUtils";

import "./styleMenu.css";

type MenuProps = {
  ClickHandle: (item: string) => void;
  searchValue: string;
};

export const Menu: FC<MenuProps> = ({ searchValue, ClickHandle }) => {
  const continentsItems = items(searchValue);
  const { mainTitle } = countryPhotos;

  const [activeItem, setActiveItem] = useState<string>(
    JSON.parse(localStorage.getItem("continents") as string).continents[0]
      .countries[0].name
  );

  const handleClick = (item: string) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  const subMenuHandleClick = (item: string) => {
    if (mainTitle !== item) {
      setActiveItem(item !== activeItem ? item : "");
      ClickHandle(item);
    }
  };

  return (
    <aside className="sidebar">
      {continentsItems.map((item: IContinent) => (
        <>
          {!item.countries && (
            <TreeItem
              key={item.code}
              onClick={subMenuHandleClick}
              name={item.name}
              isActive={activeItem === item.name}
              hasSubNav={!!item.countries}
            />
          )}
          {item.countries && (
            <>
              <TreeItem
                key={item.code}
                onClick={handleClick}
                name={item.name}
                isActive={false}
                hasSubNav={!!item.countries}
              />
              <SubTree
                key={item.name}
                activeItem={activeItem}
                handleClick={subMenuHandleClick}
                item={item}
              />
            </>
          )}
        </>
      ))}
    </aside>
  );
};
