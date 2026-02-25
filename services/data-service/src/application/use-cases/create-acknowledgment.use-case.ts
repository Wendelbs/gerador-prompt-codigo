import crypto from 'crypto';
import { Acknowledgment } from '../../domain/entities/acknowledgment.entity';
import { AcknowledgmentRepository } from '../../domain/repositories/acknowledgment.repository';
import { CreateAcknowledgmentInput } from '../dto/create-acknowledgment.dto';
import { UnitOfWorkPort } from '../ports/unit-of-work.port';
import { AuditRepository } from '../ports/audit.repository';

export class CreateAcknowledgmentUseCase {
  constructor(
    private readonly acknowledgmentRepository: AcknowledgmentRepository,
    private readonly auditRepository: AuditRepository,
    private readonly unitOfWork: UnitOfWorkPort,
  ) {}

  async execute(input: CreateAcknowledgmentInput): Promise<{ id: string }> {
    const now = new Date();
    const entity = new Acknowledgment(crypto.randomUUID(), input.userId, input.message.trim(), now, now, 0);

    return this.unitOfWork.withTransaction(async (session) => {
      await this.acknowledgmentRepository.create(entity, session);
      await this.auditRepository.log('ACKNOWLEDGMENT_CREATED', input.userId, entity.id, session);
      return { id: entity.id };
    });
  }
}
