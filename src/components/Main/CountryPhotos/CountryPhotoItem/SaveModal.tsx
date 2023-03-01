import React, { useState } from "react";
import { Modal, Button, Select } from "antd";

import {
  IPhotosDataItem,
  IPhotosDataItemSrc,
} from "../../../Sidebar/Sidebar.interfaces";

interface ISaveModalProps {
  showModal: (isOpen: boolean, photo?: IPhotosDataItem) => void;
  isOpenModal: boolean;
  srcOptions: IPhotosDataItemSrc;
}

interface IOption {
  label: string;
  value: string;
}

const optionsItems: IOption[] = [
  {
    label: "landscape",
    value: "landscape",
  },
  {
    label: "large",
    value: "large",
  },
  {
    label: "large2x",
    value: "large2x",
  },
  {
    label: "medium",
    value: "medium",
  },
  {
    label: "original",
    value: "original",
  },
  {
    label: "portrait",
    value: "portrait",
  },
  {
    label: "small",
    value: "small",
  },
  {
    label: "tiny",
    value: "tiny",
  },
];

export const SaveModal: React.FC<ISaveModalProps> = ({
  showModal,
  isOpenModal,
  srcOptions,
}) => {
  const [imgLink, setImgLink] = useState("original");

  const saveImg = (blob: Blob): void => {
    let link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `${Date.now()}`);
    link.click();
  };

  const handleCancel = (): void => {
    showModal(false);
  };

  const handleChange = (value: string): void => {
    handleSetImgLink(value);
  };

  const handleSetImgLink = (value: string) => {
    setImgLink(value);
  };

  const handleLoad = (): void => {
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
        <Button key="back" onClick={handleCancel}>
          Отменить
        </Button>,
        <Button key="link" type="primary" onClick={handleLoad}>
          Загрузить
        </Button>,
      ]}
    >
      <Select
        defaultValue="original"
        style={{
          width: 120,
        }}
        onChange={handleChange}
        options={optionsItems}
      />
    </Modal>
  );
};
