import styles from "@/styles/Component.module.css"
import { useRouter } from "next/router"

export default function Card(data) {
    const router = useRouter()
    return (
        <>
            <div className={styles.dash_card} onClick={() => { router.push(`/clases/${data.id}`) }}>
                <h2>{data.materia}</h2>
                <span className={styles.span_id}>{data.id}</span>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                    <h3>{data.secuencia}</h3>
                    <h3>{data.periodo}</h3>
                </div>
            </div>
        </>
    )
}