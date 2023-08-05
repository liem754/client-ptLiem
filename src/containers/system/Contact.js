import { useState } from "react";
import { Button } from "../../components";
import InputForm from "../../components/inputForm";
import Swal from "sweetalert2";
function Contacts() {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });
  const handle = () => {
    Swal.fire("Thank!", "Phản hồi của bạn đã được ghi nhận", "success").then(
      () => {
        setPayload({
          name: "",
          phone: "",
          content: "",
        });
      }
    );
  };
  return (
    <div className="w-full flex flex-col ">
      <span className="flex items-start text-2xl font-medium my-3">
        Liên hệ với chúng tôi
      </span>
      <div className="flex items-center gap-4">
        <div className="flex h-full flex-1 flex-col bg-secondary1 text-white text-md px-6 py-8 rounded-3xl gap-4">
          <span className="font-medium text-lg">Thông tin liên hệ</span>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTro123.Com
          </span>
          <span>Điện thoại: 0917 686 101</span>
          <span>Email: cskh.phongtro123@gmail.com</span>
          <span>Zalo: 0917 686 101</span>
          <span>Viber: 0917 686 101</span>

          <span>
            Địa chỉ: LD-06.04, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ,
            Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
          </span>
        </div>
        <div className="bg-white flex-1 w-[600px] p-[30px]  rounded-md shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Liên hệ trực tuyến</h3>
          <div className="w-full flex flex-col gap-5">
            <InputForm
              value={payload?.name}
              setValue={setPayload}
              label={"HỌ TÊN"}
              type={"name"}
            />

            <InputForm
              value={payload?.phone}
              setValue={setPayload}
              label={"SỐ ĐIỆN THOẠI"}
              type={"phone"}
            />
            <InputForm
              value={payload?.content}
              setValue={setPayload}
              label={"NỘI DUNG"}
              type={"content"}
            />

            <Button
              onClick={handle}
              textColor="text-white"
              text={"Gửi liên hệ"}
              bgColor="bg-secondary1"
              fullwidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
