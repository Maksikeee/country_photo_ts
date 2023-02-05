import React from "react";
import { Col, Row } from "antd";
import { countryPhotos } from "../../store/CountryPhotos";
import { observer } from "mobx-react-lite";
import { Crumb } from "./Crumb/Crumb";
import CountryPhotos from "./CountryPhotos/CountryPhotos";
import PagePaginationClass from "./Pagination/Pagination";
import client from "../../Apollo/client";
import { LIST_COUNTRIES } from "../../Apollo/listCountries";
import { useQuery } from "@apollo/client";

export const Main: React.FC = observer(() => {
  const { mainTitle, setIsLoadingLocalStorage, setBeadCrumb } = countryPhotos;
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return <div>{error && error.message}</div>;
  } else {
    localStorage.setItem("continents", JSON.stringify(data));
    setIsLoadingLocalStorage(loading);
  }

  localStorage.setItem("continents", JSON.stringify(data));
  setIsLoadingLocalStorage(loading);

  return (
    <main className="main">
      <h2>{mainTitle}</h2>
      <Row
        className="main__top"
        wrap={false}
        justify="space-between"
        style={{ padding: "30px 0" }}
      >
        <Col className="main__crumbs" flex="stretch">
          <Crumb />
        </Col>
        <Col flex="none">
          <PagePaginationClass />
        </Col>
      </Row>
      <Row className="image-area" gutter={[8, 0]} justify="space-between">
        <CountryPhotos />
      </Row>
    </main>
  );
});
