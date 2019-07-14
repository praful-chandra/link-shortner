import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { Bar } from "react-chartjs-2";

export default class viewLink extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             graphData:{
                labels: [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30"
                ],
                datasets: [
                  {
                    label: "Views",
                    data: [
                      617594,
                      181045,
                      153060,
                      106519,
                      105162,
                      95072,
                      617594,
                      181045,
                      153060,
                      106519,
                      105162,
                      95072,
                      617594,
                      181045,
                      153060,
                      106519,
                      105162,
                      95072,
                      35416,
                      21580,
                      106519,
                      105162,
                      95072,
                      35416,
                      21580,
                      95072,
                      617594,
                      181045,
                      153060,
                      106519
                    ],
                    //backgroundColor:'green',
                    backgroundColor: "#EDA543"
                  }
                ]
              }
        }
    }
    
  render() {
    return (
      <div className="viewLink-wrapper">
        <div className="viewLink-body">
          <FontAwesomeIcon
            className="viewLink-body-close"
            icon={faWindowClose}
            onClick={this.props.closeLinkStats}
          />
          <div className="viewLink-body-link">
            <div className="viewLink-body-link-long">
              someLongLink.xyz/bla/boo
            </div>
            <div className="viewLink-body-link-short">srt.in/234dsf</div>
          </div>
          <div className="viewLink-body-graph">
            <Bar
              label="views"
              data={this.state.graphData}
              options={{ maintainAspectRatio: false }}
            />
          </div>

          <div className="viewLink-body-metrics">
            <div>
              <ul className="list-group">
                <li className="list-group-item active"> Countries</li>
                <li className="list-group-item">
                  Country 1 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Country 2 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Country 3 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Country 4 <span style={{ float: "right" }}>77</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="list-group">
                <li className="list-group-item active">Source of traffic</li>
                <li className="list-group-item">
                  Source 1 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Source 2 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Source 3 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Source 4 <span style={{ float: "right" }}>77</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="list-group">
                <li className="list-group-item active">Top DEVICES</li>
                <li className="list-group-item">
                  Device 1 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Device 2 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Device 3 <span style={{ float: "right" }}>77</span>
                </li>
                <li className="list-group-item">
                  Device 4 <span style={{ float: "right" }}>77</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
