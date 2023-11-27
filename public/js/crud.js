const urlBase = 'http://localhost:4000/api'

document.addEventListener('DOMContentLoaded', () => {
    carregarDados();
});

async function carregarDados() {
    try {
        const response = await fetch(`${urlBase}/games`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNjU2NDE1OWQ5NDgyYmViMGIzMzk2MjJlIn0sImlhdCI6MTcwMTA1Nzk1NywiZXhwIjoxNzAxMzE3MTU3fQ.Rf9UPOZ2WwZDUD9dJ0dOaspVhgDo4jarlL7H2qQKDy0'
            })
        })
            .then(response => response.json())

        const table = document.getElementById('dadosTabela');
        table.innerHTML = '';

        response.forEach(games => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
            <td>${games.nome}</td>
            <td>${games.datalanc}</td>
            <td>${games.premiacao}</td>
            <td>${games.categoria}</td>
            <td>${games.plataformas}</td>
            <td>${games.Desenvolvedora}</td>
            <td>${games.trofeus}</td>
            <td>
                <a class="edit" title="Edit" data-toggle="tooltip" onclick="Editar('${games._id}')"><i class="material-icons">&#xE254;</i></a>
                <a class="delete" title="Delete" data-toggle="tooltip" onclick="Deletar('${games._id}')"><i class="material-icons">&#xE872;</i></a>
            </td>`;
            table.appendChild(linha);
        });

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

function abreAdicionar() {
    const modalAdicionar = new bootstrap.Modal(document.getElementById('modalRegister'))
    modalAdicionar.show()
}

async function Adicionar() {
    try {

        const modalAdicionar = new bootstrap.Modal(document.getElementById('modalRegister'))
        modalAdicionar.show()
        const nome = document.getElementById('nome').value
        const datalanc = document.getElementById('datalanc').value
        const premiacao = document.getElementById('premiacao').value
        const categoria = document.getElementById('categoria').value
        const plataformas = document.getElementById('plataformas').value
        const Desenvolvedora = document.getElementById('Desenvolvedora').value
        const trofeus = document.getElementById('trofeus').value

        const body = JSON.stringify({
            nome: nome,
            datalanc: datalanc,
            premiacao: premiacao,
            categoria: categoria,
            plataformas: plataformas,     
            Desenvolvedora: Desenvolvedora,
            trofeus: trofeus
        })

        await fetch(`${urlBase}/games`, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNjU2NDE1OWQ5NDgyYmViMGIzMzk2MjJlIn0sImlhdCI6MTcwMTA1Nzk1NywiZXhwIjoxNzAxMzE3MTU3fQ.Rf9UPOZ2WwZDUD9dJ0dOaspVhgDo4jarlL7H2qQKDy0'
            }),
            body: body
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    location.reload()
                } else if (data.errors) {
                    // Caso haja erros na resposta da API
                    const errorMessages = data.errors.map(error => error.msg).join("\n");
                    console.log(errorMessages)
                }
            })
            console.log(5)
    } catch (error) {
        console.error('Erro ao adicionar jogador:', error);
    }

}

async function Editar(id) {
    console.log(1)
    const idgames = document.getElementById('idGames').value
    const modal = new bootstrap.Modal(document.getElementById('modalEditar'))
    const nome = document.getElementById('editarnome').value
    const datalanc = document.getElementById('editardatalanc').value
    const premiacao = document.getElementById('editarpremiacao').value
    const categoria = document.getElementById('editarcategoria').value
    const plataformas = document.getElementById('editarplataformas').value
    const Desenvolvedora = document.getElementById('editarDesenvolvedora').value
    const trofeus = document.getElementById('editartrofeus').value

    await fetch(`${urlBase}/games/id/${id}`, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNjU2NDE1OWQ5NDgyYmViMGIzMzk2MjJlIn0sImlhdCI6MTcwMTA1OTkzOCwiZXhwIjoxNzAxMzE5MTM4fQ.tmqaao5BYPidg7lpwFq5n0kGlG5vwu6k_zPKcNbc8vw'
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            idgames.value = data[0]._id
            nome.value = data[0].nome
            datalanc.value = data[0].datalanc
            premiacao.value = data[0].premiacao
            categoria.value = data[0].categoria
            plataformas.value = data[0].plataformas
            Desenvolvedora.value = data[0].Desenvolvedora
            trofeus.value = data[0].trofeus
            console.log(data[0].nome)
            modal.show()
        })
}

async function confirmarEditar() {
    try {
        const idgames = document.getElementById('idGames').value;
        const nome = document.getElementById('editarnome').value;
        const datalanc = document.getElementById('editardatalanc').value;
        const premiacao = document.getElementById('editarpremiacao').value;
        const categoria = document.getElementById('editarcategoria').value;
        const plataformas = document.getElementById('editarplataformas').value;
        const Desenvolvedora = document.getElementById('editarDesenvolvedora').value;
        const trofeus = document.getElementById('editartrofeus').value;

        const body = JSON.stringify({
            _id: idgames,
            nome: nome,
            datalanc: datalanc,
            premiacao: premiacao,
            categoria: categoria,
            plataformas: plataformas,     
            Desenvolvedora: Desenvolvedora,
            trofeus: trofeus
        })

        await fetch(`${urlBase}/games`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json',
                'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNjUzNjdhNDAzNjJlNDg4M2NjOGUyOWMwIn0sImlhdCI6MTY5ODA2OTA1OSwiZXhwIjoxNjk4MzI4MjU5fQ.cLtXR2sCCdocxUISVG7WyX7_Sh8uYCZjKghlVg3YMi8'

            }),
            body: body
        })
            .then(response => response.json())
            .then(data => {
                if (data.acknowledged) {
                    console.log('alterado')
                    location.reload()
                } 
                else{
                    console.log('nao alterado')
                }
            })
    }
    catch (error) {
        console.error('Erro ao alterar o jogador: ' + error)
    }
}

function Deletar(id) {
    const resultadoModal = new bootstrap.Modal(document.getElementById('modalMensagem'))
    document.getElementById('setDelId').value = id
    document.getElementById('mensagem').innerHTML = `<span class="text-danger">Esta é uma ação irreversível!</span>`
    resultadoModal.show() //abre o Modal
}

async function confirmaExcluir() {
    let id = document.getElementById('setDelId').value

    await fetch(`${urlBase}/games/${id}`, {
        method: "DELETE",
        headers: new Headers({
            'Content-Type': 'application/json',
            'access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7ImlkIjoiNjU2NDE1OWQ5NDgyYmViMGIzMzk2MjJlIn0sImlhdCI6MTcwMTA1Nzk1NywiZXhwIjoxNzAxMzE3MTU3fQ.Rf9UPOZ2WwZDUD9dJ0dOaspVhgDo4jarlL7H2qQKDy0'
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.deletedCount > 0) {
                location.reload()
            }
        })
        .catch(error => {
            console.error('Erro ao deletar o jogador: ' + error)
        })
}