import logo from "@/src/logo.png";
import MainHead from "@/components/MainHead";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { signUp, logIn } from "./api/profesor-http";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "@/schemas/login";
import { schemaSignUp } from "@/schemas/crearCuenta";
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [invitado, setLogInvitado] = useState(true);
  const [show, setShow] = useState(true);
  const [remember, setRemember] = useState(false);
  const [correct, setCorrect] = useState(true);

  function toSignUp() {
    setLogin(!login);
    reset();
  }

  function toShowPass() {
    setShow(!show);
  }

  function toLogInv() {
    setLogInvitado(!invitado);
  }

  /* Para el login xd */
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
    reset,
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });

  /* Para el signup xd */
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm({
    resolver: yupResolver(schemaSignUp),
  });

  const onSignup = async (data) => {
    try {
      const res = await signUp({
        username: data.usuario,
        correo: data.correo,
        contrasena: data.contrasena,
      });
      setLogin(true);
    } catch (error) {
      reset();
      setLogin(false);
    }
  };

  const onLogin = async (data) => {
    setCorrect(true);
    try {
      const { res, resJSON } = await logIn({
        username: data.usuario,
        contrasena: data.contrasena,
      });
      if (res.status !== 200) {
        setCorrect(false);
        return;
      }

      router.push("/clases");
    } catch (error) {}
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
          {login ? (
            <form
              key="login"
              className={styles.login_form}
              onSubmit={handleSubmitLogin(onLogin)}
            >
              <h2>Inicia Sesión</h2>
              <div className={styles.login_inputContainer}>
                <input
                  className={styles.login_input}
                  {...registerLogin("usuario")}
                  type="text"
                  required
                />
                <label className={styles.login_label}>Usuario</label>
                <div className={styles.underline}></div>
              </div>
              <div className={styles.input_container}>
                <div
                  className={styles.login_inputContainer}
                  style={{ margin: "0" }}
                >
                  <input
                    className={styles.login_input}
                    {...registerLogin("contrasena")}
                    type={show ? "password" : "text"}
                    required
                  />
                  <label className={styles.login_label}>Contraseña</label>
                  <div className={styles.underline}></div>
                </div>
                <button
                  className={`${styles.login_showpass} material-icons`}
                  type="button"
                  onClick={toShowPass}
                >
                  {show ? "visibility" : "visibility_off"}
                </button>
              </div>
              <Link href={"/recuperar"} className={styles.login_link_recover}>
                Olvidé mi contraseña
              </Link>
              <div className={styles.login_checkbox}>
                <input
                  type="checkbox"
                  name="recordar"
                  checked={remember}
                  onChange={(e) => {
                    setRemember(e.target.checked);
                  }}
                />
                <label>Recuerdame</label>
              </div>
              <button className={styles.login_button} type="submit">
                <font size="5">A c c e d e r</font>
              </button>
              <br />
              <br />
              <button className={styles.login_btn_options} onClick={toSignUp}>
                Registrate aquí
              </button>
              <br />o<br />
              <button
                className={styles.login_btn_options}
                onClick={() => router.push("guest")}
              >
                Accede como invitado
              </button>
            </form>
          ) : (
            <>
              <form
                key="signup"
                className={styles.login_form}
                onSubmit={handleSubmitSignup(onSignup)}
              >
                <h2>Regístrate</h2>
                <div className={styles.login_inputContainer}>
                  <input
                    className={styles.login_input}
                    {...registerSignup("usuario")}
                    required
                  />
                  <label className={styles.login_label}>Usuario</label>
                  <div className={styles.underline}></div>
                </div>
                <div
                  className={styles.login_inputContainer}
                  style={{ margin: "0" }}
                >
                  <input
                    className={styles.login_input}
                    required
                    {...registerSignup("correo")}
                  />
                  <label className={styles.login_label}>Correo</label>
                  <div className={styles.underline}></div>
                </div>
                <div className={styles.input_container}>
                  <div className={styles.login_inputContainer}>
                    <input
                      className={styles.login_input}
                      required
                      type={show ? "password" : "text"}
                      {...registerSignup("contrasena")}
                    />
                    <label className={styles.login_label}>Contraseña</label>
                    <div className={styles.underline}></div>
                  </div>
                  <button
                    className={`${styles.login_showpass} material-icons`}
                    type="button"
                    onClick={toShowPass}
                  >
                    {show ? "visibility" : "visibility_off"}
                  </button>
                </div>
                <div className={styles.input_container}>
                  <div
                    className={styles.login_inputContainer}
                    style={{ margin: "0" }}
                  >
                    <input
                      className={styles.login_input}
                      type={show ? "password" : "text"}
                      required
                      {...registerSignup("contrasena2")}
                    />
                    <label className={styles.login_label}>
                      Confirmar Contraseña
                    </label>
                    <div className={styles.underline}></div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.login_button}
                  style={{ marginTop: "30px" }}
                >
                  <font size="5">R e g i s t r a r</font>
                </button>
                <br />
                <br />

                <br />
                <p className={styles.errors}>{errorsSignup.usuario?.message}</p>
                <p className={styles.errors}>{errorsSignup.correo?.message}</p>
                <p className={styles.errors}>
                  {errorsSignup.contrasena?.message}
                </p>
                <p className={styles.errors}>
                  {errorsSignup.contrasena2?.message}
                </p>
              </form>
              <center>
                <button className={styles.login_btn_options} onClick={toSignUp}>
                  O inicia sesión
                </button>
              </center>
            </>
          )}
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
