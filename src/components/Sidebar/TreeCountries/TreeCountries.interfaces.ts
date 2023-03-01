export interface ICountry {
  code: string;
  name: string;
  __typename: string;
}

export interface IContinent {
  code: string;
  name: string;
  __typename: string;
  countries: ICountry[];
}


