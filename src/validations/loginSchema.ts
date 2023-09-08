import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("O campo deve ser um e-mail válido.")
    .required("E-mail é um campo obrigatório."),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(25, "A senha deve ter no máximo 25 caracteres.")
    .test(
      "password",
      "A senha deve possuir no mínimo 8 caracteres, uma letra minúscula e uma letra maiúscula.",
      (value) => {
        if (value) {
          return /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$!%*#-_?&]{8,25}$/.test(
            value
          );
        }
        return true;
      }
    ).required("Password é um campo obrigatório."),
});
