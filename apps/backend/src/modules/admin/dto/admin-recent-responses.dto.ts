export interface RecentResponseItemDto {
  id: string;
  submittedAt: Date;
}

export interface AdminRecentResponsesResponseDto {
  responses: RecentResponseItemDto[];
}
