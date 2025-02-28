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
import { useNavigate } from "react-router-dom";
import { CHOSE, PATH } from "../../../../constants/path";
import { IallCodeData, Iuser } from "../../../../constants/interface";
import MoreInfor from "./moreInfor";
const Tittle2 = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    loop: false,
  });
  const nav = useNavigate();
  const { preArrow, nextArrow, isClickNext, isClickPre } =
    useArrowSlider(emblaApi);

  const dispath = useAppDispatch();
  const listDoctor = useAppSelector(selectListDoctor);
  const isLanguage = useAppSelector(selectLanguage);
  useEffect(() => {
    dispath(fetchAllDoctor());
  }, []);
  const handlerOnclick = (id: number | undefined) => {
    nav(`${PATH.detailDoctor}/${id}`);
  };
  const tmp = `main.doctor`;
  return (
    <>
      <>
        <MoreInfor id={tmp} />
      </>
      <div className="doctor-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {listDoctor &&
              listDoctor?.rows?.length > 0 &&
              listDoctor?.rows?.map((item, index) => {
                return (
                  <>
                    <div
                      className="embla__slide "
                      key={index}
                      onClick={() => handlerOnclick(item?.id)}
                    >
                      <div className="doctor-item">
                        <div className="doctor-img">
                          <div
                            className="doctor-img"
                            style={{
                              backgroundImage: `url(${Buffer.from(
                                item?.image?.data,
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
                        <div
                          className="doctor-speciality"
                          style={{ fontSize: "20px", fontWeight: "600" }}
                        >
                          {item?.doctorInfor?.userSpeciality.nameSpeciality
                            ? item?.doctorInfor?.userSpeciality.nameSpeciality
                            : "FreeDom"}
                        </div>
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
