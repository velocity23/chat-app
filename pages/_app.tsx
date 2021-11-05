import 'tailwindcss/tailwind.css';
import Head from 'next/head';

function ChatApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Subtle Chat App</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default ChatApp;
