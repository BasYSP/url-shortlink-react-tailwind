import { useParams } from "react-router-dom";
import { DataConfig } from "../../data_config/dataconfig";

function FreeRedirect() {
  const { shortUrl } = useParams();

  window.location.href = `${DataConfig.IP_DB}/freelink/${shortUrl}`;
  return <div>Redirect</div>;
}

export default FreeRedirect;
