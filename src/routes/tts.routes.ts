import express, { Request, Response } from "express";
import * as textToSpeech from "@google-cloud/text-to-speech";
import dotenv from "dotenv";

dotenv.config(); // must be before TextToSpeechClient is created

const router = express.Router();

const client = new textToSpeech.TextToSpeechClient(); // No need for keyFilename

router.post("/tts", async (req: any, res: any) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
    input: { ssml: `<speak>${text}</speak>` },
    voice: { languageCode: "en-US", name: "en-US-Wavenet-F" },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "inline; filename=output.mp3",
    });
    res.send(response.audioContent);
  } catch (err) {
    console.error("TTS Error:", err);
    res.status(500).json({ error: "Text-to-Speech failed" });
  }
});

export default router;
