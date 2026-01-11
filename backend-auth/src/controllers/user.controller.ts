import {repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {HttpErrors, post, requestBody} from '@loopback/rest';
import {User} from '../models';
import {LoginResponse, SignupResponse, UserProfile} from '../types';
import {LoginSchema, SignupSchema} from '../schemes';
import {hash, genSalt, compare} from 'bcryptjs';
import {JwtService} from '../services/jwt.service';
import {service} from '@loopback/core';

export class UserController {
  constructor(
    // Spring'deki @Autowired UserRepository gibi çalışır
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(JwtService) public jwtService: JwtService,
  ) {}

  /**
   * SIGNUP (KAYIT): Kullanıcıyı doğrular, şifreyi hashler ve kaydeder.
   */
  @post('/signup')
  async signup(
    @requestBody({
      content: {'application/json': {schema: SignupSchema}},
    })
    user: User,
  ): Promise<SignupResponse> {
    // 1. Duplicate check (Mükerrer kayıt kontrolü)
    const existingUser = await this.userRepository.findOne({
      where: {email: user.email},
    });

    if (existingUser) {
      throw new HttpErrors.BadRequest('This email is already saved');
    }

    // 2. Password Hashing (Şifre maskeleme)
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    // 3. Veritabanına yazma
    const newUser = await this.userRepository.create(user);

    // 4. Yanıtı DTO formatına (UserProfile) dönüştürerek password'ü dışarıda bırakma
    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    };
  }

  /**
   * LOGIN (GİRİŞ): Email kontrolü, şifre doğrulaması ve JWT üretimi yapar.
   */
  @post('/login')
  async login(
    @requestBody({
      content: {'application/json': {schema: LoginSchema}},
    })
    loginData: Partial<User>,
  ): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: {email: loginData.email},
    });

    if (!user) {
      throw new HttpErrors.Unauthorized('This mail or password incorrect.');
    }

    const passwordMatched = await compare(
      loginData.password as string,
      user.password,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('This mail or password incorrect.');
    }

    // 4. JWT Payload oluşturma - 'as UserProfile' ekleyerek tipi zorluyoruz
    const securityProfile: UserProfile = {
      id: String(user.id), // JWT içinde string olması standarttır
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };

    // 5. Token üretimi
    const token = await this.jwtService.generateToken(securityProfile);

    // 6. Yanıt dönme
    return {
      message: 'Success',
      user: {
        id: user.id, // Burada orijinal number id dönebilir
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token,
      },
    };
  }
}
