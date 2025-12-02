import logo from "@/src/logo.png";
import MainHead from "@/components/MainHead";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { signUp } from "./api/profesor-http";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [invitado, setLogInvitado] = useState(true);
  const [show, setShow] = useState(true);

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);

  function toSignUp() {
    setLogin(!login);
    setUser("");
    setEmail("");
    setPass("");
  }

  function toShowPass() {
    setShow(!show);
  }

  function toLogInv() {
    setLogInvitado(!invitado);
  }

  useEffect(() => {
    console.log(remember);
  });

  const registrar = async (e) => {
    e.preventDefault();

    try {
      const res = await signUp({
        username: user,
        correo: email,
        contrasena: pass,
      });
      console.log(res);
      setLogin(true);
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
          {login ? (
            <form
              key="login"
              className={styles.login_form}
              onSubmit={() => {
                router.push("/clases/");
              }}
            >
              <h2>Inicia Sesión</h2>
              <div className={styles.login_inputContainer}>
                <input
                  className={styles.login_input}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
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
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
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
              <button
                className={styles.login_button}
                type="submit"
                onClick={() => {
                  router.push("/clases");
                }}
              >
                <font size="5">A c c e d e r</font>
              </button>
              <br />
              <br />
              <button className={styles.login_btn_options} onClick={toSignUp}>
                Registrate aquí
              </button>
              <br />o<br />
              <button className={styles.login_btn_options}>
                Accede como invitado
              </button>
            </form>
          ) : (
            <form
              key="signup"
              className={styles.login_form}
              onSubmit={registrar}
            >
              <h2>Regístrate</h2>
              <div className={styles.login_inputContainer}>
                <input
                  className={styles.login_input}
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                />
                <label className={styles.login_label}>Usuario</label>
                <div className={styles.underline}></div>
              </div>
              <div className={styles.login_inputContainer}>
                <input
                  className={styles.login_input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className={styles.login_label}>Correo</label>
                <div className={styles.underline}></div>
              </div>
              <div className={styles.input_container}>
                <div className={styles.login_inputContainer}>
                  <input
                    className={styles.login_input}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
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

              <button type="submit" className={styles.login_button}>
                <font size="5">R e g i s t r a r</font>
              </button>
              <br />
              <br />
              <button className={styles.login_btn_options} onClick={toSignUp}>
                O inicia sesión
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
