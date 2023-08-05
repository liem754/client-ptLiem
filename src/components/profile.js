import Button from "./Button";
import Icons from "../ultils/icons";
const { FiPhone, BsHeart, AiOutlineMessage } = Icons;
function Profile({ avatar, name, phone }) {
  return (
    <div className="bg-yellow-500">
      <div className="flex flex-col gap-2 p-3 w-full items-center">
        <img
          className="rounded-[50%] w-[50%]"
          src={
            avatar ||
            "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
          }
          alt=""
        />
        <h2>{name}</h2>
        <Button
          IcBefore={FiPhone}
          text={phone}
          fullwidth
          textColor={"text-white"}
          bgColor={"bg-green-400"}
        />
        <a href={`https://zalo.me/${phone}`} target="_blank" className="w-full">
          <Button
            IcBefore={AiOutlineMessage}
            text={"Nhắn Zalo"}
            fullwidth
            textColor={"text-black"}
            bgColor={"bg-white"}
          />
        </a>
        <Button
          IcBefore={BsHeart}
          mb={"-mb-1"}
          text={"Yêu thích"}
          fullwidth
          textColor={"text-black"}
          bgColor={"bg-white"}
        />
      </div>
    </div>
  );
}

export default Profile;
