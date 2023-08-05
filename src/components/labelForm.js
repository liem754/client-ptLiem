import { memo, useEffect, useState } from "react";
import Icons from "../ultils/icons";

const { AiOutlinePlusCircle, AiOutlineDown } = Icons;
function LabelForm({
  dataEdit,
  title,
  payload,
  setInvalifel,
  setPayload,
  no,
  full,
  bg,
  width,
  reset,
  invalifel,
  isEdit,
  h,
  gt,
  name,
  type,
  value1,
  province,
  setValue,

  value,
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <h1 className="text-md font-medium">{title}</h1>
      <div
        className={`flex border border-gray-500 rounded-sm opacity-3
         ${width && width}
         items-center ${
           no && full
             ? `${full} ${h} focus:ring focus:ring-blue-400`
             : "w-[100%]"
         } `}
      >
        {no ? (
          <div className="w-full h-full pointer-events-auto rounded-md active:border-blue-300 focus:outline-none focus:ring focus:ring-blue-400 ">
            {value1 ? (
              <span
                className={`w-full h-full block pl-2  active:border-blue-300  py-[6px]  ${
                  bg && bg
                }`}
              >
                {value1}
              </span>
            ) : (
              <div className="flex flex-col">
                <input
                  onFocus={() => setInvalifel([])}
                  value={payload}
                  onChange={(e) =>
                    setPayload((prev) => ({ ...prev, [name]: e.target.value }))
                  }
                  className={`h-full break-words break-all w-full  py-[5px] pl-2 rounded-md focus:outline-none text-start ${
                    bg && bg
                  } focus:ring focus:ring-blue-400`}
                  type="text"
                />
                {/* {invalifel?.length > 0 &&
                  invalifel.some((i) => i.name === type) && (
                    <small className="text-red-500">
                      {invalifel.find((i) => i.name === type)?.messeger}
                    </small>
                  )} */}
              </div>
            )}
          </div>
        ) : (
          <div className="flex justify-between w-full items-center">
            <select
              onFocus={(e) => {
                e.stopPropagation();
                setInvalifel([]);
              }}
              value={reset ? "" : value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className=" outline-none overflow-hidden border text-sm border-gray-300 px-2 py-[5px] rounded-sm w-full"
              name=""
              id="select-address"
            >
              <option value="">{`--Chọn ${!gt ? title : "Tất cả"}--`}</option>

              {province?.map((item, index) => (
                <option
                  value={
                    type === "province"
                      ? item?.province_id
                      : type === "district"
                      ? item?.district_id
                      : type === "target"
                      ? item?.value
                      : item.code
                  }
                  key={index}
                >
                  {type === "province"
                    ? item?.province_name
                    : type === "district"
                    ? item?.district_name
                    : item?.value}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      {invalifel?.length > 0 && invalifel.some((i) => i.name === type) && (
        <small className="text-red-500">
          {invalifel.find((i) => i.name === type)?.messeger}
        </small>
      )}
    </div>
  );
}

export default memo(LabelForm);
