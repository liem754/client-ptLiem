import { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectCoverflow, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import Icons from "../ultils/icons";
const { GrFormPrevious, GrFormNext } = Icons;
function Slider({ posts }) {
  // const [image, setImage] = useState(localStorage.getItem("images"));
  // useEffect(() => {
  //   localStorage.setItem("images", images?.images?.image);
  // }, [images]);

  return (
    <div className="w-[100%] md:w-[80%] md:h-[320px] h-[280px]  items-center slide-container ">
      {/* <Slide> */}
      <Swiper
        // effect="coverflow"
        grabCursor={true}
        // centeredSlides={true}
        // loop={true}

        effect="slide"
        spaceBetween={30}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          nextEl: ".next",
          prevEl: ".pre",
          clickable: true,
        }}
        loop={true}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        // onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
        // onSlideChange={() => console.log("slide change")}
      >
        {posts &&
          JSON.parse(posts?.images?.image)?.map((item, index) => {
            return (
              <SwiperSlide>
                <div key={index} className="flex w-full justify-center">
                  <div className="md:h-[320px] h-[280px] w-full md:w-[80%]">
                    <img
                      className="bg-cover h-[100%] w-[100%]"
                      key={index}
                      src={item}
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      <a className="pre cursor-pointer absolute top-[40%] left-4 p-1 bg-yellow-400 rounded-[50%] z-30">
        <GrFormPrevious size={"30px"} color={"white"} />
      </a>
      <a className="next cursor-pointer p-1 bg-yellow-400 rounded-[50%] absolute top-[40%] right-4 z-30">
        <GrFormNext size={"30px"} />
      </a>
    </div>
  );
}

export default Slider;
