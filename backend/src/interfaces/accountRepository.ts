import Account from '../model/account';

export default interface IAccountRepository {

    createAccount(account: Account): Promise<Account>;
    loginAccount(account: Account): Promise<Account>;
    deleteAccount(accountId: string): Promise<Account>;
}