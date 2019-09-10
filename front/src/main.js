// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document'
// import VueCkeditor from 'vue-ckeditor5'
import CKEditor from '@ckeditor/ckeditor5-vue'

Vue.prototype.$http = axios
Vue.config.productionTip = false
// Vue.use(VueCkeditor)
Vue.use(CKEditor)
// const options = {
//   editors: {
//     classic: ClassicEditor

//   },
//   name: 'ckeditor'
// }

// Vue.use(VueCkeditor.plugin, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
