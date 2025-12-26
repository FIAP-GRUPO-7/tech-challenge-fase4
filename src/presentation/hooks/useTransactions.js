import { useEffect, useMemo, useState } from 'react';
import { makeWatchTransactionsUseCase } from '../../main/factories/transactions/makeWatchTransactionsUseCase';

export default function useTransactions(user) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const watchTransactionsUseCase = makeWatchTransactionsUseCase();

    const unsubscribe = watchTransactionsUseCase.execute(
      user.uid,
      (rawTxs) => {
        const txs = rawTxs.map((t) => {
          const value = Number(t?.value) || 0;

          let createdAtMillis = null;
          if (t?.createdAt?.toMillis) createdAtMillis = t.createdAt.toMillis();
          else if (t?.createdAt?.seconds) {
            const seconds = Number(t.createdAt.seconds) || 0;
            const nanos = Number(t.createdAt.nanoseconds) || 0;
            createdAtMillis = seconds * 1000 + Math.floor(nanos / 1e6);
          } else {
            createdAtMillis = t.__localCreatedAt || Date.now();
          }

          return {
            ...t,
            value,
            createdAt: createdAtMillis,
          };
        });

        setTransactions(txs);
        setLoading(false);
      },
      (err) => {
        console.error('watch TX ERROR:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [user]);

  const transactionsByDate = useMemo(() => {
    return (transactions || []).slice().sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
  }, [transactions]);

  return { transactions, transactionsByDate, loading };
}
