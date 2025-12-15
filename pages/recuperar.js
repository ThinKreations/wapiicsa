import logo from "@/src/logo.png";
import MainHead from "@/components/MainHead";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { recPassword } from "./api/profesor-http";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRecover } from "@/schemas/recover";

export default function Recuperar() {
  const router = useRouter();
  const [show, setShow] = useState(true);

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");

  function toShowPass() {
    setShow(!show);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRecover),
  });

  useEffect(() => {});

  const recuperar = async (data) => {
    try {
      const res = await recPassword({
        username: data.user_profesor,
        correo: data.correo,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
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
            key="recuperar"
            className={styles.login_form}
            onSubmit={handleSubmit(recuperar)}
          >
            <h2>Recuperar contraseña</h2>
            <div className={styles.login_inputContainer}>
              <input
                className={styles.login_input}
                {...register("user_profesor")}
                type="text"
                required
              />
              <label className={styles.login_label}>Usuario</label>
              <div className={styles.underline}></div>
            </div>
            <div className={styles.login_inputContainer}>
              <input
                className={styles.login_input}
                {...register("correo")}
                type="text"
                required
              />
              <label className={styles.login_label}>Correo</label>
              <div className={styles.underline}></div>
            </div>
            <button className={styles.login_button} type="submit">
              <font size="5">R e c u p e r a r</font>
            </button>
            <br />
            <br />
            <p className={styles.errors}>{errors.correo}</p>
          </form>
          <center>
            <button
              className={styles.login_btn_options}
              onClick={() => router.push("/")}
            >
              Volver a inicio
            </button>
          </center>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  if (!req.headers.cookie) {
    console.log(req.headers);
  } else {
    console.log(req.headers);
    console.log("xd");
    return {
      redirect: {
        destination: "/clases",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
