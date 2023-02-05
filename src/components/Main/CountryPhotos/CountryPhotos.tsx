import { Component } from "react";
import { SkeletonsMain } from "./SkeletonsMain";
import { countryPhotos } from "../../../store/CountryPhotos";
import {
  IPhotosDataItem,
  IPhotosData,
} from "../../Sidebar/SidebarObservable.interfaces";
import sidebarObservable from "../../Sidebar/SidebarObservable";
import {
  ISidebarState,
  ISidebarStateObserver,
} from "../../Sidebar/SidebarObservable.interfaces";
import { CountryPhotoItem } from "./CountryPhotoItem/CountryPhotoItem";

const { setMainTitle } = countryPhotos;

export default class CountryPhotos
  extends Component<{}, ISidebarState>
  implements ISidebarStateObserver
{
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      photosData: {} as IPhotosData,
      isLoading: true,
    };
  }

  componentDidMount = () => {
    const returnObj = JSON.parse(localStorage.getItem("continents") as string);
    sidebarObservable.registerObserver(this);
    setMainTitle(returnObj.continents[0].countries[0].name);
    sidebarObservable.getImg({
      query: returnObj.continents[0].countries[0].name,
      urlPage: 1,
    });
  };

  componentWillUnmount = () => {
    sidebarObservable.removeObserver(this);
  };

  updated = (sidebarState: ISidebarState): void => {
    this.setState({ ...sidebarState });
  };

  render() {
    return (
      <>
        {!this.state.isLoading &&
          this.state.photosData.photos.map((photo: IPhotosDataItem) => (
            <CountryPhotoItem key={photo.id} photoItem={photo} />
          ))}
        {this.state.isLoading && (
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
