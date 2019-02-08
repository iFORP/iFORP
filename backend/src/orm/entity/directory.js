import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Page } from './page';
import { Image } from './image';

@Entity()
export class Directory {
  @PrimaryGeneratedColumn()
  id = undefined;

  @Column('text')
  name = undefined;

  @OneToMany(() => Page, page => page.directory, {
    cascade: true,
    eager: true
  })
  pages = undefined;

  @OneToMany(() => Image, image => image.directory, {
    cascade: true,
    eager: true
  })
  images = undefined;
}
