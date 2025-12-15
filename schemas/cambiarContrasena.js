import * as yup from "yup";

export const schemaChange = yup.object().shape({
  correo: yup
    .string()
    .max(30, "Correo -> máximo 50 caracteres")
    .email("Correo inválido")
    .trim(),
  contrasena: yup
    .string()
    .required("Contraseña obligatoria")
    .min(8, "Contraseña -> mínimo de 8 caracteres")
    .max(30, "Contraseña -> máximo 30 caracteres")
    .trim(),
  contrasena2: yup
    .string()
    .oneOf([yup.ref("contrasena"), null], "Las contraseñas deben coincidir")
    .required("Confirma tu contraseña")
    .trim(),
});
