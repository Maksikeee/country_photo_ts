import React from "react";
import { Col, Row, Divider } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { countryPhotos } from "../../store/CountryPhotos";

export const Header: React.FC = () => {
  const { open, showDrawer } = countryPhotos;
  return (
    <header className="header">
      <Row
        wrap={false}
        justify="center"
        align="middle"
        style={{ height: "45px" }}
      >
        <Col flex="none" style={{ fontSize: "20px" }}>
          {React.createElement(open ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: showDrawer,
          })}
        </Col>
        <Col
          flex="auto"
          style={{
            fontWeight: "900",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Country photos
        </Col>
      </Row>
      <Divider style={{ margin: "0" }} />
    </header>
  );
};
