import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/modules/database/entities/user.entity';
import { Processo } from 'src/modules/processos/entities/processo.entity';

@Entity({ schema: 'public', name: 'clientes' })
export class Cliente {
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
    length: 20,
    nullable: true,
    unique: true,
    name: 'documento',
  })
  documento: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
    name: 'telefone',
  })
  telefone: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'observacoes',
  })
  observacoes: string;

  @ManyToOne(() => User, (user) => user.clientes)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({
    type: 'int',
    nullable: false,
  })
  user_id: number;

  @OneToMany(() => Processo, (processo) => processo.cliente)
  processos: Processo[];

  @Column({
    type: 'varchar',
    length: 60,
    nullable: false,
  })
  created_by: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
  })
  updated_by: string;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;

  @Column({
    type: 'varchar',
    length: 60,
    nullable: true,
  })
  deleted_by: string;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deleted_at: Date;
}
