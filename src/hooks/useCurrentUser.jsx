import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useCurrentUser() {
  const [user, setUser] = useState(null);   // { uid, name, email, role }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let profileSub = null;

    const loadUser = async (supabaseUser) => {
      if (!supabaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", supabaseUser.id)
          .single();

        setUser({
          uid: supabaseUser.id,
          email: supabaseUser.email,
          name: profile?.nama || supabaseUser.user_metadata?.nama || "Pengguna",
          role: profile?.role || "guru",
        });
      } catch (err) {
        console.error("Gagal ambil profil user:", err);
        setUser({
          uid: supabaseUser.id,
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.nama || "Pengguna",
          role: "guru",
        });
      } finally {
        setLoading(false);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadUser(session?.user || null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
      if (profileSub) profileSub.unsubscribe();
    };
  }, []);

  return { user, loading, isAdmin: user?.role === "admin" };
}