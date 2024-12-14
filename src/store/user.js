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
      forestiero: '',
      invito: ''
  },
  mutations: {
    setId (state, id) {
      state.id = id;
    },
    setNome (state, nome) {
      state.nome = nome;
    },
    setCognome (state, cognome) {
      state.cognome = cognome;
    },
    setIntolleranze (state, intolleranze) {
      state.intolleranze = intolleranze;
    },
    setIntolleranzeList (state, intolleranze_list) {
      state.intolleranze_list = intolleranze_list;
    },
    setEmail (state, email) {
      state.email = email;
    },
    setTelefono (state, telefono) {
      state.telefono = telefono;
    },
    setUsername (state, username) {
      state.username = username;
    },
    setForestiero (state, forestiero) {
      state.forestiero = forestiero;
    },
    setInvito (state, invito) {
      state.invito = invito;
    }
  },
  actions: {
    setId ({ commit }, id) {
      commit('setId', id);
    },
    setNome ({ commit }, nome) {
      commit('setNome', nome);
    },
    setCognome ({ commit }, cognome) {
      commit('setCognome', cognome);
    },
    setIntolleranze ({ commit }, intolleranze) {
      commit('setIntolleranze', intolleranze);
    },
    setIntolleranzeList ({ commit }, intolleranze_list) {
      commit('setIntolleranzeList', intolleranze_list);
    },
    setEmail ({ commit }, email) {
      commit('setEmail', email);
    },
    setTelefono ({ commit }, telefono) {
      commit('setTelefono', telefono);
    },
    setUsername ({ commit }, username) {
      commit('setUsername', username);
    },
    setForestiero ({ commit }, forestiero) {
      commit('setForestiero', forestiero);
    },
    setInvito ({ commit }, invito) {
      commit('setInvito', invito);
    },
    setAll ({ commit }, data
      //{ id, nome, cognome, intolleranze, intolleranze_list, email, telefono, username, forestiero, invito}
    ) {
      if (null != data) {
        commit('setId',               data.id);
        commit('setNome',             data.nome);
        commit('setCognome',          data.cognome);
        commit('setIntolleranze',     data.intolleranze);
        commit('setIntolleranzeList', data.intolleranze_list);
        commit('setEmail',            data.email);
        commit('setTelefono',         data.telefono);
        commit('setUsername',         data.username);
        commit('setForestiero',       data.forestiero);
        commit('setInvito',           data.invito);
      }
    }
  },
  getters: {
    getId: (state) => {
      return state.id;
    },
    getNome: (state) => {
      return state.nome;
    },
    getCognome: (state) => {
      return state.cognome;
    },
    getIntolleranze: (state) => {
      return state.intolleranze;
    },
    getIntolleranzeList: (state) => {
      return state.intolleranze_list;
    },
    getEmail: (state) => {
      return state.email;
    },
    getTelefono: (state) => {
      return state.telefono;
    },
    getUsername: (state) => {
      return state.username;
    },
    getForestiero: (state) => {
      return state.forestiero;
    },
    getInvito: (state) => {
      return state.invito;
    },
    getAll: (state) => {
       //valutare se ri-costruire l'oggetto da restituire per rimuovere o aggiungere qualcosa.
      return state;
    }
  }
};

export default user;

//questo comando lo sta studiando fransci. non cancellare grazie. document.getElementById('app').__vue_app__.config
