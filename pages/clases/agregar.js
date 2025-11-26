import MainHead from "@/components/MainHead"
import Header from "@/components/Header"
import styles from "@/styles/Dashboard.module.css"

export default function agregar(){
    return(
    <>
        <MainHead title="Agregar"/>
        <Header/>
        <div className={styles.dash_container}>
            <div className={styles.dash_ctrl}>
                <div>
                    {/*
                    <form className={styles.dash_ctrl_srch}>
                    <input className={styles.dash_ctrl_srch_input} placeholder="Buscar clase o secuencia"/>
                    <button className={`${styles.dash_ctrl_srch_btn} material-icons`} type="button">search</button>
                    </form>
                    */}
                    <h1>Agregar una clase</h1>
                </div>
                <div>
                    ‎
                </div>
            </div>
            <div>
                xd
            </div>
        </div>
        
    </>
    )
}