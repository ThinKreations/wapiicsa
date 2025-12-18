import styles from "@/styles/Home.module.css";
import logo from "@/src/logo.png";
import MainHead from "@/components/MainHead";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { schemaInvitado } from "@/schemas/invitado";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logIn } from "./api/invitado-http";

export default function guest() {
  const router = useRouter();

  const {
    register,
    handleSubmit: handleLogin,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaInvitado),
  });

  const onLogin = async (data) => {
    try {
      const res = await logIn({
        id: data.id,
      });
      router.push(`/clases/${res}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <MainHead title="WAPA" />
      <div className={styles.container}>
        <div className={styles.landing_block}>
          <Image src={logo} alt="WAPA" className={styles.logo} />
          <p>
            Bienvenido.
            <br />
            Aquí podrás llevar un mejor control de tus listas de asistencia.
          </p>
          <font size="7px" color="gray">
            Creado por "Guapiicsa", 2025-2026.
          </font>
        </div>
        <div className={styles.auth_block}>
          <form
            style={{ marginTop: "70px" }}
            key="recuperar"
            className={styles.login_form}
            onSubmit={handleLogin(onLogin)}
          >
            <h2>Inicia como invitado</h2>
            <div className={styles.login_inputContainer}>
              <input
                className={styles.login_input}
                type="number"
                {...register("id")}
                required
              />
              <label className={styles.login_label}>ID</label>
              <div className={styles.underline}></div>
            </div>
            <button className={styles.login_button} type="submit">
              <font size="5">Acceder</font>
            </button>
            <br />
            <br />

            <br />
            <br />
            <p className={styles.errors}>{errors.id?.message}</p>
          </form>
          <center>
            <button
              className={styles.login_btn_options}
              onClick={() => router.push("/")}
            >
              Volver a inicio
            </button>
          </center>
        </div>
      </div>
    </>
  );
}
