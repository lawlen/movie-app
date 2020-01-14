// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.config.productionTip = false



let app = null;

// wait until auth is ready before render
firebase.auth().onAuthStateChanged(() => {
  /* eslint-disable no-new */
  if(!app){
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
});