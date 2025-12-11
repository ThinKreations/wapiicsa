'use-client'
import axios from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL;
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
        e.preventDefault();
        if (!file) return
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('pdf', file);
            const res = await axios.post(`${API_URL}/clases`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res);
            if (res.status !== 200) {
                Swal.fire({
                    titleText: 'Error al subir grupo.',
                    icon: 'error',
                    allowOutsideClick: 'false',
                    timer: 1000
                })
                return;
            }
            Swal.fire({
                titleText: 'Grupo subido',
                icon: 'success',
                timer: 1000
            })
        } catch (err) {
            Swal.fire({
                titleText: 'Error al subir el archivo',
                icon: 'error',
                timer: 1000
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={styles.uploader_container}>
                <form onSubmit={upload}>
                    <div className={styles.uploader_input_container} style={file ? { filter: 'opacity(80%)' } : {}}>
                        <input accept="application/pdf" type="file" onChange={fileChange} disabled={loading} />
                        <center><p>Selecciona el ícono, o arrastra tu PDF aquí.</p></center>

                    </div>
                    <br />
                    <button className={styles.u_cancel} type="button" onClick={() => { router.push('/clases/') }}>Cancelar</button>
                    <button className={styles.u_submit} disabled={!file} style={!file ? { backgroundColor: 'rgb(100,100,100)' } : {}} type="submit">{loading ? 'Subiendo...' : 'Subir PDF'}</button>
                </form>
            </div>
        </>
    )

}