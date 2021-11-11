import 'tailwindcss/tailwind.css';
import React from 'react';
import { ChatProvider } from '../components/ChatContext';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { GlobalStyles } from 'twin.macro';
import { SupabaseProvider } from '../components/SupabaseContext';

function ChatApp({ Component, pageProps }: AppProps) {
    return (
        <ChatProvider>
            <SupabaseProvider>
                <GlobalStyles />
                <Component {...pageProps} />
            </SupabaseProvider>
        </ChatProvider>
    );
}

export default ChatApp;
