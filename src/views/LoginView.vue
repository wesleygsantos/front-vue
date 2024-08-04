<template>

    <main class="form-signin w-100 m-auto">

        <form @submit.stop.prevent="submit">

            <div class="alert alert-danger" id="erro"
                role="alert" style="display: none;">
                Dados incorretos! Email ou senha inválidos.
            </div>
            
            <h1 class="h3 mb-3 fw-normal">Login</h1>

            <div class="form-floating mb-3">
                <input v-model="email"
                    type="email" class="form-control" id="floatingInput" 
                    placeholder="name@example.com">
                <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="password"
                    type="password" class="form-control" id="floatingPassword" 
                    placeholder="Password">
                <label for="floatingPassword">Senha</label>
            </div>

            <button class="btn btn-primary w-100 py-2" type="submit">ENTRAR</button>
            
        </form>

        <div class="mt-5 text-primary" id="load" style="display: none;">
            <h3>Carregando</h3>
            <div class="load spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </main>

</template>

<script>

    import Cookie from 'js-cookie';

    export default {

        name:'LoginView',

        data(){
            return{
                email: '',
                password: '',
                token: Cookie.get('tokenLogin')
            };
        },

        created(){

            let tk = Cookie.get('tokenLogin');

            if((typeof tk) == 'string'){
                this.$router.push({ name: 'home' });
            }

        },

        methods:{

            submit(){

                const payload = {
                    email: this.email,
                    password: this.password,
                }

                var loading = document.getElementById('load');
                loading.style.display = "block";

                var erro = document.getElementById('erro');
                erro.style.display = "none";

                fetch( 'http://localhost:8000/api/auth/login', {
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(res => {

                    Cookie.set('tokenLogin', res.access_token);
                    Cookie.set('dadosLogado', payload);
                    
                    if(res.access_token){
                        window.location.reload(true);
                        loading.style.display = "none";
                    }else{

                        erro.style.display = "block";
                        loading.style.display = "none";
                        this.email = "";
                        this.password = "";

                        Cookie.remove('tokenLogin');
                        Cookie.remove('dadosLogado');

                    }
                    
                });

            },

        },

    };


</script>

<style>

    .form-signin {
        max-width: 330px;
        padding: 1rem;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    @media (min-width: 768px) {

        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }

    }

    .b-example-divider {
        width: 100%;
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

    .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
    }

    .bi {
        vertical-align: -.125em;
        fill: currentColor;
    }

    .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
    }

    .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
    }

    .btn-bd-primary {
        --bd-violet-bg: #712cf9;
        --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

        --bs-btn-font-weight: 600;
        --bs-btn-color: var(--bs-white);
        --bs-btn-bg: var(--bd-violet-bg);
        --bs-btn-border-color: var(--bd-violet-bg);
        --bs-btn-hover-color: var(--bs-white);
        --bs-btn-hover-bg: #6528e0;
        --bs-btn-hover-border-color: #6528e0;
        --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
        --bs-btn-active-color: var(--bs-btn-hover-color);
        --bs-btn-active-bg: #5a23c8;
        --bs-btn-active-border-color: #5a23c8;
    }

    .bd-mode-toggle {
        z-index: 1500;
    }

    .bd-mode-toggle .dropdown-menu .active .bi {
        display: block !important;
    }

</style>