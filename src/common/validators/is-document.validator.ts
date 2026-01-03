import { registerDecorator, ValidationOptions } from 'class-validator';

export function EhDocumentoValido(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          
          if (!value) return true;

          const valorLimpo = String(value).replace(/\D/g, '');

          return valorLimpo.length === 11 || valorLimpo.length === 14;
        },
        defaultMessage() {
          return 'O documento deve ter 11 dígitos (CPF) ou 14 dígitos (CNPJ)';
        },
      },
    });
  };
}