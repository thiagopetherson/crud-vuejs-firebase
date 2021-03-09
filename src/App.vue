<template>
	<div id="app" class="container">
		<h1>HTTP com Axios</h1>
		<b-alert show dismissible v-for="mensagem in mensagens" :key="mensagem.texto" :variant="mensagem.tipo">
			{{ mensagem.texto }}
		</b-alert> <!-- O dismissible é p "x" para fechar o alert -->
		<b-card>
			<b-form-group label="Nome:">
				<b-form-input type="text" size="lg" v-model="usuario.nome" placeholder="Informe o Nome"></b-form-input>
			</b-form-group>
			<b-form-group label="Email:">
				<b-form-input type="email" size="lg" v-model="usuario.email" placeholder="Informe o Email"></b-form-input>
			</b-form-group>
			<hr>
			<b-button variant="primary" size="lg" @click="salvar">Salvar</b-button>
			<hr>
			<b-button variant="success" size="lg" @click="obterUsuarios">Obter Usuários</b-button>
		</b-card>
		<hr>
		<b-list-group>
			<b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
				<strong>Nome: </strong> {{ usuario.nome }}<br>
				<strong>Email: </strong> {{ usuario.email }}<br>
				<strong>ID:</strong> {{ id }}<br>
				<b-button variant="warning" size="lg" @click="carregar(id)">Carregar</b-button> <!-- Carregar os dados do elemento (para update) -->
				<b-button variant="danger" size="lg" @click="excluir(id)" class="ml-2">Excluir</b-button> <!-- Excluir -->
			</b-list-group-item>
		</b-list-group>

	</div>
</template>

<script>
export default {
	data(){
		return {
			mensagens: [], 
			usuarios: [],
			id: null,
			usuario: {
				nome: '',
				email: ''
			}
		}
	},
	methods: {
		limpar() {
			this.usuario.nome = ''
			this.usuario.email = ''
			this.id = null,
			this.mensagens = []
		},
		carregar(id) {
			this.id = id
			this.usuario = { ...this.usuarios[id] } //Foi usado spread pra não alterar a lista de usuário original
		},
		excluir(id) {
			//Fazendo um requisição do tipo delete para apagar um registro do Firebase
			this.$http.delete(`/usuarios/${id}.json`).then(() => this.limpar())
			.then(() => {
				this.limpar()
				this.mensagens.push({
					texto: 'Exclusão Realizado com Sucesso!',
					tipo: 'danger'
				})	
				this.obterUsuarios()
			}).catch(erro => {
						this.mensagens.push({
							texto: 'A exclusão não foi realizada!',
							tipo: 'danger'
						})	
				})			
		},
		salvar() {
			//Isso tudo é feito para o método salvar() servir tanto para alterar quanto pra salvar
			const metodo = this.id ? 'patch' : 'post' //vendo o método pra saber se é criação ou edição
			const finalUrl = this.id ? `/${this.id}.json` : '.json' //Definindo a url da requisição para o caso de edição ou criação
			this.$http[metodo](`/usuarios${finalUrl}`, this.usuario)
			.then(() => {
				this.limpar()
				this.mensagens.push({
					texto: 'Operação Realizada com Sucesso!',
					tipo: 'success'
				})
				this.obterUsuarios()
			 })
		},
		obterUsuarios() {
			this.$http('usuarios.json') //Poderia usar "this.$http.get" que também funcionaria
			.then(response => { //O then() retorna a resposta da requisição Axios	
				this.usuarios = response.data //Dentro de 'data' vem o json que foi obtido a partir dessa requição
			})  			
		}
	}	
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	font-size: 1.5rem;
}

#app h1 {
	text-align: center;
	margin: 50px;
}
</style>
