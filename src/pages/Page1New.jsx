import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
    useMap,
} from "react-leaflet";
import DashboardHeading from "../components/Dashboard/DashboardHeading";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { calcLength } from "framer-motion";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import Geocode from "react-geocode";
import { usePlacesWidget } from "react-google-autocomplete";

import { Store } from "../context/store";
import ProgressButton from "../components/Dashboard/progressButton";
import Label from "../components/Dashboard/Label";
import Input from "../components/Dashboard/Input";
import SelectOption from "../components/Dashboard/selectOption";
import LocationMarker from "../components/common/Marker";
import { propertyDetails } from '../app/slices/PopertySlice';
import {useSelector, useDispatch} from 'react-redux'

import "leaflet/dist/leaflet.css";
// make new leaflet element
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
} from "react-geocode";
const Search = (props) => {
    const map = useMap(); // access to leaflet map
    const { provider } = props;

    // const form = document.querySelector('form');
    // const input = form.querySelector('input[type="text"]');

    useEffect(() => {
        const searchControl = new GeoSearchControl({
            provider,
        });

        map.addControl(searchControl); // this is how you add a control in vanilla leaflet
        map.on("geosearch/showlocation", (value) => {
            props?.setFormData((state) => ({
                ...state,
                location: value?.location?.label,
            }));
            props?.setFormData((state) => ({
                ...state,
                latitude: value?.location?.y,
            }));
            props?.setFormData((state) => ({
                ...state,
                longitude: value?.location?.x,
            }));
            props?.setPosition({ lat: value?.location?.y, lng: value?.location?.x });
        });
        return () => map.removeControl(searchControl);
    }, [props]);

    return null; // don't want anything to show up from this comp
};
// =================================  =================================

