import axiosDefault from "axios";
export const apiDistrict = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/district/${payload}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
