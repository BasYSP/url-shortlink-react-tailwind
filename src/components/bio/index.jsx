import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { Input } from "@material-tailwind/react";
import { useUserAuth } from "../../context/UserAuthContext";
import Axios from "axios";
import {
  ArrowTopRightOnSquareIcon,
  CalendarIcon,
  LinkIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { DataConfig } from "../../data_config/dataconfig";

function Bio() {
  const { user } = useUserAuth();
  const [step, setStep] = useState(0);
  const [bioName, setBioName] = useState();
  const [templateName, setTemplateName] = useState();
  const [link1, setLink1] = useState();
  const [link2, setLink2] = useState();
  const [link3, setLink3] = useState();
  const [link4, setLink4] = useState();
  const [displayLink1, setDisplayLink1] = useState("Display name");
  const [displayLink2, setDisplayLink2] = useState();
  const [displayLink3, setDisplayLink3] = useState();
  const [displayLink4, setDisplayLink4] = useState();
  const url = `${DataConfig.IP_DB}/bio`;
  const [bioData, setBioData] = useState();

  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setBioData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNextStep = (page) => {
    if (bioName) {
      setStep(page);
    }
  };
  const d = new Date();
  const date =
    String(d.getFullYear()) +
    "-" +
    String(d.getMonth() + 1) +
    "-" +
    String(d.getDate());
  const deleteBio = async (bio_url) => {
    try {
      await Axios.delete(`${DataConfig.IP_DB}/biodelete/${bio_url}`);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addBio = () => {
    if (!templateName) {
      alert("Please fill your template name.");
    } else if (!displayLink1 || !link1) {
      alert("Please fill your link");
    } else {
      Axios.post(`${DataConfig.IP_DB}/createbio`, {
        uid: user.uid,
        date: date,
        templateName: templateName,
        bio_url: bioName,
        displayName1: displayLink1,
        originalUrl1: link1,
        displayName2: displayLink2,
        originalUrl2: link2,
        displayName3: displayLink3,
        originalUrl3: link3,
        displayName4: displayLink4,
        originalUrl4: link4,
      });
      location.reload();
    }
  };

  const bioCreate = () => {
    if (bioData?.find((items) => items.uid == user.uid)) {
      return (
        <div className="p-5 flex flex-col  min-w-[20%] ">
          <p className="text-4xl font-bold my-[1rem]">Bio Link</p>
          {bioData
            .filter((items) => items.uid == user.uid)
            .map((items, index) => {
              return (
                <div className="p-5 rounded-xl bg-white w-[100%]" key={index}>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold">Bio Name : </span>
                      <span>{items.bio_url}</span>
                    </div>
                    <div className="flex">
                      <button
                        className="z-50"
                        onClick={() => deleteBio(items.bio_url)}
                      >
                        <TrashIcon className="w-[25px] " />
                      </button>
                      <Link
                        to={`/bio/${items.bio_url}`}
                        target="_blank"
                        className="w-[25px] h-[25px] ml-[10px]"
                      >
                        <ArrowTopRightOnSquareIcon />
                      </Link>
                    </div>
                  </div>

                  <div className="mr-[15px] flex">
                    <CalendarIcon className="h-5 w-5" />
                    <p className="ml-[8px]">{items.date_create.slice(0, 10)}</p>
                  </div>
                </div>
              );
            })}
        </div>
      );
    } else {
      if (step == 0) {
        return (
          <div className="w-[100%] p-5 flex flex-col">
            <div>
              <p className="text-4xl font-bold my-[1rem]">
                Create Your Link-in-bio
              </p>
            </div>
            <div className="mt-[1rem]">
              <p className="font-semibold">Claim your URL</p>
            </div>
            <div className="flex">
              <input
                onChange={(e) => setBioName(e.target.value)}
                className="mt-[1rem] p-2 border rounded w-[50%]"
                placeholder="your name or business"
              />
              <button
                className="mt-[1rem] ml-[1.5rem] py-2 px-3 border rounded bg-blue-700"
                onClick={() => handleNextStep(1)}
              >
                <p className="text-white">Create page</p>
              </button>
            </div>
            <div className="my-[2rem]">
              <p className="text-gray-800">Your plan include 1 Link-in-bio.</p>
            </div>
          </div>
        );
      } else if (step == 1) {
        return (
          <div className="w-[100%] p-5 flex flex-col bg-gray-100">
            <div>
              <button onClick={() => handleNextStep(0)} className="flex ">
                <p className="text-xl font-semibold">Back</p>
              </button>
            </div>

            <div>
              <p className="text-4xl font-bold my-[1rem]">Your Template</p>
            </div>
            <div className="flex p-5">
              <div className="w-[100%] flex flex-col p-5">
                <p>
                  <span className="text-gray-700">Bio name : </span>
                  <span className="font-semibold text-2xl">{bioName}</span>{" "}
                </p>
                <p className="text-xl text-gray-800  my-[1rem]">
                  Your template name
                </p>

                <div className="w-[60%]">
                  <Input onChange={(e) => setTemplateName(e.target.value)} />
                </div>
                <div className="my-[1rem]">
                  <p>Link 1</p>
                  <div className="w-[60%]">
                    <Input
                      onChange={(e) => setDisplayLink1(e.target.value)}
                      placeholder="Display name"
                    />
                    <Input
                      className="mt-[10px]"
                      onChange={(e) => setLink1(e.target.value)}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
                <div className="my-[1rem]">
                  <p>Link 2 ( Optional )</p>
                  <div className="w-[60%]">
                    <Input
                      onChange={(e) => setDisplayLink2(e.target.value)}
                      placeholder="Display name"
                    />
                    <Input
                      className="mt-[10px]"
                      onChange={(e) => setLink2(e.target.value)}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
                <div className="my-[1rem]">
                  <p>Link 3 ( Optional )</p>
                  <div className="w-[60%]">
                    <Input
                      onChange={(e) => setDisplayLink3(e.target.value)}
                      placeholder="Display name"
                    />
                    <Input
                      className="mt-[10px]"
                      onChange={(e) => setLink3(e.target.value)}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
                <div className="my-[1rem]">
                  <p>Link 4 ( Optional )</p>
                  <div className="w-[60%]">
                    <Input
                      onChange={(e) => setDisplayLink4(e.target.value)}
                      placeholder="Display name"
                    />
                    <Input
                      className="mt-[10px]"
                      onChange={(e) => setLink4(e.target.value)}
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
                <div className="flex">
                  <button
                    className=" bg-blue-700 py-1 px-3 text-white rounded"
                    onClick={addBio}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="w-[50%] flex flex-col items-center p-5 bg-blue-600 rounded-[15px] h-[600px]">
                <PhotoIcon className="h-[100px] w-[100px] border-2 rounded-[50%] p-2" />
                <div className="my-[1rem] font-semibold text-2xl">
                  <p className="text-white">{templateName}</p>
                </div>
                <div className="w-[100%] h-[100%] flex flex-col">
                  <div className="my-[1rem] bg-white  py-[1rem] flex justify-between px-[1rem] rounded-[15px] text-blue-700">
                    {displayLink1}

                    <LinkIcon className="w-[20px]" />
                  </div>
                  <div
                    className={
                      displayLink2
                        ? "my-[1rem] bg-white  py-[1rem] flex justify-between px-[1rem] rounded-[15px] text-blue-700"
                        : "hidden"
                    }
                  >
                    {displayLink2}
                    <LinkIcon className="w-[20px] ml-[1rem]" />
                  </div>
                  <div
                    className={
                      displayLink3
                        ? "my-[1rem] bg-white  py-[1rem] flex justify-between px-[1rem] rounded-[15px] text-blue-700"
                        : "hidden"
                    }
                  >
                    {displayLink3}
                    <LinkIcon className="w-[20px] ml-[1rem]" />
                  </div>
                  <div
                    className={
                      displayLink4
                        ? "my-[1rem] bg-white  py-[1rem] flex justify-between px-[1rem] rounded-[15px] text-blue-700"
                        : "hidden"
                    }
                  >
                    {displayLink4}
                    <LinkIcon className="w-[20px] ml-[1rem]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      {bioCreate()}
    </div>
  );
}

export default Bio;
