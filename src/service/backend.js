import axios from 'axios';
import { API_GW_URL } from '../costants';

const API = axios.create({
  baseURL: API_GW_URL
});

export const signIn = async(user) =>{
    try {
        const response = await API.get('/controllo-invitato', 
            {
                params:{
                    nome: user.nome,
                    cognome: user.cognome
                }
            }
        )
        return response.data;
    } catch (error) {
        throw new Error(`Login fallito: ${error.message}`)
    }
}

export const confermaPresenza = async(user) =>{
    try {
        const response = await API.post('/conferma-presenza', 
            {
                id: user.id,
                nome: user.nome, 
                cognome: user.cognome,
                intolleranze: user.intolleranze,
                intolleranze_list: user.intolleranze_list,
                email: user.email,
                telefono: user.telefono,
                forestiero: user.forestiero
            }
        )
        return response.data;
    } catch (error) {
        throw new Error(`Login fallito: ${error.message}`)
    }
}
