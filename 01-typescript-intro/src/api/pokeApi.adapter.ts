import axios from "axios";

// Al hacer esto le indico que quien implemente esta interface debe tener un metodo get, no me importa que pase en medio
// Pero debe tener un get, asi, cuando creo las clases pokemon le puedo pasar ambos adaptadores y funcionaran igual
export interface HttpAdapter {
    get<T>(url: string): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter {

    async get<T>(url: string) {
        console.log("con Fetch");
        const call = await fetch(url)
        const data: T = await call.json()
        return data
    }
}

export class PokeApiAdapter implements HttpAdapter {

    private readonly axios = axios

    async get<T>(url: string) {
        console.log("con Axios");

        const { data } = await this.axios.get<T>(url)
        return data
    }

    post(url: string, payload: any) { }
    patch(url: string, payload: any) { }
    delete(url: string) { }
}