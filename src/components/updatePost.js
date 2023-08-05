import { useSelector } from "react-redux";
import { CreatePost } from "../containers/system";

function UpdatePost({ setIsEdit, isEdit }) {
  return (
    <div
      onClick={() => setIsEdit(false)}
      className="flex justify-center bg-black bg-opacity-70 fixed top-0 left-0 right-0 bottom-0"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsEdit(true);
        }}
        className="w-[70%] h-screen border-b-2 "
      >
        <CreatePost
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          title={"Chỉnh sửa bài đăng"}
        />
      </div>
    </div>
  );
}

export default UpdatePost;
