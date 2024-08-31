import IAccountRepository from "../interfaces/accountRepository";
import Account from "../model/account";

export default class AccountRepository implements IAccountRepository {

    async createAccount(account: Account): Promise<Account> {
        let existingUser = await Account.findOne({ email: account.email });
        if (existingUser) {
            throw new Error("Account with this email address already exists");
        }
        const createdUser = await account.save();

        return createdUser;
    }

    async loginAccount(account: Account): Promise<Account> {
        let existingUser = await Account.findOne({ email: account.email });
        if (!existingUser) {
            throw new Error("Account with this email address already exists");
        }
        return existingUser;
    }
}