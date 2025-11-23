import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "@/styles/Class.module.css"
import { createWorker } from 'tesseract.js';


export default function Clase(){
    const router = useRouter()
    const {id} = router.query;

    useState(()=>{

    })

    return(
        <>
            <MainHead title={id}/>
            <Header/>
            <div className={styles.class_maincontainer}>
                <div className={styles.class_container}>
                    <form>
                        <button>+ Invitado</button>
                        <p><span className="material-icons">person</span>Invitado: {`id`}</p>
                    </form>
                    <div>
                        <table>
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
                                    <td>1</td>
                                    <td>2024600000</td>
                                    <td>Juares KKastillo Rubencio Graviel</td>
                                    {/* Boton o cuadro por fecha */}
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
/*
const getServerSideProps = async ({id}) =>{
    //Aquí usar el id para realizar el manejo de sesiones y la obtención de los datos de la clase, no?
    
    Así es
}
*/