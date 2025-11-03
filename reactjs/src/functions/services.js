import { getRequest } from "services.js/axios";

export const getAllPrices = async () => {
    try {
        const response = await getRequest('/prices');
        return response.allPrices;
    } catch (error) {
        console.error(error)
    }
}