'use-client'
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2";
import styles from '@/styles/Component.module.css'
import { useRouter } from "next/router";

export default function Uploader() {
    const [file, setFile] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const fileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const upload = async (e) => {
        if (!file) {
            Swal.fire({
                title: 'Selecciona un archivo PDF',
                icon: 'error',
                timer: '1500'
            })
            console.log("xd")
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await axios.post("url".formData, {
                headers: {
                    'Content-Type': 'multipart/formdata'
                    //Validar sesión
                }
            })
            Swal.fire({
                titleText: 'Grupo subido',
                icon: 'success',
                theme: 'bootstrap-4-dark',
                allowOutsideClick: 'false',
                showCloseButton: 'true'
            })
        } catch (err) {
            Swal.fire({
                titleText: 'Error al subir el archivo',
                icon: 'error',
                timer: '500'
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={styles.uploader_container}>
                <form onSubmit={upload}>
                    <div className={styles.uploader_input_container}>
                        <input accept="application/pdf" type="file" onChange={fileChange} disabled={loading} />
                    </div>
                    <button className={styles.u_cancel} type="button" onClick={() => { router.push('/clases/') }}>Cancelar</button>
                    <button className={styles.u_submit} type="submit">{loading ? 'Subiendo...' : 'Subir PDF'}</button>
                </form>

            </div>
        </>
    )

}