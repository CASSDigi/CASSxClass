import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(undefined); // undefined = loading, null = signed out

  useEffect(() => {
    if (!supabase) {
      setSession(null);
      return;
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    if (!supabase) throw new Error("Supabase is not configured yet.");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  return (
    <AdminAuthContext.Provider value={{ session, signIn, signOut, loading: session === undefined }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
