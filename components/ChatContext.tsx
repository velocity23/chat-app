import { useRouter } from 'next/dist/client/router';
import React, { createContext, useState } from 'react';

export const ChatContext = createContext<{
    name: string;
    roomId: string | null;
    setName: (value: string) => void;
    isReady: boolean;
}>({
    name: `anon-${Math.floor(new Date().getTime() / 1000)}`,
    roomId: null,
    setName: () => {},
    isReady: false,
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const storedName =
        typeof localStorage === 'undefined'
            ? null
            : localStorage.getItem('username');
    const anonName = `anon-${Math.floor(new Date().getTime() / 1000)}`;
    const [name, setName] = useState(storedName || anonName);

    const roomId = (router.query.room as string | undefined) || null;
    const isReady = router.isReady;

    if (typeof localStorage === 'undefined') {
        return (
            <ChatContext.Provider
                value={{
                    name: anonName,
                    roomId,
                    setName: (_value: string) => {},
                    isReady,
                }}
            >
                {children}
            </ChatContext.Provider>
        );
    }

    const updateName = (value: string) => {
        setName(value);
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem('username', value);
    };

    return (
        <ChatContext.Provider
            value={{ name, setName: updateName, roomId, isReady }}
        >
            {children}
        </ChatContext.Provider>
    );
};
