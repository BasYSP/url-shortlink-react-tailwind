import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  TimeScale, //X axis
  LinearScale, //y axis
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataConfig } from "../../../data_config/dataconfig";

ChartJS.register(
  LineElement,
  BarElement,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const BarChart_linkdetail = () => {
  const { shortlink } = useParams();
  const url = `${DataConfig.IP_DB}/urldetail`;
  const [urlDetail, setUrlDetail] = useState();
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setUrlDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const december_data = [];

  for (let i = 1; i <= 31; i++) {
    if (i.toString().length == 1) {
      i == "0" + i;
    }
    december_data.push(
      urlDetail
        ?.filter((items) => items.short_url == shortlink)
        .filter((items) => items.date_view.slice(0, 10) == `2023-12-${i - 1}`)
        .length
    );
  }

  const data = {
    labels: [
      "2023-12-01",
      "2023-12-02",
      "2023-12-03",
      "2023-12-04",
      "2023-12-05",
      "2023-12-06",
      "2023-12-07",
      "2023-12-08",
      "2023-12-09",
      "2023-12-10",
      "2023-12-11",
      "2023-12-12",
      "2023-12-13",
      "2023-12-14",
      "2023-12-15",
      "2023-12-16",
      "2023-12-17",
      "2023-12-18",
      "2023-12-19",
      "2023-12-20",
      "2023-12-21",
      "2023-12-22",
      "2023-12-23",
      "2023-12-24",
      "2023-12-25",
      "2023-12-26",
      "2023-12-27",
      "2023-12-28",
      "2023-12-29",
      "2023-12-30",
      "2023-12-31",
    ],
    datasets: [
      {
        label: "Viewer",
        data: december_data,
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: "blue",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Line data={data} options={options}></Line>;
};

export default BarChart_linkdetail;
