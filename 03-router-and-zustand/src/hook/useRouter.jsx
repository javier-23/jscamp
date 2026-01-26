import { useNavigate, useLocation } from "react-router";

// Para navegar programaticamente y obtener la ruta actual
export function useRouter() {
    const navigate = useNavigate()
    const location = useLocation()

    function navigateTo(path){
        navigate(path)
    }

    return { 
        navigateTo,
        currentPath: location.pathname
    }
}