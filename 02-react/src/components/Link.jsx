export function Link({ href, children, ...props }) {
  const handleClick = (event) => {
    // 1. Prevenir el comportamiento por defecto (no recargar)
    event.preventDefault()

    // 2. Cambiar la URL sin recargar la página
    window.history.pushState({}, '', href)

    // 3. Emitir un evento para notificar el cambio
    const navigationEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navigationEvent)
  }

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}