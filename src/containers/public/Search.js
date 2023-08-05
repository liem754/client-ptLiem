import { useSelector } from "react-redux";
import { Button, SearchItem } from "../../components";
import Modal from "../../components/Modal";
import Icons from "../../ultils/icons";
import { useCallback, useEffect, useState } from "react";
import { login } from "../../store/actions";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
const {
  AiOutlineSearch,
  MdOutlineMeetingRoom,
  BiShapeSquare,
  GrFormNext,
  MdOutlinePlace,
  MdOutlinePriceChange,
} = Icons;
function Search() {
  const { provinces, categories, prices, areas } = useSelector(
    (state) => state.app
  );
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isModal, setIsmodal] = useState(false);
  const [content, setContent] = useState([]);
  const [defaulttext, setDefaulttext] = useState("");
  const [queries, setQueries] = useState({});
  const [arrMinMax, setArrMinMax] = useState({});
  // const [isTrue1, setIsTrue1] = useState(false);
  // const [isTrue2, setIsTrue2] = useState(false);
  // const [isTrue3, setIsTrue3] = useState(false);
  useEffect(() => {
    if (!location?.pathname.includes(path.SEARCH)) {
      setArrMinMax({});
      setQueries({});
    }
  }, [location]);
  const handle = (content, type, text) => {
    console.log(text);
    setContent(content);
    setName(type);
    setDefaulttext(text);
    setIsmodal(!isModal);
  };
  const handleSubmit = useCallback(
    (e, query, arrMaxMin) => {
      e.stopPropagation();
      setQueries((prev) => ({ ...prev, ...query }));
      setIsmodal(false);
      arrMaxMin && setArrMinMax((prev) => ({ ...prev, ...arrMaxMin }));
    },
    [isModal, queries]
  );
  //lộc
  const handleSearch = () => {
    const queryCodes = Object.entries(queries)
      .filter((item) => item[0].includes("Number") || item[0].includes("Code"))

      .filter((item) => item[1]);
    let queryCodesObj = {};
    queryCodes.forEach((item) => {
      queryCodesObj[item[0]] = item[1];
    });
    const queryText = Object.entries(queries).filter(
      (item) => !item[0].includes("Code") || !item[0].includes("Number")
    );
    let queryTextObj = {};
    queryText.forEach((item) => {
      queryTextObj[item[0]] = item[1];
    });
    let titleSearch = `${
      queryTextObj.category ? queryTextObj.category : "Cho thuê tất cả"
    } ${
      queryTextObj.province
        ? `${
            queryTextObj.province === "Ninh Thuận" ||
            queryTextObj.province === "Bắc Ninh"
              ? "tỉnh"
              : "tp"
          } ${queryTextObj.province}
          `
        : "Toàn quốc"
    } ${queryTextObj.price ? `giá ${queryTextObj.price}` : ""} ${
      queryTextObj.area ? `diện tích ${queryTextObj.area}` : ""
    } `;
    navigate(
      {
        pathname: path.SEARCH,
        search: createSearchParams(queryCodesObj).toString(),
      },
      { state: { titleSearch } }
    );
  };
  console.log(defaulttext);
  return (
    <>
      <div className="w-3/5">
        <div className=" p-[10px] bg-[#febb02] flex-col lg:flex-row rounded-md gap-2 flex justify-between items-center">
          <span
            onClick={() => handle(categories, "category", "Tìm tất cả")}
            className="flex-1 w-full"
          >
            <SearchItem
              fontWeight
              text={queries.category}
              defaulttext="Tìm tất cả"
              IcBefore={MdOutlineMeetingRoom}
            />
          </span>
          <span
            onClick={() => handle(provinces, "province", "Toàn quốc")}
            className="flex-1 w-full"
          >
            <SearchItem
              text={queries.province}
              defaulttext="Toàn quốc"
              IcAfter={GrFormNext}
              IcBefore={MdOutlinePlace}
              color="#fff"
            />
          </span>
          <span
            onClick={() => handle(prices, "price", "Chọn giá")}
            className="flex-1 w-full"
          >
            <SearchItem
              text={queries.price}
              defaulttext="Chọn giá"
              IcBefore={MdOutlinePriceChange}
              IcAfter={GrFormNext}
            />
          </span>
          <span
            onClick={() => handle(areas, "area", "Chọn diện tích")}
            className="flex-1 w-full"
          >
            <SearchItem
              text={queries.area}
              defaulttext="Chọn diện tích"
              IcBefore={BiShapeSquare}
              IcAfter={GrFormNext}
            />
          </span>
          <div className="flex-1 w-full">
            <Button
              onClick={handleSearch}
              text={"Search"}
              bgColor={"bg-secondary1"}
              IcBefore={AiOutlineSearch}
              textColor={"text-white"}
              fullwidth
            />
          </div>
        </div>
      </div>
      {isModal && (
        <Modal
          defaultText={defaulttext}
          queries={queries}
          handleSubmit={handleSubmit}
          content={content}
          setIsmodal={setIsmodal}
          setName={setName}
          name={name}
          arrMinMax={arrMinMax}
        />
      )}
    </>
  );
}

export default Search;
