import { useEffect, useState } from "react";
import { Button, InputForm } from "../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRegister } from "../../services/auth";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import validate from "../../ultils/common/validate";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.flag);
  const [invalifel, setInvalifel] = useState([]);
  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    password: "",
  });
  useEffect(() => {
    setIsRegister(location.state?.flag);
  }, [location.state?.flag]);
  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);
  useEffect(() => {
    msg && Swal.fire("Oops !", msg, "error");
  }, [msg, update]);
  const handle = async () => {
    let finalpayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };

    let invalild = validate(finalpayload, setInvalifel);
    if (invalild === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));

    // {
    // }

    // console.log(response);
  };
  //hàm set input hợp lệ

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-lg mb-2">
        {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <InputForm
            setInvalifel={setInvalifel}
            invalifel={invalifel}
            label={"HỌ TÊN"}
            value={payload.name}
            setValue={setPayload}
            type={"name"}
          />
        )}
        <InputForm
          setInvalifel={setInvalifel}
          invalifel={invalifel}
          label={"SỐ ĐIỆN THOẠI"}
          value={payload.phone}
          setValue={setPayload}
          type={"phone"}
        />
        <InputForm
          setInvalifel={setInvalifel}
          invalifel={invalifel}
          ty="password"
          label={"MẬT KHẨU"}
          value={payload.password}
          setValue={setPayload}
          type={"password"}
        />

        <Button
          textColor="text-white"
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgColor="bg-secondary1"
          fullwidth
          onClick={handle}
        />
      </div>
      <div className="flex items-center justify-between mt-5">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản ?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => {
                setIsRegister(false);
                setPayload({
                  name: "",
                  phone: "",
                  password: "",
                });
              }}
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[orange] cursor-pointer">
              Bạn quên mật khẩu?
            </small>
            <small
              onClick={() => {
                setIsRegister(true);
              }}
              className="text-[blue] hover:text-[orange] cursor-pointer"
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
