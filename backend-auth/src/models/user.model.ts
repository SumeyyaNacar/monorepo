import {Entity, model, property} from '@loopback/repository';
/**
 * User Modeli: Veritabanındaki 'User' tablosunu temsil eder.
 */
@model()
export class User extends Entity {

  @property({
    type: 'number',
    id: true,         // Primary Key
    generated: true,  // Auto-increment
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email', // E-posta format doğrulaması
      errorMessage: 'Invalid email format.',
    },
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8,
      maxLength: 20,
      pattern: '(?=.*[0-9])(?=.*[a-z])', // En az bir rakam ve küçük harf zorunluluğu
      errorMessage: 'Password must be at least 8 characters and include numbers.',
    },
  })
  password: string;

  @property({
    type: 'string', // Opsiyonel alan
  })
  firstName?: string;

  @property({
    type: 'string', // Opsiyonel alan
  })
  lastName?: string;

  /**
   * Partial<User> kullanımı, modelin tüm alanları dolmadan nesne oluşturulmasına izin verir.
   */
  constructor(data?: Partial<User>) {
    super(data);
  }
}

/**
 * Model arası ilişkilerin (hasMany, belongsTo vb.) tanımlandığı arayüz.
 */
export interface UserRelations {}

/**
 * User nesnesinin ilişkili olduğu diğer tablolarla birleşmiş halini temsil eder.
 */
export type UserWithRelations = User & UserRelations;
