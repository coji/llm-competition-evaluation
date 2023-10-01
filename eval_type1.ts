import type { SubmissionMultipleChoice } from './app/model'
import { loadSubmissionData, loadCorrectData } from './app/utils/data_loader'
import { evaluateType1, printEvaluationType1 } from './app/evaluation/type1'

const main = async () => {
  const submissionData = await loadSubmissionData(process.argv[2])
  const correctData = await loadCorrectData()

  // type1: multiple_choice の評価
  const type1Evaluations = evaluateType1(
    submissionData.filter(
      (submission): submission is SubmissionMultipleChoice =>
        submission.task_type === 'multiple_choice',
    ),
    correctData.filter(
      (correct): correct is SubmissionMultipleChoice =>
        correct.task_type === 'multiple_choice',
    ),
  )
  printEvaluationType1(type1Evaluations)
}

main()
