import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";
import QRCode from "react-qr-code";
import iconCopy from "../../images/copy.png";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CalendarIcon,
  ChartBarIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { DataConfig } from "../../data_config/dataconfig";

function QRCodes() {
  const notify = () => toast("Copy on clipboard ! !");
  const url = `${DataConfig.IP_DB}/qrcodes`;
  const [qrData, setQrData] = useState();
  const { user } = useUserAuth();

  useEffect(() => {
    const getQRData = () => {
      Axios.get(url)
        .then((response) => {
          // handle success
          setQrData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getQRData();
  }, []);

  const deleteQR = async (qr_id) => {
    try {
      await Axios.delete(`${DataConfig.IP_DB}/qrdetail/${qr_id}`);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const showQR = () => {
    if (qrData?.find((items) => items.uid == user.uid)) {
      return (
        <div className="w-[100%] h-[100vh] p-5 overflow-auto">
          <div>
            <p className="text-4xl font-bold my-[1rem]">QR Codes</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {qrData
              ?.filter((uidData) => uidData.uid == user.uid)
              .map((items, index) => {
                return (
                  <div key={index}>
                    <div className="px-[2rem] py-[2rem] bg-white mt-[2rem] rounded-xl ">
                      <div className="flex justify-between">
                        <div>
                          <QRCode
                            size={256}
                            style={{
                              height: "auto",
                              maxWidth: "100px",
                              width: "100px",
                              marginRight: "10px",
                            }}
                            value={`${DataConfig.IP_Domain}/qr/${items.short_url}`}
                            viewBox={`0 0 256 256`}
                          />
                        </div>

                        <div className="flex flex-col">
                          <p className="text-xl font-semibold ">
                            {items.display_name}
                          </p>
                          <Link
                            to={`${DataConfig.IP_Domain}/qr/${items.short_url}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-800 font-semibold "
                          >
                            {DataConfig.IP_DB}/{items.short_url}
                          </Link>
                          <Link
                            to={`https://${items.original_url}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {items.original_url}
                          </Link>
                        </div>
                        <div className="flex h-[100%]">
                          <Link to={`${items.short_url}`}>
                            <ChartBarIcon className=" w-[25px] mr-[5px]" />
                          </Link>
                          <button onClick={notify}>
                            <CopyToClipboard
                              text={`${DataConfig.IP_Domain}/qr/${items.short_url}`}
                              onCopy={() => this.setState({ copied: true })}
                            >
                              <button className="mr-[5px]">
                                <img src={iconCopy} className="w-[25px]" />
                              </button>
                            </CopyToClipboard>
                          </button>
                          <ToastContainer />
                          <div>
                            <button onClick={() => deleteQR(items.qr_id)}>
                              <TrashIcon className="w-[25px] " />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-[1rem] flex">
                        <div className="mr-[15px] flex">
                          <CalendarIcon className="h-5 w-5" />
                          <p className="ml-[8px]">
                            {items.date_create.slice(0, 10)}
                          </p>
                        </div>
                        <div className="flex px-1">
                          <TagIcon className="h-5 w-5" />
                          <p className="ml-[8px] capitalize">{items.tag}</p>
                        </div>
                        <div className="flex px-1">
                          <EyeIcon className="h-5 w-5" />
                          <p className="ml-[8px] capitalize">
                            {items.clicker}{" "}
                            <span className="text-gray-700">Views</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-[100%] flex justify-center items-center flex-col">
          <p className="text-2xl font-bold">
            Let start creat your QR Code from any short link.
          </p>
          <p className="text-xl my-[1rem]">
            Then edit, customize and track your QR Codes here.
          </p>
          <Link to="qrcodescreate">
            <button className="bg-blue-600 px-[2rem] py-[0.5rem] rounded-[5px] text-white font-semibold">
              Create a QR Code
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      {showQR()}
    </div>
  );
}

export default QRCodes;
