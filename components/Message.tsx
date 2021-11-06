import 'twin.macro';

export default function Message({ message }: { message: Message }) {
    return (
        <div tw="flex items-center p-1 hover:bg-black/10" className="group">
            <p tw="flex-1">
                <span tw="font-bold">{message.user_name}:</span>{' '}
                {message.content}
            </p>
            <p tw="text-sm text-gray-300 invisible group-hover:visible">
                {new Date(message.created_at).toLocaleString()}
            </p>
        </div>
    );
}
