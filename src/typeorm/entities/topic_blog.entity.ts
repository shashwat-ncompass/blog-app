import { 
    Entity, 
    PrimaryColumn, 
    OneToOne, 
    JoinColumn  
} from 'typeorm';
import { Blog } from './blog.entity';
import { Topic } from './topic.entity';

@Entity()
export class TopicBlog {
    @PrimaryColumn({ name: 'ID', length: 200 })
    id: string

    @OneToOne(() => Topic)
    @JoinColumn()
    topicDetails: Topic

    @OneToOne(() => Blog)
    @JoinColumn()
    BlogDetails: Blog  
}

