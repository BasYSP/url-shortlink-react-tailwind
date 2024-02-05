import { useParams } from "react-router-dom";
import { DataConfig } from "../../data_config/dataconfig";

function FreeQrRedirect() {
  const { shortUrl } = useParams();
  window.location.href = `${DataConfig.IP_DB}/freeqr/${shortUrl}`;
  return <div>Redirect</div>;
}

export default FreeQrRedirect;
