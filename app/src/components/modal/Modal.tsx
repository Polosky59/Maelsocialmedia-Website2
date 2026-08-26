"use client"

import Calendrier from "../calendrier/Calendrier";
import "./style.css"
import React from "react";

import { useState } from "react";

interface ModalProps {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal({ setOpenModal }: ModalProps) {

    const [selectedDateText, setSelectedDateText] = useState("");


    return (
        <div className="modal-container">
            <div className="overlay" />
            <div className="modal active" >
                <button className="close-modal modal-trigger" aria-label="close modal"
                    onClick={() => {
                        setOpenModal(false)
                    }}>
                    x
                </button>

                <h1 id="modalTitle">Rendez-vous</h1>
                <p>Prendre un rendez-vous aux horaires disponibles</p>
                <Calendrier />
            </div>
        </div>
    )
}