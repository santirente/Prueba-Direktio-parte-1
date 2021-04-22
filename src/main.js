import Vue from 'vue'
import App from './App.vue'
import VuePaginate from "vue-paginate";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
window.toastr = require('toastr')
Vue.use(VueToastr2)
Vue.use(VuePaginate)
new Vue({
  el: '#app',
  render: h => h(App)
})
