const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROPERTY":
      return {
        ...state,
        form: {
          ...state.form,
          propertyDetails: action?.payload?.propertyDetails,
          typesAndPurpose: action?.payload?.typesAndPurpose,
          rentalDetails: action?.payload?.rentDetails,
          contactDetails: action?.payload?.contactDetails,
          locationAndAddress: action?.payload?.locationAndAddress,
          ownerId: action?.payload?.ownerId
        }
      };
    case "ADD_AMENITIES":
      return {
        ...state,
        form: {
          ...state.form,
          amenities: action.payload
        },
      }
    case "UPDATE_AMENITIES":
      return {
        ...state,
        updateProperty: {
          ...state.updateProperty,
          amenities: action.payload
        },
      };
    case "ADD_MEDIA":
      return {
        ...state,
        form: {
          ...state.form,
          upload: {
            images: action.payload.images,
            videos: action.payload.videos,
          },
        },
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_API_PROPERTIES":
      return {
        ...state,
        isLoading: false,
        featuredProperties: action.payload,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "SET_PROPERTY_DETAILS":
      return {
        ...state,
        isLoading: false,
        propertyDetails: action.payload,
      };
    case "EMPTY_FORM":
      return {
        ...state,
        form: {
          typesAndPurpose: null,
          locationAndAddress: null,
          propertyDetails: null,
          rentalDetails: null,
          contactDetails: null,
          amenities: [],
          upload: {
            images: [],
            videos: [],
          },
        },
      };
    case "EMPTY_UPDATE_FORM":
      return {
        ...state,
        updateProperty: null
      };
    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "SET_PROPERTY_DETAILS":
      return {
        ...state,
        isLoading: false,
        propertyDetails: action.payload,
      };
    case "GET_FILTER_DATA":
      return {
        ...state,
        propertydataArr: action.payload,
      };
    case "GET_BUY_DATA":
      return {
        ...state,
        propertydataArr: action.payload,
      };

    case "GET_USER_PROPERTY":
      return {
        ...state,
        userProperty: action.payload,
      }
    case "GET_COMMERCIAL_PROPERTY":
      return {
        ...state,
        propertydataArr: action.payload,
      };
    case "AUTHORIZE_USER":
      return { ...state, isAuthorize: action.payload };
      case "UPDATE_PROPERTY":
        return {
          ...state, updateProperty: {
            ...state.updateProperty,
            propertyDetails: action?.payload?.propertyDetails,
            typesAndPurpose: action?.payload?.typesAndPurpose,
            rentalDetails: action?.payload?.rentDetails,
            contactDetails: action?.payload?.contactDetails,
            locationAndAddress: action?.payload?.locationAndAddress,
            ownerId: action?.payload?.ownerId
          }
        };
    case "SET_UPDATE_PROPERTY":
      return {
        ...state, updateProperty: {
          ...state.updateProperty,
          propertyDetails: action?.payload?.propertyDetails,
          typesAndPurpose: action?.payload?.typesAndPurpose,
          rentalDetails: action?.payload?.rentDetails,
          contactDetails: action?.payload?.contactDetails,
          locationAndAddress: action?.payload?.locationAndAddress,
          ownerId: action?.payload?.ownerId,
          _id: action?.payload?._id,
          upload: {
            images: action.payload.images,
            videos: action.payload.videos,
          },
          amenities: action.payload.amenities
        }
      };
    case "UPDATE_PROPERTY_MEDIA":
      return {
        ...state,
        updateProperty: {
          ...state.updateProperty,
          upload: {
            images: action.payload.images,
            videos: action.payload.videos,
          },
        },
      };
    case "UPDATE_TOGGLE":
      return { ...state, updatePropertyToggle: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, open: !state.open };
    default:
      return state;
  }
};

export default reducer;
