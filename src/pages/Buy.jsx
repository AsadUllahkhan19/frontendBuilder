import React, { useEffect, useState } from "react";
import { SinglePropertyCard } from "../components/common";
import { property } from "../data/dummyData";
import { BiMap } from "react-icons/bi";
import {
  useLocation,
  Link,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ImpressionClickTrackerHOC from "../Hoc/ImpressionHoc";

import { FaList } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import ListPropertyCard from "../components/common/ListPropertyCard";
import AdvancedSearch from "../components/common/AdvancedSearch";
import Type from "../components/common/Type";
import PriceRange from "../components/common/PriceRange";
import { useContext } from "react";
import { Store } from "../context/store";
import { useLayoutEffect } from "react";

import marker from "../assets/icons/mapIcon.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import { Footer } from "../components/common";

const Buy = () => {
  const { state, onCategoryChange, BuyData } = useContext(Store);
  const { slug } = useParams();
  const [MyURL] = useSearchParams();
  // const MyURL = new URLSearchParams(window.location.search);
  const myParam = MyURL.get("category");
  // console.log("dat213a", myParam);
  const propertydataArr = state.propertydataArr;

  const [propertyData, setpropertyData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const [filteredData, setFilteredData] = useState(property);

  const [_isChecked, _setIsChecked] = useState(false);
  const [selectedData, setSelectedData] = useState(MyURL.get("category"));

  const [isChecked, setIsChecked] = useState(false);
  // useEffect(() => {
  //   setSelectedData(MyURL.get("category"));
  // });
  // useEffect(() => {
  //   BuyData(slug == "buy" ? "forSale" : slug == "rent" ? "forRent" : slug, selectedData);
  //   // if(MyURL.get('find') === 'check'){

  //   // }
  // }, [myParam, selectedData, slug]);

  // useEffect(() => {
  //   onCategoryChange(selectedData);
  // }, [selectedData, myParam]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Map Custom Icon
  const iconPerson = new L.Icon({
    iconUrl: marker,
    iconSize: [64, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  });

  // Map Recenter Function
  const RecenterAutomatically = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(position);
    }, position);
    return null;
  };
  const position = [location?.longitude || 25.26027, location?.latitude || 55.3094];
  const [layout, setLayout] = useState("grid");

  return (
    <div className="mt-20">
      <AdvancedSearch
        category={selectedData}
        showPage={slug == "buy" ? "forSale" : slug}
      />
      <div className="flex flex-row flex-center-between px-8 sm:px-[80px] xl:px-[120px] pt-[25px]">
        <div>
          <p className=" mt-[20px]">
            <Link to={"/"} className="text-lg uppercase">Home</Link>
            <span> &gt; </span>
            <Link to={`/property/${slug}?category=resident`} className="text-lg uppercase">{slug}</Link>
            <span> &gt; </span>
            <Link to={`/property/${slug}?category=${myParam}`} className="text-lg uppercase">
              {myParam == "all" ? "" : myParam}
            </Link>
          </p>
          {/* <h1 className="mt-[5px] text-xl font-bold">
            {slug[0].toUpperCase() + slug.slice(1, slug.length)}
          </h1> */}
        </div>
        <div>
          <div className="gap-2 flex-align-center">
            <div
              className={`w-10 h-10 rounded-xl grid place-items-center bg-slate-100 hover:bg-slate-200 sm:cursor-pointer transition-a dark:bg-card-dark  ${layout === "grid" && "!bg-primary text-white"
                }`}
              onClick={() => setLayout("grid")}
            >
              <FiGrid />
            </div>
            <div
              className={`w-10 h-10 rounded-xl grid place-items-center bg-slate-100 sm:cursor-pointer hover:bg-slate-200 transition-a dark:bg-card-dark ${layout === "list" && "!bg-primary text-white"
                }`}
              onClick={() => setLayout("list")}
            >
              <FaList />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <div className=" w-[90%] justify-start flex-align-center mt-2 mb-2">
          <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center p-1 flex-wrap md:flex-row">
            <input
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <button
              onClick={() => {
                setSelectedData("all");
                navigate(`/property/${slug}?category=all`);
              }}
              className={`flex items-center space-x-[6px] rounded py-2 px-[18px] pr-[50px] text-lg font-medium ${selectedData == "all"
                ? "text-primary bg-ordinary"
                : "text-body-color"
                }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setSelectedData("residential");
                navigate(`/property/${slug}?category=residential`);
              }}
              className={`flex items-center space-x-[6px] rounded py-2 px-[18px] pr-[50px] text-lg font-medium ${selectedData == "residential"
                ? "text-primary bg-ordinary"
                : "text-body-color"
                }`}
            >
              Residential
            </button>

            <button
              onClick={() => {
                setSelectedData("commercial");
                navigate(`/property/${slug}?category=commercial`);
              }}
              className={`flex items-center space-x-[6px] rounded py-2 px-[18px] pr-[50px] text-lg font-medium ${selectedData == "commercial"
                ? "text-primary bg-ordinary"
                : "text-body-color"
                }`}
            >
              Commercial
            </button>
          </label>
        </div>
      </div> */}
      <div
        style={{ padding: '0px 40px' }}
        className={`grid my-20 h-full ${layout === "grid" && "lg:grid-cols-6 gap-x-20"
          } ${layout === "list" && "lg:grid-cols-3 gap-10"} px-3 gap-y-6`}
      >
        {layout === "grid" ? (
          // <div className="flex flex-wrap h-full w-full col-span-3 gap-10">  content-center
          <div className="grid lg:col-span-4 col-span-1 grid-cols-1 gap-y-8 md:grid-cols-2  gap-x-10">
            {propertydataArr?.length > 0 ? propertydataArr?.map((item) => (
              <ImpressionClickTrackerHOC
                clickEvent={`ADD-TO-CART`}
                disableViewportTracking={false}
                propertyId={item?._id}
                userId={item?.ownerId}
              >
                <div className="col-span-1">
                  <SinglePropertyCard
                    propIds={item?._id}
                    name={item?.propertyDetails.title}
                    location={item?.locationAndAddress}
                    price={item.propertyDetails.InclusivePrice}
                    category={item?.typesAndPurpose.category}
                    status={item?.propertyDetails.ownerShipStatus}
                    number_of_bathrooms={item?.propertyDetails.bathRooms}
                    number_of_beds={item?.propertyDetails.bedRooms}
                    area={item?.propertyDetails.areaSquare}
                    image={item?.upload?.images[0]}
                  />
                </div>
              </ImpressionClickTrackerHOC>
            )) : <span class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">No data found.</span>}
          </div>
        ) : (
          <div className="grid col-span-2 grid-rows gap-4">
            <div className="flex flex-col gap-y-6">
              {propertydataArr.map((item) => (
                <ImpressionClickTrackerHOC
                  clickEvent={`ADD-TO-CART`}
                  disableViewportTracking={false}
                  userId={item?._id}
                >
                  <div className="w-full">
                    <ListPropertyCard
                      propIds={item?._id}
                      name={item?.propertyDetails.title}
                      desc={item?.propertyDetails.description}
                      location={item?.locationAndAddress}
                      price={item?.propertyDetails.InclusivePrice}
                      category={item?.typesAndPurpose.category}
                      status={item?.propertyDetails.ownerShipStatus}
                      number_of_bathrooms={item?.propertyDetails.bathRooms}
                      area={item?.propertyDetails.areaSquare}
                      image={item?.upload?.images[0]}
                    />
                  </div>
                </ImpressionClickTrackerHOC>
              ))}
            </div>
          </div>
        )}

        <div className="lg:col-span-2 w-full h-screen sticky top-10 ">
          <MapContainer
            center={position}
            zoom={12}
            attributionControl={true}
            zoomControl={false}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
            className="h-full leaflet-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker icon={iconPerson} position={position}>
              <Popup>Hello</Popup>
            </Marker>
            <RecenterAutomatically position={position} />
          </MapContainer>
        </div>
      </div>
      <div className="px-[2%] md:px-[6%] bg-footer border border-footer">
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Buy;
