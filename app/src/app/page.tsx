import Image from "next/image";

export default function Page() {
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
          <button className="cta-btn modal-trigger">Prendre rendez-vous</button>
        </div>
        <div className="header-container-card">
          <div className="insta-card">
            <div className="insta-header">
              <div className="user-info">
                <div className="avatar" />
                <span className="username">Maelsocialmedia</span>
              </div>
              <span>•••</span>
            </div>
            <div className="insta-image" />
            <div className="graph-line">
              <p>Boostez votre visibilité</p>
              <svg viewBox="0 0 300 200">
                <polyline
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth={4}
                  points="0,180 60,140 120,120 180,80 240,40 300,20"
                />
                <defs>
                  <linearGradient id="gradient" x1={0} y1={0} x2={0} y2={1}>
                    <stop offset="0%" stopColor="#6a11cb" />
                    <stop offset="100%" stopColor="#2575fc" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="viewPreformance">
              <h2>Statistiques du compte</h2>
              <p className="stat-period">Derniers 30 jours</p>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Comptes touchés</span>
                  <span className="stat-value">+12.4k</span>
                  <span className="stat-trend">↑ 24%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Interactions</span>
                  <span className="stat-value">1,852</span>
                  <span className="stat-trend">↑ 12%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Enregistrements</span>
                  <span className="stat-value">428</span>
                  <span className="stat-trend">↑ 8%</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Taux d'engagement</span>
                  <span className="stat-value">5.8%</span>
                  <span className="stat-trend">↑ 2.1%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="card-container">
        <div className="card">
          <div className="card-header">
            <h2>Parcours</h2>
            <p>Mon Parcours </p>
          </div>
          <p className="card-text">
            Titulaire d’un{" "}
            <strong>
              <span>BEP Électricien</span>
            </strong>
            , j’ai débuté mon parcours professionneldans le domaine de
            l’électricité,où j’ai développé
            <strong>rigueur</strong>, <strong>autonomie</strong> et{" "}
            <strong>respect des normes de sécurité</strong>.
            <br />
            <br />
            J’ai ensuite choisi de me reconvertir dans le{" "}
            <strong>
              <span>secteur de la sécurité en obtenant le TFP APS</span>
            </strong>{" "}
            (Agent de Prévention et de Sécurité), ce qui m’a permis d’acquérir des
            compétences en <strong>surveillance</strong>,{" "}
            <strong>prévention des risques</strong> et{" "}
            <strong>gestion des situations sensibles</strong>.
            <br />
            <br /> Aujourd’hui, je suis une
            <strong>
              <span> formation de Community Manager chez Wemodo</span>
            </strong>{" "}
            afin de développer mes compétences en communication digitale, gestion
            des réseaux sociaux et création de contenu. Mon parcours illustre ma
            capacité d’adaptation, ma polyvalence et ma volonté de continuer à
            évoluer professionnellement.
          </p>
        </div>
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
      <div className="modal-container">
        <div className="overlay modal-trigger" />
        <div
          className="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="dialogDesc"
        >
          <button className="close-modal modal-trigger" aria-label="close modal">
            x
          </button>
          <h1 id="modalTitle">Rendez-vous</h1>
          <p>Prendre un rendez-vous aux horaires disponibles</p>
          <div className="dual">
            <div id="calendar" />
            <div className="rendez-vous">
              <div id="meting" className="list" />
            </div>
          </div>
        </div>
      </div>
    </>

  </>);
}
