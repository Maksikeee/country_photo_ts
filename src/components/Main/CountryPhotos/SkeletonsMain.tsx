import React from "react";
import { Col, Skeleton } from "antd";

export const SkeletonsMain: React.FC = () => {
  return (
    <>
      <Col
        className="image-wrapper"
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
