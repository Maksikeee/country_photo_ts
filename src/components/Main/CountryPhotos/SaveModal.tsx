import { Modal } from "antd";
import React, { useState } from "react";

export const SaveModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = (): void => {
    setIsModalOpen(false);
  };
  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    />
  );
};
