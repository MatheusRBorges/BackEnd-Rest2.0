//const urlBase = 'https://backend-mongodb-pi.vercel.app/api'
const urlBase = 'http://localhost:4000/api'
const resultadoModal = new bootstrap.Modal(document.getElementById("modalMensagem"))
const access_token = localStorage.getItem("token") || null

//evento submit do formulário
document.getElementById('formGames').addEventListener('submit', function (event) {
    event.preventDefault() // evita o recarregamento
    const idGames = document.getElementById('id').value
    let game = {}

    if (idGames.length > 0) { //Se possuir o ID, enviamos junto com o objeto
        
       game = {
            "_id": idGames,
            "nome": document.getElementById('nomeGame').value,
            "datalanc": document.getElementById('datalanc').value,
            "premiacao": document.getElementById('premiacao').value,
            "categoria": document.getElementById('categoria').value,
            "plataformas": document.getElementById('plataformas').value,
            "desenvolvedora": document.getElementById('Desenvolvedora').value,
            "trofeus": document.getElementById('trofeus').value  
            
        }
    } else {

        game = {
          "_id": idGames,
          "nome": document.getElementById('nomeGame').value,
          "datalanc": document.getElementById('datalanc').value,
          "premiacao": document.getElementById('premiacao').value,
          "categoria": document.getElementById('categoria').value,
          "plataformas": document.getElementById('plataformas').value,
          "desenvolvedora": document.getElementById('Desenvolvedora').value,
          "trofeus": document.getElementById('trofeus').value 
       
        }
    }

    salvaGames(game)
})

async function salvaGames(game) {    
    if (game.hasOwnProperty('_id')) { 
        await fetch(`${urlBase}/games`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            },
            body: JSON.stringify(game)
        })
            .then(response => response.json())
            .then(data => {
                // Verificar se o token foi retornado        
                if (data.acknowledged) {
                    alert('✔ Livro alterado com sucesso!')
                    //Limpar o formulário
                    document.getElementById('formGames').reset()
                    location.reload()
                    //Atualiza a UI
                    carregaGames()
                } else if (data.errors) {
                    // Caso haja erros na resposta da API
                    const errorMessages = data.errors.map(error => error.msg).join("\n");
                    // alert("Falha no login:\n" + errorMessages);
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                    resultadoModal.show();
                } else {
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${JSON.stringify(data)}</span>`
                    resultadoModal.show();
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o livro: ${error.message}</span>`
                resultadoModal.show();
            });

    } else { //caso não tenha o ID, iremos incluir (POST)
        // Fazer a solicitação POST para o endpoint dos livros
        await fetch(`${urlBase}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            },
            body: JSON.stringify(game)
        })
            .then(response => response.json())
            .then(data => {
                // Verificar se o token foi retornado        
                if (data.acknowledged) {
                    alert('✔ Livro incluído com sucesso!')
                    //Limpar o formulário
                    document.getElementById('formGames').reset()
                    //Atualiza a UI
                    carregaGames()
                } else if (data.errors) {
                    // Caso haja erros na resposta da API
                    const errorMessages = data.errors.map(error => error.msg).join("\n");
                    // alert("Falha no login:\n" + errorMessages);
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${errorMessages}</span>`
                    resultadoModal.show();
                } else {
                    document.getElementById("mensagem").innerHTML = `<span class='text-danger'>${JSON.stringify(data)}</span>`
                    resultadoModal.show();
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o livro: ${error.message}</span>`
                resultadoModal.show();
            });
    }
}

async function carregaGames() {
    const tabela = document.getElementById('dadosTabela')
    tabela.innerHTML = '' //Limpa a tabela antes de recarregar
    // Fazer a solicitação GET para o endpoint dos livros
    await fetch(`${urlBase}/games`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access-token": access_token //envia o token na requisição
        }
    })
        .then(response => response.json())
        .then(data => {

            data.forEach(game => {

                tabela.innerHTML += `
                <tr>
                   <td>${game.nome}</td>
                   <td>${game.datalanc}</td>
                   <td>${game.premiacao}</td>
                   <td>${game.categoria}</td>
                   <td>${game.plataformas}</td>
                   <td>${game.Desenvolvedora}</td>
                   <td>${game.trofeus}</td>
                   <td>
                       <button class='btn btn-danger btn-sm' onclick='removeGames("${game._id}")'>🗑 Excluir </button>
                       <button class='btn btn-warning btn-sm' onclick='buscaGamesPeloId("${game._id}")'>📝 Editar </button>
                    </td>           
                </tr>
                `
            })
        })
        .catch(error => {
            document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o livro: ${error.message}</span>`
            resultadoModal.show();
        });
}

async function removeGames(id) {
    if (confirm('Deseja realmente excluir o livro?')) {
        await fetch(`${urlBase}/games/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "access-token": access_token //envia o token na requisição
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    //alert('Registro Removido com sucesso')
                    carregaGames() // atualiza a UI
                }
            })
            .catch(error => {
                document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o livro: ${error.message}</span>`
                resultadoModal.show();
            });
    }
}

async function buscaGamesPeloId(id) {
    await fetch(`${urlBase}/games/id/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access-token": access_token //envia o token na requisição
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data[0]) { //Iremos pegar os dados e colocar no formulário.
                document.getElementById('id').value = data[0]._id
                document.getElementById('nome').value = data[0].nome
                document.getElementById('datalanc').value = data[0].datalanc
                document.getElementById('premiacao').value = data[0].premiacao
                document.getElementById('categoria').value = data[0].categoria
                document.getElementById('plataformas').value = data[0].plataformas
                document.getElementById('Desenvolvedora').value = data[0].desenvolvedora
                document.getElementById('trofeus').value = data[0].trofeus               
            }
        })
        .catch(error => {
            document.getElementById("mensagem").innerHTML = `<span class='text-danger'>Erro ao salvar o livro: ${error.message}</span>`
            resultadoModal.show();
        });
}