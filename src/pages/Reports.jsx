import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Reports2 from "../components/Dashboard/Reports2";
import axios from "axios";
import { useState } from "react";

const Reports = () => {
  const [clickImp, setClickImp] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    axios
      .get(
        `${process.env.REACT_APP_SERVERURL}/property/get-impressions-count/${data.email}`
      )
      .then((res) => {
        setClickImp(res?.data?.data);
      });
  }, []);
  return (
    <Layout>
      <div className="relative h-screen overflow-x-hidden bg-ordinary px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-20 px-10 mb-8 py-10 rounded-[15px] border-2 bg-white border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mx-6">
          <div className="border-2 bg-white border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-[15px] p-3 bg-transparent h-20 flex flex-col py-2 px-4 hover:border-yellow-400">
            <h1 className="text-lg font-light">Impressions</h1>
            <h1 className="text-xl font-bold">
              {clickImp[0]?.impressions || 0}
            </h1>
          </div>
          <div className="border-2 bg-white border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-[15px] p-3 bg-transparent h-20 flex flex-col py-2 px-4 hover:border-yellow-400">
            <h1 className="text-lg font-light">Clicks</h1>
            <h1 className="text-xl font-bold">{clickImp[0]?.clicks || 0}</h1>
          </div>
          <div className="border-2 bg-white border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-[15px] p-3 bg-transparent h-20 flex flex-col py-2 px-4 hover:border-yellow-400">
            <h1 className="text-lg font-light">Leads</h1>
            <h1 className="text-xl font-bold">{clickImp[0]?.leads || 0}</h1>
          </div>
        </div>
        {/* <div className="bg-white relative rounded-[10px] px-6 pt-4 pb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] flex flex-row gap-5 mx-6">
          <div className="flex flex-col gap-5">
            <div className="mt-5 px-10">
              <h1 className="font-semibold text-[24px] mb-2">
                Top Locations per Lead
              </h1>
              <hr />
            </div>
            <div className="border-2 bg-white border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-[15px] mx-10 h-[500px] mb-5 flex flex-col items-center justify-center hover:border-yellow-400">
              <img src="/images/notfound.png" className="h-25 w-25 mb-5"></img>
              <p className="text-sm text-footer3 sm:mx-10 text-center">
                We could not find any data to display. Try selecting wider date
                range or use the Add Property option to share you properties
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="mt-5 px-10">
              <h1 className="font-semibold text-[24px] mb-2">
                Relative Leads Per Product
              </h1>
              <hr />
            </div>
            <div className="border-2 bg-white border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-[15px] mx-10 h-[500px] mb-5 flex flex-col items-center justify-center hover:border-yellow-400">
              <img src="/images/notfound.png" className="h-25 w-25 mb-5"></img>
              <p className="text-sm text-footer3 sm:mx-10 text-center">
                We could not find any data to display. Try selecting wider date
                range or use the Add Property option to share you properties
              </p>
            </div>
          </div>
        </div> */}
        <Reports2 />
      </div>
    </Layout>
  );
};

export default Reports;
