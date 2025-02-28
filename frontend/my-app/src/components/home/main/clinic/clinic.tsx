import useEmblaCarousel from "embla-carousel-react";
import MoreInfor from "../title2/moreInfor";
import "./clinic.scss";
import { ArrowNext, ArrowPre, useArrowSlider } from "../title2/arrowSlider";
import { useAppDispatch, useAppSelector } from "../../../../redux/hook";
import { useEffect } from "react";
import {
  getAllSpeciality,
  selectIsData,
  selectSpeciality,
} from "../../../../redux/reducer/reducer-speciality";
import { Buffer } from "buffer";
import { it } from "node:test";
import { useNavigate } from "react-router-dom";
import {
  getAllClinic,
  selectClinic,
} from "../../../../redux/reducer/reducer-clinic";
const Clinic = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: "auto",
    loop: false,
    align: "start",
  });
  const listClinic = useAppSelector(selectClinic);
  const dispath = useAppDispatch();
  useEffect(() => {
    dispath(getAllClinic());
  }, []);
  const { preArrow, nextArrow, isClickNext, isClickPre } =
    useArrowSlider(emblaApi);
  const nav = useNavigate();
  const handlerOnclick = (id: any) => {
    nav(`detail-clinic/${id}`);
    return;
  };
  const tmp = "main.clinic";
  return (
    <>
      <div className="clinic-container">
        <>
          <MoreInfor id={tmp} />
        </>
        <div className="speciality-slider mt-5">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container">
              <>
                {listClinic &&
                  listClinic.data.length > 0 &&
                  listClinic.data.map((item, index) => {
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
                                className="img"
                                style={{
                                  backgroundImage: `url(${item.image})`,
                                }}
                              />
                            </div>
                            <div className="doctor-speciality">
                              {item.nameClinic}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
              </>
            </div>
          </div>
        </div>
        <div className="title2-arrow">
          <ArrowPre onClick={() => preArrow()} disabled={isClickPre} />
          <ArrowNext onClick={() => nextArrow()} disabled={isClickNext} />
        </div>
      </div>
    </>
  );
};
export default Clinic;
