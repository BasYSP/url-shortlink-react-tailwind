import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import Axios from "axios";
import { DataConfig } from "../../../data_config/dataconfig";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [urlDetail, setUrlDetail] = useState();
  const url = `${DataConfig.IP_DB}/urldetail`;
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setUrlDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const desktop_count = urlDetail?.filter(
    (items) => items.device == "desktop"
  ).length;

  const ios_count = urlDetail?.filter((items) => items.device == "ios").length;

  const android_count = urlDetail?.filter(
    (items) => items.device == "android"
  ).length;

  const data = {
    labels: [
      `PC ${desktop_count}`,
      `iOS ${ios_count}`,
      `Android ${android_count}`,
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [desktop_count, ios_count, android_count],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};

export default PieChart;
