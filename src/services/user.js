import axiosConfig from "../axiosConfig";
export const apigetCurrent = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "api/v1/user/one",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
export const apiUpdateAd = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: "/api/v1/user/update-admin",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
