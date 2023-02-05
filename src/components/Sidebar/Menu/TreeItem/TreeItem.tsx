import { FC } from "react";

type ButtonProps = {
  onClick: (item: string) => void;
  name: string;
  isActive: boolean;
  hasSubNav?: boolean;
};

export const TreeItem: FC<ButtonProps> = ({ onClick, name, isActive }) => (
  <button
    key={name}
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    <span>{name}</span>
  </button>
);
