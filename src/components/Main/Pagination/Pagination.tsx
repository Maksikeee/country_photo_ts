import { Pagination } from "antd";
import { useEffect } from "react";
import { countryPhotos } from "../../../store/CountryPhotos";
import { observer } from "mobx-react-lite";

export const PagePagination = observer(() => {
  const { photosData, getImg, current, setCurrent } = countryPhotos;

  useEffect(() => {
    getImg();
    setCurrent(1);
  }, []);

  const onChange = (page: number) => {
    getImg({ urlPage: page });
    setCurrent(page);
  };
  return (
    <Pagination
      style={{
        width: "260px",
        display: "flex",
        justifyContent: "space-between",
      }}
      current={current}
      size="small"
      onChange={onChange}
      total={photosData.total_results}
    />
  );
});
