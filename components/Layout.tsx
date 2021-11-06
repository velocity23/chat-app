import React, { useContext, useState } from 'react';
import 'twin.macro';
import {
    InformationCircleIcon,
    LoginIcon,
    UserIcon,
} from '@heroicons/react/solid';
import { ChatContext } from './ChatContext';
import HelpDialog from './HelpDialog';
import tw from 'twin.macro';
import RoomDialog from './RoomDialog';

const MenuItem = tw.div`bg-gray-700 text-white rounded-full cursor-pointer hover:shadow-lg`;

export default function Layout({ children }: { children: React.ReactNode }) {
    const { name, setName } = useContext(ChatContext);
    const [showHelp, setShowHelp] = useState(false);
    const [showRoom, setShowRoom] = useState(false);

    function handleNameChange() {
        const newName = prompt(
            'Enter your new username. This will not affect previous messages.',
            name
        );
        if (!newName) return;
        setName(newName);
    }

    return (
        <div tw="min-h-screen w-full bg-gray-200 flex">
            <div tw="bg-gray-700 h-[calc(100vh - 100px)] m-auto md:w-[calc(100vw - 200px)] w-[calc(100vw - 50px)] text-white p-5">
                {children}
            </div>
            <div tw="absolute top-2 left-2 w-[calc(100vw - 1rem)] flex gap-3">
                <MenuItem onClick={handleNameChange}>
                    <UserIcon tw="h-5 w-5 m-2" />
                </MenuItem>
                <MenuItem onClick={() => setShowHelp(true)}>
                    <InformationCircleIcon tw="h-5 w-5 m-2" />
                </MenuItem>
                <MenuItem onClick={() => setShowRoom(true)}>
                    <LoginIcon tw="h-5 w-5 m-2" />
                </MenuItem>
            </div>
            <HelpDialog setIsOpen={setShowHelp} isOpen={showHelp} />
            <RoomDialog setIsOpen={setShowRoom} isOpen={showRoom} />
        </div>
    );
}
