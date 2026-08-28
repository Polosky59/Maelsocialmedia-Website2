import { User, Lock } from 'lucide-react';

export default function Page() {
    return (
        <main className="h-screen w-full bg-zinc-950 flex justify-center items-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md p-6 flex flex-col  text-center gap-4 rounded-2xl shadow-xl">
                <div className='flex flex-col text-white items-center'>
                    <User className="w-10 h-10 " ></User>
                    <h1>Connection</h1>
                </div>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        id="email"
                        type="email"
                        placeholder="vous@exemple.com"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        required />
                </div>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        id="email"
                        type="password"
                        placeholder="password"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        required />
                </div>
            </div>
        </main>
    )
}