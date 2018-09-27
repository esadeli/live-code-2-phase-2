<template>
  <div>
      <div class="navbar bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">Livecode2</a>
        <div class="header-right">
          <div v-if = "error !== ''">
              <div class="alert alert-danger" role="alert">
                  Username/password/email tidak sesuai
              </div>
          </div>
          <div v-if= "token === '' || token === null">
              <input type="text" v-model= "inputlogin" placeholder="username/email">
              <input type="password" v-model= "password" placeholder="password">
              <button v-on:click= "loginUser()">Login</button>
          </div>
          <div v-else-if= "token !== '' && token !== null">
              <button v-on:click= "logoutUser()">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  data () {
    return {
      inputlogin: '',
      password: '',
      token: '',
      name: '',
      userid: '',
      error: ''
    }
  },
  methods: {
    loginUser () {
      // reset error
      this.error = ''
      let self = this
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/login',
        data: {
          logininput: self.inputlogin,
          password: self.password
        }
      })
        .then(user => {  
          self.token = user.data.data
          self.name = user.data.name
          self.userid = user.data.id
          // send to local storage
          localStorage.setItem('token', self.token)
          localStorage.setItem('name', self.name)
          localStorage.setItem('id', self.userid)

          // emit
          this.$emit('result-token', self.token)
          this.$emit('result-name', self.name)
          this.$emit('result-userid', self.userid)
        })
        .catch(error => {
          self.error = error
          console.log('ERROR: ', error)
        })
    },

    // logout
    logoutUser () {
      this.token = ''
      this.name = ''
      this.userid = ''
      this.error = ''
      localStorage.removeItem('token')
      localStorage.removeItem('name')
      localStorage.removeItem('id')
    }
  }
}
</script>

<style>
/*!
 * Start Bootstrap - Shop Homepage (https://startbootstrap.com/template-overviews/shop-homepage)
 * Copyright 2013-2017 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-shop-homepage/blob/master/LICENSE)
 */

.container-content {
  margin-top: 30px;
}

.card {
  margin-bottom: 20px;
}

.translate {
  margin-top: 5px;
}
</style>
