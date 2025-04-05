import { NextApiRequest, NextApiResponse } from "next";

const CELESTIA_NODE_URL = "https://YOUR_CELESTIA_NODE";
const CELESTIA_AUTH_TOKEN = "YOUR_AUTH_TOKEN";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { candidate } = req.body;

    if (!candidate) {
      return res.status(400).json({ error: "Candidate name is required" });
    }

    const payload = {
      namespace_id: "0000000000000001",
      data: Buffer.from(JSON.stringify({ candidate, timestamp: Date.now() })).toString("base64"),
    };

    const response = await fetch(`${CELESTIA_NODE_URL}/submit_blob`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CELESTIA_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Celestia API error: ${response.statusText}`);
    }

    const result = await response.json();
    res.status(200).json({ success: true, result });

  } catch (error) {
    console.error("Error storing data on Celestia:", error);
    res.status(500).json({ error: "Failed to store data on Celestia" });
  }
}
