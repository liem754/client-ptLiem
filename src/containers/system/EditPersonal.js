import { useDispatch, useSelector } from "react-redux";
import { Button, Contact, InputForm } from "../../components";
import InputFormFlex from "../../components/inputFormFlex";
import { useState } from "react";
import { apiUpdateAd } from "../../services/user";
import Swal from "sweetalert2";
import * as actions from "../../store/actions";
import { blobtoBase64 } from "../../ultils/common/filetoBase64";

function EditPersonal() {
  const dispatch = useDispatch();
  const [avatars, setAvatars] = useState("");
  const { userData } = useSelector((state) => state.user);
  const [payload, setPayload] = useState({
    userId: userData?.id,
    name: userData?.name,
    zalo: userData?.zalo || "",
    fbUrl: userData?.fbUrl,
    avatar: JSON.parse(blobtoBase64(userData.avatar)) || "",
  });

  const handleUpdate = async () => {
    const response = await apiUpdateAd(payload);
    if (response?.data?.err === 0) {
      Swal.fire("ok", "Cập nhật thông tin thành công", "success").then(() => {
        dispatch(actions.getCurrent());
      });
    } else {
      Swal.fire("Oops!", "Chỉnh sửa thông tin không thành công", "error");
    }
  };
  console.log(userData);
  return (
    <div className="w-full p-5 ">
      <h1 className="text-2xl font-medium mb-11 text-left">
        Cập nhật thông tin cá nhân
      </h1>
      <div className="w-full flex flex-col items-center mb-[200px]">
        <div className="flex flex-col gap-11 w-[70%] ">
          <div className="w-full flex flex-col gap-3 items-center ">
            <InputFormFlex
              disable
              value={` ${userData.id?.replace(/[^0-9]/g, "")?.substring(0, 8)}`}
              label={"Mã thành viên"}
            />
            <InputFormFlex
              disable
              value={userData.phone}
              label={"Số điện thoại"}
            />
            <div className="w-full ">
              <a className="text-[blue] block justify-start flex-1 text-[14px] ml-[28%] cursor-pointer">
                Đổi số điện thoại
              </a>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3 items-center justify-center">
            <InputFormFlex
              value={payload.name}
              setValue={setPayload}
              type={"name"}
              label={"Tên hiển thị"}
            />

            <InputFormFlex
              value={payload.zalo}
              setValue={setPayload}
              type={"zalo"}
              label={"Số zalo"}
            />
            <InputFormFlex
              label={"Facebook"}
              value={payload.fbUrl}
              setValue={setPayload}
              type={"fbUrl"}
            />
          </div>
          <div className="w-full flex flex-col gap-3 items-center ">
            <InputFormFlex mk label={"Mật khẩu"} />
            <InputFormFlex
              avatar
              setValue={setPayload}
              value={payload?.avatar}
              label={"Ảnh đại diện"}
            />
          </div>
          <Button
            onClick={handleUpdate}
            text={"Lưu cập nhật"}
            bgColor={"bg-secondary1"}
            textColor={"text-white"}
            fullwidth
          />
        </div>
      </div>
      <Contact />
    </div>
  );
}

export default EditPersonal;
