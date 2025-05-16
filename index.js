const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
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
          "x-requested-with": "XMLHttpRequest"
        }
      }
    );

    const video = response.data.data[0]?.links?.[0]?.url;
    res.json({ video });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video." });
  }
});

// Use Render's assigned port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
