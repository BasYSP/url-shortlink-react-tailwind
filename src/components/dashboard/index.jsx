import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { Button, Progress } from "@material-tailwind/react";
import { useUserAuth } from "../../context/UserAuthContext";
import Axios from "axios";
import { Link } from "react-router-dom";
import LineChart from "./graph/linechart";
import PieChart from "./graph/piechart";
import { DataConfig } from "../../data_config/dataconfig";

function Dashboard() {
  const { user } = useUserAuth();
  const urlLink = `${DataConfig.IP_DB}`;
  const urlQR = `${DataConfig.IP_DB}/qrcodes`;
  const [urlData, setUrlData] = useState();
  const [qrData, setQRData] = useState();

  useEffect(() => {
    Axios.get(urlLink)
      .then((response) => {
        // handle success
        setUrlData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Axios.get(urlQR)
      .then((response) => {
        // handle success
        setQRData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-5 w-[100%]">
        <p className="text-4xl font-bold my-[1rem]">
          Your Connection Dashboard
        </p>

        <div className="w-[100%]  flex bg-white p-4 rounded-xl">
          <div className="w-[100%] border-2 p-5  flex justify-between items-center">
            <p>Make it link</p>
            <Link to="/links/linkcreate">
              <Button>Create short link</Button>
            </Link>
          </div>
          <div className="w-[100%] border-2 p-5  flex justify-between items-center">
            <p>Make it scannable</p>
            <Link to="/qrcodes/qrcodescreate">
              <Button>Create QR Code</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-[2rem]">
          <div className="w-[100%] p-5 bg-white  rounded-xl">
            <p className="font-semibold text-xl text-gray-800">
              Usage this user
            </p>
            <div className="flex justify-between my-[1rem]">
              <p>Short links</p>
              <p>
                {urlData?.filter((item) => item.uid == user.uid).length} of 12
                used
              </p>
            </div>
            <Progress
              value={
                (urlData?.filter((item) => item.uid == user.uid).length * 100) /
                12
              }
            />
            <div className="flex justify-between my-[1rem]">
              <p>QR codes</p>
              <p>
                {qrData?.filter((item) => item.uid == user.uid).length} of 2
                used
              </p>
            </div>
            <Progress
              value={
                (qrData?.filter((item) => item.uid == user.uid).length * 100) /
                2
              }
            />
          </div>
          <div className=" p-5 bg-white  rounded-xl ">
            <p className="font-semibold text-xl text-gray-800">
              Tag Infomations
            </p>
            <div>
              <LineChart />
            </div>
          </div>
          <div className="  p-5 bg-white  rounded-xl">
            <p className="font-semibold text-xl text-gray-800">
              Device Tracker
            </p>
            <div className="h-[100%]">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
