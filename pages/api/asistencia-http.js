const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Swal from "sweetalert2";
import { logIn } from "./invitado-http";

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
    if (res.status === 403) {
      /*Swal.fire({
        title: "Clase inaccesible",
        allowEscapeKey: false,
        allowOutsideClick: false,
        html: `
          <button onclick="window.history.back()" styles="border:none, background-color:transparent">V o l v e r</button>
        `,
        showConfirmButton: false,
        imageUrl:
          "https://th.bing.com/th/id/OIP.UaHuNAasoL0awY6isNE-UwAAAA?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
      });*/
    }
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
