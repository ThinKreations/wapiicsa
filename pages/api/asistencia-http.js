const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Swal from "sweetalert2";

export async function getAsistencias(id) {
  try {
    const res = await fetch(`${API_URL}/clases/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const resJSON = await res.json();
    const clase = resJSON.clase;
    const alumnos = resJSON.alumnos;
    const asistencias = resJSON.asistencias;
    const fechas = resJSON.fechas;
    return { clase, alumnos, asistencias, fechas };
  } catch (error) {
    console.error(error);
  }
}

export async function postAsistencia({ id, boleta }) {
  try {
    const res = await fetch(`${API_URL}/clases/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_clase: id,
        boleta_fk: boleta,
      }),
      credentials: "include",
    });
    const resJSON = await res.json();
    if (!res.ok) {
      throw new Error();
    }
    return { resJSON };
  } catch (error) {
    console.error(error);
  }
}

export async function putAsistencia({ id, boleta, fecha, aof }) {
  try {
    const res = await fetch(`${API_URL}/clases/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        boleta_fk: boleta,
        fecha: fecha,
        aof: aof,
      }),
      credentials: "include",
    });

    const resJSON = await res.json();
    if (!res.ok) {
      throw new Error();
    }
    return resJSON;
  } catch (error) {
    console.error(error);
  }
}