const Page1New = () => {
    const { state, dispatch } = useContext(Store);
    const [stepcount, setStepcount] = useState(1);

    // const [selectedValue, setSelectedValue] = useState("option1");
    const [catvalue, setCatvalue] = useState("");
    const [subcatvalue, setsubCatvalue] = useState("option1");
    const [purpvalue, setpurpvalue] = useState("option1");
    // const [completionvalue, setcompletionvalue] = useState("option1");
    // const [rentfreqvalue, setrentfreqnvalue] = useState("option1");
    // const [paidbyvalue, setpaidbyvalue] = useState("option1");
    // const [ownvalue, setownvalue] = useState("option1");
    // ===============  Values to be changed =====================
    const [catOptions, setcatOptions] = useState([]);
    const [subcatOptions, setsubcatOptions] = useState([]);
    const [purpOptions, setpurpOptions] = useState([]);
    const [completionOptions, setcompletionOptions] = useState([]);
    const [rentfreqOptions, setrentfreqOptions] = useState([]);
    const [paidbyOptions, setpaidbyOptions] = useState([]);
    const [ownOptions, setownOptions] = useState([]);
    const NavigateTo = useNavigate();
    const [position, setPosition] = useState({
        lat: 24.43214670001102,
        lng: 54.407007002975796,
    });
    const reduxDispatch = useDispatch();

    const [formData, setFormData] = useState({
        referncenumber: "",
        title: "",
        arabicTitle: "",
        desc: "",
        descArabic: "",
        area: 0,
        permitNo: 0,
        rentAED: 0,
        contractperiod: 0,
        maintfee: 0,
        vacatingperiod: 0,
        price: 1000,
        bedRooms: 0,
        bathRooms: 0,
        //  ================ New Values =============

        category: "",
        subCategory: "",
        purpose: "",
        completion: "",
        rentFrequency: "",
        paidby: "",
        ownValue: "",
        //  ================ Lcoation ===========
        location: "",
        longitude: "",
        latitude: "",
        address: "",
        name: "",
    });

    const { ref, autocompleteRef } = usePlacesWidget({
        apiKey: "AIzaSyBmlfCX9N5NAKdGidMbSxMXkc4CNHcT6rQ",
        onPlaceSelected: (place) => {
            setKey("AIzaSyBmlfCX9N5NAKdGidMbSxMXkc4CNHcT6rQ");
            setLanguage("en");
            setRegion("ae");
            console.log("now_wheat", place?.formatted_address);
            setFormData((state) => ({
                ...state,
                location: place?.formatted_address,
            }));
            fromPlaceId(place?.place_id)
                .then(({ results }) => {
                    const { lat, lng } = results[0].geometry.location;
                    setPosition({ lat: lat, lng: lng });
                })
                .catch(console.error);
        },
        options: {
            types: ["(regions)"],
            componentRestrictions: { country: "ae" },
        },
    });

    useEffect(() => {
        console.log('ytuyrurt', state?.updateProperty?.rentDetails)
        if (state?.updatePropertyToggle) {
            setFormData({
                // propertyDetailsObj
                referncenumber: state?.updateProperty?.propertyDetails?.refNo,
                title: state?.updateProperty?.propertyDetails?.title,
                arabicTitle: state?.updateProperty?.propertyDetails?.titleArabic,
                desc: state?.updateProperty?.propertyDetails?.description,
                descArabic: state?.updateProperty?.propertyDetails?.descriptionArabic,
                area: state?.updateProperty?.propertyDetails?.areaSquare,
                price: state?.updateProperty?.propertyDetails?.InclusivePrice,
                permitNo: state?.updateProperty?.propertyDetails?.PermitNumber,
                completion: state?.updateProperty?.propertyDetails?.completionStatus,
                ownValue: state?.updateProperty?.propertyDetails?.ownerShipStatus,
                bedRooms: 0,
                bathRooms: 0,
                // typesAndPurposeObj
                category: state?.updateProperty?.typesAndPurpose?.category,
                subCategory: state?.updateProperty?.typesAndPurpose?.subCategory,
                purpose: state?.updateProperty?.typesAndPurpose?.purpose,
                // rentalDetails
                rentAED: state?.updateProperty?.rentDetails?.rent,
                rentFrequency: state?.updateProperty?.rentDetails?.rentFrequency,
                contractperiod: state?.updateProperty?.rentDetails?.minimumContractPeriod,
                vacatingperiod: state?.updateProperty?.rentDetails?.noticePeriod,
                maintfee: state?.updateProperty?.rentDetails?.state?.updateProperty?.rentDetails?.maintainanceFee,
                paidby: state?.updateProperty?.rentDetails?.paidBy,
                //  ================ New Values =============
                location: state?.updateProperty?.locationAndAddress?.location,
                longitude: state?.updateProperty?.locationAndAddress?.longitude,
                latitude: state?.updateProperty?.locationAndAddress?.latitude,
                address: state?.updateProperty?.locationAndAddress?.address,
            });
        } else {
            setFormData({
                // propertyDetailsObj
                referncenumber: state?.form?.propertyDetails?.refNo,
                title: state?.form?.propertyDetails?.title,
                arabicTitle: state?.form?.propertyDetails?.titleArabic,
                desc: state?.form?.propertyDetails?.description,
                descArabic: state?.form?.propertyDetails?.descriptionArabic,
                area: state?.form?.propertyDetails?.areaSquare,
                price: state?.form?.propertyDetails?.InclusivePrice,
                permitNo: state?.form?.propertyDetails?.PermitNumber,
                completion: state?.form?.propertyDetails?.completionStatus,
                ownValue: state?.form?.propertyDetails?.ownerShipStatus,
                bedRooms: 0,
                bathRooms: 0,
                // typesAndPurposeObj
                category: state?.form?.typesAndPurpose?.category,
                subCategory: state?.form?.typesAndPurpose?.subCategory,
                purpose: state?.form?.typesAndPurpose?.purpose,
                // rentalDetails
                rentAED: state?.form?.rentalDetails?.rent,
                rentFrequency: state?.form?.rentalDetails?.rentFrequency,
                contractperiod: state?.form?.rentalDetails?.minimumContractPeriod,
                vacatingperiod: state?.form?.rentalDetails?.noticePeriod,
                maintfee:
                    state?.form?.rentalDetails?.state?.form?.rentalDetails
                        ?.maintainanceFee,
                paidby: state?.form?.rentalDetails?.paidBy,
                //  ================ New Values =============
                location: state?.form?.locationAndAddress?.location,
                longitude: state?.form?.locationAndAddress?.longitude,
                latitude: state?.form?.locationAndAddress?.latitude,
                address: state?.form?.locationAndAddress?.address,
            });
        }
    }, []);

    useEffect(() => {
        fetchName();

        axios
            .get(`${process.env.REACT_APP_SERVERURL}/lov/category`)
            .then((res) => setcatOptions(res.data.data));
        axios
            .get(`${process.env.REACT_APP_SERVERURL}/lov/purpose`)
            .then((res) => setpurpOptions(res.data.data));
        axios
            .get(`${process.env.REACT_APP_SERVERURL}/lov/completion-status`)
            .then((res) => setcompletionOptions(res.data.data));
        axios
            .get(`${process.env.REACT_APP_SERVERURL}/lov/ownership-status`)
            .then((res) => setownOptions(res.data.data));
        axios
            .get(`${process.env.REACT_APP_SERVERURL}/lov/rent-frequency`)
            .then((res) => setrentfreqOptions(res.data.data));
        axios
            .get(`${process.env.REACT_APP_SERVERURL}/lov/paid-by`)
            .then((res) => setpaidbyOptions(res.data.data));
    }, []);
    useEffect(() => {
        if (formData?.category) {
            axios
                .get(
                    `${process.env.REACT_APP_SERVERURL}/lov/sub-category/${formData?.category}`
                )
                .then((res) => setsubcatOptions(res.data.data));
        }
    }, [formData?.category]);

    const nextPage = () => {
        const data = JSON.parse(localStorage.getItem("userData"));

        const fieldErrors = {};

        if (!formData.referncenumber) {
            fieldErrors.referncenumber = "reference number is required";
        }
        if (!formData.title) {
            fieldErrors.title = "Title is required";
        }
        // if (!formData.arabicTitle) {
        //   return fieldErrors.arabicTitle = "Arabic title is required";
        // }
        if (!formData.desc) {
            fieldErrors.desc = "Descrption is required";
        }
        // if (!formData.descArabic) {
        //   return fieldErrors.descArabic = "Arabic desc is required";
        // }
        if (!formData.area) {
            fieldErrors.area = "Area is needed";
        }
        if (!formData.permitNo) {
            fieldErrors.permitNo = "permit no. is required";
        }
        if (!formData.address) {
            fieldErrors.address = "Address is imp";
        }

        // if (!formData.referncenumber) {
        //   return fieldErrors.referncenumber = "Reference number is imp";
        // }
        // if (!formData.price) {
        //   fieldErrors.price = "Price needed";
        // }
        // if (!formData.location) {
        //   fieldErrors.price = "Location needed";
        // }
        // if (!catvalue) {
        //   fieldErrors.catvalue = "category is imp";
        // }
        // if (!subcatvalue) {
        //   fieldErrors.subcatvalue = "sub category is imp";
        // }
        // if (!purpvalue) {
        //   fieldErrors.purpvalue = "purpose is imp";
        // }
        // if (!ownvalue) {
        //   fieldErrors.ownvalue = "Ownership status needed";
        // }
        // if (!formData.rentAED) {
        //   fieldErrors.rentAED = "Rent AED needed";
        // }
        // if (!rentfreqvalue) {
        //   fieldErrors.rentfreqvalue = "Rent frequency needed";
        // }
        // if (!formData.contractperiod) {
        //   fieldErrors.contractperiod = "Contract period needed";
        // }

        // if (!formData.vacatingperiod) {
        //   fieldErrors.vacatingperiod = "Vacating period needed";
        // }

        // if (!formData.maintfee) {
        //   fieldErrors.maintfee = "Maintenance fee is required";
        // }
        // if (!paidbyvalue) {
        //   fieldErrors.paidbyvalue = "Paid by Value required";
        // }
        console.log('opopiiuuh', fieldErrors)
        if (Object.keys(fieldErrors)?.length > 0) {
            // There are errors, so you can handle them and display error messages
            const errorKeys = Object.keys(fieldErrors);
            // Scroll to the top of the page when the toast is closed
            // Scroll to the top of the page when the toast is closed
            window.scroll({
                top: 0,
                behavior: "auto", // You can use 'auto' for instant scrolling
            }); // You can use 'auto' for instant scrolling

            toast.error(errorKeys.join(", "), {
                position: toast.POSITION.BOTTOM_CENTER,
            });
        } else {
            let propertyDetailsObj = {
                refNo: formData?.referncenumber,
                title: formData?.title,
                titleArabic: formData?.arabicTitle,
                description: formData?.desc,
                descriptionArabic: formData?.descArabic,
                areaSquare: formData?.area,
                InclusivePrice: formData?.price,
                PermitNumber: formData?.permitNo,
                completionStatus: formData?.completion,
                ownerShipStatus: formData?.ownValue,
                bedRooms: formData?.bedRooms,
                bathRooms: formData?.bathRooms,
                // occupancyStatus,
                // financingAvailable,
                // financingInstittionsName
            };
            const typesAndPurposeObj = {
                category: formData?.category,
                subCategory: formData?.subCategory,
                purpose: formData?.purpose,
            };
            const rentalDetails = {
                rent: formData?.rentAED,
                rentFrequency: formData?.rentFrequency,
                minimumContractPeriod: formData?.contractperiod,
                noticePeriod: formData?.vacatingperiod,
                maintainanceFee: formData?.maintfee,
                paidBy: formData?.paidby,
            };
            const contactDetails = {
                ListingOwner: data?.name,
                contactPerson: data?.name,
                email: data?.email,
                phone: data?.phoneNumber,
            };
            //   let propertyDetailsObj = {
            //     refNo: formData?.referncenumber,
            //     title: formData?.title,
            //     titleArabic: formData?.arabicTitle,
            //     description: formData?.desc,
            //     descriptionArabic: formData?.descArabic,
            //     areaSquare: formData?.area,
            //     InclusivePrice: formData?.price,
            //     PermitNumber: formData?.permitno,
            // occupancyStatus,
            // completionStatus: completionvalue,
            // ownerShipStatus: ownvalue,
            // bedRooms,
            // bathRooms,
            // financingAvailable,
            // financingInstittionsName
            // }
            // const typesAndPurposeObj = {
            //   category: catvalue,
            //   subCategory: subcatvalue,
            //   purpose: purpvalue,

            // }

            const locationAndAddress = {
                location: formData?.location,
                longitude: position?.lng,
                latitude: position?.lat,
                address: formData?.address,
            };
            // const rentalDetails = {
            //   rent: formData?.rentAED,
            //   rentFrequency: rentfreqvalue,
            //   minimumContractPeriod: formData?.contractperiod,
            //   noticePeriod: formData?.vacatingperiod,
            //   maintainanceFee: formData?.maintfee,
            //   paidBy: paidbyvalue,
            // }
            // const contactDetails = {
            //   ListingOwner: data?.name,
            //   contactPerson: data?.name,
            //   email: data?.email,
            //   phone: data?.phoneNumber,
            // }
            if (state?.updatePropertyToggle) {
                // dispatch({
                //     type: "UPDATE_PROPERTY",
                //     payload: {
                //         propertyDetails: propertyDetailsObj,
                //         typesAndPurpose: typesAndPurposeObj,
                //         rentDetails: rentalDetails,
                //         contactDetails: contactDetails,
                //         locationAndAddress: locationAndAddress,
                //         ownerId: data?._id,
                //     }
                // });
            } else {
                reduxDispatch(propertyDetails({
                    propertyDetails: propertyDetailsObj,
                    typesAndPurpose: typesAndPurposeObj,
                    rentDetails: rentalDetails,
                    contactDetails: contactDetails,
                    locationAndAddress: locationAndAddress,
                    ownerId: data?._id,
                }))
                // dispatch({
                //     type: "ADD_PROPERTY",
                //     payload: {
                //         propertyDetails: propertyDetailsObj,
                //         typesAndPurpose: typesAndPurposeObj,
                //         rentDetails: rentalDetails,
                //         contactDetails: contactDetails,
                //         locationAndAddress: locationAndAddress,
                //         ownerId: data?._id,
                //     },
                // });
            }

            setStepcount(stepcount + 1);
            NavigateTo("/dashboard");
        }
    };

    const [error, setError] = useState({
        referncenumber: "", // Initialize the error state with empty strings for each field
        // Add more fields as needed
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("handleChange", name, value);
        if (value.length <= 150) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleDescChange = (e) => {
        const { name, value } = e.target;

        if (value.length <= 1000) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!value.trim()) {
            setError((prevError) => ({
                ...prevError,
                [name]: "This field is required",
            }));
        } else {
            setError((prevError) => ({
                ...prevError,
                [name]: "",
            }));
        }
    };

    const clearError = (e) => {
        const { name } = e.target;
        setError((prevError) => ({
            ...prevError,
            [name]: "",
        }));
    };

    const autoGenerate = () => {
        const hash = Math.random().toString(36).substring(2, 12);
        setFormData((prevData) => ({
            ...prevData,
            referncenumber: hash,
        }));
    };

    const fetchName = async () => {
        const email = localStorage.getItem("userData");
        const data = await JSON.parse(email);
        setFormData((prevData) => ({
            ...prevData,
            name: data?.email
        }));
    };

    return (
        <Layout>
            <div className="h-screen overflow-x-hidden">
                <div className="mx-10">
                    <section className="block rounded-[15px] bg-white px-6 pt-4 pb-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] justify-center items-center mt-20">
                        <ProgressButton step={1} />
                    </section>
                    <section className="mt-12">
                        <span className="rounded text-white text-lg bg-yellow-500 py-2 px-4">Property Type</span>
                        <div className="flex flex-col lg:flex-row gap-11 mt-4">
                            <SelectOption
                                _options={catOptions}
                                _selectedValue={formData.category}
                                _onSelectChange={handleChange}
                                purpvalue={formData?.purpose}
                                label="Category"
                                name="category"
                                type={"category"}
                            />

                            <SelectOption
                                _options={subcatOptions}
                                _selectedValue={formData?.subCategory}
                                _onSelectChange={handleChange}
                                purpvalue={formData?.purpose}
                                label="Sub Category"
                                name="subCategory"
                                type={"subCategory"}
                            />

                            <SelectOption
                                _options={purpOptions}
                                _selectedValue={formData.purpose}
                                _onSelectChange={handleChange}
                                purpvalue={formData?.purpose}
                                label="Purpose"
                                name="purpose"
                                type={"purpose"}
                            />
                        </div>
                    </section>
                    {/* Location And Address */}

                    <section className="mt-8">
                        <span className="rounded text-white text-lg bg-yellow-500 py-2 px-4">Location and Address</span>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex flex-col lg:flex-row gap-x-2">

                                <Input
                                    _name="location"
                                    _placeholder="Location"
                                    ref={ref}
                                    _onchange={handleChange}
                                    _value={formData.location}
                                />

                                <Input
                                    _type="text"
                                    _onchange={handleChange}
                                    _value={formData.address}
                                    _name="address"
                                    _placeholder="Address"
                                />
                            </div>
                            {/* <hr className="text-black" /> */}
                            <div className="lg:h-[300px] mt-4">
                                <MapContainer
                                    zoom={8}
                                    doubleClickZoom={true}
                                    scrollWheelZoom={true}
                                    center={{ lat: 24.43214670001102, lng: 54.407007002975796 }}
                                >
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <LocationMarker
                                        position={position}
                                        setPosition={setPosition}
                                        setFormData={setFormData}
                                    />
                                </MapContainer>
                            </div>
                        </div>
                    </section>

                    {/* Prperty Details */}
                    <section className="mt-8">
                        <span className="rounded text-white text-lg bg-yellow-500 py-2 px-4">Property Details</span>

                        <div className="grid lg:grid-cols-3 gap-10 mt-4">
                            <div className="flex flex-col gap-2">
                                <button onClick={autoGenerate} className="text-[16px] ">
                                    Auto Generate
                                </button>
                                <Input
                                    _name="referncenumber"
                                    _type="text"
                                    _value={formData.referncenumber}
                                    _onchange={handleChange}
                                    _onblur={handleBlur}
                                    _onclick={clearError}
                                    _errortext={error.referncenumber}
                                    _placeholder="Reference Number"
                                />
                            </div>
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Area (Square Feet)" />
                                <Input
                                    _name="area"
                                    _type="number"
                                    _value={formData.area}
                                    _onchange={handleChange}
                                    _onblur={handleBlur}
                                    _onclick={clearError}
                                />
                                <div className="text-sm text-gray-500">
                                    {(formData.area * 0.092903).toFixed(3)} Square Meters /{" "}
                                    {(formData.area / 9).toFixed(3)} Square Yards
                                </div>
                            </div>
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Inclusive Price" />
                                <Input
                                    _name="price"
                                    _type="number"
                                    _value={formData.price}
                                    _onchange={handleChange}
                                    _onblur={handleBlur}
                                    _onclick={clearError}
                                />
                            </div>
                        </div>
                        {/* <hr className="text-black mx-20 my-3" /> */}
                        <div className="grid lg:grid-cols-2 gap-16 mt-4">
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Title" />
                                <Input
                                    _name="title"
                                    _type="text"
                                    _value={formData.title}
                                    _onchange={handleChange}
                                    _onblur={handleBlur}
                                    _onclick={clearError}
                                    _errortext={error.title}
                                />
                                <div className="text-sm text-gray-500">
                                    {formData?.title?.length}/150 characters
                                </div>
                            </div>
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Title(Arabic)" />
                                <Input
                                    _name="arabicTitle"
                                    _type="text"
                                    _value={formData.arabicTitle}
                                    _onchange={handleChange}
                                    _onblur={handleBlur}
                                    _onclick={clearError}
                                />
                                <div className="text-sm text-gray-500">
                                    {formData?.arabicTitle?.length}/150 characters
                                </div>
                            </div>
                        </div>
                        {/* <hr className="text-black mx-20 my-3" /> */}
                        <div className="grid lg:grid-cols-2 gap-10 mt-4">
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Description" />
                                <textarea
                                    rows="4"
                                    cols="20"
                                    name="desc"
                                    value={formData.desc}
                                    onChange={handleDescChange}
                                    onBlur={handleBlur}
                                    onClick={clearError}
                                    className={` ${error.desc && "border-red-700"
                                        } border-2 border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  placeholder-slate-40 rounded-lg  resize-both hover:border-green-600 overflow-auto`}
                                />
                                <div className="text-sm text-gray-500">
                                    {formData?.desc?.length}/1000 characters
                                </div>
                                <div className="text-red-800">{error.desc}</div>
                            </div>
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Description (Arabic)" />
                                <textarea
                                    rows="4"
                                    cols="20"
                                    name="descArabic"
                                    value={formData.descArabic}
                                    onChange={handleDescChange}
                                    onBlur={handleBlur}
                                    onClick={clearError}
                                    className={`${error.descArabic && "border-red-700"
                                        } border-2 border-grey shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-lg placeholder-slate-400 resize-both hover:border-green-600 overflow-auto`}
                                />
                                <div className="text-sm text-gray-500">
                                    {formData?.descArabic?.length}/1000 characters
                                </div>
                                <div className="text-red-800">{error.descArabic}</div>
                            </div>
                        </div>
                        {/* <hr className="text-black mx-20 my-3" />     */}

                        <div className="grid lg:grid-cols-3 gap-5">
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Permit Number" />
                                <Input
                                    _name="permitNo"
                                    _type="number"
                                    _value={formData.permitNo}
                                    _onchange={handleChange}
                                    _onblur={handleBlur}
                                    _onclick={clearError}
                                />
                            </div>
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Ownership Status" />
                                <SelectOption
                                    _options={ownOptions}
                                    _selectedValue={formData?.ownValue}
                                    _onSelectChange={handleChange}
                                    name="ownValue"
                                // purpvalue={purpvalue}
                                />
                            </div>
                        </div>
                    </section>
                    {/* For Rent Section */}
                    {/* formData?.purpose == "forRent" */}
                    {true && (
                        <section className="mt-8 pb-8">
                            <span className="rounded text-white text-lg bg-yellow-500 py-2 px-4">Rental Details</span>
                            <div className="grid lg:grid-cols-3 gap-5 mt-4">
                                <div className="flex flex-col gap-[5px] mb-2">
                                    <Label text="Rent(AED)" />
                                    <Input
                                        _name="rentAED"
                                        _type="number"
                                        _value={formData.rentAED}
                                        _onchange={handleChange}
                                        _onblur={handleBlur}
                                        _onclick={clearError}
                                    />
                                </div>
                                <div className="flex flex-col gap-[5px] mb-2">
                                    <Label text="Rent Frequency" />
                                    <SelectOption
                                        _options={rentfreqOptions}
                                        _selectedValue={formData?.rentFrequency}
                                        _onSelectChange={handleChange}
                                        name="rentFrequency"
                                    // purpvalue={purpvalue}
                                    />
                                </div>
                                <div className="flex flex-col gap-[5px] mb-2">
                                    <Label text="Minimum Contract Period (Months)" />
                                    <Input
                                        _name="contractperiod"
                                        _type="number"
                                        _value={formData.contractperiod}
                                        _onchange={handleChange}
                                        _onblur={handleBlur}
                                        _onclick={clearError}
                                    />
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-3 gap-5 mt-4">
                                <div className="flex flex-col gap-[5px] mb-2">
                                    <Label text="Vacating Notice Period (Months)" />
                                    <Input
                                        _name="vacatingperiod"
                                        _type="number"
                                        _value={formData.vacatingperiod}
                                        _onchange={handleChange}
                                        _onblur={handleBlur}
                                        _onclick={clearError}
                                    />
                                </div>
                                <div className="flex flex-col gap-[5px] mb-2">
                                    <Label text="Maintenance Fee (AED)" />
                                    <Input
                                        _name="maintfee"
                                        _type="number"
                                        _value={formData.maintfee}
                                        _onchange={handleChange}
                                        _onblur={handleBlur}
                                        _onclick={clearError}
                                    />
                                </div>
                                <div className="flex flex-col gap-[5px] mb-2">
                                    <Label text="Paid By" />
                                    <SelectOption
                                        _options={paidbyOptions}
                                        _selectedValue={formData?.paidby}
                                        _onSelectChange={handleChange}
                                        name="paidby"
                                    // purpvalue={purpvalue}
                                    />
                                </div>
                            </div>
                        </section>
                    )}

                    <button
                        onClick={nextPage}
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        class="font-bold inline-block w-fit float-right rounded bg-primary px-6 pt-2.5 pb-2 text-lg leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    >
                        Next
                    </button>

                    {/* <div className="relative block rounded-[25px] bg-white px-6 pt-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] justify-center items-center mt-20 mx-10">
                        <div className="absolute bg-yellow-500 rounded-[5px] mt-[-36px] ml-[-36px]">
                            <h1 className="text-white mx-5 text-lg">Contact Details</h1>
                        </div>
                        <div className="grid grid-rows-2 gap-5">
                            <div className="flex flex-col gap-[5px] mb-2">
                                <Label text="Listing Owner" />
                                <Input
                                    _name="listingOwner"
                                    _type="text"
                                    _value={formData.name}
                                    _onchange={handleChange}
                                    _onblur={handleBlur}
                                    _onclick={clearError}
                                    _placeholder="Zulfiqar Ali"
                                    _disabled
                                />
                            </div>
                            <div className="">
                                
                                <ToastContainer position="fixed" />
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>
        </Layout>
    );
};

export default Page1New;
