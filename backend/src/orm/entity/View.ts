import { Whiteboard } from './Whiteboard';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ViewAsset } from './Asset';
import { InteractionElement } from './InteractionElement';

@Entity()
export class View {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column() head: string;

  @Column() body: string;

  @Column('text', { nullable: true })
  htmlElementAttributes: string;

  @OneToMany(() => InteractionElement, ie => ie.view, {
    cascade: true,
    eager: true
  })
  interactionElements: InteractionElement[];

  @OneToMany(() => ViewAsset, asset => asset.view, {
    cascade: true,
    eager: true
  })
  css: ViewAsset[];

  @OneToMany(() => ViewAsset, asset => asset.view, {
    cascade: true,
    eager: true
  })
  js: ViewAsset[];

  @ManyToOne(() => Whiteboard)
  whiteboard: Whiteboard;
}
