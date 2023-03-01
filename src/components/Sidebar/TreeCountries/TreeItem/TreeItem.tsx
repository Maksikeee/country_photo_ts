import { FC } from "react";
import styles from "./treeItem.module.scss";

type ButtonProps = {
  onClick: (item: string) => void;
  name: string;
  isActive: boolean;
  hasSubNav?: boolean;
  activeItem?: string;
};

export const TreeItem: FC<ButtonProps> = ({ onClick, name, isActive }) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={`${styles.treeItem} ${isActive ? styles.active : ""}`}
  >
    <span>{name}</span>
  </button>
);
