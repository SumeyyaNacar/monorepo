import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {JwtService} from './services/jwt.service';

export {ApplicationConfig};

export class BackendAuthApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // --- CORS AYARI BURADA BAŞLIYOR ---
    // Frontend (React) bağlantısı için bu ayar şarttır.
    this.options.rest = {
      cors: {
        origin: '*', // Üretim aşamasında buraya sadece frontend URL'nizi yazmalısınız (örn: http://localhost:3000)
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        maxAge: 86400,
        credentials: true,
      },
    };
    // --- CORS AYARI BURADA BİTTİ ---

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    // --- SWAGGER (REST EXPLORER) AYARI ---
    // Bu ayar http://localhost:3000/explorer adresini aktif eder.
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.service(JwtService);

    this.projectRoot = __dirname;

    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
