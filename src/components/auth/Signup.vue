
<template>
  <div class="signup container">
      <form @submit.prevent="signUp" class="card-panel">
            <h2 class="center deep-purple-text">Signup</h2>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email"  v-model="email">
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password">
            </div>
            <div class="field">
                <label for="alias">Alias:</label>
                <input type="alias" name="alias" v-model="alias">
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple" @click.prevent="signUp" >Signup</button>
            </div>
      </form>
  </div>
</template>

<script>

import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'



export default {
  name: 'Signup',

  data(){
      return {
          email: null,
          password: null,
          alias: null,
          feedback: null,
          slug: null
      }
  },
  methods: {
      signUp: function(){
          if(this.alias && this.email && this.password){
              
            this.slug = slugify(this.alias, {
                replacement: '-', 
                remove: /[$*_.()'"!\-:@]/g, 
                lower: true}
            );

            let ref = db.collection('users').doc(this.slug);

            ref.get().then(doc => {
                if(doc.exists){
                    this.feedback = "Alias already exist.";
                } else {

                    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                        cred => {
                            //console.log(cred.user.uid);
                            ref.set(
                                {
                                    alias: this.alias,
                                    films: null,
                                    user_id: cred.user.uid
                                }
                            ).then(() => { this.$router.push( { name: 'Home'})})
                    })
                    .catch(err => {
                        this.feedback = err.message;
                    });
                    this.feedback = "This alias is free to use.";
                }
            });

            //console.log(this.slug);
     

          } else {
              this.feedback = "All fields must be filled in.";
          }
      }
  }

}
</script>

<style>
    .signup {
        max-width: 400px;
        margin-top: 60px;
    }

    .signup h2 {
        font-size: 2.4em;
    }

    .signup .field{
        margin-bottom: 16px;
    }
</style>

