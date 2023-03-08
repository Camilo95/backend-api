import { TResponseTransaction, TTransaction } from '../types';

export interface IWompi {
  createTransaction(transaction: TTransaction): Promise<TResponseTransaction>;
}
