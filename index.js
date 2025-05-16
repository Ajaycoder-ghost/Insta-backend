const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json()); // THIS IS REQUIRED TO PARSE JSON BODY

app.post("/api/instagram", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

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
    if (video) {
      res.json({ video });
    } else {
      res.status(404).json({ error: "Video not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
