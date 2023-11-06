import * as yup from "yup";
import { SHEET_HEIGHT, SHEET_WIDTH } from "../components/CutOptimizerAlgorithm";

export const dimensionsSchema = yup.object().shape({
  width: yup
    .string()
    .required("Լայնությունը պարտադիր է")
    .test(
      "is-greater-than-70",
      `Լայնությունը պետք է լինի 70-${SHEET_WIDTH} միջակայքում`,
      value => parseInt(value) >= 70 && parseInt(value) <= SHEET_WIDTH
    ),
  height: yup
    .string()
    .required("Երկարությունը պարտադիր է")
    .test(
      "is-greater-than-70",
      `Երկարությունը պետք է լինի 70-${SHEET_HEIGHT} միջակայքում`,
      value => parseInt(value) >= 70 && parseInt(value) <= SHEET_HEIGHT
    ),
  quantity: yup
    .string()
    .required("Քանակը պարտադիր է")
    .test(
      "is-greater-than-1",
      "Քանակը պետք է լինի 0-ից մեծ",
      value => parseInt(value) >= 1
    ),
});
