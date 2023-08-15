import { useSearchParams } from "react-router-dom";
import { Newpost, Provinces } from "../../components";
import { test } from "../../ultils/constant";

import List from "./List";
import Pagination from "./Pagination";
import { ItemSidebar } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { apiPrice } from "../../services/category";

function Homepage() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const { prices, areas } = useSelector((state) => state.app);

  const { categories } = useSelector((state) => state.app);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="mt-3">
        <h1 className="text-[28px] font-bold">{test.Home_Title}</h1>
        <span className="text-sm text-black-200">{test.HOME_BODY}</span>
      </div>
      <Provinces />
      <div className="bg-white flex flex-col gap-3 md:hidden mt-10">
        <div className="mt-5 flex flex-col gap-2 ">
          <h1 className="border-2 border-black  text-[12px] text-center font-medium">
            Chọn phương thức lọc
          </h1>
          <div className="flex pr-4 pl-2 justify-between">
            <div
              className={`text-[12px] font-medium hover:text-red-600 cursor-pointer ${
                show1 && "underline underline-offset-4 text-red-600"
              }`}
              onClick={() => {
                setShow1(true);
                setShow2(false);
                setShow3(false);
              }}
            >
              Danh sách cho thuê
            </div>
            <div
              className={`text-[12px] font-medium hover:text-red-600 cursor-pointer ${
                show2 && "underline underline-offset-4 text-red-600"
              }`}
              onClick={() => {
                setShow1(false);
                setShow2(true);
                setShow3(false);
              }}
            >
              Theo diện tích
            </div>
            <div
              onClick={() => {
                setShow1(false);
                setShow2(false);
                setShow3(true);
              }}
              className={`text-[12px] font-medium hover:text-red-600 cursor-pointer ${
                show3 && "underline underline-offset-4 text-red-600"
              }`}
            >
              Theo giá
            </div>
          </div>
        </div>
        <div className={"ml-1"}>
          {show1 && (
            <ItemSidebar
              isdouble
              no
              text={categories}
              title="Danh sách cho thuê"
            />
          )}
          {show2 && (
            <ItemSidebar
              isdouble
              no
              type="areaCode"
              text={areas}
              title="Xem theo diện tích"
            />
          )}
          {show3 && (
            <ItemSidebar
              isdouble
              no
              text={prices}
              type="priceCode"
              title="Xem theo giá"
            />
          )}
        </div>
      </div>
      <div className="w-full mt-2 md:mt-12 flex">
        <div className="md:w-[70%] w-full ">
          <List />
          <div className="mt-5">
            <Pagination />
          </div>
        </div>
        <div className="w-[30%] hidden md:flex md:flex-col gap-4">
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
          <div className="hidden lg:flex">
            <Newpost header={"Tin mới đăng"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
