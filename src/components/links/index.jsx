import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import Axios from "axios";
import { useUserAuth } from "../../context/UserAuthContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import iconCopy from "../../images/copy.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TagIcon,
  CalendarIcon,
  EyeIcon,
  ChartBarIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { DataConfig } from "../../data_config/dataconfig";
function Links() {
  const notify = () => toast("Copy on clipboard ! !");
  const { user } = useUserAuth();
  const url = `${DataConfig.IP_DB}`;
  const [error, setError] = useState();
  const [urlData, setUrlData] = useState();

  // useEffect(() => {
  //   Axios.get(url, {
  //     params: {
  //       uid: user.uid,
  //     },
  //   })
  //     .then((res) => {
  //       setUrlData(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(url);
        setUrlData(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const deleteLink = async (url_id, short_url) => {
    console.log(short_url);
    try {
      await Axios.delete(`${DataConfig.IP_DB}/linkdetail/${url_id}`);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const showLink = () => {
    if (urlData?.find((items) => items.uid == user.uid)) {
      return (
        <div className="flex w-[100%]">
          <div className="w-[100%] h-[100vh] p-5 overflow-auto">
            <div>
              <p className="text-4xl font-bold my-[1rem]">
                Links{" "}
                <span className="text-sm font-normal text-gray-700">
                  ( {urlData?.filter((items) => items.uid == user.uid).length}{" "}
                  links )
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {urlData
                ?.filter((uidData) => uidData.uid == user.uid)
                .map((items, index) => {
                  return (
                    <div key={index}>
                      <div className="px-[2rem] py-[2rem] bg-white rounded-xl ">
                        <div className="flex justify-between">
                          <div className="flex flex-col ">
                            <div className="flex">
                              <p className="text-xl font-semibold">
                                {items.display_name}
                              </p>
                            </div>
                            <Link
                              to={`${DataConfig.IP_DB}/${items.short_url}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-800 font-semibold"
                            >
                              {DataConfig.IP_Domain}/{items.short_url}
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
                                text={`${DataConfig.IP_Domain}/${items.short_url}`}
                                onCopy={() => this.setState({ copied: true })}
                              >
                                <button className="mr-[5px]">
                                  <img src={iconCopy} className="w-[25px]" />
                                </button>
                              </CopyToClipboard>
                            </button>
                            <ToastContainer />
                            <div>
                              <button
                                onClick={() =>
                                  deleteLink(items.url_id, items.short_url)
                                }
                              >
                                <TrashIcon className="w-[25px] " />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[1rem] flex ">
                          <div className="mr-[15px] flex">
                            <CalendarIcon className="h-5 w-5" />
                            <p className="ml-[8px]">
                              {items.date_create.slice(0, 10)}
                            </p>
                          </div>

                          <div className="mr-[15px] flex px-1">
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
        </div>
      );
    } else {
      return (
        <div className="w-[100%] flex justify-center items-center flex-col">
          <p className="text-2xl font-bold">
            Let start creat your short link .
          </p>
          <p className="text-xl my-[1rem]">
            Then edit, customize and track your QR Codes here.
          </p>
          <Link to="linkcreate">
            <button className="bg-blue-600 px-[2rem] py-[0.5rem] rounded-[5px] text-white font-semibold">
              Create a short link
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      {showLink()}
    </div>
  );
}

export default Links;
