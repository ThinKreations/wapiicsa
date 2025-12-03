import styles from "@/styles/Dashboard.module.css";
import styles2 from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useState } from "react";
import { camPassword } from "../api/profesor-http";

export default function Settings() {

    let user_profesor = "axel";

    const [email, setEmail] = useState("")
    const [pass1, setPass1] = useState("")
    const [pass2, setPass2] = useState("")
    const [pass3, setPass3] = useState("")

    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(true);
    const [show3, setShow3] = useState(true);

    const cambiarPassword = async (e) => {
        e.preventDefault();
        try {
            if (pass2 !== pass3) {
                console.warn("Las contraseñas no son iguales")
            }
            /*const res = await camPassword({
                username: user_profesor,
                correo: email,
                passActual: pass1,
                passNueva: pass2
            });
            console.log(res);
            setLogin(true);*/
        } catch (error) {
            console.log(error);
        }
    }

    function showPass1() {
        setShow1(!show1);
    }
    function showPass2() {
        setShow2(!show2);
    }
    function showPass3() {
        setShow3(!show3);
    }
    return (
        <>
            <MainHead title={'Configuración'} />
            <Header user_profesor={user_profesor} />

            <div className={styles.dash_container}>
                <div className={styles.dash_ctrl}>
                    <div>
                        <h1>Configuración de cuenta</h1>
                    </div>
                </div>
            </div>

            <center>
                <form className={styles.config_form} onSubmit={cambiarPassword}>
                    <div
                        className={styles2.login_inputContainer}
                    >
                        <input
                            className={styles2.login_input}
                            value={user_profesor}
                            required
                        />
                        <label className={styles2.login_label}>Contraseña</label>
                        <div className={styles2.underline}></div>
                    </div>

                    <div
                        className={styles2.login_inputContainer}
                    >
                        <input
                            className={styles2.login_input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label className={styles2.login_label}>Correo</label>
                        <div className={styles2.underline}></div>
                    </div>

                    <div className={styles2.input_container}>
                        <div
                            className={styles2.login_inputContainer}
                        >
                            <input
                                className={styles2.login_input}
                                value={pass1}
                                onChange={(e) => setPass1(e.target.value)}
                                type={show1 ? "password" : "text"}
                                required
                            />
                            <label className={styles2.login_label}>Contraseña Actual</label>
                            <div className={styles2.underline}></div>
                        </div>
                        <button
                            className={`${styles2.login_showpass} material-icons`}
                            type="button"
                            onClick={showPass1}
                        >
                            {show1 ? "visibility" : "visibility_off"}
                        </button>
                    </div>

                    <div className={styles2.input_container}>
                        <div
                            className={styles2.login_inputContainer}
                        >
                            <input
                                className={styles2.login_input}
                                value={pass2}
                                onChange={(e) => setPass2(e.target.value)}
                                type={show2 ? "password" : "text"}
                                required
                            />
                            <label className={styles2.login_label}>Nueva Contraseña</label>
                            <div className={styles2.underline}></div>
                        </div>
                        <button
                            className={`${styles2.login_showpass} material-icons`}
                            type="button"
                            onClick={showPass2}
                        >
                            {show2 ? "visibility" : "visibility_off"}
                        </button>
                    </div>

                    <div className={styles2.input_container}>
                        <div
                            className={styles2.login_inputContainer}
                        >
                            <input
                                className={styles2.login_input}
                                value={pass3}
                                onChange={(e) => setPass3(e.target.value)}
                                type={show3 ? "password" : "text"}
                                required
                            />
                            <label className={styles2.login_label}>Confirmar Contraseña</label>
                            <div className={styles2.underline}></div>
                        </div>
                        <button
                            className={`${styles2.login_showpass} material-icons`}
                            type="button"
                            onClick={showPass3}
                        >
                            {show3 ? "visibility" : "visibility_off"}
                        </button>
                    </div>

                    <br />

                    <input
                        id="guardar"
                        type="submit"
                        value="Guardar contraseña"
                        className={styles2.login_button}
                    />
                </form>
            </center>
        </>
    );
}