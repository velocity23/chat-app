import 'tailwindcss/tailwind.css';
import Head from 'next/head';
import React from 'react';
import { GlobalStyles } from 'twin.macro';

function ChatApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Subtle Chat App</title>
            </Head>
            <Component {...pageProps} />
        </div>
    );
}

export default ChatApp;
