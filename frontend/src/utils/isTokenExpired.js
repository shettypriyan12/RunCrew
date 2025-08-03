import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return true;

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decoded.exp < currentTime; 
    } catch (err) {
        return false;
    }
};


// export const isTokenValid = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     try {
//         const decoded = jwtDecode(token);
//         const now = Date.now() / 1000; // In seconds
//         return decoded.exp > now;
//     } catch (err) {
//         return false;
//     }
// };