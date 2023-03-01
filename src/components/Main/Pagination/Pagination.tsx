import { Component } from "react";
import { Pagination } from "antd";

import sidebarObservable from "../../Sidebar/SidebarObservable";

export default class PagePagination extends Component<{}, { current: number }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  componentDidMount = (): void => {
    sidebarObservable.setCurrentPage(1);
    sidebarObservable.registerObserverPagination(this);
  };

  updated = (): void => {
    this.setState({ current: 1 });
  };

  componentWillUnmount = () => {
    sidebarObservable.removeObserverPagination(this);
  };

  onChange = (page: number): void => {
    sidebarObservable.getImg({ urlPage: page });
    this.setState(() => ({ current: page }));
  };

  render() {
    return (
      <Pagination
        style={{
          width: "260px",
          display: "flex",
          justifyContent: "space-between",
        }}
        current={this.state.current}
        size="small"
        onChange={this.onChange}
        total={sidebarObservable.sidebarState.photosData.total_results}
      />
    );
  }
}
