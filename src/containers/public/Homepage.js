import { useSearchParams } from "react-router-dom";
import { Newpost, Provinces } from "../../components";
import { test } from "../../ultils/constant";

import List from "./List";
import Pagination from "./Pagination";
import { ItemSidebar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { apiPrice } from "../../services/category";

function Homepage() {
  const { prices, areas } = useSelector((state) => state.app);

  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="mt-3">
        <h1 className="text-[28px] font-bold">{test.Home_Title}</h1>
        <span className="text-sm text-black-200">{test.HOME_BODY}</span>
      </div>
      <Provinces />
      <div className="w-full flex justify-between gap-3 mt-12">
        <div className="w-[70%] ">
          <List />
          <div className="mt-5">
            <Pagination />
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-4">
          <ItemSidebar text={categories} title="Danh sách cho thuê" />
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

export default Homepage;
