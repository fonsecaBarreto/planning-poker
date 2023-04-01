import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext({} as { user: any});
const { Provider } = UserContext;

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);


  const value = useMemo(
    () => ({
      user
    }),
    [user],
  );

  return <Provider value={value}>{children}</Provider>;
}

export const userUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('userUser must be used within UserProvider');
  return context;
};
