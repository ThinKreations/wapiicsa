import styles from "@/styles/Component.module.css"
import { useRouter } from "next/router"

export default function Card(){
    const router = useRouter()
    return(
        <>
            <div className={styles.dash_card} onClick={()=>{router.push('/dashboard/clases/0')}}>
                <h2>Unidad de Aprendizaje</h2>
                <div style={{display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
                    <h3>5CM51</h3>
                    <h3>2026-1</h3>
                </div>
            </div>
        </>
    )
}