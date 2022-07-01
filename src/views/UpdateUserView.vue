<template>
  <div class="update-container">
    <div class="page-title">
      Update User
    </div>
    <Form class="form" @submit="handleSubmit" :validation-schema="schema">
      <div class="input first">
        <div class="input-field">
          <label class="label" for="firstname">First Name</label>
          <Field class="field" name="firstname" type="text" v-model="user.firstname" />
        </div>
        
        <ErrorMessage class="error" name="firstname" />
      </div>
      <div class="input">
        <div class="input-field">
        <label class="label" for="lastname">Last Name</label>
        <Field class="field" name="lastname" type="text" v-model="user.lastname"/>
        </div>
        <ErrorMessage class="error" name="lastname" />
      </div>
      <div class="input">
        <div class="input-field">
        <label class="label" for="email">Email</label>
        <Field class="field" name="email" type="email" v-model="user.email"/>
        </div>
        <ErrorMessage class="error" name="email" />
      </div>
      <div class="input">
        <div class="input-field">
        <label class="label" for="address">Address</label>
        <Field class="field" name="address" type="text" v-model="user.address"/>
        </div>
        <ErrorMessage class="error" name="address" />
      </div>
      <div class="input last">
        <div class="input-field">
        <label class="label" for="age">Age</label>   
        <Field class="field" name="age" type="number" v-model="user.age"/>
        </div>
        <ErrorMessage class="error" name="age" />
      </div>
      
      <!-- print form values -->
      <div class="success" v-if="success">User updated succesfully!</div>
      <button v-if="!success" class="submit">Update user</button>
      <div class="buttons" v-if="success">
        <button v-if="success" class="submit">Update user</button>
        <router-link to="/" class="submit">Users list</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { mapActions, mapGetters, mapMutations,mapState } from "vuex";
import axios from 'axios';

export default {
  data(){
    const schema = yup.object({
      email: yup.string().required().email(),
      firstname : yup.string().required(),
      lastname : yup.string().required(),
      address: yup.string().required(),
      age : yup.number().required().min(19, "Must be more than 18")
    });
    return{
      schema,
      error : null,
      success : false,
      user : {
        firstname : "",
        lastname : "",
        email : "",
        address : "",
        age : 0,
        id : null
      }
      
    }
  },
  components : {
    Form,
    Field,
    ErrorMessage
  },
  mutations : {
    ...mapMutations(["setUserIsCreating","setUserDetail","saveNewUsers","setUserIsUpdating"])
  },
  methods: {
    ...mapActions(["fetchDetailUser"]),
    handleSubmit(values) {
      this.success = false
      this.$store.commit('setUserIsUpdating', true);
    //commit('setUserIsUpdating', true);
    this.user.age = parseInt(this.user.age)
    axios.put(`http://localhost:8080/api/user/`+this.user.id, this.user)
      .then(res => {
        this.user = res.data.data
        this.success = true
      }).catch(err => {
        console.log('error', err);
        this.$store.commit('setUserIsUpdating', false);
      });
    },
  },
  created(){
    this.$store.commit('setUserIsLoading', true);
    axios.get(`http://localhost:8080/api/user/`+this.$route.params.id)
      .then(function(res) {
        // this.$store.commit('setUserDetail', res.data.data);
        this.$store.commit('setUserIsLoading', false);
        this.user = res.data.data
      }.bind(this)).catch(err => {
        this.$store.commit('setUserIsLoading', false);
      });
  },
  mounted(){
  }
}
</script>

<style>

.update-container{
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 5rem;
}
</style>