export default function Page() {
    return (
        <div style={
            {
                backgroundColor: "#18181a",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                margin: "0"
            }
        }>
            <div style={
                {
                    background: "white",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: " 0 4px 12px rgba(0, 0, 0, 0.1)",
                    textAlign: "center"
                }
            }>
                <h1 style={{ color: "#28a745" }}>Rendez-vous confirmé</h1>
                <p style={{ color: "#333", fontSize: "16px" }}>Votre rendez-vous a bien été enregistré.</p>
            </div>
        </div >
    )
}