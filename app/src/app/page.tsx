"use client"

import { useState } from "react";
import Modal from "../components/modal/Modal";
import Post from "@/components/Post";
import Card from "@/components/Card";

export default function Page() {
  const [openModal, setOpenModal] = useState(false)

  return (<>
    <>
      <div className="bg" />
      <nav>
        <img src="./public/asset/logo_long.png" height="30px" />
      </nav>
      <section className="header-container">
        <div className="header-container-title">
          <h1>
            Boostez votre <br />
            présence en ligne
          </h1>
          <p>La gestion de communauté qui fait grandir votre business</p>
          <div className="social-links">
            <a href="#" target="_blank" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" target="_blank" aria-label="Twitter">
              <i className="fab fa-twitter" />
            </a>
            <a href="#" target="_blank" aria-label="TikTok">
              <i className="fab fa-tiktok" />
            </a>
          </div>
          <button
            className="cta-btn modal-trigger"
            onClick={() => {
              setOpenModal(true)
            }}
          >Prendre rendez-vous</button>
        </div>
        <div className="header-container-card">
          <Post></Post>
        </div>
      </section>

      <section className="card-container">
        <Card></Card>
        <div className="card">
          <div className="card-header">
            <h2>Tarif</h2>
            <p>Tarifs simples, adaptés à vos besoins</p>
          </div>
          <p className="card-text">
            Chez Maël Social Media,{" "}
            <strong>
              <span>chaque entreprise a des besoins différents</span>
            </strong>
            .<br />
            <br />
            C’est pourquoi je propose des prestations{" "}
            <strong>
              <span>adaptées à votre activité</span>
            </strong>{" "}
            et à vos objectifs :<br />
            <br />
            📱 Gestion des réseaux sociaux
            <br />
            🎨 Création de contenus
            <br />
            ✍️ Rédaction de publications
            <br />
            📈 Développement de votre visibilité
            <br />
            Que vous soyez indépendant, commerçant, artisan ou entreprise,
            l’objectif reste le même : vous aider à développer votre présence sur
            les réseaux sociaux{" "}
            <strong>
              <span>sans vous compliquer la vie</span>
            </strong>
            .<br />
            <br />
            💬{" "}
            <strong>
              <span>Besoin d’un accompagnement ?</span>
            </strong>
            <br />
            Contactez-moi pour découvrir la formule la plus adaptée à votre projet.
            <br />
          </p>
        </div>
      </section>
      {
        openModal && <Modal setOpenModal={setOpenModal} />
      }
    </>
  </>);
}
