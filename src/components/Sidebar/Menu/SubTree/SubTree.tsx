import { FC, useRef } from "react";
import { TreeItem } from "../TreeItem/TreeItem";
import { IContinent, ICountry } from "../Menu.interfaces";

type SubMenuProps = {
  item: IContinent;
  activeItem: string;
  handleClick: (countryName: string) => void;
};

export const SubTree: FC<SubMenuProps> = ({
  item,
  activeItem,
  handleClick,
}) => {
  const navRef = useRef<HTMLDivElement>(null);

  const isSubNavOpen = (item: string, countries: ICountry[]) =>
    countries.some((i) => i.name === activeItem) || item === activeItem;
  return (
    <div
      className={`sub-nav ${
        isSubNavOpen(item.name, item.countries) ? "open" : ""
      }`}
      style={{
        height: !isSubNavOpen(item.name, item.countries)
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.countries.map((subItem) => (
          <TreeItem
            key={subItem.code}
            onClick={handleClick}
            name={subItem.name}
            isActive={activeItem === subItem.name}
          />
        ))}
      </div>
    </div>
  );
};
