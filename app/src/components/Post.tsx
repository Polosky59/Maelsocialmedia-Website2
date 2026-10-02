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
            </div>
        </>
    )
}