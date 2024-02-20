// get-topic-by-id.dto.ts
export class GetTopicByIdDto {
  topicId: string;
  name: string;
  description: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
