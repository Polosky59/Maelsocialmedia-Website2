"use client";

import Calendrier from "../calendrier/Calendrier";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { X, ArrowLeft, Clock, User, Phone, Mail } from "lucide-react";
import { getDate } from "./date.action";

interface ModalProps {
    setOpenModal: (open: boolean) => void;
}

interface Meeting {
    id?: number | string;
    date: string;
    heure?: string | null;
}

export default function Modal({ setOpenModal }: ModalProps) {
    const handleClose = () => setOpenModal(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const now = new Date();
    const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(now.getFullYear());

    const [date, setDate] = useState<{ success?: boolean; result?: Meeting[] }>({});

    const currentMonthStr = String(currentMonth).padStart(2, "0");
    const currentYearStr = String(currentYear);

    const loadAppointments = useCallback(async (m: string, y: string) => {
        const fetchedData = await getDate(m, y);
        setDate(fetchedData);
    }, []);

    useEffect(() => {
        loadAppointments(currentMonthStr, currentYearStr);
    }, [loadAppointments, currentMonthStr, currentYearStr]);

    const creneauxDisponibles = useMemo(() => {
        if (!selectedDate || !date.result) return [];

        const formattedDay = String(selectedDate).padStart(2, "0");
        const selectedFullDate = `${currentYearStr}-${currentMonthStr}-${formattedDay}`;

        return date.result
            .filter((item) => item.date === selectedFullDate && item.heure)
            .map((item, index) => ({
                id: item.id || `slot-${index}`,
                hours: item.heure as string,
            }));
    }, [selectedDate, date.result, currentMonthStr, currentYearStr]);

    const handleMonthChange = async (newMonth: number, newYear: number) => {
        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
        setSelectedDate(null);
        setSelectedSlot(null);

        const formattedM = String(newMonth).padStart(2, "0");
        const formattedY = String(newYear);

        const newData = await getDate(formattedM, formattedY);
        setDate(newData);
    };

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
                            setSelectedDate={setSelectedDate}
                            data={date.result}
                            onMonthChange={handleMonthChange}
                        />
                    ) : (
                        <div className="flex flex-col justify-center">
                            <div className="p-6 flex flex-col items-center gap-4">
                                <div className="flex flex-col text-white items-center">
                                    <User className="w-10 h-10 mb-1 text-emerald-500" />
                                    <h1 className="font-semibold text-lg">Vos informations</h1>
                                </div>
                                <div className="relative w-full">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                                        required
                                    />
                                </div>
                                <div className="relative w-full">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        id="phone"
                                        type="tel"
                                        placeholder="Phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                                        required
                                    />
                                </div>
                                <div className="relative w-full">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                {creneauxDisponibles.length > 0 ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {creneauxDisponibles.map((slot) => {
                                            const isSelected = selectedSlot === String(slot.id);

                                            return (
                                                <button
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(String(slot.id))}
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
                                ) : (
                                    <p className="text-center text-sm text-zinc-500 py-4">
                                        Aucun créneau disponible pour cette date.
                                    </p>
                                )}

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