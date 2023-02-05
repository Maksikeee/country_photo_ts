import { Component } from "react";
import { SkeletonsMain } from "./SkeletonsMain";
import { countryPhotos } from "../../../store/CountryPhotos";
import { IPhotosDataItem, IPhotosData } from "../../../store/CountryPhotos";
import sidebarObserver from "../../Sidebar/SidebarObservable";
import {
  SidebarState,
  SidebarStateObserver,
} from "../../Sidebar/SidebarObservable.interfaces";
import { CountryPhotoItem } from "./CountryPhotoItem/CountryPhotoItem";

const { setMainTitle, setBeadCrumb } = countryPhotos;

export default class CountryPhotosClass
  extends Component<{}, SidebarState>
  implements SidebarStateObserver
{
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      photosData: {} as IPhotosData,
      IsLoading: true,
    };
  }

  componentDidMount = () => {
    const returnObj = JSON.parse(localStorage.getItem("continents") as string);
    sidebarObserver.registerObserver(this);
    setMainTitle(returnObj.continents[0].countries[0].name);
    sidebarObserver.getImg({
      query: returnObj.continents[0].countries[0].name,
      urlPage: 1,
    });
  };

  updated = (sidebarState: SidebarState): void => {
    this.setState({ ...sidebarState });
  };

  render() {
    return (
      <>
        {!this.state.IsLoading &&
          this.state.photosData.photos.map((photo: IPhotosDataItem) => (
            <CountryPhotoItem key={photo.id} photoItem={photo} />
          ))}
        {this.state.IsLoading && (
          <>
            {[...Array(6)].map((_, i) => {
              return <SkeletonsMain key={i} />;
            })}
          </>
        )}
      </>
    );
  }
}
