import { useDispatch, useSelector } from "react-redux";
import { Button, Contact, UpdatePost } from "../../components";
import { useEffect, useState } from "react";
import { login } from "../../store/actions";
import * as actions from "../../store/actions";
import moment from "moment";
import { apiDelete } from "../../services/post";
import Swal from "sweetalert2";
function Manager() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const { postsAd, dataEdit } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const checkStatus = (datetime) => {
    const today = new Date().toDateString();
    // const expireDay = datetime;
    console.log(datetime);
    return moment(datetime, process.env.REACT_APP_FORMAT_DATE).isAfter(today);
  };
  useEffect(() => {
    postsAd && setPosts(postsAd);
  }, [postsAd]);
  useEffect(() => {
    isLoggedIn && dispatch(actions.getLimitPostAdmin());
  }, [isLoggedIn]);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    isEdit === false && dispatch(actions.getLimitPostAdmin());
  }, [isEdit, updateData]);
  console.log(postsAd);
  const handle = async (id) => {
    const response = await apiDelete(id);
    if (response?.data?.err === 0) {
      setUpdateData((pre) => !pre);
    } else {
      Swal.fire("Oops", "Xóa tin đăng thất bại", "error");
    }
  };
  const handleStatus = (statusCode) => {
    if (statusCode === 0) {
      const activePost = postsAd.filter((item) =>
        checkStatus(item?.overviews?.expired.split(" ")[3])
      );
      setPosts(activePost);
    } else if (statusCode === 1) {
      const expirePost = postsAd.filter(
        (item) => !checkStatus(item?.overviews?.expired.split(" ")[3])
      );
      setPosts(expirePost);
    } else {
      setPosts(postsAd);
    }
  };
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-6 px-7 ">
        <div className="flex py-5 items-center justify-between ">
          <h1 className="font-medium text-2xl">Quản lý tin đăng</h1>
          <select
            onChange={(e) => handleStatus(+e.target.value)}
            name=""
            id=""
            className="flex items-center outline-none p-1 border-gray-800 border-2 py-1"
          >
            <option value="2">Lọc theo trạng thái</option>
            <option value="1">Đã hết hạn</option>
            <option value="0">Đang hoạt động</option>
          </select>
        </div>
        <table className=" border-2 mb-[300px]   w-full ">
          <thead className=" border-2 ">
            <tr className=" border-2 ">
              <th className=" border-2 py-1">Mã tin</th>
              <th className=" border-2 py-1">Ảnh đại diện</th>
              <th className=" border-2 py-1">Tiêu đề</th>
              <th className=" border-2 py-1">Giá</th>
              <th className=" border-2 py-1">Ngày bắt đầu</th>
              <th className=" border-2 py-1">Ngày hết hạn</th>
              <th className=" border-2 py-1">Trạng thái</th>
              <th className=" border-2 py-1">Tùy chọn</th>
            </tr>
          </thead>
          <tbody className=" border-2 py-1">
            {posts ? (
              posts.map((item) => (
                <tr className="" key={item.id}>
                  <td className="px-1 text-center border-2 py-1">
                    {item?.overviews?.code}
                  </td>
                  <td className="px-1 text-center border-1 py-1 flex justify-center">
                    <img
                      className="w-10 h-10 border-2 text-center object-cover"
                      src={JSON.parse(item?.images?.image)[0]}
                      alt=""
                    />
                  </td>
                  <td className="px-1 text-center border-2 py-1">
                    {item?.title}
                  </td>
                  <td className="px-1 text-center border-2 py-1">
                    {item.attributes?.price}
                  </td>
                  <td className="px-1 text-center border-2 py-1">
                    {item?.overviews?.created}
                  </td>
                  <td className="px-1 text-center border-2 py-1">
                    {item?.overviews?.expired}
                  </td>
                  <td className="px-1 text-center border-2 py-1">
                    {checkStatus(item?.overviews?.expired.split(" ")[3])
                      ? "Đang hoạt động"
                      : "Đã hết hạn"}
                  </td>
                  <td className="h-full text-center ">
                    <div className="flex items-center justify-around">
                      <Button
                        onClick={() => handle(item.id)}
                        text={"xóa"}
                        pd={"py-1"}
                        mt={"-mt-1"}
                        sizefont={"text-[16px]"}
                        bgColor={"bg-red-400"}
                      />
                      <Button
                        onClick={() => {
                          setIsEdit(true);

                          dispatch(actions.EditData(item));
                        }}
                        pd={"py-1"}
                        text={"sữa"}
                        sizefont={"text-[16px]"}
                        mt={"-mt-[3px]"}
                        bgColor={"bg-green-500"}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <span>no post</span>
            )}
          </tbody>
        </table>

        <Contact />
      </div>

      {isEdit && <UpdatePost setIsEdit={setIsEdit} isEdit={isEdit} />}
    </div>
  );
}

export default Manager;
