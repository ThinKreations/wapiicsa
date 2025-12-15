const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Swal from "sweetalert2";

export async function nuevo({ id }) {
  try {
    const res = await fetch(`${API_URL}/nuevo-invitado/${id}`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      credentials: "include",
    });
    const resJSON = await res.json();
    if (res.status === 403) {
    }
    if (!res.ok) {
      Swal.fire({
        icon: "error",
        title: "Error al generar invitado.",
        timer: 1000,
      });
    }
    return { resJSON, res };
  } catch (e) {
    console.error(e);
  }
}

export async function logIn({ id }) {
  try {
    const res = await fetch(`${API_URL}/invitado/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_invitado: parseInt(id),
      }),
      credentials: "include",
    });
    const resJSON = await res.json();
    console.log(res, resJSON);
    const clase = resJSON.clase;
    if (res.status === 401) {
      Swal.fire({
        icon: "error",
        title: "ID inválida",
        timer: "1000",
      });
      return { res, resJSON };
    }
    return clase;
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: `Error`,
      timer: "1000",
    });
  }
}

export async function setAsistencia({ id, user, boleta }) {
  try {
    const res = fetch("", {
      method: "POST",
      headers: { "Content/Type": "application/json" },
      body: {
        id_clase: id,
        user_profesor: user,
        boleta: boleta,
      },
    });

    const resJSON = await res.JSON;

    if (!res.ok) {
      throw new Error();
    }

    return resJSON;
  } catch (error) {
    console.error(error);
  }
}

export async function modAsistencia({ id, user, boleta }) {
  try {
    const res = fetch("", {
      method: "PUT",
      headers: { "Content/Type": "application/json" },
      body: {
        id_clase: id,
        user_profesor: user,
        boleta: boleta,
      },
    });

    const data = await res.JSON;

    if (!res.ok) {
      throw new Error();
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
