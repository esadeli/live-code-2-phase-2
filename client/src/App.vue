<template>
  <div id="app">
    <Navbar @result-token = "gettoken" @result-id= "getuserid" @result-name = "getname"></Navbar>
    <div class="container container-content">
      <div class="row">
        <div class="col-lg-3">
          <div class="list-group">
            <a href="#" class="list-group-item">All Quotes</a>
          </div>
        </div>
         <div class = "col-lg-9">
           <ListStatus :token = "token"></ListStatus>
         </div> 
      </div>
    </div>
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    -->
  </div>
</div>  
</template>
<script>
import Navbar from '@/components/Navbar.vue'
import ListStatus from '@/components/ListStatus.vue'
export default {
  components: {
    Navbar,ListStatus
  },
  data () {
    return {
      token: '',
      name: '',
      userid: ''
    }
  },
  methods: {
    gettoken (input) {
      this.token = input
    },
    getname (input) {
      this.name = input
    },
    getuserid (input) {
      this.userid = input
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
