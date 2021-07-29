const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || 'authtoken';

export const login = (token) => {
    return Promise.resolve().then(() => {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    })
}

export const logout = () => {
    return Promise.resolve().then(() => {
        localStorage.removeItem(TOKEN_KEY);
    });
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }
    return false;
}

export const getAuth = () => {
    let auth = localStorage.getItem(TOKEN_KEY);
    return auth ? JSON.parse(auth) : {};
}

export const isAdmin = () => {
    let { role } = getAuth();
    return role === 'admin'
}