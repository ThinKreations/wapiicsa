import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Component.module.css"
import logo from "@/src/logo.png"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { logOut } from "@/pages/api/profesor-http";

export default function Header(props) {
    const router = useRouter();

    const logout = async () => {
        logOut();
        router.push('/');
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