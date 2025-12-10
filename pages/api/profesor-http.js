const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Swal from "sweetalert2";

export async function signUp({ username, correo, contrasena }) {
  try {
    const res = await fetch(`${API_URL}/registro`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_profesor: username,
        correo: correo,
        contrasena: contrasena,
      }),
    });
    console.log(res);
    const resJSON = await res.json();
    if (res.status !== 200) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        timer: 1000,
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "¡Registro exitoso!",
      timer: 1000,
    });
    return { res, resJSON };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ha ocurrido un error",
      timer: 1000,
    });
    return;
  }
}

export async function logIn({ username, contrasena }) {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_profesor: username,
        contrasena: contrasena,
      }),
    });
    const resJSON = await res.json();
    if (res.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Contraseña incorrecta",
        timer: "1000",
      });
    }
    Swal.fire({
      icon: "success",
      timer: "1000",
    });
    console.log(resJSON);
  } catch (error) {
    console.error(error);
  }
}

export async function recPassword({ username, correo }) {
  try {
    const res = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_profesor: username,
        correo: correo,
      }),
    });
    const resJSON = await res.json();
    if (!res.ok) {
      throw new Error(resJSON.message);
    }
    return resJSON;
  } catch (error) {
    console.error("Error al recuperar:", error);
  }
}

export async function camPassword({ username, correo, passActual, passNueva }) {
  try {
    const res = await fetch("", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_profesor: username,
        correo: correo,
        passActual: passActual,
        passNueva: passNueva,
      }),
    });
    const resJSON = await res.json();
    if (!res.ok) {
      throw new Error(resJSON.message);
    }
    return resJSON;
  } catch (error) {
    console.error("Error al cambiar:", error);
  }
}
