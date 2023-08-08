import { useSelector } from "react-redux";
import { blobtoBase64 } from "../ultils/common/filetoBase64";

function User({ name, avatar, id, no, phone }) {
  const { userData } = useSelector((state) => state.user);

  return (
    <div
      className={`flex ${
        no && "item-center"
      } items-start gap-2 lg:gap-3 lg:ml-0 ml-3`}
    >
      <img
        className={`lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] rounded-[50%] mt-2 lg:mt-1  ${
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
                <span className="font-medium text-sm lg:text-lg">
                  {userData?.name}
                </span>
              </h3>
              <span className="text-xs lg:text-md">{userData?.phone}</span>
            </div>
          ) : (
            <div className="mt-1">
              <div className="">
                <h3 className="lg:leading-6 text-xs hidden lg:inline  mt-3 lg:mt-0 lg:text-[16px]">
                  Xin chào,
                </h3>
                <span className="font-medium mt-2 lg:mt-0 block lg:inline md:text-[16px] text-xs ">
                  {userData?.name}
                </span>
              </div>
              <div className="">
                <span className="text-xs lg:text-[16px] hidden lg:inline">
                  Mã tài khoản:
                </span>
                <span className="text-xs md:text-[16px] md:mt-[3px] mt-0 flex lg:inline">
                  {userData &&
                    Object.keys.length > 0 &&
                    userData?.id?.replace(/[^0-9]/g, "")?.substring(0, 8)}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
