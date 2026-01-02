import { DocumentBuilder } from "@nestjs/swagger";

export const config = new DocumentBuilder()
    .setTitle('Consulta Fácil - Gestão Jurídica')
    .setDescription('Ecossistema de APIs para controle de processos judiciais, gestão de clientes e agendamento de audiências. Desenvolvido para alta performance e segurança de dados sensíveis.')
    .setVersion('1.2.0')
    .addTag('Segurança', 'Endpoints de autenticação e controle de acesso para advogados')
    .addTag('Operacional', 'Gestão de processos e movimentações processuais')
    .addTag('Clientes', 'Cadastro e manutenção de base de clientes (Pessoa Física e Jurídica)')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o token JWT gerado no login para acessar os recursos protegidos',
        in: 'header',
      },
      'access-token', 
    )
    .addServer('http://localhost:3333', 'Ambiente de Desenvolvimento Local')
    .addServer('https://api.consultafacil.com.br', 'Servidor de Produção')
    .build();