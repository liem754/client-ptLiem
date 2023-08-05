import { memo } from "react";
function SearchItem({ text, IcAfter, IcBefore, fontWeight, defaulttext }) {
  return (
    <button
      className={` text-[12px] flex items-center justify-between w-full bg-white p-2 rounded-md`}
    >
      <div className="flex text-[#525252] items-center justify-start w-full ">
        {IcBefore && <IcBefore />}
        <span
          className={`w-full text-left text-[12px] ml-3 ${
            fontWeight && "font-medium text-black"
          }`}
        >
          {text || defaulttext}
        </span>
      </div>
      <div className="text-xl">{IcAfter && <IcAfter />}</div>
    </button>
  );
}

export default memo(SearchItem);
