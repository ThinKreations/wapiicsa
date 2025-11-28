import styles from "@/styles/Component.module.css"
import { useRouter } from "next/router"

export default function Card(props) {
    const router = useRouter()
    return (
        <>
            <div className={styles.dash_card} onClick={() => { router.push(`/clases/${props.id}`) }}>
                <h2>{props.materia}</h2>
                <span className={styles.span_id}>@{props.id}</span>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <h3>{props.secuencia}</h3>
                    <h3>{props.periodo}</h3>
                </div>
            </div>
        </>
    )
}