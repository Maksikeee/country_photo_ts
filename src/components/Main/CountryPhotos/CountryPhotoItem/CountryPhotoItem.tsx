import { FC, useState } from "react";
import { Image, Col } from "antd";

import { SaveModal } from "./SaveModal/SaveModal";
import { CountryPhotoItemFooter } from "./CountryPhotoItemFooter";

import {
  IPhotosDataItem,
  IPhotosDataItemSrc,
} from "../../../Sidebar/Sidebar.interfaces";

interface ICountryPhotoItemProps {
  photoItem: IPhotosDataItem;
}

export const CountryPhotoItem: FC<ICountryPhotoItemProps> = ({ photoItem }) => {
  const [srcOptions, setSrcOptions] = useState({} as IPhotosDataItemSrc);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const showModal = (isOpen: boolean, photo?: IPhotosDataItem): void => {
    setIsOpenModal(isOpen);

    if (photo) {
      handleSetSrcOptions(photo.src);
    }
  };

  const handleSetSrcOptions = (photoSrc: IPhotosDataItemSrc): void => {
    setSrcOptions(photoSrc);
  };

  return (
    <Col
      className="photo-wrapper"
      flex="stretch"
      style={{
        width: "33%",
        marginBottom: "10px",
      }}
    >
      <Image
        height={430}
        preview={true}
        style={{
          height: "430px",
          display: "block",
          width: "100%",
          objectFit: "cover",
          position: "relative",
        }}
        src={photoItem.src.large}
      />
      <CountryPhotoItemFooter showModal={showModal} photoItem={photoItem} />
      <SaveModal
        showModal={showModal}
        isOpenModal={isOpenModal}
        srcOptions={srcOptions}
      />
    </Col>
  );
};
