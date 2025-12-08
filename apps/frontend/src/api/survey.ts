import { SurveyFormState, SurveySubmissionResponse } from '../types/survey';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function submitSurvey(data: SurveyFormState): Promise<SurveySubmissionResponse> {
  const response = await fetch(`${API_BASE_URL}/survey/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit survey');
  }

  return response.json();
}