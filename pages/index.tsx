import { useRouter } from 'next/dist/client/router';
import React, { useEffect, useState } from 'react';
import 'twin.macro';
import Input from '../components/Input';
import Layout from '../components/Layout';
import Message from '../components/Message';

export default function Home() {
    const [message, setMessage] = useState('');
    const router = useRouter();
    const messagesContainerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesContainerRef.current?.scrollTo(
            0,
            messagesContainerRef.current?.scrollHeight
        );
    });
    useEffect(() => {
        const room = router.query.room as string | undefined;
        if (!room) {
            router.push({
                pathname: '/',
                query: {
                    room: '00000000-0000-0000-0000-000000000000',
                },
            });
        }
    });

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            // Send Message
            setMessage('');
        }
    }

    return (
        <Layout>
            <div tw="flex flex-col h-full gap-3">
                <div tw="flex-1 overflow-y-auto" ref={messagesContainerRef}>
                    {Array.from({ length: 25 }).map(() => (
                        <Message
                            message={{
                                content: 'Hello World',
                                created_at: new Date().toISOString(),
                                room_id: 'hello',
                                user_name: 'Kai',
                                id: 'x',
                            }}
                        />
                    ))}
                </div>
                <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
        </Layout>
    );
}
