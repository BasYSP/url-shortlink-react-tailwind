import { Sidebar } from "../../sidebar";
import PieChart_LinkDetail from "./piechart";
import BarChart_linkdetail from "./barchart";
import Location_Detail from "./locationdetail";

function Linkdetail() {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="p-5 w-[100%]">
          <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white rounded-xl">
              <p className="font-bold">Viewer Infomations</p>
              <BarChart_linkdetail />
            </div>
            <div className="p-5 bg-white rounded-xl">
              <p className="font-bold">Device Tracker</p>
              <PieChart_LinkDetail />
            </div>
          </div>
          <div className="mt-5 p-5 bg-white rounded-xl">
            <p className="font-bold">Location Tracker</p>
            <Location_Detail />
          </div>
        </div>
      </div>
    </>
  );
}

export default Linkdetail;
