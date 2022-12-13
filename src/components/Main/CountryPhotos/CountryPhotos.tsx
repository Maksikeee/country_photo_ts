import { countryPhotos } from "../../../store/CountryPhotos";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Image, Col, Row, Modal, Button, Select, Skeleton } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import {
  IPhotosDataItem,
  IPhotosDataItemSrc,
} from "../../../store/CountryPhotos";

export const CountryPhotos = observer(() => {
  const { loading, photosData, getImg } = countryPhotos;
  const [srcOptions, setSrcOptions] = useState({} as IPhotosDataItemSrc);
  const [imgLink, setImgLink] = useState<string>("original");

  useEffect(() => {
    getImg();
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const showModal = (photoData: IPhotosDataItem): void => {
    setOpen(true);

    handleSetSrcOptions(photoData.src);
  };

  function saveImg(blob: Blob): void {
    let link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", `${Date.now()}`);
    link.click();
  }

  const handleSetSrcOptions = (photoSrc: IPhotosDataItemSrc): void => {
    setSrcOptions({ ...srcOptions, ...photoSrc });
  };
  const handleCancel = (): void => {
    setOpen(false);
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

    setOpen(false);
  };
  return (
    <>
      {loading && (
        <>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
          >
            <Skeleton.Image className="ant-image" active />
          </Col>
        </>
      )}
      {!loading &&
        photosData.photos.map((photo) => (
          <Col
            className="image-row"
            flex="stretch"
            style={{
              width: "33%",
              marginBottom: "10px",
            }}
            key={photo.id}
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
              src={photo.src.large}
            />

            <Row
              justify="space-between"
              className="image__description"
              style={{
                alignItems: "center",
                width: "100%",
                position: "absolute",
                bottom: "25px",
                color: "white",
                padding: "0 30px",
              }}
            >
              <p
                className="image__photographer"
                style={{ margin: "0", fontWeight: "500" }}
              >
                {photo.photographer}
              </p>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <SaveOutlined
                  onClick={() => showModal(photo)}
                  style={{ fontSize: "20px" }}
                />
              </button>
              <Modal
                maskStyle={{
                  backdropFilter: "blur(1px)",
                  background: "rgba(255, 255, 255, 0.1)",
                }}
                closable={false}
                open={open}
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
                  options={[
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
                  ]}
                />
              </Modal>
            </Row>
          </Col>
        ))}
    </>
  );
});
