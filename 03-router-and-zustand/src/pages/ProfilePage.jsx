import styles from './ProfilePage.module.css'
import { useAuthStore } from '../store/authStore.js'

export default function ProfilePage() {
    const { handleLogOut } = useAuthStore()

    return (
        <section>
            <h1>Perfil de usuario</h1>
            <p>Esta es la página de perfil de usuario. Aquí puedes ver y editar tu información personal.</p>
        </section>
    )
}