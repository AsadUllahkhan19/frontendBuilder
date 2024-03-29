import './AdvanceSearch.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../../context/store";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PriceAreaRangeField from "./priceAreaRangeFeld";
import { InputLabel } from "@mui/material";

const AdvancedSearch = ({ category, showPage }) => {
  const [age, setAge] = useState("");
  const [minPriceSelected, setMinPriceSelected] = useState("");
  const [maxPriceSelected, setMaxPriceSelected] = useState("");
  const [minAreaSelected, setMinAreaSelected] = useState("");
  const [maxAreaSelected, setMaxAreaSelected] = useState("");

  const [MyURL] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [subcatvalue, setsubcatvalue] = useState(
    MyURL.get("subCategory") ? MyURL.get("subCategory") : ""
  );
  const [subcatOptions, setsubcatOptions] = useState([]);

  const [bathrooms, setBathrooms] = useState(
    MyURL.get("bathRooms") ? MyURL.get("bathRooms") : ""
  );
  const [bedrooms, setBedrooms] = useState(
    MyURL.get("bedRooms") ? MyURL.get("bedRooms") : ""
  );
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const { getPropertyData } = useContext(Store);
  // useEffect(() => {
  //   setsubcatvalue(
  //     MyURL.get("subCategory") == null ? "" : MyURL.get("subCategory")
  //   );
  // });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERURL}/lov/sub-category/${category}`)
      .then((res) =>
        setsubcatOptions([{ key: "All", value: "All" }, ...res.data.data])
      );
  }, [category]);

  const handleSearchClick = (
    category,
    subcatvalue,
    area,
    bedrooms,
    bathrooms,
    price,
    showPage
  ) => {
    const params = new URLSearchParams();
    const filterarr = [
      { key: "subCategory", value: subcatvalue },
      { key: "area", value: area },
      { key: "bedRooms", value: bedrooms },
      { key: "bathRooms", value: bathrooms },
      { key: "price", value: price },
    ];
    filterarr.map((element) => {
      if (element.value != "") {
        console.log(element.key, element.value, "..");
        params.append(element.key, element.value);
      }
    });
    if (params.toString()) {
      navigate(`/property/${showPage}?category=${category}&${params.toString()}`);
    } else {
      navigate(`/property/${showPage}?category=${category}`);
    }
    getPropertyData(
      category,
      subcatvalue,
      area,
      bedrooms,
      bathrooms,
      price,
      showPage == "rent" ? "forRent" : showPage
    );
  };
  useEffect(() => {
    handleSearchClick(
      category || "",
      subcatvalue == "" ? "" : subcatvalue,
      area || "",
      bedrooms || "",
      bathrooms || "",
      price || "",
      showPage
    );
  }, [
    MyURL.get("subCategory"),
    MyURL.get("bedRooms"),
    MyURL.get("bathRooms"),
    category,
    showPage,
  ]);

  const bathRoomsData = [
    { key: "All", value: "All" },
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: "5andAbove", value: "5 or above" },
  ];

  return (
    <>
      <div className="px-12 py-4 bg-white   lg:z-50 w-full border-b-2 border-grey">
        <div className="w-full xl:w-1/5 mb-2 flex flex-col justify-center items-center mx-auto">
          <h1 className="font-bold  text-footer tracking-wider text-lg xl:text-2xl text-center">
            Advanced Search
          </h1>
          <h1 className="font-semibold text-primary tracking-wider text-sm xl:text-lg text-center">
            Find Your Dream Property!
          </h1>
        </div>
        <div className="flex justify-center flex-row flex-wrap items-center lg:flex-wrap px-0 gap-x-8 py-2 w-full custom-input">
          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" className="bg-white">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subcatvalue}
                label="category"
                MenuProps={{ PaperProps: { style: { maxHeight: "40vh" } } }}
                sx={{
                  "&:before": {
                    borderColor: "yellow !important",
                  },
                  "&:after": {
                    borderColor: "yellow !important",
                  },
                }}
                onChange={(e) => setsubcatvalue(e.target.value)}
              >
                {subcatOptions?.map((opt, i) => (
                  <MenuItem
                    key={i}
                    selected={opt.key == subcatvalue ? true : false}
                    value={opt.key == "All" ? "" : opt.key}
                    name={opt.key}
                  >
                    {opt.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <PriceAreaRangeField
            typePrice={true}
            minPrice={minPriceSelected}
            maxPrice={maxPriceSelected}
            minPriceFn={setMinPriceSelected}
            maxPriceFn={setMaxPriceSelected}
            setValueFn={setPrice}
          />

          <PriceAreaRangeField
            typePrice={false}
            minPrice={minAreaSelected}
            maxPrice={maxAreaSelected}
            minPriceFn={setMinAreaSelected}
            maxPriceFn={setMaxAreaSelected}
            setValueFn={setArea}
          />
          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" className="bg-white mb-4">
                Bathrooms
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bathrooms}
                label="category"
                MenuProps={{ PaperProps: { style: { maxHeight: "40vh" } } }}
                sx={{
                  "&:before": {
                    borderColor: "yellow !important",
                  },
                  "&:after": {
                    borderColor: "yellow !important",
                  },
                }}
                onChange={(e) => setBathrooms(e.target.value)}
              >
                {bathRoomsData?.map((opt, i) => (
                  <MenuItem
                    key={i}
                    selected={opt.key == bathrooms ? true : false}
                    value={opt.key == "All" ? "" : opt.key}
                    name={opt.key}
                  >
                    {opt.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 180 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label" className="bg-white">
                Bed Rooms
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bedrooms}
                label="category"
                MenuProps={{ PaperProps: { style: { maxHeight: "40vh" } } }}
                sx={{
                  "&:before": {
                    borderColor: "yellow !important",
                  },
                  "&:after": {
                    borderColor: "yellow !important",
                  },
                }}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                {bathRoomsData?.map((opt, i) => (
                  <MenuItem
                    key={i}
                    selected={opt.key == bedrooms ? true : false}
                    value={opt.key == "All" ? "" : opt.key}
                    name={opt.key}
                  >
                    {opt.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>

        <div className="w-full flex justify-center mb-2">
          <button
            onClick={() =>
              handleSearchClick(
                category || "",
                subcatvalue == "" ? "" : subcatvalue,
                area || "",
                bedrooms || "",
                bathrooms || "",
                price || "",
                showPage
              )
            }
            className="px-4 py-2 bg-primary text-white text-lg tracking-widest mt-3 hover:bg-primary/75 bg rounded-md"
          >
            search property
          </button>
        </div>
      </div>

      {/* {console.log("pp", propertyData)} */}
    </>
  );
};

export default AdvancedSearch;
