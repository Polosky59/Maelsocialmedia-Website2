"use client";

import { useEffect, useState } from "react";
import Calendrier from "@/components/calendrier/Calendrier";
import { Clock, Calendar as CalendarIcon, Plus, Mail, Phone, CircleDot, X, Trash2 } from "lucide-react";
import authAction from "./auth.action";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                router.push("/");
                return;
            }

            const auth = await authAction(token);
            if (!auth?.success) {
                router.push("/");
            } else {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        date: "",
        time: ""
    });

    const mockAppointments = [
        { date: new Date().getTime() },
        { date: new Date().getTime() },
        { date: new Date(2026, 7, 15).getTime() },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(false);
        setFormData({ date: "", time: "" });
    };
    if (isLoading) {
        return (
            <main className="h-screen w-full bg-zinc-950 text-zinc-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-sm text-zinc-400 font-medium">Vérification de la session...</p>
                </div>
            </main>
        );
    }
    if (isLoading) {
        return (
            <main className="h-screen w-full bg-zinc-950 text-zinc-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-sm text-zinc-400 font-medium"></p>
                </div>
            </main>
        );
    }
    return (

        <main className="h-screen w-full bg-zinc-950 text-zinc-100 flex p-6 gap-6 font-sans relative">
            <div className="flex-[3] bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-6 flex gap-6 shadow-2xl overflow-hidden">
                <div className="flex-[3] flex flex-col h-full">
                    <Calendrier data={mockAppointments} />
                </div>

                <div className="w-[1px] bg-zinc-800/80 my-2" />
                <div className="flex-1 flex flex-col gap-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 px-1">
                        Programme
                    </h3>
                    <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl flex flex-col gap-3">

                        <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">

                            <CalendarIcon className="size-4" />
                            <span>8 Août 2026</span>
                            <button
                                type="button"
                                className="p-2 rounded-lg text-red-400"
                                title="Supprimer"
                            >
                                <Trash2 className="size-4" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <Clock className="size-3.5" />
                            <span>10:00 - 11:00</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <CircleDot className="size-3" />
                                Ouvert
                            </span>
                        </div>

                        <div className="mt-2 pt-3 border-t border-zinc-800/60 text-left">
                            <p className="text-xs font-semibold text-zinc-200">Rendez-vous avec toto</p>
                            <div className="text-[11px] text-zinc-500 mt-0.5 flex items-center">
                                <Mail className="size-3.5 mr-1" />
                                <p>Email : toto@gmail.com</p>
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5 flex items-center">
                                <Phone className="size-3.5 mr-1" />
                                <p>Phone : +33 58 58 58 58</p>
                            </div>
                        </div>

                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-auto flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-2.5 rounded-xl text-sm font-medium transition-colors"
                    >
                        <Plus className="size-4" />
                        Nouveau RDV
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h2 className="text-base font-semibold text-zinc-100">Nouveau Rendez-vous</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-400 hover:text-zinc-100 transition-colors"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-zinc-400 mb-1">Heure</label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4 pt-2 border-t border-zinc-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200"
                                >
                                    Annuler
                                </button>
                                <button type="submit" className="px-3 py-1.5 text-xs font-medium bg-emerald-600  text-white rounded-lg ">
                                    Ajouter
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}