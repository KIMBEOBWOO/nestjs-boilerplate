import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryColumn({ primaryKeyConstraintName: 'pk_post_id' })
  @Generated()
  id!: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  title!: string;

  @Column({ type: 'text', default: '' })
  description!: string;
}
