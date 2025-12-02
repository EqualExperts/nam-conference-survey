export class SurveyResponseDto {
  id: string;
  userId: string;
  status: string;
  createdAt: string;
  message: string;

  constructor(id: string, userId: string, status: string, createdAt: Date) {
    this.id = id;
    this.userId = userId;
    this.status = status.toLowerCase();
    this.createdAt = createdAt.toISOString();
    this.message = 'Survey submitted successfully';
  }
}
