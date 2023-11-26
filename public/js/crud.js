const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sDesenvolvedora = document.querySelector('#m-desenvolvedora')
const sNome = document.querySelector('#m-nome')
const sData = document.querySelector('#m-data')
const sPremios = document.querySelector('#m-premios')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sDesenvolvedora.value = itens[index].desenvolvedora
    sNome.value = itens[index].nome
    sData.value = itens[index].data
    sPremios.value = itens[index].premios
    id = index
  } else {
    sDesenvolvedora.value = ''
    sNome.value = ''
    sData.value = ''
    sPremios.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.desenvolvedora}</td>
    <td>${item.nome}</td>
    <td>${item.data}</td>
    <td>${item.premios}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sDesenvolvedora.value == '' || sNome.value == '' || sData.value == '' || sPremios.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].desenvolvedora = sDesenvolvedora.value
    itens[id].nome = sNome.value
    itens[id].data = sData.value
    itens[id].premios = sPremios.value
  } else {
    itens.push({'desenvolvedora': sDesenvolvedora.value, 'nome': sNome.value, 'data': sData.value, 'premios': sPremios.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()