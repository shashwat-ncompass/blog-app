import { Topic } from "src/typeorm/entities/topic.entity";

export class assignTopicRoleParams {
  userId: string;
  role: string
  topicDetails: string;
}
