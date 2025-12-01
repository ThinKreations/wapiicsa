let user_profesor = "axel";
import styles from "@/styles/Dashboard.module.css";
import styles2 from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useState } from "react";

export default function Settings() {

    const [showActual, setShowActual] = useState(false);
    const [showNueva1, setShowNueva1] = useState(false);
    const [showNueva2, setShowNueva2] = useState(false);

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
                <form className={styles.config_form}>
                    <label htmlFor="username">Usuario:</label><br />
                    <input
                        type="text"
                        id="username"
                        disabled
                        className={styles.config_input}
                        value={user_profesor}
                    />
                    <br /><br />

                    <label htmlFor="contrasena">Contraseña actual:</label>
                    <div className={styles.config_campoPass}>
                        <input
                            type={showActual ? "text" : "password"}
                            id="contrasena"
                            className={styles.config_input}
                        />

                        <button
                            type="button"
                            className={styles.config_ojito}
                            onClick={() => setShowActual(!showActual)}
                        >
                            <span className="material-icons">
                                {showActual ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    <br />

                    <label htmlFor="nueva1">Nueva contraseña:</label>
                    <div className={styles.config_campoPass}>
                        <input
                            type={showNueva1 ? "text" : "password"}
                            id="nueva1"
                            className={styles.config_input}
                        />
                        <button
                            type="button"
                            className={styles.config_ojito}
                            onClick={() => setShowNueva1(!showNueva1)}
                        >
                            <span className="material-icons">
                                {showNueva1 ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    <br />

                    <label htmlFor="nueva2">Confirme contraseña:</label>
                    <div className={styles.config_campoPass}>
                        <input
                            type={showNueva2 ? "text" : "password"}
                            id="nueva2"
                            className={styles.config_input}
                        />
                        <button
                            type="button"
                            className={styles.config_ojito}
                            onClick={() => setShowNueva2(!showNueva2)}
                        >
                            <span className="material-icons">
                                {showNueva2 ? "visibility_off" : "visibility"}
                            </span>
                        </button>
                    </div>

                    <br />

                    <input
                        id="guardar"
                        type="submit"
                        value="Guardar contraseña"
                        className={styles.config_submit}
                    />
                </form>
            </center>
        </>
    );
}