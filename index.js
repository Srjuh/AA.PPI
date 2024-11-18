import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

let listaEmpresas = [];

// Função para exibir o formulário de cadastro
function exibirFormulario(req, res) {
    res.send(`
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastro de Empresas</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .form-container {
                    width: 600px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    text-align: center;
                }
                label {
                    font-weight: bold;
                }
                input, select {
                    width: 100%;
                    padding: 10px;
                    margin-top: 5px;
                    margin-bottom: 15px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 16px;
                }
                button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="form-container">
                <h2>Cadastro de Empresas</h2>
                <form action="/cadastro" method="POST">
                    <label for="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" name="cnpj" placeholder="Digite o CNPJ">

                    <label for="razaoSocial">Razão Social ou Nome do Fornecedor:</label>
                    <input type="text" id="razaoSocial" name="razaoSocial" placeholder="Digite a razão social ou nome do fornecedor">

                    <label for="nomeFantasia">Nome Fantasia:</label>
                    <input type="text" id="nomeFantasia" name="nomeFantasia" placeholder="Digite o nome fantasia">

                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" name="endereco" placeholder="Digite o endereço">

                    <label for="cidade">Cidade:</label>
                    <input type="text" id="cidade" name="cidade" placeholder="Digite a cidade">

                    <label for="uf">UF:</label>
                    <input type="text" id="uf" name="uf" maxlength="2" placeholder="Ex.: SP">

                    <label for="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" placeholder="Digite o CEP">

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Digite o email">

                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" placeholder="Digite o telefone">

                    <button type="submit">Cadastrar Empresa</button>
                </form>
            </div>
        </body>
        </html>
    `);
}

// Função para processar o cadastro
function cadastrarEmpresa(req, res) {
    const { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!cnpj || !razaoSocial || !nomeFantasia || !endereco || !cidade || !uf || !cep || !email || !telefone) {
        return res.send(`
            <p>Todos os campos são obrigatórios! <a href="/">Voltar</a></p>
        `);
    }

    const empresa = { cnpj, razaoSocial, nomeFantasia, endereco, cidade, uf, cep, email, telefone };
    listaEmpresas.push(empresa);

    res.redirect('/lista');
}

// Função para exibir a lista de empresas cadastradas
function listarEmpresas(req, res) {
    let listaHtml = listaEmpresas.map(empresa => `
        <tr>
            <td>${empresa.cnpj}</td>
            <td>${empresa.razaoSocial}</td>
            <td>${empresa.nomeFantasia}</td>
            <td>${empresa.endereco}</td>
            <td>${empresa.cidade}</td>
            <td>${empresa.uf}</td>
            <td>${empresa.cep}</td>
            <td>${empresa.email}</td>
            <td>${empresa.telefone}</td>
        </tr>
    `).join('');

    res.send(`
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Lista de Empresas</title>
            <style>
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px auto;
                    font-family: Arial, sans-serif;
                }
                th, td {
                    border: 1px solid #ccc;
                    padding: 10px;
                    text-align: left;
                }
                th {
                    background-color: #007bff;
                    color: white;
                }
            </style>
        </head>
        <body>
            <h2>Empresas Cadastradas</h2>
            <table>
                <thead>
                    <tr>
                        <th>CNPJ</th>
                        <th>Razão Social</th>
                        <th>Nome Fantasia</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                        <th>Email</th>
                        <th>Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    ${listaHtml}
                </tbody>
            </table>
            <a href="/">Voltar ao cadastro</a>
        </body>
        </html>
    `);
}

// Rotas
app.get('/', exibirFormulario);
app.post('/cadastro', cadastrarEmpresa);
app.get('/lista', listarEmpresas);

// Inicia o servidor
app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
});
