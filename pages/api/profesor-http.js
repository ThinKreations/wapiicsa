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
      credentials: "include",
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

      return { res, resJSON };
    }
    return { res, resJSON };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: `Error`,
      timer: "1000",
    });
  }
}

export async function logOut() {
  try {
    const res = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const resJSON = await res.json();
    if (res.status !== 200) {
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        timer: 1000,
      });
      return { res, resJSON };
    }
    return { res, resJSON };
  } catch (errors) {
    Swal.fire({
      icon: "error",
      title: "Error al cerrar sesión",
      timer: 1000,
    });
  }
}

export async function verDatos() {
  try {
    const res = await fetch(`${API_URL}/cambiar-contrasena`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const resJSON = await res.json();
    console.log(resJSON);
    return { resJSON };
  } catch (e) {
    console.error(e);
  }
}

export async function recPassword({ username, correo }) {
  try {
    const res = await fetch(`${API_URL}/recuperar-cuenta`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_profesor: username,
        correo: correo,
      }),
    });
    const resJSON = await res.json();
    console.log(res, resJSON);

    if (res.status === 404) {
      Swal.fire({
        icon: "error",
        title: "404",
        text: "Profesor no encontrado",
        showConfirmButton: false,
        timer: 2500,
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Correo enviado",
      text: "No olvides revisar SPAM",
      timer: 2500,
    });
    console.log(res, resJSON);
    return resJSON;
  } catch (error) {
    console.error("Error al recuperar:", error);
  }
}

export async function camPassword({ correo, passNueva }) {
  try {
    const res = await fetch(`${API_URL}/cambiar-password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correo: correo,
        contrasena: passNueva,
      }),
      credentials: "include",
    });
    const resJSON = await res.json();
    console.log(resJSON);
    if (!res.ok) {
      throw new Error(resJSON.message);
    }
    return resJSON;
  } catch (error) {
    console.error("Error al cambiar:", error);
  }
}
