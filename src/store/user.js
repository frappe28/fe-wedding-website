const user = {
  state: {
      id: '', //nomecognome
      nome: '', 
      cognome: '',
      intolleranze: '',
      intolleranze_list: '',
      email: '',
      telefono: '',
      username: '',//a scelta dell'utente
      forestiero: ''
  },
  mutations: {
    /*setClientID (state, clientID) {
      state.clientID = clientID;
    }*/
  },
  actions: {
    setId ({ commit }, id) {
      commit('setId', id);
    },
    setNome ({ commit }, nome) {
      commit('setNome', nome);
    },
    //todo mettere gli altri setter singoli
    setAll ({ commit }, { id, nome }) {
      commit('setId', id);
      commit('setNome', nome);
      //TODO mettere tutto
    }
  },
  getters: {
    getId: (state) => {
      return state.id;
    }
    //todo mettere gli altri getter singoli
    //TODO mettere un getter per tutto l'oggetto
  }
};

export default user;
