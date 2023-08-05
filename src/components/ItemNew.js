import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../ultils/common/format";
import Icons from "../ultils/icons";
import moment from "moment";
import "moment/locale/vi";
const { BsFillBookmarkStarFill } = Icons;
function ItemNew({ images, title, attributes, id, ishuy, createdAt }) {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };

  return (
    <div className="flex pb-2 border-b-2 items-center">
      <Link
        to={`/chi-tiet/${formatVietnameseToString(title)}/${id}`}
        className="w-[30%]"
      >
        <img
          className="w-full h-[65px] rounded-sm cursor-pointer"
          src={images[0]}
          alt=""
        />
      </Link>
      <div className="w-[70%] pl-2">
        {ishuy ? (
          <div className="flex">
            <h2 className="font-medium text-sm mb-2">
              {title.slice(0, 39) + "..."}
            </h2>
            <BsFillBookmarkStarFill />
          </div>
        ) : (
          <h2 className="font-medium text-sm mb-2">
            {title.slice(0, 39) + "..."}
          </h2>
        )}
        <div className="flex justify-between items-center">
          <span className="text-sm text-green-600">{attributes.price}</span>
          <span className="text-[12px]">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}

export default ItemNew;
