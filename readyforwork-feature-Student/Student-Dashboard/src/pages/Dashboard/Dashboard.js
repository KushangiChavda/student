import React, { useState, useEffect } from "react";
import api from "../../api";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { StartPage } from "../StartPage";
import { Avatar, Box } from "@material-ui/core/";
export default function Dashboard() {
  const [list, setList] = useState([]);
  const datatrack = useSelector(
    (state) => state?.userProviderReducer?.user?.track
  );

  const percentage = list?.map((li, i) => li?.result?.percentage);

  const totalpercentage = percentage.reduce(function (acc, val) {
    return acc + val;
  }, 0);

  const averagepercentage = totalpercentage / list?.length;

  const state1 = {
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      labels: ["Average Percentage"],
      stroke: {
        lineCap: "round",
      },
      radialBar: {
        hollow: {
          margin: 0,
          size: "70%",
          //background: "#293450",
        },
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            // background: "#293450",
          },
        },
      },
      fill: {
        colors: ["#2951D5", "#F45B35"],
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 100,
          type: "horizontal",
          opacityFrom: 1,
          gradientToColors: ["#65AB9A", "#F6B154"],
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    },
    series: [averagepercentage],
  };

  const getListData = () => {
    api
      .get("/users/assessments")
      .then((res) => {
        let listData = res.data.assessments
          // .filter(({ isDeleted }) => isDeleted === false)
          .map(({ user: { firstName, lastName, ...user }, ...u }) => {
            return {
              select: false,
              id: u._id,
              user: {
                fullName: `${firstName || ""} ${lastName || ""}`,
                ...user,
              },
              ...u,
            };
          });
        return setList(listData);
      })
      .catch((err) => {
        console.log(err);
        return setList([]);
      });
  };

  useEffect(getListData, []);
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: { categories: percentage },
      yaxis: [
        {
          min: 0,
          max: 100,
          title: {
            text: "Total Percentage",
          },
        },
      ],
    },

    series: [
      {
        name: "percentage",
        data: percentage,
      },
    ],
  };
  return (
    <div className="container-fluid">
      <StartPage
        content="dashboard"
        contents="dashboard"
        contenttitle={datatrack?.name}
      />
      <div className="d-flex justify-content-space-between">
        <div className="card-deck h-100 p-2">
          <div
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
            }}
          >
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
            />
            <h4 className="text-center">Weekly Assessment</h4>
          </div>
        </div>
        <div className="card-deck h-100 p-2">
          <div
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
            }}
          >
            <Chart
              className="chart-con"
              options={state1.options}
              series={state1.series}
              type="radialBar"
              width="415px"
            />
            <h4 className="text-center">Average Percentage</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
