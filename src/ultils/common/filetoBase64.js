import { Buffer } from "buffer";
export const filetoBase64 = (file) =>
  new Promise((resolve, reject) => {
    const render = new FileReader();
    render.readAsDataURL(file);
    render.onload = () => resolve(render.result);
    render.onerror = (error) => reject(error);
  });
export const blobtoBase64 = (blob) =>
  new Buffer(blob, "base64").toString("binary");
