import { useEffect, useState } from "react";
import { Sidebar } from "../../sidebar";
import { Input } from "@material-tailwind/react";
import Axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { DataConfig } from "../../../data_config/dataconfig";

function LinkCreate() {
  const [displayName, setDisplayName] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorFullLink, setErrorFullLink] = useState(false);
  const [linkLength, setLinkLength] = useState();
  const [tag, setTag] = useState();
  const [other, setOther] = useState();

  const { user } = useUserAuth();
  const navigate = useNavigate();
  const d = new Date();

  const date =
    String(d.getFullYear()) +
    "-" +
    String(d.getMonth() + 1) +
    "-" +
    String(d.getDate());

  const url = `${DataConfig.IP_DB}`;
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setLinkLength(res.data.filter((items) => items.uid == user.uid));
      })
      .catch((err) => console.log(err));
  }, []);

  const addUrl = () => {
    if (linkLength.length >= 12) {
      ////
      setErrorFullLink(true);
    } else {
      const result = Math.random().toString(36).substring(2, 7);
      setShortUrl(result);

      Axios.post(`${DataConfig.IP_DB}/create`, {
        originalUrl: originalUrl.replace("https://", ""),
        shortUrl: result,
        date: date,
        uid: user.uid,
        displayName: displayName,
        tag: tag,
      });
      navigate("/links");
    }
  };

  ////// Tag Selected
  const handleChange = (e) => {
    setTag(e);
  };

  return (
    <div className="flex ">
      <Sidebar />
      <div className="w-[100%]">
        <div className="w-[70%] h-[100vh] bg-white py-[5rem] px-[3rem] flex flex-col">
          <p className="text-2xl font-bold ">Enter your URL destination</p>
          <p className="my-[1rem] font-semibold">Destination URL</p>
          <Input
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/my-long-url"
          ></Input>
          <p className="text-2xl font-bold my-[1rem]">Code Detail</p>
          <p>Display Name</p>
          <div className="my-[1rem]">
            <Input onChange={(e) => setDisplayName(e.target.value)}></Input>
          </div>
          <p>Tag</p>

          <div className="flex max-w-[300px] flex-col gap-6">
            <Select
              variant="outlined"
              onChange={handleChange}
              label="--- Select your tag ---"
            >
              <Option value="facebook">Facebook</Option>
              <Option value="instagram">Instagram</Option>
              <Option value="twitter">Twitter</Option>
              <Option value="other">Other</Option>
            </Select>
          </div>
          <div className="my-[1rem] max-w-[300px]">
            {tag == "other" ? (
              <Input
                onChange={(e) => setOther(e.target.value)}
                variant="outlined"
                label="--- Select your tag ---"
              ></Input>
            ) : (
              ""
            )}
          </div>

          <div className="mt-[1rem]">
            <button
              className="bg-blue-700 px-[1rem] py-[0.5rem] rounded-[5px] text-white"
              onClick={addUrl}
            >
              Create Short Link
            </button>
            <div className={errorFullLink ? "mt-[1rem]" : "hidden"}>
              <p className="px-3 py-1 bg-red-600 font-bold">
                X Your link is limited
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkCreate;
