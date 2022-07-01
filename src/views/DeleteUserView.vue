<template>
    <div class="delete-container">
        <div class="page-title" v-if="!success">Delete user {{user.firstname + " " +  user.lastname}} ?</div>
        <div class="success" v-if="success">User deleted !</div>
        <div class="buttons" v-if="!success">
            <button class="submit" @click="handleDelete(user.id)">Confirm </button>
            <router-link to="/" class="submit">Cancel</router-link>
        </div>
        <router-link v-if="success" to="/" class="submit">Users list</router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations,mapState } from "vuex";
import axios from 'axios';

export default {
    data(){
        return{
            user : {
                firstname : "",
                lastname : "",
                email : "",
                address : "",
                age : 0,
                id : null
            },
            success : false
        }
    },
    mutations : {
        ...mapMutations(["setUserIsCreating","setUserDetail","saveNewUsers","setUserIsUpdating"])
    },
    methods: {
        ...mapActions(["deleteUser"]),
        handleDelete(id){
            this.deleteUser(id)
            this.success = true
        }
    },
    mounted(){
        this.$store.commit('setUserIsLoading', true);
        axios.get(`http://localhost:8080/api/user/`+this.$route.params.id)
        .then(function(res) {
            // this.$store.commit('setUserDetail', res.data.data);
            this.$store.commit('setUserIsLoading', false);
            this.user = res.data.data
        }.bind(this)).catch(err => {
            this.$store.commit('setUserIsLoading', false);
        });
    }
}
</script>

<style>
.delete-container{
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 5rem;
  align-items: center;
}
</style>