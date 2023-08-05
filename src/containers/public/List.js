import { useEffect, useState } from "react";
import { Button, Item } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getLimitPosts } from "../../store/actions/post";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function List({ categoryCode }) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);
  const [sort, setSort] = useState(0);
  useEffect(() => {
    // let offset = searchParams.get("page");
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }
    let searchParamsObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamsObject)?.some((item) => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]];
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) searchParamsObject.categoryCode = categoryCode;
    if (sort === 1) {
      searchParamsObject.order = ["createdAt", "DESC"];
    }
    dispatch(getLimitPosts(searchParamsObject));
  }, [searchParams, categoryCode, sort]);

  // console.log(posts);
  const time = new Date();
  return (
    <div className="w-full border p-4 bg-white ">
      <div className="flex justify-between">
        <h4 className="text-md">Danh sách tin đăng</h4>
        <span>{`${
          time.getUTCDate() < 10 ? `0${time.getUTCDate()}` : time.getUTCDate()
        } : ${
          time.getMonth() + 1 < 10
            ? `0${time.getMonth() + 1}`
            : time.getMonth() + 1
        } : ${time.getFullYear()}`}</span>
      </div>
      <div className="flex pb-3 border-b items-center gap-2 my-3">
        <span>sắp xếp</span>
        <Button
          onClick={() => setSort(0)}
          pd={"py-1"}
          text={"Mặc định"}
          active={sort === 0 ? "bg-black text-white" : "bg-gray-200"}
        />
        <Button
          onClick={() => setSort(1)}
          pd={"py-1"}
          text={"Mới nhất"}
          active={sort === 1 ? "bg-black text-white" : "bg-gray-200"}
        />
      </div>
      <div>
        {posts?.length > 0 &&
          posts.map((item) => (
            <Item
              key={item?.id}
              address={item?.address.split(",")}
              attributes={item?.attributes}
              description={JSON.parse(item?.description)}
              images={JSON.parse(item?.images?.image)}
              star={+item?.star}
              title={item?.title}
              user={item?.users}
              id={item?.id}
            />
          ))}
      </div>
    </div>
  );
}

export default List;
