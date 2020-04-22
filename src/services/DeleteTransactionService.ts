import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const getTransaction = await transactionsRepository.findOne({
      where: { id },
    });

    if (!getTransaction) {
      throw new AppError('This transaction does not exists.', 404);
    }

    await transactionsRepository.remove(getTransaction);
  }
}

export default DeleteTransactionService;
