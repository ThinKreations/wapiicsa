import styles from "@/styles/Dashboard.module.css";
import styles2 from "@/styles/Home.module.css";
import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import { camPassword } from "../api/profesor-http";
import { schemaChange } from "@/schemas/cambiarContrasena";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import Router, { useRouter } from "next/router";
import { verDatos } from "../api/profesor-http";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Settings({ profesor, clases }) {

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
                        className={styles2.login_inputContainer} style={{ margin: "10" }}
                    >
                        <input
                            className={styles2.login_input}
                            value={profesor.user_profesor}
                        />
                        <label className={styles2.login_label}>Correo actual</label>
                    </div>
                    <div
                        className={styles2.login_inputContainer} style={{ margin: "10" }}
                    >
                        <input
                            className={styles2.login_input}
                            value={profesor.correo}
                        />
                        <label className={styles2.login_label}>Correo actual</label>
                    </div>
                    <div
                        className={styles2.login_inputContainer} style={{ margin: "10" }}
                    >
                        <input
                            className={styles2.login_input}
                            {...register('correo')}
                        />
                        <label className={styles2.login_label}>Nuevo Correo (opcional)</label>
                    </div>

                    <div className={styles2.input_container}>
                        <div
                            className={styles2.login_inputContainer} style={{ margin: "0" }}
                        >
                            <input
                                className={styles2.login_input}
                                {...register('contrasena')}
                                type={show2 ? "password" : "text"}
                            />
                            <label className={styles2.login_label}>Nueva Contraseña (Opcional)</label>
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
                            className={styles2.login_inputContainer} style={{ margin: "5" }}
                        >
                            <input
                                className={styles2.login_input}
                                {...register('contrasena2')}
                                type={show3 ? "password" : "text"}
                            />
                            <label className={styles2.login_label}>Confirmar Contraseña</label>
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
                    <div className={styles.btnContainer1}>
                        <input
                            type="button"
                            value="Cancelar"
                            className={styles2.login_button}
                            onClick={() => router.push('/clases')}
                            style={{ margin: '10px' }}
                        />
                        <input
                            id="guardar"
                            type="submit"
                            value="Guardar contraseña"
                            style={{ margin: '10px' }}
                            className={styles2.login_button}
                        />
                    </div>
                </form>
            </center>
        </>
    );
}

export async function getServerSideProps({ req }) {
    const res = await fetch("http://localhost:8000/api/clases", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": req.headers.cookie || "",
        },
    });
    if (!req.headers.cookie) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    const resJSON = await res.json();


    if (res.status === 403) {
        return {
            redirect: {
                destination: "/clases/" + resJSON.message,
                permanent: false,
            }
        }
    }

    const res2 = await fetch(`${API_URL}/cambiar-password`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cookie": req.headers.cookie || "",
        },

    });
    const resJSON2 = await res2.json();
    console.log(resJSON2)
    return {
        props: {
            profesor: resJSON2 || [],
            clases: resJSON.data || [],
        },
    };
}