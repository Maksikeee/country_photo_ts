import { Breadcrumb } from "antd";
import React from "react";
import { countryPhotos } from "../../../store/CountryPhotos";
import { RightOutlined } from "@ant-design/icons";

export const Crumb: React.FC = () => {
  const { getImg, setMainTitle, setCurrent, breadCrumb, setBeadCrumb } =
    countryPhotos;

  const onClick = (searchCountry: React.MouseEvent<HTMLSpanElement>) => {
    if (
      breadCrumb[0] !== (searchCountry.target as HTMLSpanElement).textContent
    ) {
      getImg({
        query: (searchCountry.target as HTMLSpanElement).textContent || "",
        urlPage: 1,
      });
      setMainTitle((searchCountry.target as HTMLSpanElement).textContent || "");
      setCurrent(1);
      setBeadCrumb((searchCountry.target as HTMLSpanElement).textContent || "");
    }
  };

  const breadCrumbView = (): React.ReactNode => {
    return (
      <div>
        <Breadcrumb separator={<RightOutlined style={{ fontSize: "14px" }} />}>
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
      </div>
    );
  };
  return <>{breadCrumbView()}</>;
};
