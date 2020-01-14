<template>
  <div class="home">
    <div class="container">
      <div class="row">

        <!-- right -->
        <div class="col s7 push-s5">
          <h3 class="center">{{ blog.original_title }}</h3>
          <ul>

          </ul>          
        <p>Released Date: {{ blog.release_date }}</p>
        <p>Plot:</p> <p>{{ blog.overview }}</p>
        <p>Rated: {{ blog.popularity }}</p>
        <p>Run Time: {{ blog.runtime }} mins</p>

        Genre: <li v-for="genre in blog.genres">
          {{ genre.name }}
        </li>

        
        <p><button class="btn deep-purple" @click="addFavourite" v-show="login">Add to Favourite</button>
          
        <p><a class="btn deep-purple" v-bind:href="'https://www.imdb.com/title/' + blog.imdb_id">View IMDB</a></p>
        <p class="green-text center" v-if="feedback">{{ feedback }}</p>
        </div>


        <!-- left -->
        <div class="col s5 pull-s7">
          <img :src="`https://image.tmdb.org/t/p/w500${blog.poster_path}`" class="image"/>
        </div>
    </div>




        

    </div>






  </div>
</template>

<script>

import firebase from 'firebase'
import db from '@/firebase/init'

export default {

  data () {
    return {
      id: this.$route.params.id,
      blog: [],
      feedback: null,
      login: false,
      films: [],
      dbid: null
     
    }
  },
  methods: {
    updateId: function(){
      this.id = this.$route.params.id;
    },
    addFavourite: function(){
      //alert("add");

      
     let user = firebase.auth().currentUser;

    //console.log(user.uid);


    db.collection('users').add({
        film: this.blog.id,
        user_id: user.uid
    }).then(() => {
        //this.$router.push({ name: 'Home'});
        this.feedback = "Film has been added to your favourite."
    });


    }



  },
  created() {
    // this.$http.get('https://jsonplaceholder.typicode.com/posts/' + this.id).then(function(data){
      this.$http.get('https://api.themoviedb.org/3/movie/' + this.id + '?api_key=98325a9d3ed3ec225e41ccc4d360c817').then(function(data){
      
          this.blog = data.body;
          
         
    });

    let user = firebase.auth().currentUser;

  
    if(user){
      



  

    //console.log(user.uid);
 
    // check if exist
    db.collection('users').where('user_id', '==', user.uid).get().then(snapshot => 
    {
        snapshot.forEach((doc) => {
            
            let note = doc.data();

            //console.log(doc.id);
    
            this.films.push(note.film);
            


        })
    }).then(()=> {

        if(this.films.indexOf(this.blog.id) > -1 ){
          
          this.login = false;
        }
        else
        {
          
          this.login = true;
        }


    });



    }
  },
  
  mounted(){



  },
  watch: {
    $route : 'updateId'
  }
 
}
</script>

<style scoped>

    #single-blog {
        margin: 0 auto;
        width: 800px;
    }

    img {
      height: 400px;
      margin: 0 auto;
      border: 1px solid black;
    }

    .row {
      margin-top: 50px;
      margin-bottom: 50px;
    }

    .image {
      margin-top: 100px;
    }

</style>

