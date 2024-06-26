import vi from "../language/vi.json";
import en from "../language/en.json";
import { languages } from "../constants/languages";
import { flatten } from "flat";
export const getLanguages = (language: string): any => {
  const temp = {
    vi,
    en,
  };
  let languageChose = {};
  switch (language) {
    case languages.vi:
      languageChose = temp.vi;
      break;
    case languages.en:
      languageChose = temp.en;
      break;
  }
  if (Object.keys(languageChose).length > 0) {
    const flattenObject = flatten(languageChose);
    return flattenObject;
  }
};
