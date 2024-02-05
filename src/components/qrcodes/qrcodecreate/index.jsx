import { useEffect, useState } from "react";
import { Sidebar } from "../../sidebar";
import { Input } from "@material-tailwind/react";
import Axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { DataConfig } from "../../../data_config/dataconfig";
function QRCodesCreate() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [displayName, setDisplayName] = useState();
  const { user } = useUserAuth();
  const [qrLength, setQrLength] = useState();
  const [errorFullQr, setErrorFullQr] = useState(false);
  const [tag, setTag] = useState();

  const d = new Date();

  const navigate = useNavigate();
  const date =
    String(d.getFullYear()) +
    "-" +
    String(d.getMonth() + 1) +
    "-" +
    String(d.getDate());

  ////// Tag Selected
  const handleChange = (e) => {
    setTag(e);
  };

  const url = `${DataConfig.IP_DB}/qrcodes`;
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setQrLength(res.data.filter((items) => items.uid == user.uid));
      })
      .catch((err) => console.log(err));
  }, []);

  const addQR = () => {
    if (qrLength.length >= 2) {
      setErrorFullQr(true);
    } else {
      const result = Math.random().toString(36).substring(2, 7);
      Axios.post(`${DataConfig.IP_DB}/createqr`, {
        displayName: displayName,
        originalUrl: originalUrl.replace("https://", ""),
        shortUrl: result,
        date: date,
        uid: user.uid,
        tag: tag,
      });
      navigate("/qrcodes");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[100%]">
        <div className="w-[70%] h-[100vh] bg-white py-[5rem] px-[3rem] flex flex-col">
          <p className="text-2xl font-bold ">Enter your QR Code destination</p>
          <p className="my-[1rem] font-semibold">Deatination URL</p>
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
              <Input variant="outlined" label="--- Select your tag ---"></Input>
            ) : (
              ""
            )}
          </div>
          <div>
            <button
              className="bg-blue-700 px-[1rem] py-[0.5rem] rounded-[5px] text-white"
              onClick={addQR}
            >
              Create QR Codes
            </button>
            <div className={errorFullQr ? "mt-[1rem]" : "hidden"}>
              <p className="px-3 py-1 bg-red-600 font-bold">
                X Your qr is limited
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRCodesCreate;
