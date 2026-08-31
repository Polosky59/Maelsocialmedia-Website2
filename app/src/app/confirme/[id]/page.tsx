

import { CheckCircle2 } from 'lucide-react';
import { openDb } from "../../../db/db";


export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    try {
        const db = await openDb();

        await db.run(
            `UPDATE meting
             SET confirme = 1
             WHERE link_confirme = ?`,
            [id]
        );
    } catch (error) {

    }
    return (
        <main className="h-screen w-full bg-zinc-950 flex justify-center items-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md p-6 flex flex-col items-center text-center gap-4 rounded-2xl shadow-xl">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-1">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Rendez-vous confirmé !
                </h1>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                    C'est tout bon ! Ton rendez-vous a bien été enregistré. On a hâte de t'accueillir.
                </p>
            </div>
        </main>
    );
}



