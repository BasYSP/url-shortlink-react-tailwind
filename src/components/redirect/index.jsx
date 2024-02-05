import { useParams } from "react-router-dom";
import { DataConfig } from "../../data_config/dataconfig";

function Redirect() {
  const { shortUrl } = useParams();

  window.location.href = `${DataConfig.IP_DB}/${shortUrl}`;
  return <div>Redirect</div>;
}

export default Redirect;
