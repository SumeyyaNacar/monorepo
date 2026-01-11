import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbAuthDataSource} from '../datasources';
import {User, UserRelations} from '../models';

/**
 * UserRepository: Veritabanı sorgularını yöneten sınıftır.
 * DefaultCrudRepository'den türetilerek tüm standart veritabanı metodlarını (save, find, delete vb.) kazanır.
 */
export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    // Dependency Injection: Hazırladığımız DataSource'u (db_auth) bu sınıfa bağlar.
    @inject('datasources.db_auth') dataSource: DbAuthDataSource,
  ) {
    // Modelimizi (User) ve veritabanı bağlantımızı üst sınıfa (super) göndererek hazır hale getiririz.
    super(User, dataSource);
  }
}
