"use client";

import Calendrier from "../calendrier/Calendrier";
import React, { useState } from "react";
import { X, ArrowLeft, Clock } from "lucide-react";
import { User, Lock } from 'lucide-react';

interface ModalProps {
    setOpenModal: (open: boolean) => void;
}

const CRENEAUX_ADMIN = [
    { id: "1", hours: "09:00 - 09:30" },
    { id: "2", hours: "10:30 - 11:00" },
    { id: "3", hours: "14:00 - 14:30" },
    { id: "4", hours: "15:30 - 16:00" },
];

export default function Modal({ setOpenModal }: ModalProps) {
    const handleClose = () => setOpenModal(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={handleClose}
        >
            <div
                className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-800/60">
                    <div className="flex items-center gap-3">
                        {selectedDate && (
                            <button
                                onClick={() => {
                                    setSelectedDate(null);
                                    setSelectedSlot(null);
                                }}
                                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ArrowLeft className="size-5" />
                            </button>
                        )}
                        <h2 className="text-xl font-semibold tracking-tight text-white">
                            {selectedDate ? `Créneaux disponibles` : "Prendre un rendez-vous"}
                        </h2>
                    </div>

                    <button
                        onClick={handleClose}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                        aria-label="Fermer"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {!selectedDate ? (
                        <Calendrier
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate} />
                    ) : (
                        <div className="flex flex-col justify-center">
                            <div className="  p-6 flex flex-col alien-center gap-4 ">
                                <div className='flex flex-col text-white items-center'>
                                    <User className="w-10 h-10 " ></User>
                                    <h1>Information</h1>
                                </div>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        id="username"
                                        type="email"
                                        placeholder="Username"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                        required />
                                </div>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        id="numeraux"
                                        type="email"
                                        placeholder="Phone"
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
                            <div className="flex flex-col gap-6">
                                <div className="grid grid-cols-2 gap-3">
                                    {CRENEAUX_ADMIN.map((slot) => {
                                        const isSelected = selectedSlot === slot.id;
                                        return (
                                            <button
                                                key={slot.id}
                                                onClick={() => setSelectedSlot(slot.id)}
                                                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${isSelected
                                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                                                    : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50"
                                                    }`}
                                            >
                                                <Clock className="size-4" />
                                                <span>{slot.hours}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="flex justify-end pt-4 border-t border-zinc-800/60">
                                    <button
                                        disabled={!selectedSlot}
                                        className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        Confirmer le rendez-vous
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}