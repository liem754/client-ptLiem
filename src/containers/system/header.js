import { Link } from "react-router-dom";

function header() {
  return (
    <div className="flex bg-[#055699] w-full h-[50px] text-white items-center gap-7 ">
      <h2 className="font-bold text-xl px-5">PhongtroLiem.com</h2>
      <div className="flex flex-auto gap-5 ml-14 font-semibold">
        <Link to="/">Trang chủ</Link>
        <Link to="/cho-thue-phong-tro">Phòng trọ</Link>
        <Link to="/nha-cho-thue">Nhà cho thuê</Link>
        <Link to="/cho-thue-mat-bang">Mặt bằng</Link>
        <Link to="/cho-thue-can-ho">Căn hộ</Link>
      </div>
    </div>
  );
}

export default header;
