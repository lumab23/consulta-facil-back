import { registerDecorator, ValidationOptions } from 'class-validator';
import { cpf, cnpj } from 'cpf-cnpj-validator'; 

export function EhDocumentoValido(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return cpf.isValid(value) || cnpj.isValid(value);
        },
        defaultMessage() {
          return 'O CPF ou CNPJ informado é inválido';
        },
      },
    });
  };
}