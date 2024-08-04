<template>
         
    <div class="form-cad col-md-7 col-lg-8 m-auto">

        <div class="alert alert-success" id="sucesso" style="display: none;"
            role="alert">
            Usuário Cadastrado com Sucesso!
        </div>

        <div class="alert alert-danger" id="erro"
            role="alert" style="display: none;">
            Erro ao cadastrar! Verifique os dados.
        </div>

        <h4 class="mb-3">Cadastro de Usuário</h4>
        <form @submit.stop.prevent="submit" class="needs-validation" novalidate>

            <div class="row g-3 mb-5">

                <div class="col-sm-12">
                    <label for="firstName" class="form-label">Nome</label>
                    <input v-model="name"
                        type="text" class="form-control" id="firstName" placeholder="" value="" required>
                    <div class="invalid-feedback">
                        Campo obrigatório.
                    </div>
                </div>

                <div class="col-12">

                    <label for="username" class="form-label">E-mail</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text">@</span>
                        <input v-model="email"
                            type="text" class="form-control" id="username" placeholder="Username" required>
                        <div class="invalid-feedback">
                            Campo obrigatório.
                        </div>
                    </div>

                </div>

                <div class="col-12">

                    <label for="username" class="form-label">Senha</label>
                    <div class="input-group has-validation">

                        <input v-model="password"
                            type="password" class="form-control" id="password" 
                            placeholder="Senha" required>

                        <div class="invalid-feedback">
                            Campo obrigatório.
                        </div>

                    </div>

                </div>

            </div>

            <button class="w-100 btn btn-primary btn-lg" type="submit">Cadastrar</button>

        </form>
    </div>

    <div class="mt-1 text-primary" id="load" style="display: none;">
        <h3>Carregando</h3>
        <div class="load spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

</template>

<script>

    export default {

        name:'CadUserView',

        data(){
            return{
                name: '',
                email: '',
                password: '',
            };
        },

        methods:{

            submit(){

                const payload = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                }

                var loading = document.getElementById('load');
                loading.style.display = "block";

                var sucesso = document.getElementById('sucesso');
                sucesso.style.display = "none";

                var erro = document.getElementById('erro');
                erro.style.display = "none";

                fetch( 'http://localhost:8000/api/auth/register', {
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(res => {

                    if(res.user){

                        loading.style.display = "none";
                        sucesso.style.display = "block";

                        this.name = "";
                        this.email = "";
                        this.password = "";
                        
                    }else{

                        loading.style.display = "none";
                        erro.style.display = "block";

                        this.name = "";
                        this.email = "";
                        this.password = "";

                    }
                    
                });

            },

        },

    };

</script>

<style>

    .form-cad {
        max-width: 630px;
        padding: 2rem;
    }

</style>