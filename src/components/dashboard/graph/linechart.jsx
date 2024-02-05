import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale, //X axis
  LinearScale, //y axis
  PointElement,
} from "chart.js";

import Axios from "axios";
import { useEffect, useState } from "react";
import { useUserAuth } from "../../../context/UserAuthContext";
import { DataConfig } from "../../../data_config/dataconfig";

ChartJS.register(BarElement, CategoryScale, LinearScale, PointElement);

const LineChart = () => {
  const [tagData, setTagData] = useState();
  const { user } = useUserAuth();
  const url = `${DataConfig.IP_DB}`;
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setTagData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  let fb_Clicker = 0;
  let ig_Clicker = 0;
  let twitter_Clicker = 0;
  let other_Clicker = 0;
  tagData
    ?.filter((items) => items.tag == "facebook" && items.uid == user.uid)
    .map((items) => {
      fb_Clicker = fb_Clicker + items.clicker;
      return fb_Clicker;
    });

  tagData
    ?.filter((items) => items.tag == "instagram" && items.uid == user.uid)
    .map((items) => {
      ig_Clicker = ig_Clicker + items.clicker;
      return ig_Clicker;
    });

  tagData
    ?.filter((items) => items.tag == "twitter" && items.uid == user.uid)
    .map((items) => {
      twitter_Clicker = twitter_Clicker + items.clicker;
      return twitter_Clicker;
    });

  tagData
    ?.filter((items) => items.tag == "other" && items.uid == user.uid)
    .map((items) => {
      other_Clicker = other_Clicker + items.clicker;
      return other_Clicker;
    });
  const data = {
    labels: ["Facebook", "Instagram", "Twitter", "Other"],
    datasets: [
      {
        label: `Facebook ${fb_Clicker}`,
        data: [
          fb_Clicker,
          ig_Clicker,
          twitter_Clicker,
          other_Clicker,
          Math.max(fb_Clicker, ig_Clicker, twitter_Clicker, other_Clicker) + 3,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(100, 100, 106, 0.2)",
        ],
        borderColor: "black",
      },
      {
        label: `Instagram ${ig_Clicker}`,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: "black",
      },
      {
        label: `Twitter ${twitter_Clicker}`,
        backgroundColor: ["rgba(255, 206, 86, 0.2)"],
        borderColor: "black",
      },
      {
        label: `Other ${other_Clicker}`,
        backgroundColor: ["rgba(100, 100, 106, 0.2)"],
        borderColor: "black",
      },
    ],
  };

  const option = {
    responsive: true,
    tooltips: {
      mode: "label",
    },
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: true,
          },
        },
      ],
    },
  };
  return (
    <div>
      <Bar data={data} options={option}></Bar>
    </div>
  );
};

export default LineChart;
