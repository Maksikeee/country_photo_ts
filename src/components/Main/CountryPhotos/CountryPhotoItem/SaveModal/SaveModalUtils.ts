export const saveImg = (blob: Blob): void => {
  let link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", `${Date.now()}`);
  link.click();
};

interface IOption {
  label: string;
  value: string;
}

export const optionsItems: IOption[] = [
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
