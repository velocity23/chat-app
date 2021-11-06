import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import React from 'react';
import { ChatProvider } from '../components/ChatContext';
import { AppProps } from 'next/dist/shared/lib/router/router';
import { GlobalStyles } from 'twin.macro';

function ChatApp({ Component, pageProps }: AppProps) {
    return (
        <ChatProvider>
            <Head>
                <title>Subtle Chat App</title>
            </Head>
            <GlobalStyles />
            <Component {...pageProps} />
        </ChatProvider>
    );
}

export default ChatApp;
