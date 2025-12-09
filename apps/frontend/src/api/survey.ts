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
    let errorMessage = `Failed to submit survey: ${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (parseError) {
      // Response body is not valid JSON, use the default error message
    }

    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (parseError) {
    throw new Error('Invalid response from server. Please try again.');
  }
}