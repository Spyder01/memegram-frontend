import { api } from "../server";



const call = async (route:string, {
    method = 'GET',
    headers = {},
    body = null
    } = {}) => {
    
        try {

            const res = await fetch(`${api}${route}`, {
                method,
                headers,
                body: JSON.stringify(body),
            })

            const data = await res.json();

            return data;

        } catch (error) {
            throw error;
        }
};

export default call;