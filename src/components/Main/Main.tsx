import { observer } from "mobx-react-lite";
import { Col, Row } from "antd";

import { Crumb } from "./Crumb/Crumb";
import CountryPhotos from "./CountryPhotos/CountryPhotos";
import PagePagination from "./Pagination/Pagination";

import { countryPhotosStore } from "../../store/CountryPhotos";

export const Main: React.FC = observer(() => {
  const { mainTitle } = countryPhotosStore;

  return (
    <main className="main">
      <h2 className="main__title">{mainTitle}</h2>
      <Row
        className="main__top-wrapper"
        wrap={false}
        justify="space-between"
        style={{ padding: "30px 0" }}
      >
        <Col flex="stretch">
          <Crumb />
        </Col>
        <Col flex="none">
          <PagePagination />
        </Col>
      </Row>
      <Row
        className="main__content-wrapper"
        gutter={[8, 0]}
        justify="space-between"
      >
        <CountryPhotos />
      </Row>
    </main>
  );
});
