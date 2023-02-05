export interface ICountry {
    code: string;
    name: string;
    _typename: string;
  }
  
  export interface IContinent {
    code: string;
    name: string;
    countries: ICountry[];
    _typename: string;
  }

  export const continentsData = JSON.parse(
    localStorage.getItem("continents") as string
  );