import { IPhotosData } from "./SidebarObservable.interfaces";
import { ISidebarStateObserver, ISidebarState, ISubject, ISearchFields } from "./SidebarObservable.interfaces"
import { getURL, getPhotosData } from "./SidebarObservableUtils";


export class Sidebar implements ISubject {

  constructor() {
    this.observers = [];
    this.observersOnChange = [];
  }

  sidebarState: ISidebarState = {
    photosData: {} as IPhotosData,
    isLoading: true,
  }

  private observers: ISidebarStateObserver[];
  private observersOnChange: ISidebarStateObserver[];


  searchFields: ISearchFields = {
    urlPage: 1,
    query: "",
  };

  getImg(obj?: ISearchFields) {
    this.setSidebarState({ ...this.sidebarState, isLoading: true })
    this.notifyObservers()
    this.searchFields = { ...this.searchFields, ...obj };
    const completeURL = getURL(this.searchFields.urlPage, this.searchFields.query)
    getPhotosData(completeURL);
  }

  current = 1;
  setCurrent(page: number) {
    this.current = page;
  }

  registerObserver = (o: ISidebarStateObserver): void => {
    this.observers.push(o);

  };

  registerObserverOnChange = (o: ISidebarStateObserver): void => {
    this.observersOnChange.push(o);

  };

  setSidebarState = (state: ISidebarState) => {
    this.sidebarState = state;
    this.notifyObservers();
  };

  notifyObservers = (): void => {
    this.observers.forEach((observer: ISidebarStateObserver) => observer.updated(this.sidebarState));
  };

  notifyObserversOnChange = (): void => {
    this.observersOnChange.forEach((observer: ISidebarStateObserver) => observer.updated(this.sidebarState));
  };

  removeObserver = (o: ISidebarStateObserver): void => {
    this.observers.splice(this.observers.indexOf(o), 1);
  };

  removeObserverOnChange = (o: ISidebarStateObserver): void => {
    this.observersOnChange.splice(this.observersOnChange.indexOf(o), 1);
  };

};
const sidebarObservable = new Sidebar();
export default sidebarObservable