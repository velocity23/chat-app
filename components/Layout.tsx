import 'twin.macro';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div tw="min-h-screen w-full bg-gray-200 flex">
            <div tw="bg-gray-700 h-[calc(100vh - 50px)] md:h-[calc(100vh - 75px)] m-auto md:w-[calc(100vw - 200px)] w-[calc(100vw - 50px)] text-white p-5">
                {children}
            </div>
        </div>
    );
}
