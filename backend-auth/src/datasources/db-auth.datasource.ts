import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// Veritabanı bağlantı ayarları
const config = {
  name: 'db_auth',
  connector: 'memory', // Verileri RAM üzerinde tutar (Uygulama kapanınca veriler silinir)
  localStorage: '',
  file: ''
};

// @lifeCycleObserver: Uygulama başladığında ve kapandığında veritabanı bağlantısını yönetir
@lifeCycleObserver('datasource')
export class DbAuthDataSource extends juggler.DataSource
  implements LifeCycleObserver {

  static dataSourceName = 'db_auth'; // Repository katmanında bu isimle çağrılır
  static readonly defaultConfig = config;

  constructor(
    // Dependency Injection: Dışarıdan farklı bir config gelirse onu kullanır, yoksa varsayılanı (config) alır
    @inject('datasources.config.db_auth', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
