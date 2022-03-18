import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHasherService {
  async passwordHash(password: string){
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(plainText, encryptedPassword): Promise<boolean>{
    return await bcrypt.compare(plainText, encryptedPassword)
  }
 }