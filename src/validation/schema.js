import * as yup from "yup";

export const dimensionsSchema = yup.object().shape({
  length: yup
    .string()
    .required("Length is a required field")
    .test(
      "is-greater-than-70",
      "Length must be greater than 70",
      (value) => parseInt(value) >= 70
    ),
  width: yup
    .string()
    .required("Width is a required field")
    .test(
      "is-greater-than-70",
      "Width must be greater than 70",
      (value) => parseInt(value) >= 70
    ),
  quantity: yup
    .string()
    .required("Quantity is a required field")
    .test(
      "is-greater-than-1",
      "Quantity must be greater than 1",
      (value) => parseInt(value) >= 1
    ),
});
