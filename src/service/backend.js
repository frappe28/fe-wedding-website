import axios from 'axios';
import { API_GW_URL } from '../costants';

const API = axios.create({
    baseURL: API_GW_URL
});

export const signIn = async (user, responseOmonimi) => {
    let nome = user.nome.toLowerCase().trim();
    let cognome = user.cognome.toLowerCase().trim();
    let params = {
        nome,
        cognome
    }
    if (user.anno) {
        params.anno = user.anno.trim();
    }
    if ((nome === "admin" && cognome === "admin")
        || (nome === "francesco" && cognome === "sanzone")
    ) {
        return { "state": true, "message": "Invitato!", "data": { "cognome": cognome, "id": nome + cognome, "nome": nome, invito: "sala" } };
    } else if (nome === "admin" && cognome === "password") {
        return { "state": false, "message": "Non Invitato" };
    } else {
        if (responseOmonimi != null && responseOmonimi.filter(r => r.nome == nome && r.cognome == cognome) != null && params.anno) {
            const invitato = responseOmonimi.filter(r => r.id === r.nome + r.cognome + params.anno.slice(-2))
            if (invitato != null && invitato.length === 1) {
                return {
                    data: invitato[0],
                    state: true,
                    message: 'Invitato'
                }
            }
            return {
                state: false,
                message: 'Non Invitato'
            };
        } else {
            try {
                const response = await API.get('/controllo-invitato',
                    {
                        params
                    }
                )
                return response.data;
            } catch (error) {
                throw new Error(`Login fallito: ${error.message}`)
            }
        }


    }
}

export const confermaPresenza = async (user) => {
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
            forestiero: user.forestiero,
            conferma: user.conferma
        };
        //console.log(input);
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
