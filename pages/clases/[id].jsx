import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/Class.module.css"
import { Scanner } from "@yudiel/react-qr-scanner";
import { notFound } from "next/navigation";
import scrap from "../api/html-http";
import { getAsistencias, postAsistencia, putAsistencia } from "../api/asistencia-http";
import Swal from "sweetalert2";

export default function Clase({ clases, id }) {
    const router = useRouter()
    const [clase, setClase] = useState([]);
    const [fechas, setFechas] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [act, setAct] = useState(false)
    const [boletasEscaneadas, setBoletasEscaneadas] = useState([])

    const subirAsistencia = async (id, boleta) => {
        try {
            const res = await postAsistencia({
                id: id,
                boleta: boleta
            });
            setAct(!act)
        } catch (e) {
            console.log(e)
        }
    }

    const modAsistencia = async (id, boleta, fecha, aof) => {
        try {
            const res = await putAsistencia({
                id: id,
                boleta: boleta,
                fecha: fecha,
                aof: aof
            });
            setAct(!act)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        async function fetchAsistencias() {
            try {
                const data = await getAsistencias(id);
                setAlumnos(data.alumnos || []);
                setFechas(data.fechas || []);
                setClase(data.clase || {});
                setAsistencias(data.asistencias || []);
            } catch (e) {
                console.error(e);
            }
        }
        fetchAsistencias();
    }, [act]);

    return (
        <>
            <MainHead title={id} />
            <Header clases={clases} />
            <div className={styles.class_container}>
                <div className={styles.list_container}>
                    <div className={styles.list_buttons}>

                        <form>
                            <button>+ Invitado</button>
                        </form>
                        <p>Id Invitado</p>
                    </div>
                    <div className={styles.table_container}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th className={styles.td_nl}>
                                        NL
                                    </th>
                                    <th className={styles.td_boleta}>
                                        Boleta
                                    </th>
                                    <th className={styles.td_nombre}>
                                        Nombre
                                    </th>
                                    {fechas.map((f, indexFecha) => {
                                        return (
                                            <th className={styles.td_fecha} key={indexFecha}>{f.fecha}</th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {alumnos.map((alumno, index) => {
                                    return (
                                        <tr key={alumno.boleta}>
                                            <td className={styles.td_nl}>{index + 1}</td>
                                            <td key={alumno.boleta} className={styles.td_boleta}>{alumno.boleta}</td>
                                            <td key={alumno.nombre} className={styles.td_nombre}>{alumno.nombre}</td>
                                            {fechas.map((f, index) => {
                                                const asistencia = asistencias.find(
                                                    (a) => a.boleta === alumno.boleta && a.fecha === f.fecha
                                                );
                                                return (
                                                    <td key={index} className={styles.td_fecha}>
                                                        <center>
                                                            <button className={styles.btn_asistencia} onClick={() => {
                                                                const boleta = alumno.boleta;
                                                                const fecha = asistencia.fecha;
                                                                const asistenca = asistencias.find(
                                                                    (a) => a.boleta === boleta && a.fecha === fecha
                                                                )
                                                                const aof = !asistencia.asistencia
                                                                modAsistencia(id, boleta, fecha, aof)
                                                            }}>{asistencia.hora || '‎'}</button>
                                                        </center>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.scan_container}>
                    <div>
                        <Scanner scanDelay={3000} allowMultiple={true} onScan={async (result) => {
                            try {
                                let web = result[0].rawValue;
                                const regex = /([0-9]{2}|PE)[0-9]{8}/;

                                const res = await fetch('/api/html-http', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ url: web }),
                                })
                                const resJSON = await res.json();

                                if (res.status !== 200) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Error",
                                        timer: 1000,
                                    });
                                    return
                                }
                                const htmlText = resJSON.html;
                                const match = htmlText.match(regex);

                                if (match) {
                                    const boleta = match[0].trim();
                                    const boletaExiste = alumnos.some(
                                        (alumno) => String(alumno.boleta).trim() === boleta
                                    )
                                    if (!boletaExiste) {
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Boleta no válida',
                                            timer: 1000
                                        });
                                        return;
                                    }
                                    if (boletasEscaneadas.includes(boleta)) return;
                                    if (boletaExiste) {
                                        setBoletasEscaneadas(prev => [...prev, boleta]);
                                        Swal.fire({
                                            icon: "success",
                                            title: `${boleta}`,
                                            timer: 1500
                                        });
                                        const asistenciaRes = await subirAsistencia(id, boleta);

                                    }

                                } else {
                                    Swal.fire({
                                        icon: "error",
                                        title: `Error`,
                                        timer: 1500
                                    });
                                }
                            } catch (e) {
                                console.error(e)
                            }
                        }} />
                    </div>
                </div>
            </div>
        </>
    )

}

export async function getServerSideProps(context) {

    const { req, query, params } = context;

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

    const clases = await resJSON.data;


    return {
        props: {
            clases: clases || [],
            id: query.id,
        },
    };
}