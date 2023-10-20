import { ApiKey } from "@prisma/client";
import type { ZodIssue } from "zod";

export interface CreateAPIData {
  error: string | ZodIssue[] | null;
  createdAPIKey: ApiKey | null;
}

export interface revokeAPIData {
  error: string | ZodIssue[] | null;
  success: boolean;
}
