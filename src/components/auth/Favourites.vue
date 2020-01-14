<template>
  <div class="home">
    <div class="container">
      <h1 class="center">Your Favourites</h1>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
    </div>

    <div class="container">
      <div class="row">
       
        <div class="col s12 m6 l3"  v-for="film in favs" :key="film.fid">
          
          <div class="card">

            <span class="card-title">
              <router-link v-bind:to="'/page/' + film.fdata.id"><p>{{ film.fdata.title }}</p></router-link>
            </span>

            <div class="card-image">
              <router-link v-bind:to="'/page/' + film.fdata.id"><img :src="`https://image.tmdb.org/t/p/w500${film.fdata.poster_path}`"/></router-link>
            </div>
  
           <i class="material-icons delete" @click="deleteFilm(film.fid)">delete</i>
          </div>
          
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import firebase from 'firebase'
import db from '@/firebase/init'

// film array - loop how many time and push into array after loop
export default {
  name: 'Favourites',

  data () {
    return {
      name: null,
      films: [],
      feedback: null,
      favs: [],
      video: null,
      refs:[]

    }
  },
  methods: {

    deleteFilm: function(id){

      console.log(id);

      //let user = firebase.auth().currentUser;
     

      db.collection('users').doc(id).delete().then(() => {
        this.favs = this.favs.filter((f) => {
        //this.$router.push({ name: 'Favourites'});
        //vm.$forceUpdate();
        location.reload();
          return f.id != id;
          
        });
      }); 





    },
   
    showFilms: function(){
            


        var temp = [];

    


        this.films.forEach(f => {
          
          //
          this.$http.get('https://api.themoviedb.org/3/movie/' + f.fdata.film + '?api_key=98325a9d3ed3ec225e41ccc4d360c817').then(function(data){
             
            // console.log(f.fid);
             //console.log(f.fdata.film);

              // record id
            // console.log(f.fdata.id);


             //let rid = f.id;
             //console.log(rid);
            let fp = {fid: f.fdata.id, fdata: data.body};
              
              //console.log(data.body);

              //console.log(fp);
            this.favs.push(fp);

             //this.favs.push(data.body);

            
  
          });
            
        });
     
        
    }
  },
  mounted(){
    let user = firebase.auth().currentUser;

    //console.log(user.uid);
 

    db.collection('users').where('user_id', '==', user.uid).get().then(snapshot => 
    {
        snapshot.forEach((doc) => {
            
            let note = doc.data();
            note.id = doc.id;
            //console.log(note.id);
            this.refs.push(note.id);

            let fp = {fid: note.id, fdata: note};
            this.films.push(fp);

            //this.films.push(note);
            


        })
    }).then(() => {
      this.showFilms();

      //console.log(this.films);

      //this.films.forEach(f => {

        // film id
        //console.log(f.fdata.film);

        // database id record
        //console.log(f.fid);
      //});


      console.log(this.favs);

      this.favs.forEach(f => { 
        //console.log(f.fdata.film);
        //console.log(f);
        // database id record
        //console.log(f.fid);
      });
    });

  

    

    },
      created() {

 
            
  },
  beforeMount(){
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .home {
   
  }

  .container {
    margin: 0 auto;
  }

  .container img {
    height: 250px;
    width: 200px;
  }

 img {
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
}

.card {
    /*box-shadow: 2px 4px #888888;*/
}

.card-title {
  text-align: center;
}

.card-title p {
  font-size: 0.7em;
  padding-top: 20px;
}

.delete {
  cursor: pointer;
}

</style>
