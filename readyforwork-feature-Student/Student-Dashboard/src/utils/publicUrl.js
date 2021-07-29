const publicUrl = (url = "") => {
    const PUBLIC_URL = process.env.PUBLIC_URL || '';
    url = url.trim()
    if (!url) return PUBLIC_URL;
    if(url && url.startsWith('/')){
        return PUBLIC_URL+url;
    }
    return `${PUBLIC_URL}/${url}`
}

export default publicUrl();