import { Page } from "../../components";
import { useSelector } from "react-redux";
import Icons from "../../ultils/icons";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
const { AiOutlineRight } = Icons;
function Pagination({ number }) {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [curenPage, setCurenPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== curenPage && setCurenPage(+page);
    !page && setCurenPage(1);
  }, [searchParams]);
  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
    let end = curenPage + 2 > maxPage ? maxPage : curenPage + 2;
    let start = curenPage - 2 <= 1 ? 1 : curenPage - 2;
    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setArrPage(temp);
    curenPage >= maxPage - 2 ? setIsHideEnd(true) : setIsHideEnd(false);
    curenPage <= 3 ? setIsHideStart(true) : setIsHideStart(false);
    // 3 => 1 2 3 (1 ... 2 3)
  }, [count, posts, curenPage]);
  return (
    <div className="flex justify-center items-center">
      {!isHideStart && <Page setCurenPage={setCurenPage} text={1} />}
      {!isHideStart && curenPage !== 4 && <Page text={"..."} />}
      {arrPage.map((item) => {
        return (
          <Page
            key={item}
            text={item}
            curenPage={curenPage}
            setCurenPage={setCurenPage}
          />
        );
      })}
      {!isHideEnd && <Page text="..." />}
      {!isHideEnd && (
        <Page
          icon={<AiOutlineRight />}
          curenPage={curenPage}
          setCurenPage={setCurenPage}
          text={Math.floor(count / posts.length)}
        />
      )}
    </div>
  );
}

export default Pagination;
