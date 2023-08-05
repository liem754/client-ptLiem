import List from "./List";
import { Newpost, Provinces } from "../../components";

import Pagination from "./Pagination";
import { formatVietnameseToString } from "../../ultils/common/format";
import { ItemSidebar } from "../../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Rentalapartment() {
  const location = useLocation();
  const [categoryCode, setCategoryCode] = useState("");

  const [subheader, setSubheader] = useState({});
  const { prices, areas, categories } = useSelector((state) => state.app);

  useEffect(() => {
    const category = categories.find(
      (item) => `/${formatVietnameseToString(item.value)}` === location.pathname
    );
    setSubheader(category);
    if (category) {
      setCategoryCode(category.code);
    }
  }, [location]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="mt-3">
        <h1 className="text-[28px] font-bold">{subheader?.header}</h1>
        <span className="text-sm text-black-200">{subheader?.subheader}</span>
      </div>
      <Provinces />
      <div className="w-full flex justify-between gap-3 mt-12">
        <div className="w-[70%] ">
          <List categoryCode={categoryCode} />
          <div className="mt-5">
            <Pagination />
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-4">
          <ItemSidebar
            text={prices}
            type="priceCode"
            isdouble
            title="Xem theo giá"
          />
          <ItemSidebar
            type="areaCode"
            text={areas}
            isdouble
            title="Xem theo diện tích"
          />
          <Newpost header={"Tin mới đăng"} />
        </div>
      </div>
    </div>
  );
}

export default Rentalapartment;
