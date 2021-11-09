import React, { useContext, useState } from 'react';
import 'twin.macro';
import {
    ClipboardCopyIcon,
    InformationCircleIcon,
    UserIcon,
    VolumeOffIcon,
    VolumeUpIcon,
} from '@heroicons/react/outline';
import { ChatContext } from './ChatContext';
import HelpDialog from './HelpDialog';
import tw from 'twin.macro';

const MenuItem = tw.div`bg-gray-700 text-white rounded-full cursor-pointer hover:shadow-lg`;

export default function Layout({ children }: { children: React.ReactNode }) {
    const { name, setName, setEnableSound, enableSound } =
        useContext(ChatContext);
    const [showHelp, setShowHelp] = useState(false);

    function changeUsername() {
        const newName = prompt(
            'Enter your new username. This will not affect previous messages.',
            name
        );
        if (!newName) return;
        setName(newName);
    }

    function copyRoomLink() {
        navigator.clipboard.writeText(window.location.href);
        alert(
            'Room link copied to clipboard. Give it to anybody else to allow them to join the room.'
        );
    }

    return (
        <div tw="min-h-screen w-full bg-gray-200 flex">
            <div tw="bg-gray-700 h-[calc(100vh - 100px)] m-auto md:w-[calc(100vw - 200px)] w-[calc(100vw - 50px)] text-white p-5">
                {children}
            </div>
            <div tw="absolute top-2 left-2 w-[calc(100vw - 1rem)] flex gap-3">
                <MenuItem onClick={changeUsername}>
                    <UserIcon tw="h-5 w-5 m-2" />
                </MenuItem>
                <MenuItem onClick={() => setShowHelp(true)}>
                    <InformationCircleIcon tw="h-5 w-5 m-2" />
                </MenuItem>
                <MenuItem onClick={copyRoomLink}>
                    <ClipboardCopyIcon tw="h-5 w-5 m-2" />
                </MenuItem>
                <MenuItem onClick={() => setEnableSound((x) => !x)}>
                    {enableSound ? (
                        <VolumeUpIcon tw="h-5 w-5 m-2" />
                    ) : (
                        <VolumeOffIcon tw="h-5 w-5 m-2" />
                    )}
                </MenuItem>
            </div>
            <HelpDialog setIsOpen={setShowHelp} isOpen={showHelp} />
        </div>
    );
}
