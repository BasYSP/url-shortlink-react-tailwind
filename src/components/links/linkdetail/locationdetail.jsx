import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { DataConfig } from "../../../data_config/dataconfig";
const Location_Detail = () => {
  const { shortlink } = useParams();
  const url = `${DataConfig.IP_DB}/urldetail`;
  const [urlDetail, setUrlDetail] = useState();
  let click_total = 0;
  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        setUrlDetail(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const my_urldetail = urlDetail?.filter(
    (items) => items.short_url == shortlink
  );

  const city_data = [];

  for (let i = 0; i <= my_urldetail?.length - 1; i++) {
    if (!city_data.find((items) => items.city == my_urldetail[i].location)) {
      city_data.push({
        city: my_urldetail[i].location,
        amount: 1,
      });
    } else {
      city_data.find((items) => items.city == my_urldetail[i].location).amount =
        city_data.find((items) => items.city == my_urldetail[i].location)
          .amount + 1;
    }
  }
  city_data.map((items) => (click_total = click_total + items.amount));

  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4 flex justify-between">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  City
                </th>
                <th scope="col" className="px-6 py-4">
                  Clicks{" "}
                  <span className="text-gray-500">
                    ( {click_total} clicks )
                  </span>
                </th>
                <th scope="col" className="px-6 py-4">
                  %
                </th>
              </tr>
            </thead>

            <tbody>
              {city_data.map((items, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium ">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {items.city}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {items.amount}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 ">
                        {((items.amount * 100) / click_total).toFixed(1)}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Location_Detail;
