import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Component.module.css"
import logo from "@/src/logo.png"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logOut } from "@/pages/api/profesor-http";
import Swal from "sweetalert2";
import { resolve } from "styled-jsx/css";

export default function Header(props) {
    const router = useRouter();
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))


    const logout = async () => {
        try {
            logOut();
            Swal.fire({
                icon: 'success',
                title: '¡Vuelva pronto!',
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer: 2200,
            })
        } catch (e) {
            console.error(e);
        } finally {
            await sleep(2500)
            router.push('/');

        }
    }

    const clases = props.clases || [];

    useEffect(() => {
    }, []);
    return (
        <div className={styles.header}>
            <center>
                <Link href={'/clases'}><Image src={logo} width={180} style={{ filter: "invert()" }} className={styles.logo} alt="Logo de WAPA" /></Link>
            </center>
            <div key="user" className={styles.header_controls}>
                <select
                    className={styles.header_select}
                    defaultValue={''}
                    onChange={(e) => router.push(`/clases/${e.target.value}`)}
                >
                    <option value={''} disabled>Secuencia</option>
                    {clases.map((c) => (
                        <option key={c.id_clase} value={c.id_clase}>
                            {c.secuencia} - {c.materia}
                        </option>
                    ))}
                </select>
                <div>
                    <button className={`material-icons`} onClick={() => { router.push('/clases/') }}>
                        home
                    </button>
                    <button className={`material-icons`} onClick={() => router.push('/clases/config')}>
                        settings
                    </button>
                    <button className={`material-icons`} onClick={logout}>
                        exit_to_app
                    </button>
                </div>
            </div>
        </div>
    )
}