import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";

import { countryPhotosStore } from "../../../store/CountryPhotos";
import sidebarObservable from "../../Sidebar/SidebarObservable";

import styles from "./crumb.module.scss";

export const Crumb: React.FC = () => {
  const { setMainTitle, breadCrumb, setBeadCrumb } = countryPhotosStore;

  const onClick = (searchCountry: React.MouseEvent<HTMLSpanElement>) => {
    if (
      breadCrumb[0] !== (searchCountry.target as HTMLSpanElement).textContent
    ) {
      sidebarObservable.getImg({
        query: (searchCountry.target as HTMLSpanElement).textContent || "",
        urlPage: 1,
      });
      setMainTitle((searchCountry.target as HTMLSpanElement).textContent || "");
      sidebarObservable.setCurrentPage(1);
      setBeadCrumb((searchCountry.target as HTMLSpanElement).textContent || "");
    }
  };

  const breadCrumbView = (): React.ReactNode => {
    return (
      <Breadcrumb
        className="crumbs"
        separator={<RightOutlined style={{ fontSize: "14px" }} />}
      >
        {breadCrumb.map((crumbItem, index) => {
          if (index !== 0) {
            return (
              <Breadcrumb.Item
                onClick={(crumbItem) => onClick(crumbItem)}
                key={crumbItem}
              >
                {crumbItem}
              </Breadcrumb.Item>
            );
          }

          if (index === 0) {
            return (
              <Breadcrumb.Item key={crumbItem}>{crumbItem}</Breadcrumb.Item>
            );
          }
        })}
      </Breadcrumb>
    );
  };

  return <>{breadCrumbView()}</>;
};
