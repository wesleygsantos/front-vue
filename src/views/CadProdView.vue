<template>
    
    <div class="form-cad col-md-7 col-lg-8 m-auto">

        <div class="alert alert-success" id="sucesso" style="display: none;"
            role="alert">
            Produto Cadastrado com Sucesso!
        </div>

        <div class="alert alert-danger" id="erro"
            role="alert" style="display: none;">
            Erro ao cadastrar! Verifique os dados.
        </div>

        <h4 class="mb-3">Cadastro de Produto</h4>
        <form @submit.stop.prevent="submit" class="needs-validation" novalidate>

            <div class="row g-3 mb-5">

                <div class="col-sm-12">
                    <label for="firstName" class="form-label">Nome do Produto</label>
                    <input v-model="nome"
                        type="text" class="form-control" id="firstName" placeholder="" value="" required>
                    <div class="invalid-feedback">
                        Campo obrigatório.
                    </div>
                </div>

                <div class="col-6">

                    <label for="valor" class="form-label">Valor</label>
                    <div class="input-group has-validation">
                        <span class="input-group-text">R$</span>
                        <input v-model="valor"
                            type="text" class="form-control" id="valor" placeholder="Valor" required>
                        <div class="invalid-feedback">
                            Campo obrigatório.
                        </div>
                    </div>

                </div>

                <div class="col-6">

                    <label for="username" class="form-label">Marca</label>
                    
                    <select v-model="marca" class="form-select" aria-label="Default select example">
                        <option selected>Selecione a marca:</option>
                        <option value="1">Xiomi</option>
                        <option value="2">Apple</option>
                        <option value="3">Samsung</option>
                    </select>

                </div>

                <div class="col-6">

                    <label for="estoque" class="form-label">Estoque</label>
                    <div class="input-group has-validation">
                        <input v-model="estoque"
                            type="number" class="form-control" id="estoque" 
                            placeholder="Quantidade em estoque">
                        <div class="invalid-feedback">
                            Campo obrigatório.
                        </div>
                    </div>

                </div>

                <div class="col-6">

                    <label for="cidade" class="form-label">Cidade</label>

                    <select v-model="cidade" class="form-select" aria-label="Default select example">
                        <option selected>Selecione a cidade:</option>
                        <option value="1">Uberaba</option>
                        <option value="2">Uberlandia</option>
                        <option value="3">Araguari</option>
                        <option value="4">São Paulo</option>
                    </select>

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

    import Cookie from 'js-cookie';

    export default {

        name:'CadProdView',

        data(){
            return{
                'nome': '',
                'valor': 0,
                'id_marca': 0,
                'estoque': 0,
                'id_cidade': 0
            };
        },

        methods:{

            submit(){

                const payload = {
                    nome: this.nome,
                    valor: parseInt(this.valor),
                    id_marca: parseInt(this.marca),
                    estoque: parseInt(this.estoque),
                    id_cidade: parseInt(this.cidade),
                }

                var loading = document.getElementById('load');
                loading.style.display = "block";

                var sucesso = document.getElementById('sucesso');
                sucesso.style.display = "none";

                var erro = document.getElementById('erro');
                erro.style.display = "none";

                var token = Cookie.get('tokenLogin');

                fetch( 'http://localhost:8000/api/produtos', {
                    method: 'POST',
                    headers:{
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : 'Bearer ' +  token,
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(res => {

                    if(res.data){

                        loading.style.display = "none";
                        sucesso.style.display = "block";

                        this.nome = ""; 
                        this.valor = ""; 
                        this.id_marca = ""; 
                        this.estoque = ""; 
                        this.id_cidade = "";  

                    }else{

                        loading.style.display = "none";
                        erro.style.display = "block";

                        this.nome = ""; 
                        this.valor = ""; 
                        this.id_marca = ""; 
                        this.estoque = ""; 
                        this.id_cidade = "";  

                    }
                    
                });

            }

        }

    }

</script>