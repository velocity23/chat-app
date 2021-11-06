import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import React from 'react';
import { ChatProvider } from '../components/ChatContext';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { GlobalStyles } from 'twin.macro';
import { SupabaseProvider } from '../components/SupabaseContext';

function ChatApp({ Component, pageProps }: AppProps) {
    return (
        <ChatProvider>
            <SupabaseProvider>
                <Head>
                    <title>Subtle Chat App</title>
                </Head>
                <GlobalStyles />
                <Component {...pageProps} />
            </SupabaseProvider>
        </ChatProvider>
    );
}

export default ChatApp;
