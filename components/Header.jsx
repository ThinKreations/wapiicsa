import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Component.module.css"
import logo from "@/src/logo.png"
import { useRouter } from "next/router";

export default function Header(){
    const router = useRouter();
    return(
        <div className={styles.header}>
            <center>
                <Link href={'/clases'}><Image src={logo} width={180} style={{filter: "invert()"}} className={styles.logo} alt="Logo de WAPA"/></Link>
            </center>
            <div key="user" className={styles.header_controls}>
                    <select className={styles.header_select} defaultValue={0}>
                        <option value={0} disabled>Secuencia</option>
                        <option >Secuencia 1</option>
                    </select>
                <div>
                    <button className={`material-icons`} onClick={()=>{router.push('/clases/')}}>
                        home
                    </button>
                    <button className={`material-icons`}>
                        settings
                    </button>
                    <button className={`material-icons`} onClick={()=>{router.push('/')}}>
                        exit_to_app
                    </button>
                </div>
            </div>
        </div>
    )
}