import { memo, useEffect, useState } from "react";
import Icons from "../ultils/icons";
import { apiPost } from "../services/post";
import { useNavigate, Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/common/format";
import { path } from "../ultils/constant";

const { BsHeart, AiFillStar, AiFillHeart, BsFillBookmarkStarFill } = Icons;
function Item({
  key,
  address,
  attributes,
  description,
  images,
  star,
  title,
  user,
  id,
}) {
  const title1 = title.replaceAll("/", "");

  const [color, setColor] = useState(false);
  return (
    <div className="w-full border-b-2 border-orange-500 p-2">
      <div className="w-full flex gap-3 mb-3">
        <Link
          to={`/chi-tiet/${formatVietnameseToString(title)}/${id}`}
          className="w-[30%] cursor-pointer hidden lg:flex  gap-[2px] relative  lg:flex-wrap"
          replace={true}
        >
          {Array.from(images)?.map((item, index) => {
            if (index <= 3) {
              return (
                <img
                  key={index}
                  className="w-[49%] h-[100px] object-cover"
                  src={item}
                  alt=""
                />
              );
            }
          })}

          {images.length === 0 && (
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          )}
          <div className="absolute px-3 text-sm py-[1px] rounded-md bg-black bottom-2 left-2 text-[white]">
            {images.length} ảnh
          </div>
          <div
            className="w-[20px] absolute bottom-[8px] right-[10px]"
            onMouseEnter={() => setColor(true)}
            onMouseLeave={() => setColor(false)}
          >
            {color ? (
              <AiFillHeart color="red" size={22} />
            ) : (
              <BsHeart size={20} color="white" />
            )}
          </div>
        </Link>
        <Link
          to={`/chi-tiet/${formatVietnameseToString(title)}/${id}`}
          className="w-[30%] h-auto cursor-pointer lg:hidden flex  gap-[2px] relative flex-wrap"
          replace={true}
        >
          {Array.from(images)?.map((item, index) => {
            if (index <= 0) {
              return (
                <img
                  key={index}
                  className="w-[100%] h-[110px] object-cover"
                  src={item}
                  alt=""
                />
              );
            }
          })}

          {images.length === 0 && (
            <img
              src="data:image/png;base64,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"
              alt=""
            />
          )}
          <div className="absolute px-3 text-sm py-[1px] rounded-md bg-black bottom-2 left-2 text-[white]">
            {images.length} ảnh
          </div>
          <div
            className="w-[20px] absolute bottom-[8px] right-[10px]"
            onMouseEnter={() => setColor(true)}
            onMouseLeave={() => setColor(false)}
          >
            {color ? (
              <AiFillHeart color="red" size={22} />
            ) : (
              <BsHeart size={20} color="white" />
            )}
          </div>
        </Link>
        <div className="w-[70%]">
          <div className="flex gap-1">
            <Link
              to={`/chi-tiet/${formatVietnameseToString(title)}/${id}`}
              className=" w-full inline-flex cursor-pointer text-[red] hover:underline "
              replace={true}
            >
              <span className="overflow-hidden text-ellipsis line-clamp-2">
                {title}
              </span>
            </Link>
            {/* <Link
              to={`/chi-tiet/${formatVietnameseToString(title)}/${id}`}
              className=" w-full hidden lg:inline-block cursor-pointer text-[red] hover:underline "
              replace={true}
            >
              {star === 5 ? (
                <span className="inline-flex">
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                </span>
              ) : star === 4 ? (
                <span className="inline-flex">
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                </span>
              ) : star === 3 ? (
                <span className="inline-flex">
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                </span>
              ) : star === 2 ? (
                <span className="inline-flex">
                  <AiFillStar color="orange" />
                  <AiFillStar color="orange" />
                </span>
              ) : (
                <span className="inline-flex">
                  <AiFillStar color="orange" />
                </span>
              )}

              {title}
            </Link> */}
            <div className="mt-[2px]">
              <BsFillBookmarkStarFill size={20} color="orange" />
            </div>
          </div>
          <div className="md:flex my-2 text-sm justify-between w-full gap-2">
            <div className="flex gap-2">
              <h2 className="text-[#61d9ac]">{attributes.price}</h2>
              <span>{attributes.acreage}</span>
              <a className=" hidden md:block">{`${
                address[address.length - 2]
              },${address[address.length - 1]}`}</a>
            </div>
            <span>{attributes.published}</span>
          </div>
          <div className="hidden lg:flex">
            <span className=" text-sm w-full overflow-hidden text-ellipsis line-clamp-3 ">
              {description}
            </span>
          </div>
          <div className="lg:flex mt-3 hidden">
            <div className="flex gap-2 items-center text-sm">
              <img
                src={images[2]}
                className="w-[25px] h-[25px] rounded-[50%]"
                alt=""
              />
              <span>{user.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Item);
