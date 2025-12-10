const API_URL = process.env.NEXT_PUBLIC_API_URL;
import Swal from "sweetalert2";

export default async function (req) {
  const { file } = req.body;
  const res = await fetch(`${API_URL}/clases`, {
    method: "POST",
    headers: {
      Authorization: "Bearer TOKEN",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ file }),
  });
  const resJSON = res.json();
  if (!res.ok) {
    Swal.fire({
      icon: "error",
      title: "Error al subir PDF.",
      timer: 1000,
    });
  }
  return { resJSON, res };
}
