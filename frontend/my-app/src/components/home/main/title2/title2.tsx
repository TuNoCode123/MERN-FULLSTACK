import "./tittle2.scss";
import useEmblaCarousel from "embla-carousel-react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { useEffect } from "react";
import {
  fetchAllDoctor,
  selectListDoctor,
} from "../../../../redux/reducer/reducer-excuteUser";
import { Buffer } from "buffer";
import { selectLanguage } from "../../../../redux/reducer/reducer-login";
import { languages } from "../../../../constants/languages";
import { ArrowNext, ArrowPre, useArrowSlider } from "./arrowSlider";
const Tittle2 = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    loop: false,
  });
  const { preArrow, nextArrow, isClickNext, isClickPre } =
    useArrowSlider(emblaApi);
  const dispath = useAppDispatch();
  const listDoctor = useAppSelector(selectListDoctor);
  const isLanguage = useAppSelector(selectLanguage);
  useEffect(() => {
    dispath(fetchAllDoctor());
  }, []);
  return (
    <>
      <div className="title2-content">
        <div className="t2-child1">Bác Sĩ Nổi Bật</div>
        <div className="t2-child2">Xem thêm</div>
      </div>
      <div className="doctor-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {listDoctor &&
              listDoctor.rows.length > 0 &&
              listDoctor.rows.map((item, index) => {
                return (
                  <>
                    {" "}
                    <div className="embla__slide " key={index}>
                      <div className="doctor-item">
                        <div className="doctor-img">
                          <div
                            className="doctor-img"
                            style={{
                              backgroundImage: `url(${Buffer.from(
                                item?.image.data,
                                "base64"
                              ).toString("binary")})`,
                            }}
                          />
                        </div>
                        <div className="doctor-description">
                          <span>
                            {`${
                              isLanguage == languages.en
                                ? item?.position?.valueEn
                                : item?.position?.valueVi
                            }, ${item?.email}`}
                          </span>
                        </div>
                        <div className="doctor-speciality">fdasf</div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <div className="title2-arrow">
        <ArrowPre onClick={() => preArrow()} disabled={isClickPre} />
        <ArrowNext onClick={() => nextArrow()} disabled={isClickNext} />
      </div>
    </>
  );
};
export default Tittle2;
