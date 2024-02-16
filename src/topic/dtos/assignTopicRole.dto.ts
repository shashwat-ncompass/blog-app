import { Topic } from "src/typeorm/entities/topic.entity";

export class assignTopicRoleDto {
  userId: string;
  role: string
  topicDetails: string;
}
