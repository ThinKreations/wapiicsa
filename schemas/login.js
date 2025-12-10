import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  usuario: yup.string().required("Usuario obligatorio"),
  contrasena: yup.string().required("Contraseña obligatoria"),
});
