import './AdvanceSearch.css'
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Store } from "../../context/store";
import { useLocation, useNavigate, useSearchParams, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PriceAreaRangeField from "./priceAreaRangeFeld";
import { InputLabel } from "@mui/material";
import '../../App.css'

const AdvancedSearch = ({ category, showPage }) => {
  const [age, setAge] = useState("");
  const [minPriceSelected, setMinPriceSelected] = useState("");
  const [maxPriceSelected, setMaxPriceSelected] = useState("");
  const [minAreaSelected, setMinAreaSelected] = useState("");
  const [maxAreaSelected, setMaxAreaSelected] = useState("");

  const [MyURL] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const url = window.location.href;

  const [subcatvalue, setsubcatvalue] = useState(
    MyURL.get("subCategory") && MyURL.get("subCategory")
  );
  const [subcatOptions, setsubcatOptions] = useState([]);

  const [bathrooms, setBathrooms] = useState(
    MyURL.get("bathRooms") ? MyURL.get("bathRooms") : ""
  );
  const [bedrooms, setBedrooms] = useState(
    MyURL.get("bedRooms") ? MyURL.get("bedRooms") : ""
  );
  const [selectedData, setSelectedData] = useState(MyURL.get("category"));
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const { getPropertyData, BuyData } = useContext(Store);

  const myParam = MyURL.get("category");
  const subCategory = MyURL.get("subCategory");
  // useEffect(() => {
  //   setsubcatvalue(
  //     MyURL.get("subCategory") && MyURL.get("subCategory")
  //   );
  // });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVERURL}/lov/sub-category/${category}`)
      .then((res) =>
        setsubcatOptions([{ key: "All", value: "All" }, ...res.data.data])
      );
  }, [category]);

  // useEffect(() => {
  //   console.log('sluggish', searchParams);
  //   const myParam = MyURL.get("category");
  //   const subCategory = MyURL.get("subCategory");
  //   const bedRooms = MyURL.get("bedRooms");
  //   const bathRooms = MyURL.get("bathRooms");
  //   // const filterArray = [
  //   //   { key: "subCategory", value: subCategory },
  //   //   { key: "bedRooms", value: bedRooms },
  //   //   { key: "bathRooms", value: bathRooms },
  //   //   { key: "purpose", value: 'forSale' }
  //   // ]

  //   // filterArray.map((element) => {
  //   //   if (element.value != "") {
  //   //     params.append(element.key, element.value);
  //   //   }
  //   // });


  //   handleSearchClick(
  //     category || "all",
  //     subcatvalue != "" && subcatvalue,
  //     // area || "",
  //     bedrooms || "",
  //     bathrooms || "",
  //     price || "",
  //    'forSale'
  //   )

  //   // BuyData(slug == "buy" ? "forSale" : slug == "rent" ? "forRent" : slug, selectedData);
  //   // if(MyURL.get('find') === 'check'){

  //   // }
  // }, [myParam, selectedData, slug, MyURL]);

  useEffect(() => {
    const temp = Object.fromEntries([...searchParams]);
    temp.purpose = slug;
    getPropertyData(
      temp
      // category || "",
      // subcatvalue && subcatvalue,
      // area || "",
      // bedrooms || "",
      // bathrooms || "",
      // price || "",
      // showPage
    );
    console.log('from_useEffect_layout', temp);
    // for (const [key, value] of searchParams.entries()) {
    //   console.log(key, 'subCategory', value);
    // }
  }, [useSearchParams, slug])

  // const handleSearchClick = (
  //   category,
  //   subcatvalue,
  //   area,
  //   bedrooms,
  //   bathrooms,
  //   price,
  //   showPage
  // ) => {
  //   const params = new URLSearchParams();
  //   const filterarr = [
  //     { key: "subCategory", value: subcatvalue },
  //     { key: "area", value: area },
  //     { key: "bedRooms", value: bedrooms },
  //     { key: "bathRooms", value: bathrooms },
  //     { key: "price", value: price }
  //   ];
  //   filterarr.map((element) => {
  //     if (element.value != "") {
  //       console.log(filterarr, "mapsout");
  //       params.append(element.key, element.value);
  //     }
  //   });
  //   // if (params.toString()) {
  //   //   console.log('advance_search_new', params.toString())
  //   //   navigate(`/property/${showPage}?category=${category}&${params.toString()}`);
  //   // } else {
  //   // navigate(`/property/${showPage}?category=${category}`);
  //   // }
  //   console.log('mast_chepia',
  //     category,
  //     subcatvalue,
  //     area,
  //     bedrooms,
  //     bathrooms,
  //     price,
  //     showPage
  //   );
  //   getPropertyData(
  //     category,
  //     subcatvalue,
  //     area,
  //     bedrooms,
  //     bathrooms,
  //     price,
  //     showPage == "rent" ? "forRent" : showPage
  //   );
  // };
  // useEffect(() => {
  //   handleSearchClick(
  //     category || "",
  //     subcatvalue && subcatvalue,
  //     area || "",
  //     bedrooms || "",
  //     bathrooms || "",
  //     price || "",
  //     showPage
  //   );
  // }, [MyURL.get("subCategory"), MyURL.get("bedRooms"), MyURL.get("bathRooms"), category, showPage]);

  const bathRoomsData = [
    { key: "All", value: "All" },
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: "5andAbove", value: "5 or above" }
  ];

  return (
    <>
      {/* {console.log('subCategory', MyURL.entries())} */}
      <div className="px-12 py-4 bg-white lg:z-50 w-full border-b-2 border-grey">
        <div className="w-full xl:w-1/5 mb-4 mt-7 flex flex-col justify-center items-center mx-auto gap-2">
          <h1 className="font-bold text-primary tracking-wider text-2xl xl:text-2xl text-center" style={{ color: 'black' }}>
            Advanced Search
          </h1>
          <h1 className="font-semibold text-primary tracking-wider text-lg xl:text-xl text-center">
            Find Your Dream Property!
          </h1>
        </div>
        {/* Rsidential & Commercial Section Start */}
        <div className="flex justify-center">
          <div className=" w-[90%] justify-center flex-align-center mb-2">
            <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center p-1 flex-wrap md:flex-row gap-2">
              {/* <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleCheckboxChange}
              /> */}
              {/* <button
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
              </button> */}
              <button
                onClick={() => {
                  setSelectedData("residential");
                  const temp = Object.fromEntries([...searchParams]);
                  temp.purpose = slug;
                  temp.category = 'residential';
                  searchParams.set('category', 'residential');
                  getPropertyData(temp);
                  // navigate(`/property/${slug}?category=residential`);
                }}
                //   justify-center 
                className={`rounded font-lg px-6 py-2 ${selectedData == "residential"
                  ? "text-white bg-primary button-style-inset"
                  : "text-slate-400 button-style-outset"
                  }`}
              >
                Residential
              </button>

              <button
                onClick={() => {
                  setSelectedData("commercial");
                  const temp = Object.fromEntries([...searchParams]);
                  temp.purpose = slug;
                  temp.category = 'commercial';
                  searchParams.set('category', 'commercial');
                  getPropertyData(temp);
                  // navigate(`/property/${slug}?category=commercial`);
                }}
                className={`rounded font-lg px-6 py-2 ${selectedData == "commercial"
                  ? "text-white bg-primary button-style-inset"
                  : "text-slate-400 button-style-outset"
                  }`}
              >
                Commercial
              </button>
            </label>
          </div>
        </div>
        {/* Residential & Commercial Section Ends */}
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
                onChange={(e) => {
                  setsubcatvalue(e.target.value);
                  searchParams.set('subCategory', e.target.value);
                  setSearchParams(searchParams);
                }}
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
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <PriceAreaRangeField
            typePrice={false}
            minPrice={minAreaSelected}
            maxPrice={maxAreaSelected}
            minPriceFn={setMinAreaSelected}
            maxPriceFn={setMaxAreaSelected}
            setValueFn={setArea}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
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
                onChange={(e) => {
                  setBathrooms(e.target.value);
                  searchParams.set('bathRooms', e.target.value);
                  setSearchParams(searchParams);
                }}
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
                onChange={(e) => {
                  setBedrooms(e.target.value);
                  searchParams.set('bedRooms', e.target.value);
                  setSearchParams(searchParams);
                }}
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
            onClick={() => {
              const temp = Object.fromEntries([...searchParams]);
              temp.purpose = slug;
              getPropertyData(temp);
              // handleSearchClick(
              //   category || "all",
              //   subcatvalue != "" && subcatvalue,
              //   area || "",
              //   bedrooms || "",
              //   bathrooms || "",
              //   price || "",
              //   showPage
              // )
            }}
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
