<template>
<div>
        <div v-if = "token !== null && token !== '' && token !== undefined">  
          <div class="row">
            <div class="col-lg-9 col-sm-9 portfolio-item">
              <form>
                <div class="form-group">
                  <textarea class="form-control" rows="3" v-model= "newstatus" placeholder="Quotes"></textarea>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary" v-on:click = "addstatus()">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>  
          <hr>
         <div  v-for="(status, index) in liststatus" :key="index" >
            <div class="row">
                <div class="col-lg-9 col-sm-9 portfolio-item">
                    <div class="card h-70">
                        <div class="card-body">
                        <h4 class="card-title">
                           <div class= "row">
                               <div class = "col-md-3">
                                   By: <h5>{{ status.usernamestatus}}</h5>
                               </div>    
                               <div class = "col-md-6">
                                   {{ status.content }}
                               </div>
                           </div> 
                        </h4>
                        <div v-if= "token !== '' && token !== null ">
                            <a href="#">Delete</a> | <a href="#">Translate</a>
                            <p class="translate font-italic">
                                <i>Translation part </i>
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>  
          </div>
</div>    
</template>

<script>
import axios from 'axios'
export default {
  name: 'ListStatus',
  props: ['token'],
  data () {
    return {
      liststatus: [],
      newstatus: ''
    }
  },
  methods: {
    addstatus () {
       let self = this
       console.log('Data awal--->',self)
       axios({
          method: 'POST',
          url: 'http://localhost:3000/status/',
          headers: {
            token: self.token 
          },
          data: {
             content: self.newstatus 
          } 
       })
       .then(status =>{
            console.log('Sukses update', status.data)
            axios({
                method: 'GET',
                url: 'http://localhost:3000/status/list' 
            })
            .then(list =>{
                //  console.log('HASIL--->',list.data.data)
                self.liststatus = list.data.data
            })
            .catch(error =>{
                console.log('ERROR: ',error)
            })
       })
       .catch(error =>{
           console.log('ERROR: ',error)
       })  
    }
  },
  created () {
     let self = this
     axios({
        method: 'GET',
        url: 'http://localhost:3000/status/list' 
     })
     .then(list =>{
        //  console.log('HASIL--->',list.data.data)
        self.liststatus = list.data.data
     })
     .catch(error =>{
        console.log('ERROR: ',error)
     })
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
