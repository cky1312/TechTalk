import React from "react";
import { DASHBOARD_DATA, RESOURCES } from "../constants/constants";
import DashboardData from "../model/dashboard";
import Header from "./Header";
import DashboardChild from "./DashboardChild";
export default class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props, {});
    this.state = { showDashboardChild: false };
  }

  renderBox = (item: DashboardData) => {
    return (
      <div
        role="button"
        key={item.heading}
        className="border rounded p-2 d-flex justify-content-center m-2 resource"
        style={{ width: "200px", height: "200px" }}
        onClick={() => {
          this.onChange(item.heading);
        }}
      >
        <div>
          <h5 className="text-center"> {item.heading}</h5>
          <div style={{ width: "6rem", height: "6rem" }}>
            <img src={`${item.image}`} alt="" className="w-100 h-100" />
          </div>
          <div className="text-center mt-3">
            <img src="/static/icons/arrow.svg" alt="" />
          </div>
        </div>
      </div>
    );
  };

  onChange = async (heading: string) => {
    console.log({ heading });
    let response: any = await fetch(
      "https://newsapi.org/v2/everything?q=keyword&apiKey=b00e9957db014e53b183e6a67808e9c8"
    );
    response = await response.json();
    console.log({ response });
    let resources: any = RESOURCES;
    Object.keys(resources).forEach((key: string) => {
      if (heading === key) resources = resources[key];
    });
    this.setState({
      showDashboardChild: true,
      resources,
      data: response?.articles || [],
    });
  };

  backToDashboard = () => {
    this.setState({ showDashboardChild: false });
  };

  render(): React.ReactNode {
    return (
      <>
        <Header />
        <img src="static/icons/arrow.svg" alt="" />
        {this.state.showDashboardChild ? (
          <DashboardChild
            back={this.backToDashboard}
            resources={this.state.resources}
            data={this.state.data}
          />
        ) : (
          <div className="d-flex justify-content-center flex-wrap mt-4">
            {DASHBOARD_DATA.map((item: DashboardData) => {
              return this.renderBox(item);
            })}
          </div>
        )}
      </>
    );
  }
}
