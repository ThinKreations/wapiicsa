import logo from "@/src/logo.png";
import MainHead from "@/components/MainHead";
import Image from "next/image";
import styles from "@/styles/Dashboard.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import Card from "@/components/Card";
import load from "@/src/loading.gif"

export default function Dashboard({ clases }) {

  const router = useRouter();
  const [view, setView] = useState(0);
  const [loading, setLoading] = useState(true);
  let user_profesor = "axel"


  const changeView = (value) => {
    setView(value);
    localStorage.setItem("view", value)
  };

  const setViewByLocalStorage = () => {
    setView(localStorage.getItem("view"))
  }
  /*
  const getClases = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/clases?user_profesor=${user_profesor}`
      );
      const data = await res.json();
      setClases(data.data);
    } catch (err) {
      console.error("Error al obtener clases:", err);
    } finally {
      setLoading(false);
    }
  };
  */
  useEffect(() => {
    setViewByLocalStorage();
    console.log(clases)
  }, []);

  return (
    <>
      <MainHead title="WAPA" />
      <Header user_profesor={user_profesor} />
      <div className={styles.dash_container}>
        <div className={styles.dash_ctrl}>
          <div>
            {/*
            <form className={styles.dash_ctrl_srch}>
              <input className={styles.dash_ctrl_srch_input} placeholder="Buscar clase o secuencia"/>
              <button className={`${styles.dash_ctrl_srch_btn} material-icons`} type="button">search</button>
            </form>
            */}
            <h1>Bienvenido</h1>
          </div>
          <div className={styles.dash_ctrl_view}>
            <button
              className={`${styles.dash_ctrl_view_btn} material-icons`}
              style={view === 0 ? { color: "black" } : {}}
              onClick={() => changeView(0)}
            >
              dashboard
            </button>
            <button
              className={`${styles.dash_ctrl_view_btn} material-icons`}
              style={view === 1 ? { color: "black" } : {}}
              onClick={() => changeView(1)}
            >
              view_list
            </button>
            <button
              className={styles.btn_agregar}
              onClick={() => router.push("/clases/agregar")}
            >
              + Agregar
            </button>
          </div>
        </div>
        {!loading ?
          view == 0 ? (
            <div className={styles.dash_card_container}>
              {clases.map((c) => {
                return (
                  <Card
                    key={c.id_clase}
                    id={c.id_clase}
                    materia={c.materia}
                    periodo={c.periodo}
                    secuencia={c.secuencia}
                  />
                )
              })
              }
            </div>
          ) : (
            <div className={styles.dash_table_container}>
              <table className={styles.dash_table}>
                <thead>
                  <tr>
                    <th
                      onClick={() => {
                        console.log("Orenar por U.A.");
                      }}
                    >
                      Clase
                    </th>
                    <th
                      style={{ width: "20%" }}
                      onClick={() => {
                        console.log("Orenar por Secuencia.");
                      }}
                    >
                      Secuencia
                    </th>
                    <th style={{ width: "20%" }}>Periodo</th>
                  </tr>
                </thead>
                <tbody>
                  {clases.map((c) => {
                    return (
                      <tr
                        className={styles.dash_table_class}
                        onClick={() => {
                          router.push(`/clases/${c.id_clase}`);
                        }}
                      >
                        <td
                          className={styles.dash_table_class_name}
                          style={{ textAlign: "left" }}
                        >
                          <p style={{ borderRight: "1px solid var(--input-border)" }}>
                            {c.materia}
                          </p>
                        </td>
                        <td style={{ width: "25%" }}>
                          <p style={{ borderRight: "1px solid var(--input-border)" }}>
                            {c.secuencia}
                          </p>
                        </td>
                        <td style={{ width: "20%" }}>
                          <p>{c.periodo}</p>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
          :
          (
            <div className={styles.loading}>
              <Image src={load} width={100} alt="Cargando..." />
              <br /><font color="gray">Cargando...</font>
            </div>
          )
        }
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies;

  let res;

  try {
    res = await fetch("http://localhost:8000/api/clases", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        user_profesor: user_profesor,
      }),
    });
  } catch (e) {
    return { props: { clases: [] } };
  }
  if (!res.ok) {
    return { props: { clases: [] } };
  }

  const resJSON = await res.json();

  return {
    props: {
      clases: resJSON.data || [],
    },
  };
}