import { useSelector } from "react-redux";
import { blobtoBase64 } from "../ultils/common/filetoBase64";

function User({ name, avatar, id, no, phone }) {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className={`flex ${no && "item-center"} items-start gap-2 `}>
      <img
        className={`w-[50px] h-[50px] rounded-[50%]  ${
          no && "w-[60px] h-[60px] mt-1 mr-1"
        } `}
        src={
          userData?.avatar
            ? JSON.parse(blobtoBase64(userData.avatar))
            : "https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg"
        }
        alt=""
      />
      {userData && Object.keys(userData).length > 0 && (
        <div className="flex flex-col text-black leading-5">
          {no ? (
            <div className="mt-1">
              <h3 className="leading-6">
                <span className="font-medium text-lg">{userData?.name}</span>
              </h3>
              <span className="text-lg">{userData?.phone}</span>
            </div>
          ) : (
            <>
              <h3 className="leading-6">
                Xin chào, <span className="font-medium">{userData?.name}</span>
              </h3>
              <span>{`Mã tài khoản: ${
                userData &&
                Object.keys.length > 0 &&
                userData?.id?.replace(/[^0-9]/g, "")?.substring(0, 8)
              }`}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
