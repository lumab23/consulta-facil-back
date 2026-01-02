import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/database/entities/user.entity";
import { Repository } from "typeorm";
import { SignUpInput } from "../dto/inputs/registro.input";
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {

    constructor(
        @InjectRepository(User)
        private readonly advogadoRepo: Repository<User>
    ) {}

    async signUp(dadosRegistro: SignUpInput) {
        const registroExistente = await this.advogadoRepo.findOne({
            where: [
                { email: dadosRegistro.email },
                { registro_oab: dadosRegistro.registro_oab }
            ]
        });

        if (registroExistente) {
            this.validarDuplicidade(registroExistente, dadosRegistro);
        }

        const rodadasDeSalt = 10;
        const chaveSalt = await bcrypt.genSalt(rodadasDeSalt);
        const senhaCriptografada = await bcrypt.hash(dadosRegistro.password, chaveSalt);

        const novoAdvogado = this.advogadoRepo.create({
            ...dadosRegistro,
            password: senhaCriptografada,
            salt: chaveSalt,
            created_by: dadosRegistro.created_by
        });

        const advogadoSalvo = await this.advogadoRepo.save(novoAdvogado);

        const { password, salt, ...dadosPublicos } = advogadoSalvo;

        return dadosPublicos;
    }

    private validarDuplicidade(existente: User, entrada: SignUpInput) {
        if (existente.email === entrada.email) {
            throw new ConflictException("O e-mail informado já está vinculado a uma conta jurídica.");
        }     
        if (existente.registro_oab === entrada.registro_oab) {
            throw new ConflictException("Este registro OAB já consta em nossa base de advogados.");
        }
    }
}