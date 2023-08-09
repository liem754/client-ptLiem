import { useCallback, useEffect, useRef, useState } from "react";
import logo1 from "../../acsets/logo1.png";
import { Button, User } from "../../components";
import Icons from "../../ultils/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constant";
import { GenIcon } from "react-icons/lib";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import menuManage from "../../ultils/common/menuManage";
import { blobtoBase64 } from "../../ultils/common/filetoBase64";
const { AiOutlinePlusCircle, AiOutlineDown } = Icons;

function Header() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);

  const [searchParams] = useSearchParams();
  const headerRef = useRef();
  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);
  return (
    <div ref={headerRef} className="lg:w-3/5 w-4/5">
      <div className="w-full flex items-center justify-between gap-7 ">
        <Link to="/">
          <img
            src={logo1}
            alt=""
            className="w-[120px] md:w-[140px] lg:w-[200px] h-[74px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-2">
          {!isLoggedIn && (
            <>
              <small className="lg:block hidden">
                Phongtroliem.com xin chào !
              </small>
              <Button
                text={"Đăng nhập"}
                pd={"lg:py-3"}
                textColor="text-white"
                bgColor="bg-[#3061fb]"
                sizefont={"lg:text-[16px] text-sm"}
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                sizefont={"lg:text-[16px] text-sm"}
                bgColor="bg-[#3061fb]"
                pd={"lg:py-3"}
                onClick={() => goLogin(true)}
              />
            </>
          )}
          {isLoggedIn && (
            <div className="relative flex items-center gap-3">
              <Link className="-mr-2 md:mr-0" to="/he-thong/tao-moi-bai-dang">
                <User />
              </Link>

              <Button
                text={"Quản lý thông tin"}
                sizefont={"lg:text-[16px] text-md"}
                pd={"lg:py-3"}
                hiden={"hidden lg:flex"}
                textColor="text-white"
                bgColor="bg-[#009900]"
                IcAfter={AiOutlineDown}
                size={12}
                onClick={() => setShow(!show)}
              />
              {show && (
                <div
                  onBlur={(e) => {
                    e.stopPropagation();
                    setShow(false);
                  }}
                  className="bg-white absolute z-20 top-[100%] left-[46%] shadow-lg px-4 py-3"
                >
                  {menuManage &&
                    menuManage.map((item) => (
                      <Link
                        to={item.path}
                        className="flex items-center gap-2 py-1 cursor-pointer text-md "
                        key={item.id}
                      >
                        <span>{item.icon}</span>
                        <span className="text-[#1266dd] hover:text-[#f73859]">
                          {item.text}
                        </span>
                      </Link>
                    ))}
                </div>
              )}

              <Button
                text={"Đăng xuất"}
                textColor="text-white"
                pd={"lg:py-3"}
                mgt={"mt-2 lg:mt-0"}
                w="w-[40%] md:w-auto"
                sizefont={"md:text-[16px] text-[10px]"}
                bgColor="bg-[#009900]"
                onClick={() => dispatch(actions.logout())}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
