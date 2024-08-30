import Account from '../model/account';

export default interface IAccountRepository {
    createAccount(account: Account): Promise<Account>;
}