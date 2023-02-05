import React from "react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Layout } from "antd";
import { countryPhotos } from "../store/CountryPhotos";
import { Sidebar } from "./Sidebar/Sidebar";
import "antd/dist/reset.css";
import "../styles/styles.css";
import "../styles/media.css";
import { observer } from "mobx-react-lite";

const { Sider, Content } = Layout;

export const AppLayout: React.FC = observer(() => {
  const { open } = countryPhotos;

  return (
    <div className="app__container">
      <Header />
      <Layout>
        <Sider
          className={open ? "hidden__side" : "side"}
          trigger={null}
          collapsed={open}
          style={{
            background: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <Sidebar />
        </Sider>
        <Layout className="site-layout">
          <Content
            className="site-layout-background"
            style={{
              minHeight: 280,
            }}
          >
            <Main />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
});
