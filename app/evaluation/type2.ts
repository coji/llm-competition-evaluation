import type {
  SubmissionSummarize,
  SubmissionSummarizeSubmission,
  SubmissionSummarizeCorrect,
} from "../model";
import { rouge2 } from "./rouge2";

const findCorrectType2 = (
  submission: SubmissionSummarize,
  correctData: SubmissionSummarizeCorrect[]
) => correctData.find((correct) => correct.id === submission.id);

export const evaluateType2 = (
  submissions: SubmissionSummarizeSubmission[],
  corrects: SubmissionSummarizeCorrect[]
) => {
  // 評価
  return submissions.map((submission) => {
    const correct = findCorrectType2(submission, corrects);
    return {
      score: correct ? rouge2(correct?.summary, submission.answer) : 0,
      ...submission,
      correct,
    };
  });
};

export const printEvaluationType2 = (
  evaluations: ReturnType<typeof evaluateType2>
) => {
  for (const e of evaluations) {
    console.log(`ID: ${e.id}`);
    console.log("  score: " + e.score);
    console.log("  answer : " + e.answer);
    console.log("  correct: " + e.correct?.summary);
    console.log();
  }
  console.log(
    `Total: ${evaluations.length}, Score: ${evaluations.reduce(
      (score, s) => score + s.score,
      0
    )}`
  );
};
