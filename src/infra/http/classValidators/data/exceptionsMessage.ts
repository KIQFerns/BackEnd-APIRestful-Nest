export const ExceptionMessage = {
  IsNotEmpty: (property: string) => `O campo ${property} é obrigatório.`,
  IsEmail: (property: string) => `O campo ${property} deve ser um email.`,
  IsNumber: (property: string) =>
    `O campo ${property} deve ser um número inteiro.`,
  IsDecimal: (property: string) =>
    `O campo ${property} deve ser um número decimal.`,
  IsString: (property: string) =>
    `O campo ${property} deve estar no formato string.`,
  MinLength: (min: number, property: string) =>
    `O campo ${property} deve ter no mínimo ${min} caracteres.`,
  IsIn: (options: string[], property: string) =>
    `O campo ${property} deve estar entre as opções: ${options}.`,
};
