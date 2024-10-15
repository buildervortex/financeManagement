import IAccountRepository from "../interfaces/accountRepository";
import Account from "../model/account";

export default class AccountRepository implements IAccountRepository {
    async getAccount(accountId: string): Promise<Account> {
        let account = await Account.findById(accountId);
        if (!account) {
            throw new Error("Account not found")
        }

        return account
    }

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
            throw new Error("invalid Email address or Password");
        }
        return existingUser;
    }

    async getAccounts(): Promise<Account[]> {
        return await Account.find();
    }

    async deleteAccount(accountId: string): Promise<Account> {
        let existingAccount = await Account.findByIdAndDelete(accountId);
        if (!existingAccount) {
            throw new Error("Account not found")
        }

        return existingAccount;
    }

    


}