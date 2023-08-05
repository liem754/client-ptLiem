import { useDispatch, useSelector } from "react-redux";
import { ItemSidebar, Newpost } from "../../components";
import { formatVietnameseToString } from "../../ultils/common/format";
import List from "./List";
import { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Slide, Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Icons from "../../ultils/icons";
import * as actions from "../../store/actions";
import Profile from "../../components/profile";
import Slider from "../../components/Slider";
import { getLimitPosts } from "../../store/actions";
import { apiLimitPost } from "../../services/post";
import Description from "../../components/description";
import { path } from "../../ultils/constant";

const { MdLocationOn, MdOutlinePriceChange, BiSquare } = Icons;
function DetailPost() {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [desi, setDesi] = useState([]);
  // );
  // const [attribute, setAttribute] = useState(
  //   JSON.parse(localStorage.getItem("attributes")) || {}
  // );
  // const [address, setAddress] = useState(localStorage.getItem("address") || "");
  // const [user, setUser] = useState(
  //   JSON.parse(localStorage.getItem("user")) || {}
  // );
  const { posts } = useSelector((state) => state.post);
  const { postId } = useParams();
  const location = useLocation();
  console.log(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );
  // useEffect(() => {
  //   const fetch = async () => {
  //     const response = await apiLimitPost({ id: postId });
  //     setPost(response.data.response?.rows);
  //   };
  //   fetch();
  // }, []);
  // console.log(post);
  // useEffect(() => {
  //   try {
  //     // localStorage.setItem("address", posts.address);

  //     // localStorage.setItem("image", posts[0]?.images?.image);

  //     // localStorage.setItem("attributes", JSON.stringify(posts?.attributes));
  //     // localStorage.setItem("description", posts[0]?.description);

  //     // localStorage.setItem("user", JSON.stringify(posts?.users));
  //     if (posts[0]?.images?.image) {
  //       setImages(JSON.parse(posts[0]?.images?.image));
  //       // setAttribute(JSON.parse(localStorage.getItem("attributes")));
  //       // setAddress(posts.address);
  //       setDesi(JSON.parse(posts[0?.description]));
  //       // setUser(JSON.parse(localStorage.getItem("user")));
  //     } else {
  //       setImages([]);
  //       setDesi("");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [location.pathname]);

  useEffect(() => {
    location.pathname &&
      dispatch(
        actions.getLimitPosts({
          id: location.pathname.split("/")[
            location.pathname.split("/").length - 1
          ],
        })
      );
  }, [location.pathname]);
  console.log(posts);
  const navigate = useNavigate();
  const handle = () => {
    const titleSearch = `Tìm kiếm tin đăng chuyên mục: ${posts[0]?.labelData?.value}`;
    navigate(
      {
        pathname: `/${path.SEARCH}`,
        search: createSearchParams({
          labelCode: posts[0]?.labelData?.code,
        }).toString(),
      },
      { state: { titleSearch } }
    );
  };
  // useEffect(() => {
  //   dispatch(actions.getPrice());
  // }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between gap-3 mt-12">
        <div className="w-[70%] ">
          <div className="bg-black w-full flex justify-center relative mb-2">
            <Slider posts={posts[0]} />
          </div>
          <h1 className=" text-center text-green-600 mt-2 text-lg font-medium">
            {posts[0]?.title}
          </h1>
          <div className="flex items-center gap-2">
            <h2>Chuyên mục:</h2>
            <h2
              onClick={handle}
              className="hover:text-yellow-500 cursor-pointer"
            >
              {posts[0]?.labelData?.value}
            </h2>
          </div>
          <div className="flex items-center gap-1 py-3">
            <MdLocationOn size={"20px"} color="#1266dd" />
            <span className="text-md">{posts[0]?.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <MdOutlinePriceChange size={"20px"} />
              <span className="text-[#16c784] text-xl font-medium">
                {posts[0]?.attributes.price}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BiSquare />
              <span>{posts[0]?.attributes.acreage}</span>
            </div>
          </div>
          <div className="">
            <h2 className="text-xl font-medium mt-3 mb-1">Thông tin mô tả</h2>
            <Description posts={posts[0]} />
          </div>
          <div className="flex flex-col items-start gap-2">
            <h2 className="text-xl font-medium mt-3 mb-1">Thông tin liên hệ</h2>
            <span>{`Liên hệ: ${posts[0]?.users?.name}`}</span>
            <span>{`Điện thoại: ${posts[0]?.users.phone}`}</span>
            <span>{`Zalo: ${posts[0]?.users.phone}`}</span>
          </div>
        </div>
        <div className="w-[30%] flex flex-col gap-4">
          <Profile
            name={posts[0]?.users?.name}
            avatar={posts[0]?.users?.avatar}
            phone={posts[0]?.users?.phone}
          />
          <Newpost header={"Tin nổi bậc"} ishuy />
          <Newpost header={"Tin mới đăng"} />
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
