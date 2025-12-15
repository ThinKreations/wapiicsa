import * as yup from "yup";

export const schemaRecover = yup.object().shape({
  user_profesor: yup.string().required(),
  correo: yup
    .string()
    .max(30, "Correo -> máximo 50 caracteres")
    .email("Correo inválido")
    .trim()
    .required(),
});
