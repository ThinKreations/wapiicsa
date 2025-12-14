import * as yup from "yup";

export const schemaInvitado = yup.object().shape({
  id: yup
    .string()
    .matches(/^[0-9]+$/, "Deben ser 5 números")
    .required("Obligatorio")
    .min(5, "Deben ser 5 números")
    .max(5, "Deben ser 5 números"),
});
