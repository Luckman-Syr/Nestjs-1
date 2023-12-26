import { User } from 'src/user/entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Comment } from 'src/comment/entities/comment.entity';
import { Topic } from 'src/topic/entities/topic.entity';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'nestjs',
  host: 'localhost',
  port: 35000,
  username: 'postgres',
  password: 'postgres',
  entities: [User, Comment, Topic],
  synchronize: true,
};

export default config;
