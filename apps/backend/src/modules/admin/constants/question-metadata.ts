export interface QuestionMetadata {
  questionNumber: number;
  questionText: string;
  questionType: 'likert' | 'multi-select' | 'ranking' | 'open-ended' | 'single-choice';
  field: string;
  otherField?: string;
  commentField?: string;
  likertLabels?: Record<number, string>;
}

export const LIKERT_LABELS = {
  standard: {
    5: 'Excellent',
    4: 'Good',
    3: 'Neutral',
    2: 'Fair',
    1: 'Poor',
  },
  returnIntent: {
    5: 'Definitely yes',
    4: 'Probably yes',
    3: 'Unsure',
    2: 'Probably not',
    1: 'Definitely not',
  },
  coworkingValue: {
    5: 'Extremely valuable',
    4: 'Very valuable',
    3: 'Moderately valuable',
    2: 'Slightly valuable',
    1: 'Not at all valuable',
  },
  connectionDepth: {
    5: 'Deep, meaningful professional relationships',
    4: 'Strong connections with potential for follow-up',
    3: 'Good conversations and exchanges',
    2: 'Mostly surface-level introductions',
    1: 'Minimal meaningful interaction',
  },
  learningValue: {
    5: 'Excellent - learned significant new skills/knowledge',
    4: 'Good - learned useful things',
    3: 'Neutral - some learning but limited',
    2: 'Fair - minimal learning value',
    1: 'Poor - did not learn anything meaningful',
  },
  saturdayWorth: {
    5: 'Absolutely worth it',
    4: 'Mostly worth it',
    3: 'Neutral',
    2: 'Questionable value for my time',
    1: 'Not worth my Saturday',
  },
  preCommunication: {
    5: 'Very clear - knew exactly what to expect',
    4: 'Mostly clear',
    3: 'Somewhat clear',
    2: 'Unclear in some areas',
    1: 'Very unclear - arrived unsure what to expect',
  },
  comparison: {
    5: 'Much better than other opportunities',
    4: 'Somewhat better',
    3: 'About the same',
    2: 'Somewhat worse',
    1: 'Much worse',
  },
};

export const QUESTION_METADATA: QuestionMetadata[] = [
  {
    questionNumber: 1,
    questionText: 'How would you rate your overall NAM Conference experience?',
    questionType: 'likert',
    field: 'q1OverallRating',
    commentField: 'q1Comment',
    likertLabels: LIKERT_LABELS.standard,
  },
  {
    questionNumber: 2,
    questionText: 'Would you want to attend NAM Conference again next year?',
    questionType: 'likert',
    field: 'q2ReturnIntent',
    commentField: 'q2Comment',
    likertLabels: LIKERT_LABELS.returnIntent,
  },
  {
    questionNumber: 3,
    questionText: 'How valuable was the coworking day for networking and collaboration?',
    questionType: 'likert',
    field: 'q3CoworkingEffectiveness',
    commentField: 'q3Comment',
    likertLabels: LIKERT_LABELS.coworkingValue,
  },
  {
    questionNumber: 4,
    questionText: 'Who did you most value connecting with at this conference?',
    questionType: 'multi-select',
    field: 'q4ConnectionTypes',
    otherField: 'q4ConnectionOther',
    commentField: 'q4Comment',
  },
  {
    questionNumber: 5,
    questionText: 'How would you describe the quality of connections you made at this conference?',
    questionType: 'likert',
    field: 'q5ConnectionDepth',
    commentField: 'q5Comment',
    likertLabels: LIKERT_LABELS.connectionDepth,
  },
  {
    questionNumber: 6,
    questionText: 'How would you rate the educational/learning value of the conference content?',
    questionType: 'likert',
    field: 'q6LearningValue',
    commentField: 'q6Comment',
    likertLabels: LIKERT_LABELS.learningValue,
  },
  {
    questionNumber: 7,
    questionText: 'What topics would you like to see at future conferences?',
    questionType: 'open-ended',
    field: 'q7FutureTopics',
  },
  {
    questionNumber: 8,
    questionText: 'The conference asks you to use personal time on a Saturday. Was this time commitment worth it for you?',
    questionType: 'likert',
    field: 'q8SaturdayWorth',
    commentField: 'q8Comment',
    likertLabels: LIKERT_LABELS.saturdayWorth,
  },
  {
    questionNumber: 9,
    questionText: 'How clear were your expectations before arriving at the conference?',
    questionType: 'likert',
    field: 'q9PreConferenceCommunication',
    commentField: 'q9Comment',
    likertLabels: LIKERT_LABELS.preCommunication,
  },
  {
    questionNumber: 10,
    questionText: 'How would you rate the hotel accommodations, conference venue, and catered meals and snacks?',
    questionType: 'likert',
    field: 'q10AccommodationsVenue',
    commentField: 'q10Comment',
    likertLabels: LIKERT_LABELS.standard,
  },
  {
    questionNumber: 11,
    questionText: 'Rank the following session types in order of value to you',
    questionType: 'ranking',
    field: 'q11SessionRankings',
  },
  {
    questionNumber: 12,
    questionText: 'Was the overall conference length appropriate?',
    questionType: 'single-choice',
    field: 'q12ConferenceLength',
    commentField: 'q12Comment',
  },
  {
    questionNumber: 13,
    questionText: "How does NAM Conference compare to other professional development opportunities you've experienced?",
    questionType: 'likert',
    field: 'q13ComparisonToPD',
    commentField: 'q13Comment',
    likertLabels: LIKERT_LABELS.comparison,
  },
  {
    questionNumber: 14,
    questionText: 'What did you like most about the conference?',
    questionType: 'open-ended',
    field: 'q14LikedMost',
  },
  {
    questionNumber: 15,
    questionText: "Is there anything else you'd like us to know about your conference experience?",
    questionType: 'open-ended',
    field: 'q15AdditionalFeedback',
  },
  {
    questionNumber: 16,
    questionText: 'If you attended the last NAM Conference, did you notice improvements based on previous feedback?',
    questionType: 'single-choice',
    field: 'q16Improvements',
    commentField: 'q16Comment',
  },
  {
    questionNumber: 17,
    questionText: 'What would make you most confident that your feedback will be acted upon?',
    questionType: 'multi-select',
    field: 'q17FeedbackConfidence',
    otherField: 'q17FeedbackOther',
  },
  {
    questionNumber: 18,
    questionText: 'What is your current status with Equal Experts?',
    questionType: 'single-choice',
    field: 'q18EmploymentStatus',
  },
  {
    questionNumber: 19,
    questionText: 'If comfortable please provide your name and home city and state',
    questionType: 'open-ended',
    field: 'q19Name',
    otherField: 'q19Location',
  },
];
