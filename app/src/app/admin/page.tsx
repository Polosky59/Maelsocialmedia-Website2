import Calendrier from "@/components/calendrier/Calendrier";
import { Clock, Calendar as CalendarIcon, Plus, Mail, Phone } from "lucide-react";

export default function Page() {
    // Données de test
    const mockAppointments = [
        { date: new Date().getTime() },
        { date: new Date().getTime() },
        { date: new Date(2026, 7, 15).getTime() },
    ];

    return (
        <main className="h-screen w-full bg-zinc-950 text-zinc-100 flex p-6 gap-6 font-sans">
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
                        </div>
                        <div className="flex items-center gap-2 text-zinc-400 text-xs">
                            <Clock className="size-3.5" />
                            <span>10:00 - 11:00</span>
                        </div>
                        <div className="mt-2 pt-3 border-t border-zinc-800/60 text-left">
                            <p className="text-xs font-semibold text-zinc-200">Rendez-vous avec toto</p>
                            <div className="text-[11px] text-zinc-500 mt-0.5 flex">
                                <Mail className="size-4 mx-1" />
                                <p > Email :  toto@gmail.com</p>
                            </div>
                            <div className="text-[11px] text-zinc-500 mt-0.5 flex">
                                <Phone className="size-4 mx-1" />
                                <p > Phone :  +33 58 58 58 58</p>
                            </div>
                        </div>
                    </div>
                    <button className="mt-auto flex items-center justify-center gap-2 bg-zinc-950/60 border border-zinc-800 p-2 rounded-xl">
                        <Plus className="size-4 " />
                        Nouveau RDV
                    </button>
                </div>
            </div>
        </main>
    );
}