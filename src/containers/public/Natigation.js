import { NavLink } from "react-router-dom";
import { formatVietnameseToString } from "../../ultils/common/format";
import { useDispatch, useSelector } from "react-redux";

function Natigation() {
  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-screen h-[40px] mb-2 flex justify-center items-center bg-secondary1">
      <div class=" text-white h-full items-center  w-3/5 flex ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "hover:bg-secondary2 bg-secondary2 h-full px-3 py-2 inline-block flex items-center"
              : "hover:bg-secondary2 bg-secondary1 h-full px-3 py-2 inline-block flex items-center"
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
                    ? "hover:bg-secondary2 bg-secondary2 h-full px-3 py-2 inline-block flex items-center"
                    : "hover:bg-secondary2 bg-secondary1 h-full px-3 py-2 inline-block flex items-center"
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
