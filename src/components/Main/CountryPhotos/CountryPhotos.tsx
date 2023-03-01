import { Component } from "react";

import { CountryPhotoItem } from "./CountryPhotoItem/CountryPhotoItem";
import { SkeletonPhotoItem } from "./SkeletonMain/SkeletonMain";

import { countryPhotosStore } from "../../../store/CountryPhotos";
import sidebarObservable from "../../Sidebar/SidebarObservable";

import {
  IPhotosDataItem,
  IPhotosData,
  ISidebarState,
  ISidebarStateObserver,
} from "../../Sidebar/Sidebar.interfaces";

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
    const { setMainTitle, treeItems } = countryPhotosStore;

    sidebarObservable.registerObserver(this);
    setMainTitle(treeItems[0].countries[0].name);
    sidebarObservable.getImg({
      query: treeItems[0].countries[0].name,
      urlPage: 1,
    });
  };

  updated = (sidebarState: ISidebarState): void => {
    this.setState({ ...sidebarState });
  };

  componentWillUnmount = () => {
    sidebarObservable.removeObserver(this);
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
              return <SkeletonPhotoItem key={i} />;
            })}
          </>
        )}
      </>
    );
  }
}
