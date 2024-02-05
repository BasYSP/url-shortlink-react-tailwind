import { useState } from "react";
import "./App.css";
import { NavbarWithMegaMenu } from "./components/navbar";
import { Button, Input } from "@material-tailwind/react";
import Axios from "axios";
import QRCode from "react-qr-code";
import { DataConfig } from "./data_config/dataconfig";
function App() {
  const [shortLinkSelected, setShortLinkSelect] = useState(true);
  const [qrcodeSelected, setQrcodeSelected] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [originalQRUrl, setOriginalQRUrl] = useState("");
  const [shortLink, setShortLink] = useState();
  const [qrshortLink, setQRShortLink] = useState("");

  const d = new Date();
  const date =
    String(d.getFullYear()) +
    "-" +
    String(d.getMonth() + 1) +
    "-" +
    String(d.getDate());

  const addUrl = () => {
    const result = Math.random().toString(36).substring(2, 8);

    setShortLink(`${DataConfig.IP_Domain}/freelink/${result}`);
    Axios.post(`${DataConfig.IP_DB}/createfree`, {
      originalUrl: originalUrl.replace("https://", ""),
      shortUrl: result,
      date: date,
    });
  };

  const addQr = () => {
    const QRresult = Math.random().toString(36).substring(2, 8);

    setQRShortLink(`${DataConfig.IP_Domain}/freeqr/${QRresult}`);
    Axios.post(`${DataConfig.IP_DB}/createqrfree`, {
      originalUrl: originalQRUrl.replace("https://", ""),
      shortUrl: QRresult,
      date: date,
    });
  };

  const showQRCode = () => {
    return (
      <>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={qrshortLink}
          viewBox={`0 0 256 256`}
        />
      </>
    );
  };
  function shortLinkClick() {
    setQrcodeSelected(false);
    setShortLinkSelect(true);
  }
  function qrCodeClick() {
    setQrcodeSelected(true);
    setShortLinkSelect(false);
  }
  const getLink = () => {
    if (shortLinkSelected) {
      return (
        <>
          <div className="flex flex-col w-[100%]">
            <p className="font-bold text-3xl">Shorten a long link</p>
            <p className="my-[2rem] font-bold">Paste a long URL</p>
            <div className="w-100">
              <Input
                label="Link URL"
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
            </div>
            <Button
              className="w-[150px] mt-[1rem] bg-blue-800"
              onClick={addUrl}
            >
              Get Link
            </Button>
            <div className="my-[1rem] flex flex-col justify-center">
              <button>
                <a
                  href={shortLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-800 font-semibold text-xl"
                >
                  {shortLink}
                </a>
              </button>
            </div>
            <div className="my-[1rem] flex justify-center">
              <p className="text-2xl font-bold text-gray-800">
                No credit card required. Get free your link.
              </p>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex flex-col w-[100%]">
            <p className="font-bold text-3xl">Create your QR Code</p>
            <p className="my-[2rem] font-bold">
              Enter your QR Code destination
            </p>
            <div className="w-100">
              <Input
                label="Link URL"
                onChange={(e) => setOriginalQRUrl(e.target.value)}
              />
            </div>
            <Button
              className="w-[150px] mt-[1rem] bg-blue-800 "
              onClick={addQr}
            >
              Get QR Code
            </Button>
            <div className={qrshortLink ? "flex flex-col" : "hidden"}>
              <div
                className="py-[1rem]"
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 180,
                  width: "100%",
                }}
              >
                {showQRCode()}
              </div>
              <p className="text-center text-xl font-bold text-blue-800">
                {originalQRUrl}
              </p>
              <a className="text-center font-bold">Download QR</a>
            </div>

            <div className="my-[1rem] flex justify-center">
              <p className="text-2xl font-bold text-gray-800">
                No credit card required. Get free your link.
              </p>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <>
      <NavbarWithMegaMenu />
      <div className="my-[2rem] flex items-center flex-col">
        <p className="text-6xl font-bold ">
          MAKE every <span className="text-blue-800">connection</span>{" "}
          <span>EASY</span>
        </p>
        <p className="flex justify-center text-3xl mt-[1rem] text-gray-700 ">
          Create shortlinks, QR Codes and share them anywhere.
        </p>
        <p className="flex justify-center text-3xl mt-[1rem] text-gray-700">
          Track links and count connections.
        </p>
      </div>
      <div className="flex mx-auto w-[70%]">
        <button
          className={
            shortLinkSelected
              ? "w-[200px] flex justify-center border-2 p-3 rounded-t-[15px] bg-white"
              : "w-[200px] flex justify-center  p-3 rounded-[15px] bg-inherit"
          }
          onClick={shortLinkClick}
        >
          <p className="font-bold">Short link</p>
        </button>
        <button
          className={
            qrcodeSelected
              ? "w-[200px] flex justify-center border-2 p-3 rounded-t-[15px] bg-white"
              : "w-[200px] flex justify-center  p-3 rounded-[15px] bg-inherit"
          }
          onClick={qrCodeClick}
        >
          <p className="font-bold">QR Code</p>
        </button>
      </div>
      <div className="w-[70%] mx-auto p-5 rounded-b-[15px] rounded-tr-[15px] border-2 bg-white flex ">
        {getLink()}
      </div>
    </>
  );
}

export default App;
