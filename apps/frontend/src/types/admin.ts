export interface AdminMetricsResponse {
  completed: number;
  inProgress: number;
}

export interface RecentResponseItem {
  id: string;
  submittedAt: string; // ISO 8601 timestamp
}

export interface AdminRecentResponsesResponse {
  responses: RecentResponseItem[];
}
