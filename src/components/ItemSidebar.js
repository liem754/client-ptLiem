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

function ItemSidebar({ text, title, isdouble, type }) {
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
    <div className="w-full rounded-md py-5 px-5 bg-white">
      <h2 className="font-medium text-lg mb-3">{title}</h2>
      {!isdouble &&
        text &&
        text.map((item) => (
          <Link
            to={`${formatVietnameseToString(item.value)}`}
            key={item.code}
            className="flex pl-2 my-2 gap-1 items-center"
          >
            <AiOutlineRight size={14} />
            <h2 className="cursor-pointer hover:text-[red]">{item.value}</h2>
          </Link>
        ))}
      {isdouble &&
        formatContent(text).map((item, index) => (
          <div key={index} className="">
            <div className="w-full flex items-center gap-2 justify-around">
              <div
                onClick={() => handleFilterPosts(item.left.code)}
                className="flex text-sm flex-1 gap-1 mb-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
              >
                <AiOutlineRight size={14} color="#333" />
                <p className="w-full">{item.left.value}</p>
              </div>
              <div
                className="flex text-sm flex-1 gap-1 mb-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                onClick={() => handleFilterPosts(item.right.code)}
              >
                <AiOutlineRight size={14} color="#333" />
                <p>{item.right.value}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default memo(ItemSidebar);
