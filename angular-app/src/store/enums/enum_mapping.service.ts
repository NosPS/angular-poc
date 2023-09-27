import { Injectable } from '@angular/core';
import { GenderEnum } from './gender.enum';
import { OrderEnum } from './order.enum';
import { OrderByEnum } from './order_by.enum';

@Injectable({
  providedIn: 'root',
})
export class EnumMappingService {
  parseGender(value: string): GenderEnum | undefined {
    switch (value) {
      case 'Male':
        return GenderEnum.Male;
      case 'Female':
        return GenderEnum.Female;
      case 'Other':
        return GenderEnum.Other;
      default:
        return undefined;
    }
  }

  parseOrder(value: string): OrderEnum | undefined {
    switch (value) {
      case 'ASC':
        return OrderEnum.ASC;
      case 'DESC':
        return OrderEnum.DESC;
      default:
        return undefined;
    }
  }

  parseOrderBy(value: string): OrderByEnum | undefined {
    switch (value) {
      case 'id':
        return OrderByEnum.id;
      case 'name':
        return OrderByEnum.name;
      case 'age':
        return OrderByEnum.age;
      case 'gender':
        return OrderByEnum.gender;
      case 'created_at':
        return OrderByEnum.created_at;
      case 'updated_at':
        return OrderByEnum.updated_at;
      case 'deleted_at':
        return OrderByEnum.deleted_at;
      default:
        return undefined;
    }
  }
}
