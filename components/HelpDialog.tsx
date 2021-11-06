import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import 'twin.macro';

export default function HelpDialog({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}) {
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
                        Help
                    </Dialog.Title>
                    <Dialog.Description>
                        Welcome. This simple chat app is designed to help you
                        chat in class subtly and easily. Some key points;
                        <ul tw="list-disc space-y-1 ml-5 mt-2">
                            <li>
                                You and everybody else can change their name at
                                any time and previous messages will not be
                                affected. Please make sure people are who they
                                say they are!
                            </li>
                            <li>
                                You cannot delete or update messages. Choose
                                your words wisely!
                            </li>
                            <li>
                                Teacher on their way round? Do{' '}
                                <kbd tw="bg-gray-200 border border-gray-400 shadow rounded p-0.5 text-sm">
                                    Ctrl/Cmd + L
                                </kbd>{' '}
                                to show a discreet loading screen, and then the
                                same combination again to get back to chatting
                                once they're out of sight &#128521;.
                            </li>
                        </ul>
                    </Dialog.Description>
                </div>
                <Dialog.Overlay tw="fixed inset-0 bg-black/30" />
            </div>
        </Dialog>
    );
}
