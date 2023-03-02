import React from "react";
import { Col, Skeleton } from "antd";

export const SkeletonPhotoItem: React.FC = () => {
  return (
    <>
      <Col
        className="photo-wrapper"
        flex="stretch"
        style={{
          width: "33%",
          marginBottom: "10px",
        }}
      >
        <Skeleton.Image className="ant-image" active />
      </Col>
    </>
  );
};
