"use client";

import { User, Lock } from 'lucide-react';
import { useState } from 'react';
import loginAction from './login.action';

export default function Page() {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const auth = await loginAction(formData.username, formData.password)
        if (auth.success && auth.token) {
            localStorage.setItem("accessToken", auth.token);
        }
    }


    return (
        <main className="h-screen w-full bg-zinc-950 flex justify-center items-center p-4">
            <form className="bg-zinc-900 border border-zinc-800 w-full max-w-md p-6 flex flex-col text-center gap-4 rounded-2xl"
                onSubmit={handleSubmit}>
                <div className='flex flex-col text-white items-center'>
                    <User className="w-10 h-10" />
                    <h1>Connection</h1>
                </div>

                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        id="usrname"
                        name="username"
                        type="text"
                        placeholder="usrname"
                        onChange={handleChange}
                        value={formData.username}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        required
                    />
                </div>

                {/* Champ Password */}
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={handleChange}
                        value={formData.password}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                        required
                    />
                </div>

                <button
                    disabled={!formData.username || !formData.password}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                    Connection
                </button>
            </form>
        </main>
    );
}