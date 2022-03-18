export declare class PasswordHasherService {
    passwordHash(password: string): Promise<string>;
    comparePassword(plainText: any, encryptedPassword: any): Promise<boolean>;
}
