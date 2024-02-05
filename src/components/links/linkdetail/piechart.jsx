import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { DataConfig } from "../../../data_config/dataconfig";
import Axios from "axios";
import { useParams } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart_LinkDetail = () => {
  const { shortlink } = useParams();
  const [urlDetail, setUrlDetail] = useState();
  const url = `${DataConfig.IP_DB}/urldetail`;
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setUrlDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const desktop_count = urlDetail
    ?.filter((items) => items.short_url == shortlink)
    .filter((items) => items.device == "desktop").length;

  const ios_count = urlDetail
    ?.filter((items) => items.short_url == shortlink)
    .filter((items) => items.device == "ios").length;

  const android_count = urlDetail
    ?.filter((items) => items.short_url == shortlink)
    .filter((items) => items.device == "android").length;
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

  return (
    <>
      {desktop_count != 0 || ios_count != 0 || android_count != 0 ? (
        <Pie data={data} />
      ) : (
        <div className="flex justify-center items-center font-bold">
          No Data
        </div>
      )}
    </>
  );
};

export default PieChart_LinkDetail;
