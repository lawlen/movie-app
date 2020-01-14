<template>
  <div class="home">
    <div class="container">
      <h1 class="center">Search Films</h1>
      <form @submit.prevent="searchFilm">
      <div class="row">
        <div class="input-field col s10">
          <input type="text" name="name" v-model="name"/>
        </div>
        <div class="input-field col s2">
          <button class="btn deep-purple" type="submit" name="action">Search
            <i class="material-icons right">search</i>
          </button>
        </div>
      </div>
      </form>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
    </div>




    <div class="container">
      <div class="row" v-for="(film, index) in films" :key="index">

        <div class="col s12 m6 l3"  v-for="(b, index) in film.results" :key="index">
        
          <div class="card">

            <span class="card-title">
              <router-link v-bind:to="'/page/' + b.id"><p>{{ b.title}}</p></router-link>
            </span>

            <div class="card-image">
              <router-link v-bind:to="'/page/' + b.id"><img :src="`https://image.tmdb.org/t/p/w500${b.poster_path}`"/></router-link>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

// film array - loop how many time and push into array after loop
export default {
  name: 'Home',

  data () {
    return {
      name: null,
      films: [],
      feedback: null

    }
  },
  methods: {
    searchFilm: function(){
      if(this.name){

        this.feedback = null;

        this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=98325a9d3ed3ec225e41ccc4d360c817&language=en-US&query=' + this.name).then(function(data){
            this.films = data;
        }); 
      }
      else {
        this.feedback = "You must enter a film name.";
      }
    }
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

</style>
