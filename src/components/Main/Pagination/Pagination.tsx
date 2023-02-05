import { Pagination } from "antd";
import { Component } from "react";
import sidebarObservable from "../../Sidebar/SidebarObservable";

export default class PagePagination extends Component<{}, { current: number }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  updated = (): void => {
    this.setState({ current: 1 });
  };

  componentDidMount = (): void => {
    sidebarObservable.setCurrent(1);
    sidebarObservable.registerObserverOnChange(this);
  };

  componentWillUnmount = () => {
    sidebarObservable.removeObserverOnChange(this);
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
