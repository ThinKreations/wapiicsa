import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Class.module.css"
import { createWorker } from 'tesseract.js';
let user_profesor = "axel"


export default function Clase() {
    const router = useRouter()
    const { id } = router.query;


    return (
        <>

            <MainHead title={id} />
            <Header user_profesor={user_profesor} />
            <div className={styles.class_maincontainer}>
                <div className={styles.class_centered}>
                    <div className={styles.class_header}>
                        <div className={styles.guest_info}>
                            <span className="material-icons">person</span>
                            <p>Invitado: <strong>{id}</strong></p>
                        </div>
                        <button className={styles.add_guest_btn}>
                            <span className="material-icons">person_add</span>
                            + Invitado
                        </button>
                    </div>

                    <div className={styles.table_wrapper}>
                        <table className={styles.spaced_table}>
                            <thead>
                                <tr>
                                    <th>N.L.</th>
                                    <th>Boleta</th>
                                    <th>Nombre</th>
                                    {/* Fechas */}
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td className={styles.number}>1</td>
                                    <td className={styles.boleta}>2024600000</td>
                                    <td className={styles.name}>Juares KKastillo Rubencio Graviel</td>
                                    {/* Boton o cuadro por fecha*/}
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.class_scanner_container}>
                    <div className={styles.class_scanner_div}>

                    </div>
                </div>
            </div>
        </>
    )

}
