import { BiChevronDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { openDropdown } from "../../features/uiSlice";

const SingleLink = ({ id, linkText, url, subLinks }) => {
  const dispatch = useDispatch();
  const handleDropDown = (e) => {
    const linkCords = e.target.getBoundingClientRect();
    const center = (linkCords.left + linkCords.right) / 2;
    dispatch(openDropdown({ link: linkText, center }));
  };
  return (
    <div className="relative">
      <NavLink
        to={url}
        end
        key={id}
        className="relative w-full px-3 font-semibold py-[0.6rem] flex-align-center gap-x-1 link"
        onMouseOver={handleDropDown}
        style={{ paddingTop: '20px', paddingBottom: '20px' }}
      >
        {linkText}
        {subLinks && <BiChevronDown className="link" />}
      </NavLink>
    </div>
  );
};

export default SingleLink;
