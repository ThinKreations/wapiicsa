import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Class.module.css"
let user_profesor = "axel"
import { setAsistencia } from "../api/asistencia-http";
import { Scanner } from "@yudiel/react-qr-scanner";
import { notFound } from "next/navigation";

export default function Clase({ clase, fechas, alumnos, asistencias }) {
    const router = useRouter()
    const { id } = router.query;

    useEffect(() => {
        console.log(alumnos)
    }, [])

    return (
        <>
            <MainHead title={id} />
            <Header user_profesor={user_profesor} />
            <div className={styles.class_container}>
                <div className={styles.list_container}>
                    <div className={styles.list_buttons}>
                        <form>
                            <button>+ Alumno</button>
                        </form>
                        <form>
                            <button>+ Invitado</button>
                        </form>
                        <p>Id Invitado</p>
                    </div>
                    <table></table>
                </div>
                <div className={styles.scan_container}>
                    <div>
                        <Scanner />
                    </div>
                </div>
            </div>
        </>
    )

}

export async function getServerSideProps({ params }) {
    const { id } = params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/clases/${id}`
    );

    const resJSON = await res.json();

    return {
        props: {
            clase: resJSON.clase || null,
            fechas: resJSON.fechas || [],
            alumnos: resJSON.alumnos || [],
            asistencias: resJSON.asistencias || [],
            notFound: false
        }
    };
}