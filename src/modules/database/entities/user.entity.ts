import { Cliente } from 'src/modules/cliente/entities/cliente.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Processo } from 'src/modules/processos/entities/processo.entity';

@Entity({ schema: 'public', name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
  })
  nome: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  registro_oab: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  salt: string;

  @OneToMany(() => Cliente, (cliente) => cliente.user)
  clientes: Cliente[];

  @OneToMany(() => Processo, (processo) => processo.user)
  processos: Processo[];

  @Column({
    nullable: false,
    type: 'varchar',
    length: 60,
  })
  created_by: string;

  @CreateDateColumn({
    nullable: false,
    type: 'timestamp',
  })
  created_at: Date;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 60,
  })
  updated_by: string;

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  updated_at: Date;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 60,
  })
  deleted_by: string;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;
}
