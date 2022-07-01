<template>
  <div class="create-container">
    <div class="page-title">
      Create User
    </div>
    <Form class="form" v-slot="{ values }" @submit="handleSubmit" :validation-schema="schema">
      <div class="input first">
        <div class="input-field">
          <label class="label" for="firstname">First Name</label>
          <Field class="field" name="firstname" type="text" />
        </div>
        
        <ErrorMessage class="error" name="firstname" />
      </div>
      <div class="input">
        <div class="input-field">
        <label class="label" for="lastname">Last Name</label>
        <Field class="field" name="lastname" type="text" />
        </div>
        <ErrorMessage class="error" name="lastname" />
      </div>
      <div class="input">
        <div class="input-field">
        <label class="label" for="email">Email</label>
        <Field class="field" name="email" type="email" />
        </div>
        <ErrorMessage class="error" name="email" />
      </div>
      <div class="input">
        <div class="input-field">
        <label class="label" for="address">Address</label>
        <Field class="field" name="address" type="text" />
        </div>
        <ErrorMessage class="error" name="address" />
      </div>
      <div class="input last">
        <div class="input-field">
        <label class="label" for="age">Age</label>   
        <Field class="field" name="age" type="number" />
        </div>
        <ErrorMessage class="error" name="age" />
      </div>
      
      <!-- print form values -->
      <div class="error-mail" v-if="error == 'Duplicated email'">Duplicated Email! Please try another one.</div>
      <div class="success" v-if="success">User added succesfully!</div>
      <button v-if="!success" class="submit">Add new user</button>
      <div class="buttons" v-if="success">
        <button v-if="success" class="submit">Add new user</button>
        <router-link to="/" class="submit">Users list</router-link>
      </div>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { mapActions, mapMutations } from "vuex";
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
      success : false
    }
  },
  components : {
    Form,
    Field,
    ErrorMessage
  },
  mutations : {
    ...mapMutations(["setUserIsCreating","saveNewUsers"])
  },
  methods: {
    ...mapActions(["storeUser"]),
    handleSubmit(values) {
      // Submit values to API...
      this.success = false
      this.error = null
      values.age = parseInt(values.age)
      this.$store.commit('setUserIsCreating', true);
      axios.post(`http://localhost:8080/api/user`, values)
      .then(res => {
        this.$store.commit('saveNewUsers', res.data.data);
        this.$store.commit('setUserIsCreating', false);
        this.success = true
      }).catch(function(err) {
        console.log('error', err);
        this.$store.commit('setUserIsCreating', false);
        console.log(err.response.data.errors[0])
        this.error = err.response.data.errors[0]
      }.bind(this))
    },
  }
}
</script>

<style>

.create-container{
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-top: 5rem;
}
.page-title{
  text-align: center;
  font-size: 3rem;
  line-height: 2rem;
}
.form{
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   gap: 1rem;
   background-image: linear-gradient(0deg, rgb(224, 224, 224) 0%, rgb(160, 160, 160) 84%);
   border-radius: 20px;
   box-shadow: 5px 5px rgba(0, 0, 0, 0.432);
}
.input{
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  flex-direction: column;
}
.first{
  padding-top: 2rem;
}
.last {
  padding-bottom: 2rem;
}
.input-field {
  display: flex;
  gap: 2rem;
}
.label{
  flex: 2 0 0;
  font-size: 1.4rem;
}
.field{
  width : 20rem;
  border: none;
  border-bottom: 1px solid rgb(102, 102, 102);
  background-color: transparent;
  font-size: 1.5rem;
}
.field:focus-visible{
  border: none !important;
  border-bottom: 2px solid blue !important;
  outline: none;
}
.submit{
  margin-bottom: 2rem;
  width: 20rem;
  align-self: center;
  font-size: 1.2rem;
  background-color: aliceblue;
  border: 1px solid rgb(165, 165, 165);
  border-radius: 47px;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  color: black;
}
.submit:hover{
  background-color: black;
  color: white;
}
.error{
  color: rgb(192, 0, 0);
  font-size: 1.1rem;
}
.error-mail{
  color: red;
  font-size: 1.2rem;
  text-align: center;
}
.success{
  color: rgb(25, 0, 255);
  font-size: 1.2rem;
  text-align: center;
}
.buttons{
  display: flex;
  margin-left: 2rem;
  margin-right: 2rem;
  gap: 2rem;
}
</style>