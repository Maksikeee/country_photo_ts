import { makeAutoObservable } from "mobx";

class CountryPhotos {

  constructor() {
    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }

  isLoadingLocalStorage = true
  setIsLoadingLocalStorage(isLoading: boolean){
    if(isLoading !== this.isLoadingLocalStorage) this.isLoadingLocalStorage = isLoading
  }

  mainTitle = "";
  setMainTitle(searchCountry: string): void {
    if(this.mainTitle !== searchCountry) this.mainTitle = searchCountry;
  }

  isOpenSidebar: boolean = true;
  setIsOpenSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar
  }

  current = 1;
  setCurrent(page: number) {
    this.current = page;
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

const countryPhotos = new CountryPhotos();
export { countryPhotos };