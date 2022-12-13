import { makeAutoObservable, runInAction } from "mobx";

interface ISearchFields {
  urlPage:number; 
  query?: string
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

interface IPhotosData {
  page: string;
  per_page: string;
  total_results: number;
  photos: IPhotosDataItem[]
}

class CountryPhotos{

  constructor() {
    makeAutoObservable(this, undefined, {
      autoBind: true,
    });
  }

  loading: boolean = true;

  

  searchFields:ISearchFields = {
    urlPage: 1,
    query: "Angola",
  };

  mainTitle = "Angola";
  setMainTitle(searchCountry:string): void {
    this.mainTitle = searchCountry;
  }
  
 

  open:boolean = true;
  showDrawer():void {
    this.open = !this.open
  }

  photosData = {} as IPhotosData;
  async getImg(obj?: ISearchFields) {
    this.loading = true;

    this.searchFields = { ...this.searchFields, ...obj };

    const baseURL = `https://api.pexels.com/v1/search/?page=${this.searchFields.urlPage}&per_page=9&query=${this.searchFields.query}`;
    this.loadPhotos(baseURL);
  }

  async loadPhotos(baseURL: string) {
    fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization:
          "563492ad6f917000010000017bebf3a461ef4a8aa29c664153802a43",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        runInAction(() => {
          this.photosData = data;
          this.loading = false;
        })
      );
  }

  current = 1;
  setCurrent(page: number) {
    this.current = page;
  }

  breadCrumb = [this.mainTitle];
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