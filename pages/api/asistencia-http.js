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

    const data = await res.JSON;

    if (!res.ok) {
      throw new Error();
    }

    return data;
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
