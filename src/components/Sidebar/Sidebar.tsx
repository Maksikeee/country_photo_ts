import React, { useState } from "react";
import { Input, Drawer } from "antd";

import { TreeCountries } from "./TreeCountries/TreeCountries";

import { countryPhotosStore } from "../../store/CountryPhotos";

const { Search } = Input;

export const Sidebar: React.FC = () => {
  const { isOpenSidebar } = countryPhotosStore;
  const [searchValue, setSearchValue] = useState<string>("");

  const onSearch = (value: string): void => {
    setSearchValue(value.toLowerCase());
  };

  return (
    <div className="sidebar">
      <Drawer
        width="260px"
        style={{
          position: "absolute",
          overflow: "hidden",
        }}
        contentWrapperStyle={{ boxShadow: "none" }}
        getContainer=".sidebar"
        mask={false}
        placement="left"
        open={!isOpenSidebar}
        closable={false}
      >
        <Search
          placeholder="Filter by name"
          onSearch={onSearch}
          enterButton
          style={{ marginBottom: "10px" }}
        />
        <TreeCountries searchValue={searchValue} />
      </Drawer>
    </div>
  );
};
