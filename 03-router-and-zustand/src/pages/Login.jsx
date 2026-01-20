import { useNavigate } from "react-router"
import { useAuthStore } from "../store/authStore.js"

export default function Login(){
    return (<section>
        <h1>Login Page</h1>
        <p>Please log in to access your profile and other features.</p>
    </section>
    )
}