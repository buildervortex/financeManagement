import bcrypt from "bcrypt";

export default class Cryptography {
    static async hasPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }
    static async isValidPassword(hashedPassword: string, password: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}