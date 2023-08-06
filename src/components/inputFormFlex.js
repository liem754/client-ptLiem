import { memo, useState } from "react";
import logo1 from "../acsets/logo1.png";
import { apiUploadImages } from "../services/post";
import { filetoBase64 } from "../ultils/common/filetoBase64";
function InputFormFlex({
  label,

  type,
  value,
  setValue,
  mk,
  avatar,
  disable,
}) {
  const handle = async (e) => {
    e.stopPropagation();
    let images = await filetoBase64(e.target.files[0]);
    setValue((pre) => ({
      ...pre,
      avatar: images,
    }));
  };
  console.log({
    label,

    type,
    value,
    setValue,
    mk,
    avatar,
    disable,
  });
  return (
    <div className="flex items-center w-full gap-3 justify-center">
      <label htmlFor="phone" className="text-md w-[27%]">
        {label}
      </label>
      {mk ? (
        <a className="text-[blue] flex-1 text-[14px] cursor-pointer">
          Đổi mật khẩu
        </a>
      ) : avatar ? (
        <div className="flex-1 mt-10">
          <img
            className="w-[100px] h-[100px] rounded-[50%]"
            src={
              value ||
              "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
            }
            alt=""
          />
          <label
            className="flex text-[14px] w-[100px] mt-2 px-3 py-[3px] rounded-sm bg-gray-200 items-center justify-center"
            htmlFor="file"
          >
            chọn ảnh
          </label>
          <input onChange={handle} type="file" id="file" hidden />
        </div>
      ) : disable ? (
        <input
          disabled
          value={value}
          // onChange={(e) =>
          // //   setValue((pre) => ({ ...pre, [type]: e.target.value }))
          // }
          className="outline-none bg-gray-300 flex-1 border border-black w-full px-2 py-1 rounded-md"
        />
      ) : (
        <input
          value={value}
          onChange={(e) =>
            setValue((pre) => ({ ...pre, [type]: e.target.value }))
          }
          className="outline-none flex-1 border border-black w-full px-2 py-1 rounded-md"
        />
      )}
    </div>
  );
}

export default memo(InputFormFlex);
