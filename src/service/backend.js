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
    console.log(user);
    try {
        const input = {
                id: user.nome + user.cognome,
                nome: user.nome, 
                cognome: user.cognome,
                intolleranze: user.intolleranze,
                intolleranze_list: user.intolleranze_list,
                email: user.email,
                telefono: user.telefono,
                username: user.username,
                forestiero: user.forestiero
            };
        console.log(input);
        const response = await API.post('/conferma-presenza', 
            input,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data;
    } catch (error) {
        throw new Error(`Login fallito: ${error.message}`)
    }
}
