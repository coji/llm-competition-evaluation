import type { SubmissionMultipleChoice } from "../model";

const findCorrectType1 = (
  submission: SubmissionMultipleChoice,
  correctData: SubmissionMultipleChoice[]
) =>
  correctData.find(
    (correct): correct is SubmissionMultipleChoice =>
      correct.id === submission.id
  );

export const evaluateType1 = (
  submissions: SubmissionMultipleChoice[],
  corrects: SubmissionMultipleChoice[]
) => {
  // 評価
  return submissions.map((submission) => {
    const correct = findCorrectType1(submission, corrects);
    return {
      isCorrect: submission.answer === correct?.answer,
      ...submission,
      correct,
    };
  });
};

export const printEvaluationType1 = (
  evaluations: ReturnType<typeof evaluateType1>
) => {
  for (const e of evaluations.filter((e) => !e.isCorrect)) {
    console.log(`ID: ${e.id}`);
    console.log("  " + e.text);
    console.log(
      "  選択肢:" +
        e.choices
          .map((choice: any, idx: number) => `${idx + 1}: ${choice.text}`)
          .join(`,`)
    );
    console.log(`  提出: ${e.answer}. ${e.choices[e.answer - 1].text}`);
    console.log(
      `  正解: ${e.correct?.answer}. ${
        e.correct?.choices[e.correct.answer - 1].text
      }`
    );
    console.log();
  }
  console.log();
  console.log(
    `Total: ${evaluations.length}, Incorrect: ${
      evaluations.filter((e) => !e.isCorrect).length
    }`
  );
};
