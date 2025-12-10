import { AdminMetricsResponse, AdminRecentResponsesResponse, ResponseDetailDto } from '../types/admin';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export async function getAdminMetrics(): Promise<AdminMetricsResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/metrics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch admin metrics');
  }

  return response.json();
}

export async function getAdminRecentResponses(): Promise<AdminRecentResponsesResponse> {
  const response = await fetch(`${API_BASE_URL}/admin/recent-responses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recent responses');
  }

  return response.json();
}

export async function getResponseDetail(id: string): Promise<ResponseDetailDto> {
  const response = await fetch(`${API_BASE_URL}/admin/responses/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch response detail');
  }

  return response.json();
}
