import React, { useState, useEffect } from "react";
import { ItemSidebar } from "../../components";
import Pagination from "./Pagination";
import List from "./List";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const SearchDetail = () => {
  const { prices, areas } = useSelector((state) => state.app);
  const location = useLocation();

  return (
    <div className="w-full flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">
          {location.state?.titleSearch || "Kết quả tìm kiếm"}
        </h1>
        <p className="text-base text-gray-700">{`${
          location.state?.titleSearch || ""
        } phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</p>
      </div>
      <div className="w-full flex gap-4">
        <div className="md:w-[70%] w-full">
          <List />
          <Pagination />
        </div>
        <div className="w-[30%] hidden md:flex md:flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isdouble={true}
            type="priceCode"
            text={prices}
            title="Xem theo giá"
          />
          <ItemSidebar
            isdouble={true}
            type="areaCode"
            text={areas}
            title="Xem theo diện tích"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchDetail;
