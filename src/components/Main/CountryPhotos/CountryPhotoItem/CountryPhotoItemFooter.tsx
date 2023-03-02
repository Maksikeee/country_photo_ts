import { FC } from "react";
import { Row } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import { IPhotosDataItem } from "../../../Sidebar/Sidebar.interfaces";

interface ICountryPhotoItemFooterProps {
  showModal: (isOpen: boolean, photo?: IPhotosDataItem) => void;
  photoItem: IPhotosDataItem;
}

export const CountryPhotoItemFooter: FC<ICountryPhotoItemFooterProps> = ({
  showModal,
  photoItem,
}) => {
  return (
    <Row
      justify="space-between"
      className="photo__description"
      style={{
        alignItems: "center",
        width: "100%",
        position: "absolute",
        bottom: "25px",
        color: "white",
        padding: "0 30px",
        gap: "10px",
        flexWrap: "nowrap",
      }}
    >
      <p
        className="photo__photographer"
        style={{ margin: "0", fontWeight: "500" }}
      >
        {photoItem.photographer}
      </p>

      <button
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
        }}
      >
        <SaveOutlined
          onClick={() => showModal(true, photoItem)}
          style={{ fontSize: "20px" }}
        />
      </button>
    </Row>
  );
};
