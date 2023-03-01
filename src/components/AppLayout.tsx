import { observer } from "mobx-react-lite";
import { Layout } from "antd";
import client from "../Apollo/client";
import { useQuery } from "@apollo/client";

import { Header } from "./Header/Header";
import { Main } from "./Main/Main";
import { Sidebar } from "./Sidebar/Sidebar";

import { countryPhotosStore } from "../store/CountryPhotos";
import { LIST_COUNTRIES } from "../Apollo/listCountries";

const { Sider } = Layout;
const { setTreeItems } = countryPhotosStore;

export const AppLayout: React.FC = observer(() => {
  const { isOpenSidebar } = countryPhotosStore;
  const { data, loading, error } = useQuery(LIST_COUNTRIES, { client });

  if (loading || error) {
    return <div className="loader">loading...</div>;
  } else {
    setTreeItems(data.continents);
  }

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
        <Main />
      </Layout>
    </div>
  );
});
