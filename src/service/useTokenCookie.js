import { ref } from 'vue';

export function useTokenCookie() {
    const token = ref(null);

    // Set a cookie with a bearer token
    const setTokenCookie = (tokenValue, days = 1) => {
        token.value = tokenValue;
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = `token=${tokenValue};${expires}; path=/`;
    };

    // Get the bearer token from the cookie
    const getTokenCookie = () => {
        const nameEQ = 'token=';
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
            if (cookie.indexOf(nameEQ) === 0) {
                token.value = cookie.substring(nameEQ.length);
                return token.value;
            }
        }
        return null;
    };

    // Delete the token cookie
    const deleteTokenCookie = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        token.value = null;
    };

    return { token, setTokenCookie, getTokenCookie, deleteTokenCookie };
}
