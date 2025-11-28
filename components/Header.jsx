import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Component.module.css"
import logo from "@/src/logo.png"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header(props) {
    const router = useRouter();
    const [clases, setClases] = useState([]);
    const getClases = async () => {
        try {
            const res = await fetch(
                `http://localhost:8000/api/clases?user_profesor=${props.user_profesor}`
            );
            if (!res.ok) {
                setClases([]);
                return;
            }
            const data = await res.json();
            setClases(data.data);
        } catch (err) {
            setClases([]);
            console.error("Error al obtener clases:", err);
        } finally {
        }
    };

    useEffect(() => {
        getClases();
    }, []);
    return (
        <div className={styles.header}>
            <center>
                <Link href={'/clases'}><Image src={logo} width={180} style={{ filter: "invert()" }} className={styles.logo} alt="Logo de WAPA" /></Link>
            </center>
            <div key="user" className={styles.header_controls}>
                <select className={styles.header_select} defaultValue={''} onChange={(e) => router.push(`/clases/${e.target.value}`)}>
                    <option value={''} disabled>Secuencia</option>
                    {clases.map((c) => (
                        <option key={c.id_clase} value={c.id_clase} onClick={() => router.push(`/clases/${c.id_clase}`)}>
                            {c.secuencia} - {c.materia}
                        </option>
                    ))}
                </select>
                <div>
                    <button className={`material-icons`} onClick={() => { router.push('/clases/') }}>
                        home
                    </button>
                    <button className={`material-icons`}>
                        settings
                    </button>
                    <button className={`material-icons`} onClick={() => { router.push('/') }}>
                        exit_to_app
                    </button>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const res = await fetch("http://localhost:8000/api/clases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            user_profesor: user_profesor,
        }),
    });

    const data = await res.json();

    return {
        props: {
            clases: data,
        },
    };
}