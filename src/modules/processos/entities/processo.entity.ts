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
import { Cliente } from 'src/modules/cliente/entities/cliente.entity';
import { ProcessoStatus } from '../enums/processo-status.enum';
import { Audiencia } from 'src/modules/audiencia/entities/audiencia.entity';

@Entity({
  schema: 'public',
  name: 'cases',
})
export class Processo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
    name: 'numero_processo',
  })
  numeroProcesso: string;

  @Column({
    type: 'varchar',
    length: 300,
    nullable: false,
  })
  titulo: string;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  forum: string;

  @Column({
    type: 'enum',
    enum: ProcessoStatus,
    default: ProcessoStatus.PENDENTE,
  })
  status: ProcessoStatus;

  @Column({
    type: 'timestamp',
    nullable: true,
    name: 'last_update_at',
  })
  lastUpdateAt: Date;

  @ManyToOne(() => User, (user) => user.processos)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @Column({
    type: 'int',
    nullable: false,
  })
  user_id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.processos)
  @JoinColumn({
    name: 'client_id',
  })
  cliente: Cliente;

  @Column({
    type: 'int',
    nullable: false,
  })
  client_id: number;

  @OneToMany(() => Audiencia, (audiencia) => audiencia.processo) 
  audiencias: Audiencia[];

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
