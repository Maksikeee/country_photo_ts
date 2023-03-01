import { makeAutoObservable } from "mobx";
import { IContinent } from "../components/Sidebar/TreeCountries/TreeCountries.interfaces"

class CountryPhotos {

  constructor() {
    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }

  mainTitle = "";
  setMainTitle(searchCountry: string): void {
    if(this.mainTitle !== searchCountry) this.mainTitle = searchCountry;
  }

  isOpenSidebar: boolean = true;
  setIsOpenSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar
  }


  treeItems = [] as IContinent[];
  setTreeItems(continentsList: IContinent[]): void {
    this.treeItems = continentsList
  }

  breadCrumb: string[] = [];
  setBeadCrumb(historyValue: string) {
    if (this.breadCrumb.length >= 5) {
      this.breadCrumb.pop();
      this.breadCrumb = [historyValue, ...this.breadCrumb];
    } else {
      this.breadCrumb = [historyValue, ...this.breadCrumb];
    }
  }
}

export const countryPhotosStore = new CountryPhotos();
