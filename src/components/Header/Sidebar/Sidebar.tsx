import React, { useState } from "react";
import { Input, Drawer } from "antd";
import { countryPhotos } from "../../../store/CountryPhotos";
import { Continents } from "../../Continents/Continents";

const { Search } = Input;

export const Sidebar: React.FC = () => {
  const { getImg, open, setMainTitle, setCurrent } = countryPhotos;
  const [searchValue, setSearchValue] = useState<string>("");
  const onSearch = (value: string): void => {
    setSearchValue(value.toLowerCase());
  };

  const onChange = (searchCountry: string): void => {
    getImg({ query: searchCountry, urlPage: 1 });
    setMainTitle(searchCountry);
    setCurrent(1);
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
        <Continents searchValue={searchValue} onChange={onChange} />
      </Drawer>
    </div>
  );
};
