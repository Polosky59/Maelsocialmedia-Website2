"use client"

import { useState } from "react"
import Modal from "../components/modal/Modal"
import Post from "@/components/Post"
import Card from "@/components/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import mainLogo from "../asset/logo_long.png"

export default function Page() {
     const [openModal, setOpenModal] = useState(false)

     return (
          <>
               {/* Tirer avantage de Tailwind CSS: inclure le CSS directement */}
               <div className="bg" />
               <nav>
                    <img src={mainLogo.src} alt="Logo" className="h-6" />
               </nav>
               <section className="header-container">
                    <div className="header-container-title">
                         <h1>
                              Boostez votre <br />
                              présence en ligne
                         </h1>
                         <p>La gestion de communauté qui fait grandir votre business</p>
                         <div className="social-links">
                              <a href="https://www.instagram.com/maelsocialmedia/" target="_blank">
                                   <FontAwesomeIcon icon={faInstagram} />
                              </a>
                              <a href="https://www.linkedin.com/in/mael-santier-07b175409/" target="_blank">
                                   <FontAwesomeIcon icon={faLinkedin} />
                              </a>
                         </div>
                         <button
                              className="cta-btn modal-trigger"
                              onClick={() => {
                                   setOpenModal(true)
                              }}
                         >
                              Prendre rendez-vous
                         </button>
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
                              Chez Maël Social Media,
                              <strong>
                                   <span>chaque entreprise a des besoins différents</span>
                              </strong>
                              {/* Pourquoi pas une liste flex ?  */}
                              .<br />
                              <br />
                              C’est pourquoi je propose des prestations
                              <strong>
                                   <span>adaptées à votre activité</span>
                              </strong>
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
                              Que vous soyez indépendant, commerçant, artisan ou entreprise, l’objectif reste le même :
                              vous aider à développer votre présence sur les réseaux sociaux
                              <strong>
                                   <span>sans vous compliquer la vie</span>
                              </strong>
                              .<br />
                              <br />
                              💬
                              <strong>
                                   <span>Besoin d’un accompagnement ?</span>
                              </strong>
                              <br />
                              Contactez-moi pour découvrir la formule la plus adaptée à votre projet.
                              <br />
                         </p>
                    </div>
               </section>
               <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-800/80 mt-30">
                    <div className="border-t border-zinc-900 bg-zinc-950/80 py-6">
                         <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
                              <p>© {new Date().getFullYear()} Maël Social Media. Tous droits réservés.</p>
                              <div className="flex gap-6">
                                   <p>Created by Norvoxx from EPI STUDIO</p>
                              </div>
                         </div>
                    </div>
               </footer>

               {openModal && <Modal setOpenModal={setOpenModal} />}
          </>
     )
}
