import {
    RealtimeSubscription,
    SupabaseClient,
    SupabaseRealtimePayload,
} from '@supabase/supabase-js';
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { ChatContext } from '../components/ChatContext';
import { SupabaseContext } from '../components/SupabaseContext';
import { v4 as uuidv4 } from 'uuid';
import useSound from 'use-sound';
import useFocus from './focus';

export default function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const chatContext = useContext(ChatContext);
    const supabaseClient = useContext(SupabaseContext)!;
    const subscription = useRef<RealtimeSubscription | null>(null);
    const [playNotification] = useSound('/notification.mp3');
    const isFocused = useFocus();
    const [showNotification, setShowNotification] = useState(false);

    const postMessage = useCallback(
        async (content: string) => {
            if (content.startsWith('/') && slashCommands[content.trim()]) {
                slashCommands[content.trim()](setMessages, supabaseClient);
                return;
            }
            if (!chatContext.roomId) return;
            const message = {
                content,
                user_name: chatContext.name,
                room_id: chatContext.roomId,
                created_at: new Date().toISOString(),
                id: uuidv4(),
            };

            const res = await supabaseClient.from<Message>('messages').insert([
                {
                    content,
                    user_name: chatContext.name,
                    room_id: chatContext.roomId,
                },
            ]);
            if (res.error) {
                setMessages([...messages.filter((m) => m.id !== message.id)]);
                throw res.error;
            }
        },
        [messages, chatContext.name, chatContext.roomId, supabaseClient]
    );
    const handleNewMessage = useCallback(
        async (payload: SupabaseRealtimePayload<Message>) => {
            if (payload.eventType != 'INSERT') return;
            if (payload.new.room_id != chatContext.roomId) return;
            if (messages.some((m) => m.id == payload.new.id)) return;

            setMessages((m) => [...m, payload.new]);

            if (
                payload.new.user_name !== chatContext.name &&
                chatContext.enableSound
            ) {
                console.log('Playing sound');
                playNotification();
            }

            if (!isFocused) {
                setShowNotification(true);
            }
        },
        [messages, chatContext, playNotification, isFocused]
    );

    useEffect(() => {
        (async () => {
            if (!chatContext.roomId) return;
            const messages = await supabaseClient
                .from<Message>('messages')
                .select('*')
                .order('created_at', { ascending: false })
                .eq('room_id', chatContext.roomId);
            if (messages.error) {
                throw messages.error;
            }

            setMessages(messages.data.reverse());
        })();
    }, [chatContext.roomId, supabaseClient]);
    useEffect(() => {
        subscription.current = supabaseClient
            .from<Message>(`messages:room_id=eq.${chatContext.roomId}`)
            .on('INSERT', handleNewMessage)
            .subscribe();

        return () => {
            subscription.current?.unsubscribe();
        };
    }, [chatContext.roomId, supabaseClient, handleNewMessage]);
    useEffect(() => {
        if (isFocused && showNotification) setShowNotification(false);
    }, [isFocused, showNotification]);

    return {
        messages,
        postMessage,
        showNotification,
    };
}

const slashCommands: {
    [key: string]: (
        setMessages: Dispatch<SetStateAction<Message[]>>,
        client: SupabaseClient
    ) => void;
} = {
    '/clear': (setMessages) => {
        setMessages([]);
    },
};
