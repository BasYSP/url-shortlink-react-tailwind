import { useParams } from "react-router-dom";
import { DataConfig } from "../../data_config/dataconfig";

function QrRedirect() {
  const { shortUrl } = useParams();

  window.location.href = `${DataConfig.IP_DB}/qr/${shortUrl}`;
  return <div>Redirecting. . .</div>;
}

export default QrRedirect;
