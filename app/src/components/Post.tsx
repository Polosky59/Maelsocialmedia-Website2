export default function Post() {
    return (
        <>
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

                {/* <div className="viewPreformance">
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
                </div> */}
            </div>
        </>
    )
}