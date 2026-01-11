import {HttpErrors} from '@loopback/rest';
import {sign, verify} from 'jsonwebtoken';
// Dosya yolunun doğruluğunu kontrol et: services'ten bir üst klasöre (src) çıkıp types'a bakar
import {UserProfile} from '../types';

export class JwtService {
  private readonly SECRET_KEY = 'super-secret-key-123';
  private readonly EXPIRES_IN = '24h';

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized('Error generating token: userProfile is null');
    }

    // sign fonksiyonu 'object' bekler, userProfile bir type olduğu için
    // TypeScript bazen itiraz edebilir. Bu durumda { ...userProfile } kullanmak garantidir.
    const token = sign({...userProfile}, this.SECRET_KEY, {
      expiresIn: this.EXPIRES_IN,
    });

    return token;
  }

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(`Error verifying token: 'token' is null`);
    }

    try {
      const decodedToken = verify(token, this.SECRET_KEY) as UserProfile;
      return decodedToken;
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error verifying token: ${error.message}`);
    }
  }
}
