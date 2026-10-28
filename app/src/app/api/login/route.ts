import path from "path"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

// Le fichier .env est à la racine de l'application
dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const JWT_SECRET = process.env.JWT_SECRET

// D'habitudes on mets tout ça dans la fonction pour pouvoir arrêter la function si y a une erreur
if (!JWT_SECRET) {
     throw new Error("JWT_SECRET environment variable is not defined.")
}

const createToken = (payload: object, options: jwt.SignOptions = {}): string => {
     return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h", ...options })
}

//changement en requete POST -> Les accès DB doivent être en request POST ou GET, pas en server action, l'api est par défaut server
// A intégrer en try catch
export async function POST(request: Request) {
     const { username, password } = await request.json()

     const trimmedName = String(username ?? "").trim()
     // Et si le client veut un espace au début ou à la fin de son mot de passe ?
     // Quand tu implémentes du hashing de password, pas besoin de trim.
     // Ici pas de hash, mais le mdp est connu du client, donc pas besoin de le formater.
     const trimmedPwd = String(password ?? "").trim()

     // Si il y a un bug avec le .trim, ça renvoie false alors qu'ils y sont, à faire attention
     if (!trimmedName || !trimmedPwd) {
          return Response.json({ success: false, error: "Username and password are required." }, { status: 400 })
     }

     const isAdminUser = trimmedName === process.env.ADMIN_USER
     const isAdminPassword = trimmedPwd === process.env.ADMIN_PASSWORD

     if (!isAdminUser || !isAdminPassword) {
          return Response.json({ success: false, error: "Invalid credentials." }, { status: 401 })
     }

     const token = createToken({
          userId: trimmedName,
          email: `${trimmedName}@local`,
     })

     return Response.json({ success: true, token })
}
