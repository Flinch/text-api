import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import z from "zod";
import { withMethods } from "@/lib/api-middlewares/with-methods";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await getServerSession(req, res, authOptions).then(
      (res) => res?.user
    );

    if (!user) {
      return res.status(401).json({
        error: "Unauthorized to perform this action",
        createdAPIKey: null,
      });
    }

    const existingAPIKey = await db.aPIKey.findFirst({
      where: {
        userId: user.id,
        enabled: true,
      },
    });

    if (existingAPIKey) {
      return res.status(400).json({
        error: "You already have a valid API key",
        createdAPIKey: "null",
      });
    }

    const createdAPIKey = await db.aPIKey.create({
      data: {
        userId: user.id,
        key: nanoid(),
      },
    });
    return res.status(200).json({
      error: "null",
      createdAPIKey,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: error.issues,
        createdAPIKey: null,
      });
    }

    return res.status(500).json({
      error: "Internal Server Error",
      createdAPIKey: null,
    });
  }
};

export default withMethods(["GET"], handler);
