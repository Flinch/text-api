import { withMethods } from "@/lib/api-middlewares/with-methods";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { db } from "@/lib/db";
import { openai } from "@/lib/openai";
import { cosinecomparison } from "@/helpers/cosine-comparison";

const reqSchema = z.object({
  text1: z.string().max(1000),
  text2: z.string().max(1000),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body as unknown;

  const apiKey = req.headers.authorization;
  if (!apiKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const parsed = reqSchema.safeParse(body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Bad Request" });
  }

  try {
    const { text1, text2 } = reqSchema.parse(body);

    const validApiKey = await db.aPIKey.findFirst({
      where: {
        key: apiKey,
        enabled: true,
      },
    });

    if (!validApiKey) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    const start = new Date();

    const embedding = await Promise.all(
      [text1, text2].map(async (text) => {
        const res = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: text,
        });

        return res.data[0].embedding;
      })
    );

    const comparison = cosinecomparison(embedding[0], embedding[1]);
    const duration = new Date().getTime() - start.getTime();

    await db.aPIRequest.create({
      data: {
        Duration: duration,
        method: req.method as string,
        path: req.url as string,
        status: 200,
        apiKeyID: validApiKey.id,
        usedAPIKey: validApiKey.key,
      },
    });
    return res.status(200).json({ success: true, text1, text2, comparison });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.issues });
    }

    return res.status(500).json({ error: "Internal Sever Error" });
  }
};

export default withMethods(["POST"], handler);
