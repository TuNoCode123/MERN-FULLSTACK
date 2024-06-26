import { EmblaCarouselType } from "embla-carousel";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
interface Iarrow {
  preArrow: () => void;
  nextArrow: () => void;
  isClickPre: boolean;
  isClickNext: boolean;
}
export const useArrowSlider = (
  emblaApi: EmblaCarouselType | undefined
): Iarrow => {
  const [isClickPre, setIsClickPre] = useState<boolean>(true);
  const [isClickNext, setIsClickNext] = useState<boolean>(true);
  const preArrow = useCallback(() => {
    console.log("pre");
    emblaApi?.scrollPrev();
  }, [emblaApi]);
  const nextArrow = useCallback(() => {
    console.log("next");
    emblaApi?.scrollNext();
  }, [emblaApi]);
  const hanlderClickArrow = useCallback((emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    setIsClickPre(!emblaApi?.canScrollPrev());
    setIsClickNext(!emblaApi?.canScrollNext());
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    hanlderClickArrow(emblaApi);
    emblaApi.on("reInit", hanlderClickArrow).on("select", hanlderClickArrow);
  }, [emblaApi, hanlderClickArrow]);
  return {
    preArrow,
    nextArrow,
    isClickPre,
    isClickNext,
  };
};
type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;
export const ArrowNext: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;
  return (
    <button className="arrow-next " type="button" {...restProps}>
      <MdNavigateNext />
    </button>
  );
};
export const ArrowPre: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;
  return (
    <button className="arrow-pre" type="button" {...restProps}>
      <GrFormPrevious />
    </button>
  );
};
