import axios from 'axios';

// initial state
const state = () => ({
  users: [],
  usersPaginatedData: null,
  user: null,
  totalUsers : 0,
  isLoading: false,
  isCreating: false,
  createdData: null,
  isUpdating: false,
  updatedData: null,
  isDeleting: false,
  deletedData: null,
  responseAdd : null
})

// getters
const getters = {
  userList: state => state.users,
  usersPaginatedData: state => state.usersPaginatedData,
  user: state => state.user,
  totalUsers : state => state.totalUsers,
  isLoading: state => state.isLoading,
  isCreating: state => state.isCreating,
  isUpdating: state => state.isUpdating,
  createdData: state => state.createdData,
  updatedData: state => state.updatedData,

  isDeleting: state => state.isDeleting,
  deletedData: state => state.deletedData,
  responseAdd : state => state.responseAdd
};

// actions
const actions = {
  async fetchAllUsers({ commit }, query = null) {
    let page = '';
    let limit = '';

    if(query !== null){
      page = query.page;
      limit = query.limit;
    }
    
    commit('setUserIsLoading', true);
    let url = `http://localhost:8080/api/user`;

    await axios.get(url)
      .then(res => {
        const users = res.data.data;
        commit('setTotalUsers', users.length);
        
      }).catch(err => {
        console.log('error', err);
    });

    url = `http://localhost:8080/api/user/paginate`;
    if (limit === null) {
      url = `${url}?page=${page}`;
    } else {
      url = `${url}?page=${page}&limit=${limit}`
    }

    await axios.get(url)
      .then(res => {
        const users = res.data.data;
        commit('setUsers', users);
        
        commit('setUserIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsLoading', false);
      });
  },

  async fetchDetailUser({ commit }, id) {
    commit('setUserIsLoading', true);
    await axios.get(`http://localhost:8080/api/user/${id}`)
      .then(res => {
        commit('setUserDetail', res.data.data);
        commit('setUserIsLoading', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsLoading', false);
      });
  },

  async storeUser({ commit }, user) {
    commit('setUserIsCreating', true);
    await axios.post(`http://localhost:8080/api/user`, user)
      .then(res => {
        commit('saveNewUsers', res.data.data);
        commit('setResponseAdd', res.data)
        commit('setUserIsCreating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsCreating', false);
      })
  },

  async updateUser({ commit }, user) {
    commit('setUserIsUpdating', true);
    //commit('setUserIsUpdating', true);
    await axios.put(`${import.meta.env.VUE_APP_API_URL}user/${user.id}`, user)
      .then(res => {
        commit('saveNewUsers', res.data.data);
        commit('setUserIsUpdating', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsUpdating', false);
      });
  },


  async deleteUser({ commit }, id) {
    commit('setUserIsDeleting', true);
    await axios.delete(`http://localhost:8080/api/user/${id}`)
      .then(res => {
        commit('setDeleteUser', res.data.data.id);
        commit('setUserIsDeleting', false);
      }).catch(err => {
        console.log('error', err);
        commit('setUserIsDeleting', false);
      });
  },

  updateUserInput({ commit }, e) {
    commit('setUserDetailInput', e);
  }
}

// mutations
const mutations = {
  setUsers: (state, users) => {
    state.users = users
  },

  setUsersPaginated: (state, usersPaginatedData) => {
    state.usersPaginatedData = usersPaginatedData
  },

  setUserDetail: (state, user) => {
    state.user = user
  },

  setResponseAdd : (state, responseAdd) => {
    state.responseAdd = responseAdd
  },

  setTotalUsers: (state, totalUsers) => {
    state.totalUsers = totalUsers
  },

  setDeleteUser: (state, id) => {
    state.usersPaginatedData.data.filter(x => x.id !== id);
  },

  setUserDetailInput: (state, e) => {
    let user = state.user;
    user[e.target.firstname] = e.target.value;
    state.user = user
  },

  saveNewUsers: (state, user) => {
    state.users.unshift(user)
    state.createdData = user;
  },

  saveUpdatedUser: (state, user) => {
    state.users.unshift(user)
    state.updatedData = user;
  },

  setUserIsLoading(state, isLoading) {
    state.isLoading = isLoading
  },

  setUserIsCreating(state, isCreating) {
    state.isCreating = isCreating
  },

  setUserIsUpdating(state, isUpdating) {
    state.isUpdating = isUpdating
  },

  setUserIsDeleting(state, isDeleting) {
    state.isDeleting = isDeleting
  },

}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}