import { countryPhotosStore } from "../../../store/CountryPhotos";
import { ICountry, IContinent } from "./TreeCountries.interfaces"

function getItem(
  name: string,
  code: string,
  __typename: string,
  countries?: ICountry[],
): IContinent {
  return {
    name,
    code,
    __typename,
    countries,
    
  } as IContinent;
}

export const getTreeItems = (searchValue:string) => {

  const {treeItems} = countryPhotosStore 
  let items: IContinent[] = [];
  let arr: IContinent[] = [];

  if (searchValue === "") {
    items = treeItems.map((continent: IContinent) => {
      return getItem(
        continent.name,
        continent.code,
        continent.__typename,
        continent.countries.map((country: ICountry) => {
          return getItem(country.name , country.code, country.__typename);
        })
      );
    });
    return items;
  } else {
    treeItems.map((continent: IContinent) => {
      continent.countries.map((country) => {
        if (country.name.toLowerCase().includes(searchValue)) {
          arr = [...arr, getItem(country.name , country.code, country.__typename)];
        }
      });
    });
    return arr;
  }
};