import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import 'twin.macro';
import Input from '../components/Input';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Message from '../components/Message';
import useMessages from '../hooks/messages';
import { v4 as uuidv4 } from 'uuid';
import { PaperAirplaneIcon } from '@heroicons/react/outline';

export default function Home() {
    const [input, setInput] = useState('');
    const [forceLoader, setForceLoader] = useState(false);
    const router = useRouter();
    const messagesContainerRef = React.useRef<HTMLDivElement>(null);
    const { messages, postMessage } = useMessages();

    useEffect(() => {
        messagesContainerRef.current?.scrollTo(
            0,
            messagesContainerRef.current?.scrollHeight
        );
    }, [messages, forceLoader]);
    useEffect(() => {
        if (!router.isReady) return;
        const room = router.query.room as string | undefined;
        if (!room) {
            router.push({
                pathname: '/',
                query: {
                    room: uuidv4(),
                },
            });
        }
    }, [router]);
    useHotkeys('ctrl+l, cmd+l', (e) => {
        e.preventDefault();
        setForceLoader((x) => !x);
    });

    if (!router.query.room || forceLoader) {
        return (
            <div tw="h-screen w-screen flex">
                <div tw="h-20 w-20 m-auto">
                    <Loader />
                </div>
            </div>
        );
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            postMessage(input);
            setInput('');
        }
    }

    return (
        <Layout>
            <div tw="flex flex-col h-full gap-3">
                <div tw="flex-1 overflow-y-auto" ref={messagesContainerRef}>
                    {messages.map((m) => (
                        <Message message={m} key={m.id} />
                    ))}
                </div>
                <div tw="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        tw="flex-1"
                    />
                    <button
                        tw="flex-none bg-black/50 hover:bg-black text-white font-bold p-2 rounded"
                        onClick={() => {
                            postMessage(input);
                            setInput('');
                        }}
                    >
                        <PaperAirplaneIcon tw="rotate-90 h-6 w-6" />
                    </button>
                </div>
            </div>
        </Layout>
    );
}
