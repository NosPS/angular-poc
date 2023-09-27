import { UsersDto } from '@models/dtos/users.dto';
import { UsersEntity } from '../../repositories/users/users.entity';

export class UsersMapping {
  static mapToEntity(dto: UsersDto): UsersEntity {
    const entity = new UsersEntity();
    entity.id = dto.id;
    entity.name = dto.name;
    entity.age = dto.age;
    entity.gender = dto.gender;
    entity.created_at = dto.createdAt;
    entity.updated_at = dto.updatedAt;
    entity.deleted_at = dto.deletedAt;
    return entity;
  }

  static mapToDto(entity: UsersEntity): UsersDto {
    const dto = new UsersDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.age = entity.age;
    dto.gender = entity.gender;
    dto.createdAt = entity.created_at;
    dto.updatedAt = entity.updated_at;
    dto.deletedAt = entity.deleted_at;
    return dto;
  }

  static mapToEntityArray(dtos: UsersDto[]): UsersEntity[] {
    const entities = [];
    dtos.forEach((dto) => {
      entities.push(this.mapToEntity(dto));
    });
    return entities;
  }

  static mapToDtoArray(entities: UsersEntity[]): UsersDto[] {
    const dtos = [];
    entities.forEach((entity) => {
      dtos.push(this.mapToDto(entity));
    });
    return dtos;
  }
}
