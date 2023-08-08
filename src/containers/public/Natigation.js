import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/common/format";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

function Natigation() {
  const [show, setShow] = useState(false);
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-screen h-[40px] mb-2 flex justify-center items-center bg-secondary1 ">
      <div
        className="relative md:hidden text-white"
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
      >
        Menu
      </div>

      <div
        // key={item.code}
        className="h-full flex flex-col absolute top-[88%] left-0  w-full"
      >
        {show && (
          <NavLink
            onClick={() => setShow(false)}
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "hover:bg-secondary2 bg-secondary2 h-full text-white px-3 py-2 lg:text-[16px] text-xs flex items-center"
                : "hover:bg-secondary2 bg-secondary1 h-full text-white px-3 py-2 lg:text-[16px] text-xs flex items-center"
            }
          >
            Trang chủ
          </NavLink>
        )}
        {categories?.length > 0 &&
          show &&
          categories.map((item) => (
            <NavLink
              onClick={() => setShow(false)}
              to={`${formatVietnameseToString(item.value)}`}
              className={({ isActive }) =>
                isActive
                  ? "hover:bg-secondary2 bg-secondary2 h-full px-3 py-2 text-white lg:text-[16px] text-xs  flex items-center"
                  : "hover:bg-secondary2 bg-secondary1 h-full px-3 py-2  text-white lg:text-[16px] text-xs flex items-center"
              }
            >
              {item.value}
            </NavLink>
          ))}
      </div>

      <div class=" text-white h-full items-center  w-4/5 lg:w-3/5 hidden md:flex ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "hover:bg-secondary2 bg-secondary2 h-full px-3 py-2 lg:text-[16px] text-xs flex items-center"
              : "hover:bg-secondary2 bg-secondary1 h-full px-3 py-2 lg:text-[16px] text-xs flex items-center"
          }
        >
          Trang chủ
        </NavLink>

        {categories?.length > 0 &&
          categories.map((item) => (
            <div
              key={item.code}
              className="h-full flex items-center justify-center"
            >
              <NavLink
                to={`${formatVietnameseToString(item.value)}`}
                className={({ isActive }) =>
                  isActive
                    ? "hover:bg-secondary2 bg-secondary2 h-full px-3 py-2 lg:text-[16px] text-xs  flex items-center"
                    : "hover:bg-secondary2 bg-secondary1 h-full px-3 py-2  lg:text-[16px] text-xs flex items-center"
                }
              >
                {item.value}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Natigation;
