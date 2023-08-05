import axiosConfig from "../axiosConfig";
import axiosDefault from "axios";
export const apiProvinceAll = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: "https://vapi.vnappmob.com/api/province",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
