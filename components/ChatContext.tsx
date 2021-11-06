import { useRouter } from 'next/dist/client/router';
import React, { createContext, useState } from 'react';

export const ChatContext = createContext<{
    name: string;
    roomId: string;
    setName: (value: string) => void;
}>({
    name: `anon-${Math.floor(new Date().getTime() / 1000)}`,
    roomId: '',
    setName: () => {},
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const anonName = `anon-${Math.floor(new Date().getTime() / 1000)}`;
    const roomId = (router.query.room as string | undefined) || 'Unknown';
    if (typeof localStorage === 'undefined') {
        return (
            <ChatContext.Provider
                value={{
                    name: anonName,
                    roomId,
                    setName: (_value: string) => {},
                }}
            >
                {children}
            </ChatContext.Provider>
        );
    }

    const storedName = localStorage.getItem('username');
    const [name, setName] = useState(storedName || anonName);

    const updateName = (value: string) => {
        setName(value);
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem('username', value);
    };

    return (
        <ChatContext.Provider value={{ name, setName: updateName, roomId }}>
            {children}
        </ChatContext.Provider>
    );
};
