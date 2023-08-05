import { useDispatch, useSelector } from "react-redux";
import { User } from "../../components";
import memuSidebar from "../../ultils/common/menuSidebar";
import { Link, NavLink } from "react-router-dom";
import * as actions from "../../store/actions/auth";
import Icons from "../../ultils/icons";
const { AiOutlineLogout } = Icons;
function Sidebar() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const Active =
    "flex items-center gap-2 cursor-pointer hover:bg-slate-300 p-3 -ml-3 font-medium";
  const Noactive =
    "flex items-center gap-2 cursor-pointer hover:bg-slate-300 p-3 -ml-3";
  return (
    <div className="bg-[#f8f9fa] w-[18%]  p-5 flex flex-col gap-3">
      <User no />
      <div className="mt-2 flex flex-col">
        <span>
          Mã tài khoản:
          <span className="font-medium">{` ${userData.id
            ?.replace(/[^0-9]/g, "")
            ?.substring(0, 8)}`}</span>
        </span>

        <span>TK chính: 0</span>
      </div>
      <div className="flex gap-2 text-sm">
        <button className="bg-[#ffc107] px-2 py-1 rounded-sm">Nạp tiền</button>
        <Link
          to={"/he-thong/tao-moi-bai-dang"}
          className="bg-[#dc3545] text-white px-2 py-1 rounded-sm"
        >
          Đăng tin
        </Link>
      </div>
      <div className="flex flex-col  mt-3">
        {memuSidebar.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={({ isActive }) => (isActive ? Active : Noactive)}
          >
            <span>{item.icon}</span>
            <span>{item.text}</span>
          </NavLink>
        ))}
        <span className={Noactive} onClick={() => dispatch(actions.logout())}>
          <AiOutlineLogout />
          Thoát
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
