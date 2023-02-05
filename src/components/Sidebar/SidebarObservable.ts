import { AUTHORIZATIONT_KEY } from "../../config/config";
import { IPhotosData } from "../../store/CountryPhotos";

import { SidebarStateObserver, SidebarState, Subject, ISearchFields } from "./SidebarObservable.interfaces"

export class Sidebar implements Subject {

  sidebarState: SidebarState = {
    photosData: {} as IPhotosData,
    IsLoading: true,
    isLocalStorage: true
  }

  searchFields: ISearchFields = {
    urlPage: 1,
    query: "",
  };

  async getImg(obj?: ISearchFields) {
    this.setSidebarState({ ...this.sidebarState, IsLoading: true })
    this.notifyObservers()
    this.searchFields = { ...this.searchFields, ...obj };
    const baseURL = `https://api.pexels.com/v1/search/?page=${this.searchFields.urlPage}&per_page=9&query=${this.searchFields.query}`;
    this.loadPhotos(baseURL);
  }

  async loadPhotos(baseURL: string) {
    fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: AUTHORIZATIONT_KEY
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.total_results !== this.sidebarState.photosData.total_results) {
          this.notifyObserversOnChange()
        }
        this.setSidebarState({ photosData: data, IsLoading: false })

      })
      .then(() => this.notifyObservers())
  }

  private observers: SidebarStateObserver[];
  private observersOnChange: SidebarStateObserver[];

  constructor() {
    this.observers = [];
    this.observersOnChange = [];
  }

  current = 1;
  setCurrent(page: number) {
    this.current = page;
  }

  registerObserver = (o: SidebarStateObserver): void => {
    this.observers.push(o);
  };

  registerObserverOnChange = (o: SidebarStateObserver): void => {
    this.observersOnChange.push(o);
  };

  setSidebarState = (state: SidebarState) => {
    this.sidebarState = state;
    this.notifyObservers();
  };

  notifyObservers = (): void => {
    this.observers.forEach((observer: SidebarStateObserver) => observer.updated(this.sidebarState));
  };

  notifyObserversOnChange = (): void => {
    this.observersOnChange.forEach((observer: SidebarStateObserver) => observer.updated(this.sidebarState));
  };

  removeObserver = (o: SidebarStateObserver): void => {
    this.observers.splice(this.observers.indexOf(o), 1);
  };

};
const sidebar = new Sidebar();
export default sidebar