import { makeAutoObservable } from "mobx";

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

  imgLink = "";
  setImgLink(value: string){
    this.imgLink = value
  }

  loading: boolean = true;

  mainTitle = "";
  setMainTitle(searchCountry: string): void {
    if(this.mainTitle !== searchCountry) this.mainTitle = searchCountry;
  }

  open: boolean = true;
  showDrawer(): void {
    this.open = !this.open
  }

  photosData = {} as IPhotosData;

  current = 1;
  setCurrent(page: number) {
    this.current = page;
  }

  returnObj = JSON.parse(localStorage.getItem("continents") as string)


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