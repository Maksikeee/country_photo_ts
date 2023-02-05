import React from "react";
import { Col, Row, Divider } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { countryPhotos } from "../../store/CountryPhotos";

export const Header: React.FC = () => {
  const { isOpenSidebar, setIsOpenSidebar } = countryPhotos;
  return (
    <header className="header">
      <Row
        wrap={false}
        justify="center"
        align="middle"
        style={{ height: "45px" }}
      >
        <Col flex="none" style={{ fontSize: "20px" }}>
          {React.createElement(
            isOpenSidebar ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "header__sidebar-trigger",
              onClick: setIsOpenSidebar,
            }
          )}
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
