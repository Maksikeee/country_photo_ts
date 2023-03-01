import { observer } from "mobx-react-lite";
import { Col, Row } from "antd";

import { Crumb } from "./Crumb/Crumb";
import CountryPhotos from "./CountryPhotos/CountryPhotos";
import PagePagination from "./Pagination/Pagination";

import { countryPhotosStore } from "../../store/CountryPhotos";

import styles from "./main.module.scss";

export const Main: React.FC = observer(() => {
  const { mainTitle } = countryPhotosStore;

  return (
    <main className={styles.main}>
      <h2>{mainTitle}</h2>
      <Row
        className={styles.main__top}
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
        className={styles.main__contentWrapper}
        gutter={[8, 0]}
        justify="space-between"
      >
        <CountryPhotos />
      </Row>
    </main>
  );
});
