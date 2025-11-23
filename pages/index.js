import logo from "@/src/logo.png"
import MainHead from "@/components/MainHead";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home(){
  const router = useRouter();
  const [login, setLogin] = useState(true);
  const [invitado, setLogInvitado] = useState(true);
  const [show, setShow] = useState(true);

  function toSignUp(){
    setLogin(!login);
  }

  function toShowPass(){
    setShow(!show);
  }

  function toLogInv(){
    setLogInvitado(!invitado);
  }

  return(
    <>
      <MainHead title="WAPA"/>
      <div className={styles.container}>
        <div className={styles.landing_block}>
            <Image src={logo} alt="WAPA" className={styles.logo}/>
            <p>Bienvenido.<br/>Aquí podrás llevar un mejor control de tus listas de asistencia.</p>
            <font size="7px" color="gray">Creado por "Guapiicsa", 2025-2026.</font>
        </div>
        <div className={styles.auth_block}>
          {login? 
          (
            <form key="login" className={styles.login_form}>
              <h2>Inicia Sesión</h2>
              <div className={styles.login_inputContainer}>
                  <input className={styles.login_input} type="text" required/>
                  <label className={styles.login_label}>Usuario</label>
                  <div className={styles.underline}></div>
              </div>
              <div className={styles.login_inputContainer}>
                  <input className={styles.login_input} type={show?"password":"text"} required/>
                  <label className={styles.login_label}>Contraseña</label>
                  <div className={styles.underline}></div>
              </div>
              {show?(<button className={`${styles.login_showpass} material-icons`} type="button" onClick={toShowPass}>
                  visibility
                </button>):(
                <button className={`${styles.login_showpass} material-icons`} type="button" onClick={toShowPass}>
                  visibility_off
                </button>
              )}
              <Link href={'/sesion/recuperar'} className={styles.login_link_recover}>Olvidé mi contraseña</Link>
              <div className={styles.login_checkbox}><input type="checkbox" name="recordar"/><label>Recuerdame</label></div>
              
              <button className={styles.login_button} onClick={()=>{router.push('/clases')}}><font size="5">A c c e d e r</font></button>

              <br/><br/>
              <button className={styles.login_btn_options} onClick={toSignUp}>Registrate aquí</button>
              <br/>o<br/>
              <button className={styles.login_btn_options} >Accede como invitado</button>
            </form> 
          ):(
            <form key="signup" className={styles.login_form}>
            <h2>Regístrate</h2>
            <div className={styles.login_inputContainer}>
                <input className={styles.login_input} required/>
                <label className={styles.login_label}>Usuario</label>
                <div className={styles.underline}></div>
            </div>
            <div className={styles.login_inputContainer}>
                <input className={styles.login_input} required/>
                <label className={styles.login_label}>Correo</label>
                <div className={styles.underline}></div>
            </div>
            <div className={styles.login_inputContainer}>
                  <input className={styles.login_input} required type={show?"password":"text"} />
                  <label className={styles.login_label}>Contraseña</label>
                  <div className={styles.underline}></div>
            </div>
            {show?(<button className={styles.login_showpass2} type="button" onClick={toShowPass}>
              <span className="material-icons">
                visibility
              </span>
            </button>):(
              <button className={styles.login_showpass2} type="button" onClick={toShowPass}>
              <span className="material-icons">
                visibility_off
              </span>
            </button>
            )}
            <button className={styles.login_button}><font size="5">R e g i s t r a r</font></button>
            <br/><br/>
            <button className={styles.login_btn_options} onClick={toSignUp}>O inicia sesión</button>
          </form>
          )
          }
        </div>
      </div>
    </>
  );
}