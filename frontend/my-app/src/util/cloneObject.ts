import { IallCodeData, Iuser } from "../constants/interface";
import _ from "lodash";
export interface Ioptions {
  value: number | undefined;
  label: string | undefined;
}
export const cloneToRenderList = (
  listDoctor: Partial<Iuser<IallCodeData>[]> | undefined
): Ioptions[] | undefined => {
  if (!listDoctor) return;
  const options: Ioptions[] = [];
  const cloneListDoctor = _.cloneDeep(listDoctor);
  cloneListDoctor.map((item, index) => {
    const tmp = { value: item?.id, label: item?.email };
    options.push(tmp);
  });
  return options;
};
