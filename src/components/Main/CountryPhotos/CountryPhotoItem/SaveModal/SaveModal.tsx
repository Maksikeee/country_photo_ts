import React, { useState } from "react";
import { Modal, Button, Select } from "antd";

import { saveImg, optionsItems } from "./SaveModalUtils";

import {
  IPhotosDataItem,
  IPhotosDataItemSrc,
} from "../../../../Sidebar/Sidebar.interfaces";

interface ISaveModalProps {
  showModal: (isOpen: boolean, photo?: IPhotosDataItem) => void;
  isOpenModal: boolean;
  srcOptions: IPhotosDataItemSrc;
}

export const SaveModal: React.FC<ISaveModalProps> = ({
  showModal,
  isOpenModal,
  srcOptions,
}) => {
  const [imgLink, setImgLink] = useState("original");

  const closeModal = (): void => {
    showModal(false);
  };

  const handleSetImgLink = (value: string) => {
    setImgLink(value);
  };

  const downloadImg = (): void => {
    Object.entries(srcOptions).forEach((arr): void => {
      if (arr[0] === imgLink) {
        fetch(arr[1])
          .then((resp) => resp.blob())
          .then((blob) => saveImg(blob));
      }
    });
    showModal(false);
  };

  return (
    <Modal
      maskStyle={{
        backdropFilter: "blur(1px)",
        background: "rgba(255, 255, 255, 0.1)",
      }}
      closable={false}
      open={isOpenModal}
      title="Выберите размер фотографии, котору следует загрузить"
      footer={[
        <Button key="back" onClick={closeModal}>
          Отменить
        </Button>,
        <Button key="link" type="primary" onClick={downloadImg}>
          Загрузить
        </Button>,
      ]}
    >
      <Select
        defaultValue="original"
        style={{
          width: 120,
        }}
        onChange={handleSetImgLink}
        options={optionsItems}
      />
    </Modal>
  );
};
