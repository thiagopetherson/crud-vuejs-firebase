import Vue from 'vue' //Importando o Vue
import axios from 'axios' //Importando o Axios

//Definindo a URL base (para acessarmos o backend) que usaremos o AXIOS 
//axios.defaults.baseURL = 'https://curso-vue-27c39-default-rtdb.firebaseio.com/'

//Criando os headers (se fossemos usar o Axios de forma global)
//axios.defaults.headers.common['Authorization']  = 'abc123'
//Acima, quer dizer que em qualquer tipo de requisição mandaremos o 'Authorization'
//Aquele 'abc123' pode ser nosso token que recebemos após um login, por exemplo
//axios.defaults.headers.get['Accepts'] = 'application/json'
//Acima estamos dizendo que todas as nossas requisições GET terão o 'application/json'

Vue.use({
    install(Vue) {
        //Essa propriedade ($http) que estará disponível... 
        //...globalmente para utilizarmos o Axios com essa url por padrao
        //Vue.prototype.$http = axios 

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
            console.log(config.method) 
            return config         
        }, error => Promise.reject(error))

        //Interceptando as respostas        
        Vue.prototype.$http.interceptors.response.use(resp => {            
     
           return resp

        }, error => Promise.reject(error))
    }
})