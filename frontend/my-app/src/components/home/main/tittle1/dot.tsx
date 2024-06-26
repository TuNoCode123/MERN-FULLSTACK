import { EmblaCarouselType } from "embla-carousel";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
interface Idot {
  selectIndex: number;
  moveOnChoseSlide: (index: number) => void;
  sumSlider: number[];
}
export const useDot = (emblaApi: EmblaCarouselType | undefined): Idot => {
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const [sumSlider, setSumSlider] = useState<number[]>([]);
  const moveOnChoseSlide = useCallback(
    (index: number) => {
      if (emblaApi) {
        console.log(index);
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );
  const setList = useCallback((emblaApi: EmblaCarouselType) => {
    if (emblaApi) {
      setSumSlider(emblaApi.scrollSnapList());
    }
  }, []);
  const setIndex = useCallback((emblaApi: EmblaCarouselType) => {
    if (emblaApi) {
      setSelectIndex(emblaApi.selectedScrollSnap);
    }
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    setList(emblaApi);
    setIndex(emblaApi);
    emblaApi?.on("init", setList).on("init", setIndex).on("select", setIndex);
  }, [emblaApi, setList, setIndex]);
  return {
    selectIndex,
    moveOnChoseSlide,
    sumSlider,
  };
};
type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;
export const Dot: React.FC<PropType> = (props) => {
  const { ...restObject } = props;
  return <button type="button" {...restObject} />;
};
