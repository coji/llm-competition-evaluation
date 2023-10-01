export interface SubmissionMultipleChoice {
  id: number
  task_type: 'multiple_choice'
  text: string
  choices: { choice_id: 1 | 2 | 3 | 4 | 5; text: string }[]
  answer: 1 | 2 | 3 | 4 | 5
}

export interface SubmissionSummarizeSubmission {
  id: number
  task_type: 'summarization'
  text: string
  answer: string
}

export interface SubmissionSummarizeCorrect {
  id: number
  task_type: 'summarization'
  text: string
  summary: string
}

export type SubmissionSummarize =
  | SubmissionSummarizeSubmission
  | SubmissionSummarizeCorrect

export type Submission = SubmissionMultipleChoice | SubmissionSummarize
