import Calendrier from "@/components/calendrier/Calendrier"
import "./style.css"

export default function Page() {
    return (
        <section className="adminD">
            <div className="container">
                <div className="card">
                    <h2>Organiser vos rendez-vous</h2>
                    <div className="toto" id="calendar-box">
                        <div className="container-calebdar">
                            <Calendrier/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container container2">
                <div className="card aling-start">
                    <h2>Vos rendez-vous</h2>
                    <div id="meting" className="list">
                        <p style={{ color: "gray" }} className="subtitle">
                            Aucun rendez-vous pour le moment
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}