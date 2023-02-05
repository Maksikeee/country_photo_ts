import { IPhotosData } from "../../store/CountryPhotos";


export interface SidebarStateObserver {
    updated:(state: SidebarState) => void;
}

export interface SidebarState {
  photosData: IPhotosData;
  IsLoading: boolean;
  isLocalStorage?: boolean;
  openModal?: boolean;
  imgLink?: string
}

export interface Subject {
  registerObserver: (o: SidebarStateObserver) => void;
  removeObserver: (o: SidebarStateObserver) => void;
  notifyObservers: () => void;
}

export interface ISearchFields {
  urlPage: number;
  query?: string;
}



