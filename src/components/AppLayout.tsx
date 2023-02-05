import React from "react";
import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Layout } from "antd";
import { countryPhotos } from "../store/CountryPhotos";
import { Sidebar } from "./Sidebar/Sidebar";
import { observer } from "mobx-react-lite";

const { Sider, Content } = Layout;

export const AppLayout: React.FC = observer(() => {
  const { isOpenSidebar } = countryPhotos;

  return (
    <div className="app-wrapper">
      <Header />
      <Layout>
        <Sider
          className={isOpenSidebar ? "hidden__side" : "side"}
          trigger={null}
          collapsed={isOpenSidebar}
          style={{
            background: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <Sidebar />
        </Sider>
        {/* <Layout className="site-layout"> */}
        {/* <Content
            className="site-layout-background"
            style={{
              minHeight: 280,
            }}
          > */}
        <Main />
        {/* </Content> */}
        {/* </Layout> */}
      </Layout>
    </div>
  );
});
