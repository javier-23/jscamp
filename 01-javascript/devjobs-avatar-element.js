
class DevJobsAvatar extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Crear shadow DOM
    }

    createURL(service, username) {
        return `https://unavatar.io/${service}/${username}`;
    }

    render() {

        const service = this.getAttribute('service') ?? 'github';
        const username = this.getAttribute('username') ?? 'mdo';
        const size = this.getAttribute('size') ?? '40';

        const url = this.createURL(service, username);

        this.shadowRoot.innerHTML = `
        <style>
            img {
            width: ${size}px;
            height: ${size}px;
            border-radius: 9999px;
            display: block;
            margin-right: 1rem;
            }
        </style>
        <img 
            src="${url}"
            alt="Avatar de ${username}"
        />
        `
    }

    connectedCallback() {
        this.render();
    }

}

customElements.define('devjobs-avatar', DevJobsAvatar);