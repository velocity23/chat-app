import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useContext } from 'react';
import 'twin.macro';
import { ChatContext } from './ChatContext';

export default function RoomDialog({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) {
    const { roomId } = useContext(ChatContext);
    return (
        <Dialog
            as="div"
            tw="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setIsOpen(false)}
            open={isOpen}
        >
            <div tw="min-h-screen px-4 text-center">
                <span
                    tw="inline-block h-screen align-middle"
                    aria-hidden="true"
                >
                    &#8203;
                </span>

                <div tw="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl z-10 relative">
                    <Dialog.Title
                        as="h3"
                        tw="text-2xl font-bold leading-6 text-gray-900 mb-2"
                    >
                        You are in room {roomId}
                    </Dialog.Title>
                    <Dialog.Description>{/*  */}</Dialog.Description>
                </div>
                <Dialog.Overlay tw="fixed inset-0 bg-black/30" />
            </div>
        </Dialog>
    );
}
