const express = require("express");
const cors = require("cors");
const axios = require("axios");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({
  origin: "https://gorgeous-salmiakki-6699db.netlify.app"
}));
app.use(express.json());

app.post("/api/instagram", async (req, res) => {
  const { url } = req.body;
  try {
    const response = await axios.post(
      "https://fastdl.app/api/ajaxSearch",
      new URLSearchParams({ q: url }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );
    const video = response.data.data.medias[0]?.url;
    res.json({ video });
  } catch (err) {
    res.status(500).json({ error: "Download failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
