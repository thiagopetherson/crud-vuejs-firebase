import Vue from 'vue' //Importando o Vue
import axios from 'axios' //Importando o Axios

Vue.use({
    install(Vue) {
   
        //Criando uma instância do Axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-27c39-default-rtdb.firebaseio.com/',
            headers: {
                "Authorization": "abc123"               
            }
        })

        //Interceptando as requisições
        //A função config (podemos usar o nome que quisermos pra essa função) tem as informações da nossa requisição
        Vue.prototype.$http.interceptors.request.use(config => { 
            
            return config       
              
        }, error => Promise.reject(error))

        //Interceptando as respostas        
        Vue.prototype.$http.interceptors.response.use(resp => {

           return resp

        }, error => Promise.reject(error))
    }
})