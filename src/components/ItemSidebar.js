import { memo } from "react";
import Icons from "../ultils/icons";
import {
  Link,
  useLocation,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import { formatVietnameseToString } from "../ultils/common/format";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/post";
const { AiOutlineRight } = Icons;

function ItemSidebar({ text, title, isdouble, type, no }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const formatContent = () => {
    const oddEl = text?.filter((item, index) => index % 2 !== 0);
    const evenEl = text?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index),
      };
    });

    return formatContent;
  };
  const handleFilterPosts = (code) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: code,
      }).toString(),
    });
  };
  return (
    <div
      className={`w-full rounded-md py-5 ${
        !isdouble ? "px-0 -mt-2 " : "px-5"
      } bg-white`}
    >
      {!no && (
        <h2 className="font-medium text-sm lg:text-[15px] mb-3">{title}</h2>
      )}
      {!isdouble &&
        text &&
        text.map((item) => (
          <Link
            to={`${formatVietnameseToString(item.value)}`}
            key={item.code}
            className="flex pl-2 my-2 gap-1 items-center hover:text-orange-600"
          >
            <AiOutlineRight className="text-[10px] lg:text-[14px]" />
            <h2 className="text-[12px] lg:text-sm">{item.value}</h2>
          </Link>
        ))}
      {isdouble &&
        formatContent(text).map((item, index) => (
          <div key={index} className="">
            <div className="w-full lg:flex items-center gap-2 justify-around">
              <div
                onClick={() => handleFilterPosts(item.left.code)}
                className="flex text-sm flex-1 gap-1 mb-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
              >
                <AiOutlineRight
                  className="text-[10px] lg:text-[14px]"
                  color="#333"
                />
                <p className="text-[12px] lg:text-sm">{item.left.value}</p>
              </div>
              <div
                className="flex text-sm flex-1 gap-1 mb-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                onClick={() => handleFilterPosts(item.right.code)}
              >
                <AiOutlineRight
                  className="text-[10px] lg:text-[14px]"
                  color="#333"
                />
                <p className="text-[12px] lg:text-sm">{item.right.value}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default memo(ItemSidebar);
