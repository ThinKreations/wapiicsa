import MainHead from "@/components/MainHead";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function Clase(){
    const router = useRouter()
    const {id} = router.query;
    return(
        <>
            <MainHead title={id}/>
            <Header/>
        </>
    )
    
}
/*
const getServerSideProps = async ({id}) =>{
    //Aquí usar el id para realizar el manejo de sesiones y la obtención de los datos de la clase, no?
}
*/