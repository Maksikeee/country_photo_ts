import React from "react";
import { Col, Row } from "antd";
import { countryPhotos } from "../../store/CountryPhotos";
import { observer } from "mobx-react-lite";
import { Crumb } from "./Crumb/Crumb";
import { CountryPhotos } from "./CountryPhotos/CountryPhotos";
import { PagePagination } from "./Pagination/Pagination";

export const Main: React.FC = observer(() => {
  const { mainTitle } = countryPhotos;
  return (
    <div className="main">
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
          <PagePagination />
        </Col>
      </Row>

      <Row className="image-area" gutter={[8, 0]} justify="space-between">
        <CountryPhotos />
      </Row>
    </div>
  );
});
