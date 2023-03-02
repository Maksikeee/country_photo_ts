import { FC } from "react";

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
    className={`sidebar__country ${isActive ? "active" : ""}`}
  >
    <span>{name}</span>
  </button>
);
