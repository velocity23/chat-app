import { createClient, SupabaseClient } from '@supabase/supabase-js';
import React, { createContext } from 'react';

export const SupabaseContext = createContext<SupabaseClient | null>(null);

export const SupabaseProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!
    );

    return (
        <SupabaseContext.Provider value={client}>
            {children}
        </SupabaseContext.Provider>
    );
};
