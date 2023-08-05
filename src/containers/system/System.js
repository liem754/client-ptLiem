import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Header, Sidebar } from ".";
import { useEffect } from "react";
import * as actions from "../../store/actions";

function System() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  useEffect(() => {
    dispatch(actions.getPrice());
    dispatch(actions.getArea());
    dispatch(actions.getCategory());
  }, []);
  if (!isLoggedIn) {
    return <Navigate to={`/${path.LOGIN}`} />;
  }
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="bg-white  w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default System;
