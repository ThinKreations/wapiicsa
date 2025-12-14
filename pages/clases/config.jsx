import styles from "@/styles/Dashboard.module.css";
import styles2 from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useState } from "react";
import { camPassword } from "../api/profesor-http";
import { schemaChange } from "@/schemas/cambiarContrasena";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import Router, { useRouter } from "next/router";

export default function Settings() {

    const router = useRouter()

    const [show2, setShow2] = useState(true);
    const [show3, setShow3] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaChange),
    });



    const cambiarPassword = async (data) => {
        console.log(data)
        try {
            if (data.contrasena !== data.contrasena2) {
                Swal.fire({
                    icon: "error",
                    text: "Las contraseñas deben coincidir",
                    timer: 2400,
                })
            }
            const res = await camPassword({
                correo: data.correo,
                passNueva: data.contrasena2
            });
            console.log(res)
            Swal.fire({
                icon: "success",
                text: "Su contraseña ha cambiado.",
                timer: 1200,
            })
            router.push('/clases')
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
            <Header />

            <div className={styles.dash_container}>
                <div className={styles.dash_ctrl}>
                    <div>
                        <h1>Configuración de cuenta</h1>
                    </div>
                </div>
            </div>

            <center>
                <form className={styles.config_form} onSubmit={handleSubmit(cambiarPassword)}>
                    <div
                        className={styles2.login_inputContainer}
                    >
                        <input
                            className={styles2.login_input}
                            {...register('correo')}
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
                                {...register('contrasena')}
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
                                {...register('contrasena2')}
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