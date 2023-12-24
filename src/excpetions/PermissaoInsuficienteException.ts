// PermissaoInsuficienteException.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class PermissaoInsuficienteException extends HttpException {
  constructor() {
    super('Usuário nao tem permissao para acao', HttpStatus.FORBIDDEN);
  }
}
