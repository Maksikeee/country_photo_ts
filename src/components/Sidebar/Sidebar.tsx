import React, { useState } from "react";
import { Input, Drawer } from "antd";
import { countryPhotos } from "../../store/CountryPhotos";
import sidebarObservable from "./SidebarObservable";
import { Menu } from "./Menu/Menu";

const { Search } = Input;

export const Sidebar: React.FC = () => {
  const { open, setMainTitle, setCurrent, setBeadCrumb, breadCrumb } =
    countryPhotos;
  const [searchValue, setSearchValue] = useState<string>("");

  const onSearch = (value: string): void => {
    setSearchValue(value.toLowerCase());
  };

  const onChange = (searchCountry: string) => {
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

  return (
    <div className="super">
      <Drawer
        width="260px"
        style={{
          position: "absolute",
          overflow: "hidden",
        }}
        contentWrapperStyle={{ boxShadow: "none" }}
        getContainer=".super"
        mask={false}
        placement="left"
        open={!open}
        closable={false}
      >
        <Search
          placeholder="Filter by name"
          onSearch={onSearch}
          enterButton
          style={{ marginBottom: "10px" }}
        />
        <Menu searchValue={searchValue} ClickHandle={onChange} />
      </Drawer>
    </div>
  );
};
