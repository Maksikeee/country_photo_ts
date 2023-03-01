export interface ISidebarStateObserver {
    updated:(state: ISidebarState) => void;
}

export interface ISidebarState {
  photosData: IPhotosData;
  isLoading: boolean;
  openModal?: boolean;
  imgLink?: string
}

export interface ISubject {
  registerObserver: (o: ISidebarStateObserver) => void;
  removeObserver: (o: ISidebarStateObserver) => void;
  notifyObservers: () => void;
}

export interface ISearchFields {
  urlPage: number;
  query?: string;
}

export interface IPhotosDataItemSrc {
  landscape: string;
  large: string;
  large2x: string;
  medium: string;
  original: string;
  portrait: string;
  small: string;
  tiny: string;
}

export interface IPhotosDataItem {
  id: string;
  photographer: string;
  src: IPhotosDataItemSrc
}

export interface IPhotosData {
  page: string;
  per_page: string;
  total_results: number;
  photos: IPhotosDataItem[];
}


