import { useEffect, useState } from 'react';
import { makeGetBalanceUseCase } from '../../main/factories/transactions/makeGetBalanceUseCase';
import { makeCreateInitialDepositUseCase } from '../../main/factories/transactions/makeCreateInitialDepositUseCase';

export default function useBalance(user) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const getBalanceUseCase = makeGetBalanceUseCase();
    const createInitialDepositUseCase = makeCreateInitialDepositUseCase();

    let mounted = true;

    async function load() {
      try {
        const res = await getBalanceUseCase.execute(user.uid);

        if (!res || res.success === false) {
          await createInitialDepositUseCase.execute(user.uid);
          if (!mounted) return;
          setBalance(2500);
          setLoading(false);
          return;
        }

        const serverSaldo = res.data?.saldo;
        if (serverSaldo === undefined || serverSaldo === null) {
          await createInitialDepositUseCase.execute(user.uid);
          if (!mounted) return;
          setBalance(2500);
        } else {
          if (!mounted) return;
          setBalance(Number(serverSaldo) || 0);
        }

      } catch (e) {
        console.error('useBalance load ERROR:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => { mounted = false; };
  }, [user]);

  return { balance, loading, setBalance };
}
