import "./style.css"

export default function Page() {
    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="field">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                />
            </div>
            <div className="field">
                <label htmlFor="tiktok">Password</label>
                <input
                    id="Password"
                    type="password"
                    placeholder="password"
                    autoComplete="off"
                />
            </div>
            <button type="submit" id="btn-input">
                Enregistrer
            </button>
        </div>
    )
}