"use client";

import Calendrier from "../calendrier/Calendrier";
import React from "react";
import { useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
    setOpenModal: (open: boolean) => void;
}

export default function Modal({ setOpenModal }: ModalProps) {
    const handleClose = () => setOpenModal(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    console.log(selectedDate)
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={handleClose}>
            <div
                className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-100"
                onClick={(e) => e.stopPropagation()}>

                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-800/60">
                    <h2 className="text-xl font-semibold tracking-tight text-white">
                        Prendre un rendez-vous
                    </h2>

                    <button
                        onClick={handleClose}
                        className="flex items-center justify-center w-8 h-8 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
                        aria-label="Fermer">
                        <X></X>
                    </button>
                </div>
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <Calendrier 
                    selectedDate={selectedDate} 
                    setSelectedDate={setSelectedDate} />
                </div>
            </div>
        </div>
    );
}