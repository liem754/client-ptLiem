import { useCallback, useEffect, useRef, useState } from "react";
import { Button, LabelForm, Loading } from "../../components";
import Modal2 from "../../components/Modal2";
import * as actions from "../../store/actions/app";
import { useDispatch, useSelector } from "react-redux";
import { apiProvinceAll } from "../../services/provinceAll";
import { apiDistrict } from "../../services/District";
import {
  apiCreateNewPost,
  apiUpdate,
  apiUploadImages,
} from "../../services/post";
import { getNumbersArea } from "../../ultils/common/getNumber";
import { getCodes, getCodesArea } from "../../ultils/common/getCode";
import Swal from "sweetalert2";
import validate from "../../ultils/common/validate";
import { BsCheckLg } from "react-icons/bs";
function CreatePost({ title, isEdit, setIsEdit }) {
  const { dataEdit } = useSelector((state) => state.post);

  const [payload, setPayload] = useState(() => {
    const intit = {
      categoryCode: dataEdit?.categoryCode || "",
      title: isEdit ? dataEdit?.title : "",
      priceNumber: isEdit ? dataEdit?.priceNumber * 1000000 : 0,
      areaNumber: isEdit ? dataEdit?.areaNumber : 0,
      images: isEdit ? JSON.parse(dataEdit?.images?.image) : "",
      address: dataEdit?.address || "",
      priceCode: dataEdit?.priceCode || "",
      areaCode: dataEdit?.areaCode || "",
      label: "",
      description: isEdit ? JSON.parse(dataEdit?.description).join("\n") : "",
      target: dataEdit?.overviews?.target || "",
      // province: dataEdit || "",
    };
    return intit;
  });

  const { userData } = useSelector((state) => state.user);
  const [province, setProvince] = useState([]);
  const [district, setDitrit] = useState([]);
  const [provin, setProvin] = useState("");
  const [district1, setDitrit1] = useState("");

  // console.log(
  //   province.find((item) => item.province_name === "Tỉnh Phú Yên")?.province_id
  // );
  const [reset, setReset] = useState(false);

  const [categoryCodes, setCategoryCodes] = useState("");
  const [target, setTarget] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { areas, prices, categories, provinces } = useSelector(
    (state) => state.app
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setProvin(dataEdit?.provinceCode);
      setCategoryCodes(dataEdit?.categoryCode);
      setTarget(dataEdit?.overviews?.target);

      SetImagesPreview(JSON.parse(dataEdit?.images?.image));
    } else {
      SetImagesPreview([]);
    }
  }, [isEdit]);
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);
  useEffect(() => {
    const fetch = async () => {
      const response = await apiProvinceAll();
      setProvince(response.data.results);
    };
    fetch();
  }, []);

  useEffect(() => {
    const addressProvin = dataEdit?.address?.split(",");
    const check =
      isEdit &&
      province.length > 0 &&
      province?.find(
        (item) =>
          item.province_name ===
          addressProvin[addressProvin?.length - 1]?.trim()
      );

    setProvin(check?.province_id);
  }, [province, isEdit]);
  useEffect(() => {
    const addressD = dataEdit?.address?.split(",");
    const check1 =
      isEdit &&
      district.length > 0 &&
      district?.find(
        (item) => item.district_name === addressD[addressD.length - 2]?.trim()
      );

    setDitrit1(check1?.district_id);
  }, [district, isEdit]);
  useEffect(() => {
    setDitrit1("");
    const fetch = async () => {
      const response = await apiDistrict(provin);
      setDitrit(response?.data?.results);
    };
    provin && fetch();
    !provin ? setReset(true) : setReset(false);
    !provin && setDitrit([]);
  }, [provin]);

  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const handle = (type) => {
    setType(type);
    setShow(!show);
  };

  const [imagesPreview, SetImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invalifel, setInvalifel] = useState([]);
  const handleFiles = async (e) => {
    e.stopPropagation();
    setLoading(true);
    let images = [];
    let files = e.target.files;
    let formData = new FormData();
    for (let i of files) {
      formData.append("file", i);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ACSET_NAME);
      let response = await apiUploadImages(formData);
      if (response.status === 200) {
        images = [...images, response.data?.secure_url];
      }
    }
    setLoading(false);
    SetImagesPreview((pre) => [...pre, ...images]);
    setPayload((prev) => ({ ...prev, images: [...images] }));
  };
  const handleDeleteImage = (image) => {
    SetImagesPreview((pre) => pre.filter((item) => item !== image));
    setPayload((pre) => ({
      ...pre,
      images: pre?.images?.filter((item) => item !== image),
    }));
  };
  useEffect(() => {
    if (categoryCodes) {
      setPayload((pre) => ({
        ...pre,
        categoryCode: categoryCodes,
      }));
    }
  }, [categoryCodes]);
  const handleSubmit = async () => {
    let priceCodeArr = getCodes(
      +payload?.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );

    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload?.areaNumber, areas, 0, 90);

    let areaCode = areaCodeArr[0]?.code;

    let finalPayload = {
      ...payload,
      address: `${
        district1
          ? `${
              district?.find((item) => item.district_id === district1)
                ?.district_name
            },`
          : ""
      } ${
        provin
          ? province?.find((item) => item.province_id === provin)?.province_name
          : ""
      }`,
      province: `${
        provin
          ? province?.find((item) => item.province_id === provin)?.province_name
          : ""
      }`,

      target: target || "",
      areaCode: areaCode,
      priceCode: priceCode,
      userId: userData?.id,
      priceNumber:
        payload?.priceNumber && +payload?.priceNumber / Math.pow(10, 6),
      // target: payload?.target ? payload?.target : "Tất cả",
      // province: provinces.find(item=>item.) payload?.address.split(",")[1],
      district: district1
        ? `${
            district?.find((item) => item.district_id === district1)
              ?.district_name
          },`
        : "",
      category:
        payload?.categoryCode &&
        categories.find((item) => item.code === payload?.categoryCode).value,
      label: `${
        payload?.categoryCode &&
        categories.find((item) => item.code === payload?.categoryCode).value
      } ${payload?.address.split(",")[0]}`,
      labelov: `${
        payload?.categoryCode &&
        categories.find((item) => item.code === payload?.categoryCode).value
      } ${payload?.address.split(",")[1]}`,
    };
    console.log(invalifel.length);
    let invalue = validate(finalPayload, setInvalifel);

    if (invalue === 0) {
      if (dataEdit) {
        finalPayload.postId = dataEdit?.id;
        finalPayload.attributesId = dataEdit?.attributesId;
        finalPayload.imageId = dataEdit?.imagesId;
        finalPayload.overviewId = dataEdit?.overviewId;
        const response = await apiUpdate(finalPayload);
        if (response?.data.err === 0) {
          Swal.fire("Thành công", "Đã chỉnh sửa bài đăng mới", "success").then(
            () => {
              setPayload({
                categoryCode: "",
                title: "",
                priceNumber: 0,
                areaNumber: 0,
                images: "",
                address: "",
                priceCode: "",
                areaCode: "",
                label: "",
                description: "",
                target: "",
                province: "",
              });
              SetImagesPreview([]);
              setCategoryCodes("");
              setDitrit1("");
              setProvin("");
              setIsEdit(false);
            }
          );
        } else {
          Swal.fire("Oops !", "Có lỗi!", "error");
        }
      }
    }
  };
  const handleSubmit1 = async () => {
    let priceCodeArr = getCodes(
      +payload?.priceNumber / Math.pow(10, 6),
      prices,
      1,
      15
    );

    let priceCode = priceCodeArr[0]?.code;
    let areaCodeArr = getCodesArea(+payload?.areaNumber, areas, 0, 90);

    let areaCode = areaCodeArr[0]?.code;

    let finalPayload = {
      ...payload,
      address: `${
        district1
          ? `${
              district?.find((item) => item.district_id === district1)
                ?.district_name
            },`
          : ""
      } ${
        provin
          ? province?.find((item) => item.province_id === provin)?.province_name
          : ""
      }`,
      province: `${
        provin
          ? province?.find((item) => item.province_id === provin)?.province_name
          : ""
      }`,

      target: target || "",
      areaCode: areaCode,
      priceCode: priceCode,
      userId: userData?.id,
      priceNumber:
        payload?.priceNumber && +payload?.priceNumber / Math.pow(10, 6),
      // target: payload?.target ? payload?.target : "Tất cả",
      // province: provinces.find(item=>item.) payload?.address.split(",")[1],
      district: district1
        ? `${
            district?.find((item) => item.district_id === district1)
              ?.district_name
          },`
        : "",
      category:
        payload?.categoryCode &&
        categories.find((item) => item.code === payload?.categoryCode).value,
      label: `${
        payload?.categoryCode &&
        categories.find((item) => item.code === payload?.categoryCode).value
      } ${payload?.address.split(",")[0]}`,
      labelov: `${
        payload?.categoryCode &&
        categories.find((item) => item.code === payload?.categoryCode).value
      } ${payload?.address.split(",")[1]}`,
    };
    console.log(invalifel.length);
    let invalue = validate(finalPayload, setInvalifel);

    if (invalue === 0) {
      const response = await apiCreateNewPost(finalPayload);
      if (response?.data.err === 0) {
        Swal.fire("Thành công", "Đã đăng bài đăng mới", "success").then(() => {
          setPayload({
            categoryCode: "",
            title: "",
            priceNumber: 0,
            areaNumber: 0,
            images: "",
            address: "",
            priceCode: "",
            areaCode: "",
            label: "",
            description: "",
            target: "",
            province: "",
          });
          SetImagesPreview([]);
        });
      } else {
        Swal.fire("Oops !", "Có lỗi!", "error");
      }
    }
    // }
  };

  console.log(invalifel);

  return (
    <div className="flex flex-col bg-white w-full h-full px-8 py-5 gap-6 overflow-auto">
      <h1 className="text-3xl font-medium">{title || "Đăng tin mới"}</h1>
      <div className="flex w-full mt-10">
        <div className=" w-[70%] ">
          <div className="mb-4 flex flex-col mr-6 gap-4">
            <h1 className="text-2xl font-medium">Địa chỉ cho thuê</h1>
            <div className="flex gap-5 justify-between">
              <span
                className="relative w-full"
                onClick={() => handle("tinh/tp")}
              >
                <LabelForm
                  setInvalifel={setInvalifel}
                  invalifel={invalifel}
                  type="province"
                  value={provin}
                  setValue={setProvin}
                  province={province}
                  text={"tỉnh"}
                  title={"Tỉnh/Thành phố"}
                  onBlur={() => setShow(false)}
                />
              </span>
              <span
                className="relative w-full"
                onClick={() => handle("quan/huyen")}
              >
                <LabelForm
                  setInvalifel={setInvalifel}
                  invalifel={invalifel}
                  reset={reset}
                  type={"district"}
                  province={district}
                  text={"tỉnh"}
                  value={district1}
                  setValue={setDitrit1}
                  title={"Quận/Huyện"}
                />
              </span>
            </div>

            <LabelForm
              title={"Địa chỉ chính xác"}
              payload={payload.address}
              name="address"
              setPayload={setPayload}
              no
              h={"h-[38px]"}
              value1={`${
                district1
                  ? `${
                      district?.find((item) => item.district_id === district1)
                        ?.district_name
                    },`
                  : ""
              } ${
                provin
                  ? province?.find((item) => item.province_id === provin)
                      ?.province_name
                  : ""
              }`}
              right={{ district1, province }}
              full={"w-full"}
              bg={"bg-gray-300"}
            />
          </div>
          <div className="mb-4 flex flex-col mr-6 gap-4 mt-12">
            <h1 className="text-2xl font-medium">Thông tin mô tả</h1>

            <LabelForm
              setInvalifel={setInvalifel}
              invalifel={invalifel}
              // onClick={() => handle}
              type="category"
              title={"Loại chuyên mục"}
              width={"w-[40%]"}
              value={categoryCodes}
              province={categories}
              setValue={setCategoryCodes}
            />

            <LabelForm
              setInvalifel={setInvalifel}
              invalifel={invalifel}
              title={"Tiêu đề"}
              no
              full={"w-full"}
              type={"title"}
              name="title"
              payload={payload.title}
              setPayload={setPayload}
            />
            <div className="flex flex-col gap-1">
              <span className="relative w-full">Nội dung mô tả</span>
              <textarea
                onFocus={() => setInvalifel([])}
                type="description"
                value={payload.description}
                onChange={(e) =>
                  setPayload((pre) => ({
                    ...pre,
                    description: e.target.value,
                  }))
                }
                name="text"
                className="px-3 py-2 focus:ring outline outline-1 focus:outline-none focus:ring-blue-400"
                rows="14"
                cols="10"
                wrap="soft"
              />
              {invalifel?.length > 0 &&
                invalifel.some((i) => i.name === "description") && (
                  <small className="text-red-500">
                    {invalifel.find((i) => i.name === "description")?.messeger}
                  </small>
                )}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Thông tin liên hệ</label>
              <button className=" text-left border-2 outline-none border-black-400 w-[50%] px-3 py-2 bg-slate-300 rounded-md cursor-text focus:border-2 focus-within:border-blue-400">
                {userData.name}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="">Điện thoại</label>
              <button className=" text-left border-2 outline-none border-black-400 w-[50%] px-3 py-2 bg-slate-300 rounded-md cursor-text focus:border-2 focus-within:border-blue-400">
                {userData.phone}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span>Giá cho thuê</span>
              <div className="flex flex-col">
                <div className="flex item-center w-[50%] justify-between border-2 ">
                  <input
                    onFocus={() => setInvalifel([])}
                    value={payload.priceNumber}
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        priceNumber: e.target.value,
                      }))
                    }
                    type="text"
                    className="flex-1 px-2 border-y-2 border-l-2 focus:ring focus:outline-none overflow-x-visible focus:ring-blue-400 "
                  />
                  <button className="p-2 ml-[3px] border-none outline-none bg-slate-200">
                    đồng
                  </button>
                </div>
                {invalifel?.length > 0 &&
                  invalifel.some((i) => i.name === "priceNumber") && (
                    <small className="text-red-500">
                      {
                        invalifel.find((i) => i.name === "priceNumber")
                          ?.messeger
                      }
                    </small>
                  )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span>Diện tích</span>
              <div className="flex flex-col">
                <div className="flex item-center w-[50%] justify-between border-2 ">
                  <input
                    onFocus={() => setInvalifel([])}
                    value={payload.areaNumber}
                    onChange={(e) =>
                      setPayload((pre) => ({
                        ...pre,
                        areaNumber: e.target.value,
                      }))
                    }
                    type="number"
                    className="flex-1 px-2 border-y-2 border-l-2 focus:ring focus:outline-none overflow-x-visible focus:ring-blue-400 "
                  />
                  <button className="p-2 px-3 ml-[3px] border-none outline-none bg-slate-200">
                    m<sup>2</sup>
                  </button>
                </div>
                {invalifel?.length > 0 &&
                  invalifel.some((i) => i.name === "areaNumber") && (
                    <small className="text-red-500">
                      {invalifel.find((i) => i.name === "areaNumber")?.messeger}
                    </small>
                  )}
              </div>
            </div>
            <LabelForm
              setInvalifel={setInvalifel}
              invalifel={invalifel}
              text={"tỉnh"}
              onClick={() => handle("Đối tượng cho thuê")}
              title={"Đối tượng cho thuê"}
              width={"w-[40%]"}
              gt
              type={"target"}
              value={target}
              setValue={setTarget}
              province={[
                { value: "Nam" },
                { value: "Nữ" },
                { value: "Tất cả" },
              ]}
            />
            <div className="flex flex-col gap-1 mt-6">
              <h1 className="font-medium">Hình ảnh</h1>
              <span>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</span>

              <label
                onClick={(e) => {
                  e.stopPropagation();
                  setInvalifel([]);
                }}
                htmlFor="file"
                type="file"
                className="border-4 cursor-copy flex flex-col justify-center items-center border-balck-500 border-dashed w-full h-[300px]"
              >
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    <img
                      className="w-[50px] mb-2"
                      src="https://phongtro123.com/dashboard_resource/images/upload-image.png"
                      alt=""
                    />
                    <span className="cursor-copy">Thêm ảnh</span>
                  </>
                )}
              </label>
              <input
                onFocus={() => setInvalifel([])}
                onChange={handleFiles}
                hidden
                multiple
                type="file"
                id="file"
              />
              {invalifel?.length > 0 &&
                invalifel.some((i) => i.name === "images") && (
                  <small className="text-red-500">
                    {invalifel.find((i) => i.name === "images")?.messeger}
                  </small>
                )}
              <span>Ảnh đã chọn</span>
              <div className="flex flex-col gap-6">
                {imagesPreview &&
                  Array.from(imagesPreview).map((item, index) => (
                    <div key={index} className="flex gap-3 mt-3">
                      <img
                        className="w-[50%] h-[200px] border border-black"
                        src={item}
                        alt=""
                      />
                      <span
                        onClick={() => handleDeleteImage(item)}
                        className=" h-[40px] cursor-pointer px-2 bg-gray-300 hover:bg-gray-400 rounded-md text-center py-2"
                      >
                        Xóa
                      </span>
                    </div>
                  ))}
              </div>
              {/* <div className="flex flex-col gap-2 my-6">
                <h1 className="font-medium">Video</h1>
                <div className="flex flex-col">
                  <span className="font-medium">Link video(youtube)</span>
                  <input
                    type="text"
                    className="px-2 border-2 rounded-md py-1 focus:ring focus:outline-none overflow-x-visible focus:ring-blue-400"
                  />
                </div>
                <span>Hoặc upload Video từ máy của bạn</span>

                <label
                  htmlFor="file"
                  type="file"
                  className="border-4 cursor-copy flex flex-col justify-center items-center border-balck-500 border-dashed w-full h-[300px]"
                >
                  <img
                    className="w-[55px]"
                    src="https://phongtro123.com/dashboard_resource/images/upload-video.png"
                    alt=""
                  />
                  <span className="cursor-copy">Thêm video</span>
                </label>
                <input hidden type="file" id="file" />
              </div> */}
            </div>
            <div className="w-full mt-5">
              {isEdit ? (
                <Button
                  onClick={handleSubmit}
                  text={"Cập nhật"}
                  bgColor={"bg-green-500"}
                  textColor={"text-white"}
                  fullwidth
                />
              ) : (
                <Button
                  onClick={handleSubmit1}
                  text={"Tạo mới"}
                  bgColor={"bg-green-500"}
                  textColor={"text-white"}
                  fullwidth
                />
              )}
            </div>
          </div>
        </div>

        <div className="w-[30%]">
          <div className=" w-full">
            <iframe
              className="w-full border-2 border-blue-400"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.63139492351!2d106.59518557481888!3d10.839494758027708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b4a72e239c1%3A0xf54ab49439c72fb1!2sLouis&#39;%20Tower!5e0!3m2!1svi!2s!4v1691141429538!5m2!1svi!2s"
              height="300"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
