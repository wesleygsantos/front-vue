<template>
  <nav>
    <router-link to="/">Home</router-link> | 
    <router-link to="/cadastro-usuario">Cadastrar Usuário</router-link> 
      <span v-if="getToken()" > | </span>
    <router-link to="/cadastro-produtos" v-if="getToken()">Cadastrar Produtos</router-link> 
      <span v-if="getToken()" > | </span>
    <router-link to="/logout" v-if="getToken()">
      <a :href="href" @click="logOut()">Sair</a>
    </router-link>
  </nav>
  <router-view/>
</template>

<script>

  import Cookie from 'js-cookie';

  export default {

    data() {
      return {
        token: Cookie.get('tokenLogin')
      }
    },

    methods: {

      logOut() {

        Cookie.remove('tokenLogin');
        Cookie.remove('dadosLogado');
        window.location.reload(true);

      },

      getToken() {

        let tk = Cookie.get('tokenLogin');

        if(typeof tk == 'string'){
          return true;
        }else{
          return false;
        }

      }

    }

  } 

</script>

<style>

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

</style>
