import { useEffect, useState } from 'react';
import { makeListContactsUseCase } from '../../main/factories/contacts/makeListContactsUseCase';

export default function useContacts(user) {
  const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!user?.uid) {
      setLoadingContacts(false);
      return;
    }

    async function load() {
      try {
        const listContactsUseCase = makeListContactsUseCase();
        const result = await listContactsUseCase.execute(user.uid);

        if (mounted) {
          if (!result.success) {
            console.error(result.error);
            setContacts([]);
          } else {
            setContacts(result.data || []);
          }
          setLoadingContacts(false);
        }
      } catch (err) {
        console.error('useContacts load ERROR:', err);
        if (mounted) setLoadingContacts(false);
      }
    }

    load();

    return () => { mounted = false; };
  }, [user]);

  return { contacts, loadingContacts };
}
