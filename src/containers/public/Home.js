import { Outlet } from "react-router-dom";
import Header from "./Header";
import Natigation from "./Natigation";
import Search from "./Search";
import { Contact, Intro } from "../../components";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apigetCurrent } from "../../services/user";

function Home() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPrice());
    dispatch(actions.getArea());
    dispatch(actions.getCategory());
    dispatch(actions.getProvince());
  }, []);

  return (
    <div className="w-full mx-auto my-0 h-sceen bg-primari flex flex-col  items-center">
      <Header />
      <div className="sticky">
        <Natigation />
      </div>
      {isLoggedIn && <Search />}

      <div className="w-4/5 lg:w-3/5 flex flex-col items-center my-3">
        <Outlet />
      </div>
      <div className="w-4/5 lg:w-3/5 mb-3">
        <Intro />
      </div>
      <div className="w-4/5 lg:w-3/5 mb-3">
        <Contact />
      </div>
    </div>
  );
}

export default Home;
