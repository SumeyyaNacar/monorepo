import {Client, expect} from '@loopback/testlab';
import {BackendAuthApplication} from '../../application';
import {setupApplication} from './test-helper';

describe('User Authentication (Acceptance Test)', () => {
  let app: BackendAuthApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('aynı email adresiyle ikinci kez kayıt yapılmasına izin vermemeli', async () => {
    const validUser = {
      email: 'duplicate@test.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    };

    // İlk kayıt başarılı olmalı (200)
    await client.post('/signup').send(validUser).expect(200);

    // İkinci kayıt denemesi BadRequest (400) dönmeli
    const res = await client
      .post('/signup')
      .send(validUser)
      .expect(400);

    expect(res.body.error.message).to.equal('This email is already saved');
  });

  it('başarılı girişte JWT token dönmeli', async () => {
    const loginUser = {
      email: 'jwt-test@test.com',
      password: 'password123',
      firstName: 'Jwt',
      lastName: 'User'
    };

    // Önce kayıt ol
    await client.post('/signup').send(loginUser).expect(200);

    // Giriş yap
    const res = await client
      .post('/login')
      .send({
        email: loginUser.email,
        password: loginUser.password
      })
      .expect(200);

    // Spring Security'deki token kontrolü gibi:
    // Yanıtın içinde token var mı ve bir string mi?
    expect(res.body.user).to.have.property('token');
    expect(res.body.user.token).to.be.a.String();
    expect(res.body.message).to.equal('Success');
  });

  it('hatalı şifre ile girişi reddetmeli (Unauthorized)', async () => {
    const validUser = {
      email: 'auth-fail@test.com',
      password: 'password123',
      firstName: 'Auth',
      lastName: 'Test'
    };

    await client.post('/signup').send(validUser).expect(200);

    // Yanlış şifre denemesi (Unauthorized - 401)
    await client
      .post('/login')
      .send({
        email: validUser.email,
        password: 'wrongpassword1'
      })
      .expect(401);
  });
});
