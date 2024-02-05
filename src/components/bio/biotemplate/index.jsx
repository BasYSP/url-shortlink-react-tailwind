import { LinkIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
import { DataConfig } from "../../../data_config/dataconfig";

function BioLink() {
  const { user } = useUserAuth();

  const url = `${DataConfig.IP_DB}/bio`;
  const [bioData, setBioData] = useState();
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setBioData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-[100%] min-h-[100vh] bg-blue-400 flex flex-col items-center">
      <div className="p-5">
        <UserCircleIcon className="w-[100px]" />
      </div>
      <div></div>
      {bioData
        ?.filter((items) => items.uid == user.uid)
        .map((items) => {
          return (
            <>
              <p className="text-white font-bold text-5xl">
                {items.template_name}
              </p>
              <Link
                to={"https://" + items.original_url1}
                target="_blank"
                className="w-[60%] p-5 rounded-xl my-[1rem] bg-white flex justify-between px-[2rem] text-blue-700"
              >
                <p className="text-xl font-semibold  mx-[2rem]">
                  {items.display_name1}
                </p>
                <div>
                  <LinkIcon className="w-[25px]" />
                </div>
              </Link>
              <Link
                to={"https://" + items.original_url2}
                target="_blank"
                className={
                  items.display_name2
                    ? "w-[60%] p-5 rounded-xl my-[1rem] bg-white flex justify-between px-[2rem] text-blue-700"
                    : "hidden"
                }
              >
                <p className="text-xl font-semibold  mx-[2rem]">
                  {items.display_name2}
                </p>
                <div>
                  <LinkIcon className="w-[25px]" />
                </div>
              </Link>
              <Link
                to={"https://" + items.original_url3}
                target="_blank"
                className={
                  items.display_name3
                    ? "w-[60%] p-5 rounded-xl my-[1rem] bg-white flex justify-between px-[2rem] text-blue-700"
                    : "hidden"
                }
              >
                <p className="text-xl font-semibold  mx-[2rem]">
                  {items.display_name3}
                </p>
                <div>
                  <LinkIcon className="w-[25px]" />
                </div>
              </Link>
              <Link
                to={"https://" + items.original_url4}
                target="_blank"
                className={
                  items.display_name4
                    ? "w-[60%] p-5 rounded-xl my-[1rem] bg-white flex justify-between px-[2rem] text-blue-700"
                    : "hidden "
                }
              >
                <p className="text-xl font-semibold mx-[2rem]">
                  {items.display_name4}
                </p>
                <div>
                  <LinkIcon className="w-[25px]" />
                </div>
              </Link>
            </>
          );
        })}
    </div>
  );
}

export default BioLink;
