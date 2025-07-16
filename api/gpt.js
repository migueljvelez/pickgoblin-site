export default async function handler(req, res) {
  const { prompt, type } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: `Based on these emotions and intent, recommend a ${type}: ${prompt}` }],
      temperature: 0.7
    })
  });

  const data = await response.json();
  res.status(200).json(data.choices[0].message.content);
}
