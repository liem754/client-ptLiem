import { memo } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const notactive =
  "px-5 py-3 bg-white hover:bg-gray-300 rounded-md cursor-pointer ";
const active =
  "px-5 py-3 bg-[#E13427] text-white hover:bg-gray-300 rounded-md cursor-pointer ";
function Page({ text, icon, curenPage, setCurenPage, type }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [paramsSeach] = useSearchParams();
  let entries = paramsSeach.entries();
  const append = (entries) => {
    let params = [];
    paramsSeach.append("page", +text);
    for (let entry of entries) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (
        Object.keys(searchParamsObject)?.some(
          (item) => item === i[0] && item !== "page"
        )
      ) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    return searchParamsObject;
  };
  const handle = () => {
    if (!(text === "...")) {
      setCurenPage(+text);
      navigate({
        pathname: location?.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };

  return (
    <div
      className={
        +text === +curenPage
          ? `${active} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
          : `${notactive} ${text === "..." ? "cursor-text" : "cursor-pointer"}`
      }
      onClick={handle}
    >
      {icon || text}
    </div>
  );
}

export default memo(Page);
