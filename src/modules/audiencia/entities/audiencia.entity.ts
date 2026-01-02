import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Processo } from 'src/modules/processos/entities/processo.entity';

@Entity({ schema: 'public', name: 'hearings' })
export class Audiencia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'timestamp', 
    nullable: false 
  })
  data: Date;

  @Column({ 
    type: 'varchar', 
    length: 300, 
    nullable: true 
  })
  local: string;

  @Column({ 
    type: 'text', 
    nullable: true 
  })
  notas: string;

  @ManyToOne(() => Processo, (processo) => processo.audiencias)
  @JoinColumn({ name: 'case_id' })
  processo: Processo;

  @Column({ 
    type: 'int', 
    nullable: false 
  })
  case_id: number;

  @Column({ 
    type: 'varchar', 
    length: 60, 
    nullable: false 
  })
  created_by: string; 

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ 
    type: 'varchar', 
    length: 60, 
    nullable: true 
  })
  updated_by: string;

  @UpdateDateColumn({ 
    type: 'timestamp', 
    nullable: true 
  })
  updated_at: Date;

  @Column({ 
    type: 'varchar', 
    length: 60, 
    nullable: true 
  })
  deleted_by: string;

  @DeleteDateColumn({ 
    type: 'timestamp', 
    nullable: true 
  })
  deleted_at: Date;
}