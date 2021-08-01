import { useCallback, useEffect, useMemo, useState, useContext, createContext } from "react";
import supabase from "./supabase";

interface UserContextReturn {
  user: any;
  login: (values: LoginValues) => Promise<any>;
  signup: (values: SignupValues) => Promise<any>;
  signout: () => Promise<any>;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface SignupValues {
  email: string;
  password: string;
  username: string;
}

const UserContext = createContext({});

export const useUser = (): UserContextReturn => useContext(UserContext) as UserContextReturn;

export const UserContextProvider = (props: any) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const signup = useCallback(async (values: SignupValues) => {
    const { username, ...valuesWithoutUsername } = values;
    const { user, session, error } = await supabase.auth.signUp(valuesWithoutUsername);
    if (error) {
      throw error;
    }
    if (user) {
      await supabase.auth.update({
        data: {
          username,
        },
      });
      setUser(user);
      setSession(session);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      login: (values: LoginValues) => supabase.auth.signIn(values),
      signup,
      signout: () => supabase.auth.signOut(),
    }),
    [user, session]
  );

  return <UserContext.Provider value={value} {...props} />;
};
