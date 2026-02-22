const axios = require("axios");

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;

async function askHF(message) {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/Step/Step-3.5-Flash",
      {
        inputs: message,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7
        }
      },
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data[0].generated_text;

  } catch (error) {
    console.error("HF Error:", error.response?.data || error.message);
  }
}