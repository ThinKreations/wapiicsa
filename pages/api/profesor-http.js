export async function signUp({ username, correo, contrasena }) {
  try {
    const response = await fetch("http://localhost:8000/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_profesor: username,
        correo: correo,
        contrasena: contrasena,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);
    return data;
  } catch (error) {
    console.error("Error de registro:", error);
    throw error;
  }
}

export async function login({ correo, password }) {
  /*try {
        const response = await fetch('', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.message);
        return data;

    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }*/
  return { correo, password };
}
