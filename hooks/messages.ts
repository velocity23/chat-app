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

export default function useMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const chatContext = useContext(ChatContext);
    const supabaseClient = useContext(SupabaseContext)!;
    const subscription = useRef<RealtimeSubscription | null>(null);

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
    }, [chatContext.roomId]);
    useEffect(() => {
        subscription.current = supabaseClient
            .from<Message>(`messages:room_id=eq.${chatContext.roomId}`)
            .on('INSERT', handleNewMessage)
            .subscribe();

        return () => {
            subscription.current?.unsubscribe();
        };
    }, [chatContext.roomId]);

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
        [messages, chatContext.name, chatContext.roomId]
    );
    const handleNewMessage = useCallback(
        async (payload: SupabaseRealtimePayload<Message>) => {
            if (payload.eventType != 'INSERT') return;
            console.log('Is INSERT');
            if (payload.new.room_id != chatContext.roomId) return;
            console.log('Is INSERT for this room');
            if (messages.some((m) => m.id == payload.new.id)) return;
            console.log(messages);

            setMessages((m) => [...m, payload.new]);
        },
        [messages, chatContext.roomId]
    );

    return {
        messages,
        postMessage,
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
