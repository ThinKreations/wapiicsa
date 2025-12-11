export default async function scrap(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL no proporcionada" });
  }

  try {
    const response = await fetch(url);
    const html = await response.text();
    res.status(200).json({ html });
  } catch (error) {
    res.status(500).json({ error: "Error leyendo la página" });
  }
}
