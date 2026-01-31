// API Configuration
const API_URL = import.meta.env.VITE_API_URL || "https://pro-orders-46b5.vercel.app";

// Remove trailing slash if exists
export const baseURL = API_URL.replace(/\/$/, '');

// API endpoints
export const endpoints = {
    // Products
    products: {
        list: `${baseURL}/api/product/list`,
        add: `${baseURL}/api/product/add`,
        update: (id) => `${baseURL}/api/product/update/${id}`,
        remove: `${baseURL}/api/product/remove`
    },

    // Users
    users: {
        all: `${baseURL}/api/user/all`,
        me: `${baseURL}/api/user/me`,
        login: `${baseURL}/api/user/login`,
        register: `${baseURL}/api/user/register`
    },

    // Orders
    orders: {
        all: `${baseURL}/api/order/all`,
        update: `${baseURL}/api/order/update`
    }
};

console.log("🔗 Admin Panel API Configuration:");
console.log("Base URL:", baseURL);
console.log("Environment:", import.meta.env.MODE);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

export default baseURL;