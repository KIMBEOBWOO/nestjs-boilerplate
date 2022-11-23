import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity('post')
export class Post {
  @PrimaryColumn()
  @Generated()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;
}
