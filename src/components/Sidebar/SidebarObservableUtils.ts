import { AUTHORIZATIONT_KEY } from "../../config/config";
import sidebar from "./SidebarObservable";

export const getURL = (urlPage:number, query?:string) => {
 return `https://api.pexels.com/v1/search/?page=${urlPage}&per_page=9&query=${query}`;
} 


export const getPhotosData = (completeURL: string) => {
    fetch(completeURL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: AUTHORIZATIONT_KEY
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.total_results !== sidebar.sidebarState.photosData.total_results) {
          sidebar.notifyObserversOnChange()
        }
        sidebar.setSidebarState({ photosData: data, isLoading: false })
      })
      .then(() => sidebar.notifyObservers())
  }