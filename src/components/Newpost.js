import { useDispatch, useSelector } from "react-redux";
import ItemNew from "./ItemNew";
import { useEffect } from "react";
import * as actions from "../store/actions/post";
function Newpost({ header, ishuy }) {
  const dispatch = useDispatch();
  const { newPosts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(actions.getNewPost());
  }, []);
  return (
    <div className="w-full bg-white p-3 hidden lg:block">
      <h2 className="font-medium mb-4">{header}</h2>
      <div className="w-full flex flex-col gap-3">
        {newPosts?.length > 0 &&
          newPosts.map((item, index) => {
            return (
              <ItemNew
                key={index}
                id={item?.id}
                images={JSON.parse(item?.images?.image)}
                title={item.title}
                attributes={item.attributes}
                createdAt={item.createdAt}
                ishuy={ishuy}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Newpost;
