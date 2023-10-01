import type {
  SubmissionSummarizeSubmission,
  SubmissionSummarizeCorrect,
} from './app/model'
import { evaluateType2, printEvaluationType2 } from './app/evaluation/type2'
import { loadSubmissionData, loadCorrectData } from './app/utils/data_loader'

const main = async () => {
  const submissionData = await loadSubmissionData(process.argv[2])
  const correctData = await loadCorrectData()

  // type2: summarization の評価
  const type2Evaluations = evaluateType2(
    submissionData.filter(
      (submission): submission is SubmissionSummarizeSubmission =>
        submission.task_type === 'summarization',
    ),
    correctData.filter(
      (correct): correct is SubmissionSummarizeCorrect =>
        correct.task_type === 'summarization',
    ),
  )
  printEvaluationType2(type2Evaluations)
}

main()
