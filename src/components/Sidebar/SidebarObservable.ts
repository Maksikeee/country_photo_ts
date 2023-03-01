import { IPhotosData } from "./Sidebar.interfaces";
import { ISidebarStateObserver, ISidebarState, ISubject, ISearchFields } from "./Sidebar.interfaces"
import { AUTHORIZATIONT_KEY } from "../../config/config";



export class Sidebar implements ISubject {

  constructor() {
    this.observers = [];
    this.observerPagination = [];
  }

  sidebarState: ISidebarState = {
    photosData: {} as IPhotosData,
    isLoading: true,
  }

  private observers: ISidebarStateObserver[];
  private observerPagination: ISidebarStateObserver[];


  searchFields: ISearchFields = {
    urlPage: 1,
    query: "",
  };

  getImg(newSearchFields?: ISearchFields) {
    this.setSidebarState({ ...this.sidebarState, isLoading: true })
    this.notifyObservers()
    this.searchFields = { ...this.searchFields, ...newSearchFields };
    this.getPhotosData(this.searchFields.urlPage, this.searchFields.query);
  }

  getPhotosData = (urlPage: number, query?: string) => {
    fetch(
      `https://api.pexels.com/v1/search/?page=${urlPage}&per_page=9&query=${query}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: AUTHORIZATIONT_KEY,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (
          data.total_results !==
          sidebarObservable.sidebarState.photosData.total_results
        ) {
          sidebarObservable.notifyObserverPagination();
        }
        sidebarObservable.setSidebarState({ photosData: data, isLoading: false });
      })
      .then(() => sidebarObservable.notifyObservers());
  };

  currentPage = 1;
  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  registerObserver = (o: ISidebarStateObserver): void => {
    this.observers.push(o);

  };

  registerObserverPagination = (o: ISidebarStateObserver): void => {
    this.observerPagination.push(o);

  };

  setSidebarState = (newState: ISidebarState) => {
    this.sidebarState = newState;
    this.notifyObservers();
  };

  notifyObservers = (): void => {
    this.observers.forEach((observer: ISidebarStateObserver) => observer.updated(this.sidebarState));
  };

  notifyObserverPagination = (): void => {
    this.observerPagination.forEach((observer: ISidebarStateObserver) => observer.updated(this.sidebarState));
  };

  removeObserver = (o: ISidebarStateObserver): void => {
    this.observers.splice(this.observers.indexOf(o), 1);
  };

  removeObserverPagination = (o: ISidebarStateObserver): void => {
    this.observerPagination.splice(this.observerPagination.indexOf(o), 1);
  };

};
const sidebarObservable = new Sidebar();
export default sidebarObservable