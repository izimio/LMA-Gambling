import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Récupérer le cookie 'token' depuis les cookies de la requête
    const token = event.cookies.get('token');

    // Vérifiez si la requête est pour une route protégée
    if (event.url.pathname !== '/' && !token) {
        // Rediriger vers la page d'accueil ou une page de connexion si le token n'est pas présent
        throw redirect(301, '/');
    }

    // Si le token est présent, continuez avec la requête
    return await resolve(event);
};
