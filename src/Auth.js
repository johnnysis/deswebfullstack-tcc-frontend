import axios from 'axios';

export const isAuthenticated = async () => {
    //criar validação para googleauth, também.
    let token = localStorage.getItem('token');
    if (token) {
        try {
            const { data } = await axios.get(`/login/validToken?token=${token}`);
            return data;
        }
        catch {
            //Falha na conexão. Criar uma página de erro.
            return false;
        }
    } else {
        return false;
    }
}