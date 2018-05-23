import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Whiteboard } from './Whiteboard';

@Entity()
export class Project {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @OneToMany(() => Whiteboard, whiteboard => whiteboard.project, {
    cascade: true,
    eager: true
  })
  whiteboards: Whiteboard[];
}
