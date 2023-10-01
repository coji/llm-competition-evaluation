import type { Submission } from "../model";
import { join } from "path";
import { readFile } from "fs/promises";
import { existsSync } from "fs";

export const loadCorrectData = async () => {
  const filePath = join("data", "correct_data.json");
  if (!existsSync(filePath)) {
    throw new Error("Correct data file does not exist.");
  }
  const correctDataFile = await readFile(filePath, "utf-8");
  return JSON.parse(correctDataFile) as Submission[];
};

export const loadSubmissionData = async (filePath: string) => {
  if (!existsSync(filePath)) {
    throw new Error("Correct data file does not exist.");
  }
  const submissionFile = await readFile(filePath, "utf-8");
  return JSON.parse(submissionFile) as Submission[];
};
