import { Route, Routes } from "react-router-dom";
import { path } from "./ultils/constant";
import {
  DetailPost,
  Home,
  Homepage,
  Login,
  Rentalapartment,
  SearchDetail,
} from "./containers/public";
import { CreatePost, EditPersonal, Manager, System } from "./containers/system";
import { Contact } from "./components";
import Contacts from "./containers/system/Contact";

function App() {
  return (
    <div className=" w-screen bg-primari mx-auto">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<Homepage />} />

          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rentalapartment />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rentalapartment />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rentalapartment />} />
          <Route path={path.NHA_CHO_THUE} element={<Rentalapartment />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
          <Route path={path.CONTACT} element={<Contacts />} />
          <Route
            path={path.DETAL_POST__TITLE__POSTID}
            element={<DetailPost />}
          />
          {/* <Route path={"chi-tiet/*"} element={<DetailPost />} /> */}
          {/* <Route
            path={`${path.CHO_THUE_CAN_HO}/chi-tiet/*`}
            element={<DetailPost />}
          />
          <Route
            path={`${path.CHO_THUE_MAT_BANG}/chi-tiet/*`}
            element={<DetailPost />}
          />
          <Route
            path={`${path.CHO_THUE_PHONG_TRO}/chi-tiet/*`}
            element={<DetailPost />}
          />
          <Route
            path={`${path.NHA_CHO_THUE}/chi-tiet/*`}
            element={<DetailPost />}
          /> */}
          <Route path={`chi-tiet/*`} element={<DetailPost />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGER_POST} element={<Manager />} />
          <Route path={path.EDIT_PERSONAL} element={<EditPersonal />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
// api: services,axiosConfig.js
//api sẽ đc gọi trong redux thư mục store/action
