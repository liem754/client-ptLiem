import { useDispatch, useSelector } from "react-redux";
import { text } from "../ultils/common/databaseIntro";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/common/format";
import Icons from "../ultils/icons";
import Button from "./Button";
import { memo } from "react";
const { AiFillStar } = Icons;
function Intro() {
  const { categories } = useSelector((state) => state.app);
  return (
    <div className="flex flex-col justify-center text-center bg-white py-7 px-8 mt-4 gap-3">
      <h2 className="text-center text-xl font-medium my-3">{text.title}</h2>
      <span className="text-md">
        {text.description}
        {categories &&
          categories.map((item, index) => (
            <Link
              to={`${formatVietnameseToString(item.value)}`}
              className="text-blue-800 hover:text-orange-400 font-medium"
              key={index}
            >
              {item.value},
            </Link>
          ))}
        {text.description2}
      </span>
      <div className="flex justify-around mt-3">
        {text.statistic.map((item, index) => (
          <div key={index} className="text-sm">
            <h1 className="font-medium text-xl">{item.value}</h1>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-6 text-[#000]">
        <h1 className="text-lg font-medium">{text.price}</h1>
        <div className="flex justify-center text-xl gap-2">
          <AiFillStar color="#ffd453" />
          <AiFillStar color="#ffd453" />
          <AiFillStar color="#ffd453" />
          <AiFillStar color="#ffd453" />
          <AiFillStar color="#ffd453" />
        </div>
        <span className="block italic">{text.comment}</span>
        <span>{text.author}</span>
        <span className="text-xl text-black  font-medium mt-3">
          {text.question}
        </span>
        <span>{text.answer}</span>
      </div>
      <div className="flex justify-center mt-3">
        <Button
          text={"Đăng ký ngay"}
          bgColor={"bg-secondary2"}
          textColor={"text-white"}
        />
      </div>
      <div className="h-[50px]"></div>
    </div>
  );
}

export default memo(Intro);
