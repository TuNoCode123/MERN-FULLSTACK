import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./tittle1.scss";
import img1 from "../../../../assert/094346-hoi-dap-cong-dong.webp";
import img2 from "../../../../assert/134537-group-12314.webp";
import img3 from "../../../../assert/141422-144204-dat-lich-kham-bookingcare-pharmacity.jpg";
import img4 from "../../../../assert/163557-dat-lich-cham-soc-wecare247.png";
import { Dot, useDot } from "./dot";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import ClassNames from "embla-carousel-class-names";

const Tittle1 = () => {
  const classNamesOptions = {
    draggable: "",
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    Autoplay(),
    ClassNames({ draggable: "", dragging: "", snapped: "" }),
    WheelGesturesPlugin({ wheelDraggingClass: "" }),
  ]);

  const { selectIndex, moveOnChoseSlide, sumSlider } = useDot(emblaApi);

  return (
    <>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          <div className="embla__slide ">
            <img src={img1}></img>
          </div>
          <div className="embla__slide ">
            {" "}
            <img src={img2}></img>
          </div>
          <div className="embla__slide">
            {" "}
            <img src={img3}></img>
          </div>
          <div className="embla__slide">
            {" "}
            <img src={img4}></img>
          </div>
        </div>
      </div>
      <div className="dot">
        {sumSlider &&
          sumSlider.length > 0 &&
          sumSlider.map((item, index) => {
            return (
              <>
                <Dot
                  key={index}
                  onClick={() => moveOnChoseSlide(index)}
                  className={"dot-child".concat(
                    index == selectIndex ? " selected" : ""
                  )}
                />
              </>
            );
          })}
      </div>
    </>
  );
};
export default Tittle1;
