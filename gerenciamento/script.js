let artistaAtual, escolhaBotaoArtista, escolhaBotaoAlbum, escolhaBotaoMusica, escolhaFuncao;
const url = 'http://localhost/Spotifree/player/api/';

// coisas artista
let inputNomeArtista = document.getElementById('nome-artista');
let spanNomeArtista = document.getElementById('selecao-artista');
let imgArtista = document.getElementById('imagem-foto-artista');
let inputImgArtista = document.getElementById('imagem-artista');
let dropdownArtistas = document.getElementById('dropdown-itens-artistas');

let btnArtistaSalvar = document.getElementById('btn-salvar-artista');

let idArtistaSelecionado;

// coisas album
let dropdownArtistasAlbuns = document.getElementById('dropd-artistas-albuns');
let dropdownItensArtistasAlbuns = document.getElementById('dropdown-artistas-albuns');
let dropdownAlbuns = document.getElementById('dropdown-albuns');
let selecaoArtistaAlbum = document.getElementById('selecao-artistas');
let selecaoAlbum = document.getElementById('selecao-album');
let nomeAlbum = document.getElementById('nome-album');
let anoLancamentoAlbum = document.getElementById('ano-lancamento');
let imgAlbum = document.getElementById('imagem-foto-album');
let inputImgAlbum = document.getElementById('capa-album');

let btnAlbumSalvar = document.getElementById('btn-salvar-album');

let idArtistaAlbumSelecionado;
let idAlbumSelecionado;

function acaoAdicionar(opcao)
{
  escolhaFuncao = 1;
  let idDropdown, idNome, idFile, idSelecao, idBtnEditar, idBtnRemover;
  if(opcao == 'artista')
  {
    escolhaBotaoArtista = 1;
    document.getElementById('nome-artista').focus();
    idDropdown = 'dropd-artistas';
    idNome = 'nome-artista';
    idFile = 'imagem-artista';
    idSelecao = 'selecao-artista';
    idBtnEditar = 'btn-edt-art';
    idBtnRemover = 'btn-rem-art';
  }
  else if(opcao == 'album')
  {
    escolhaBotaoAlbum = 1;
    dropdownArtistasAlbuns.disabled = false;
    dropdownArtistasAlbuns.focus();
    idDropdown = 'dropd-albuns';
    idNome = 'nome-album';
    idFile = 'capa-album';
    idSelecao = 'selecao-album';
    idBtnEditar = 'btn-edt-alb';
    idBtnRemover = 'btn-rem-alb';
    document.getElementById('ano-lancamento').disabled = false;
  }
  else if(opcao == 'musica')
  {
    escolhaBotaoMusica = 1;
    document.getElementById('dropd-artistas').disabled = false;
    document.getElementById('dropd-albuns').disabled = false;
    document.getElementById('dropd-albuns').focus();
    idDropdown = 'dropd-musicas';
    idNome = 'nome-musica';
    idFile = 'arquivo-musica';
    idSelecao = 'selecao-musica';
    idBtnEditar = 'btn-edt-mus';
    idBtnRemover = 'btn-rem-mus';
  }
  document.getElementById(idDropdown).disabled = true;
  document.getElementById(idNome).disabled = false;
  document.getElementById(idFile).disabled = false;
  document.getElementById(idSelecao).innerText = "";
  document.getElementById(idBtnEditar).disabled = true;
  document.getElementById(idBtnRemover).disabled = true;
}

function acaoEditar(opcao)
{
  escolhaFuncao = 2;
  let idNome, idFile, idBtnAdicionar, idBtnRemover;
  if(opcao == 'artista')
  {
    escolhaBotaoArtista = 2;
    document.getElementById('dropd-artistas').disabled = false;
    document.getElementById('dropd-artistas').focus();
    idNome = 'nome-artista';
    idFile = 'imagem-artista';
    idBtnAdicionar = 'btn-adc-art';
    idBtnRemover = 'btn-rem-art';
  }
  else if(opcao == 'album')
  {
    escolhaBotaoAlbum = 2;
    dropdownArtistasAlbuns.disabled = false;
    dropdownArtistasAlbuns.focus();
    document.getElementById('dropd-albuns').disabled = false;
    idNome = 'nome-album';
    idFile = 'capa-album';
    idBtnAdicionar = 'btn-adc-alb';
    idBtnRemover = 'btn-rem-alb';
    document.getElementById('ano-lancamento').disabled = false;
  }
  else if(opcao == 'musica')
  {
    escolhaBotaoMusica = 2;
    document.getElementById('dropd-artistas').disabled = false;
    document.getElementById('dropd-albuns').disabled = false;
    document.getElementById('dropd-musicas').disabled = false;
    document.getElementById('dropd-albuns').focus();
    idNome = 'nome-musica';
    idFile = 'arquivo-musica';
    idBtnAdicionar = 'btn-adc-mus';
    idBtnRemover = 'btn-rem-mus';
  }
  document.getElementById(idNome).disabled = false;
  document.getElementById(idFile).disabled = false;
  document.getElementById(idBtnAdicionar).disabled = true;
  document.getElementById(idBtnRemover).disabled = true;
}

function acaoRemover(opcao)
{
  escolhaFuncao = 3;
  let idNome, idFile, idBtnAdicionar, idBtnEditar;
  if(opcao == 'artista')
  {
    escolhaBotaoArtista = 3;
    document.getElementById('dropd-artistas').disabled = false;
    document.getElementById('dropd-artistas').focus();
    idNome = 'nome-artista';
    idFile = 'imagem-artista';
    idBtnAdicionar = 'btn-adc-art';
    idBtnEditar = 'btn-edt-art';
  }
  else if(opcao == 'album')
  {
    escolhaBotaoAlbum = 3;
    dropdownArtistasAlbuns.disabled = false;
    dropdownArtistasAlbuns.focus();
    document.getElementById('dropd-albuns').disabled = false;
    idNome = 'nome-album';
    idFile = 'capa-album';
    idBtnAdicionar = 'btn-adc-alb';
    idBtnEditar = 'btn-edt-alb';
    document.getElementById('ano-lancamento').disabled = false;
  }
  else if(opcao == 'musica')
  {
    escolhaBotaoMusica = 3;
    document.getElementById('dropd-artistas').disabled = false;
    document.getElementById('dropd-albuns').disabled = false;
    document.getElementById('dropd-musicas').disabled = false;
    document.getElementById('dropd-albuns').focus();
    idNome = 'nome-musica';
    idFile = 'arquivo-musica';
    idBtnAdicionar = 'btn-adc-mus';
    idBtnEditar = 'btn-edt-mus';
  }
  document.getElementById(idNome).disabled = true;
  document.getElementById(idFile).disabled = true;
  document.getElementById(idBtnAdicionar).disabled = true;
  document.getElementById(idBtnEditar).disabled = true;
}

function acaoCancelar(opcao)
{
  let idNome, idSelecao, idFile, idBtnAdicionar, idBtnEditar, idBtnRemover;
  if(opcao == 'artista')
  {
    document.getElementById('dropd-artistas').disabled = true;
    idNome = 'nome-artista';
    idFile = 'imagem-artista';
    idSelecao = 'selecao-artista';
    idBtnAdicionar = 'btn-adc-art';
    idBtnEditar = 'btn-edt-art';
    idBtnRemover = 'btn-rem-art';
    idArtistaSelecionado = null;
    imgArtista.src = ''; 
    inputImgArtista.value = '';
  }
  else if(opcao == 'album')
  {
    document.getElementById('dropd-artistas').disabled = true;
    document.getElementById('dropd-albuns').disabled = true;
    idNome = 'nome-album';
    idFile = 'capa-album';
    idSelecao = 'selecao-album';
    document.getElementById('ano-lancamento').value = "";
    document.getElementById('ano-lancamento').disabled = true;
    idBtnAdicionar = 'btn-adc-alb';
    idBtnEditar = 'btn-edt-alb';
    idBtnRemover = 'btn-rem-alb';
    idAlbumSelecionado = null;
    imgAlbum.src = '';
    inputImgAlbum.value = '';
    selecaoArtistaAlbum.innerText = '';
    dropdownAlbuns.innerHTML = '';
  }
  else if(opcao == 'musica')
  {
    document.getElementById('dropd-artistas').disabled = true;
    document.getElementById('dropd-albuns').disabled = true;
    document.getElementById('dropd-musicas').disabled = true;
    idNome = 'nome-musica';
    idFile = 'arquivo-musica';
    idSelecao = 'selecao-musica';
    idBtnAdicionar = 'btn-adc-mus';
    idBtnEditar = 'btn-edt-mus';
    idBtnRemover = 'btn-rem-mus';
  }
  document.getElementById(idBtnAdicionar).disabled = false;
  document.getElementById(idBtnEditar).disabled = false;
  document.getElementById(idBtnRemover).disabled = false;
  document.getElementById(idNome).value = "";
  document.getElementById(idSelecao).innerText = "";
  document.getElementById(idNome).disabled = true;
  document.getElementById(idFile).disabled = true;
}

// TODAS AS OPERAÇÕES COM ARTISTA
function buscarArtistas() 
{
  let xmlhttp = new XMLHttpRequest();
  let resposta;
  xmlhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      resposta = JSON.parse(xmlhttp.responseText);
    }
  }

  xmlhttp.open('GET', url + 'getArtistas.php?pesquisa=', false);
  xmlhttp.send();
  return resposta;
}

function gerarItensDropdownArtista() 
{
  let artistas = buscarArtistas();
  dropdownArtistas.innerHTML = '';
  dropdownItensArtistasAlbuns.innerHTML = '';

  artistas.forEach(artista => {

    //dropdown artistas
    let itemDropdownArtista = document.createElement('p'); // <p></p>
    itemDropdownArtista.classList.add('dropdown-item'); // <p class="dropdown-item">nome do artista</p>
    itemDropdownArtista.innerText = artista.artista;

    itemDropdownArtista.addEventListener('click', function () {
      selecionarArtista(artista);
    });

    dropdownArtistas.appendChild(itemDropdownArtista);
    //dropdown artistas album
    let itemDropdownArtistasAlbum = document.createElement('p');
    itemDropdownArtistasAlbum.classList.add('dropdown-item');
    itemDropdownArtistasAlbum.innerText = artista.artista;

    itemDropdownArtistasAlbum.addEventListener('click', function () {
      selecionarArtistaAlbum(artista);
    })

    dropdownItensArtistasAlbuns.appendChild(itemDropdownArtistasAlbum);
  });
}

function selecionarArtista(artista) {
  idArtistaSelecionado = artista.id;

  inputNomeArtista.value = artista.artista;
  spanNomeArtista.innerText = artista.artista;
  imgArtista.src = 'data:image/jpeg;base64,' + artista.imagemArtista;
}

function carregarFotoArtista(input) {
  if(input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imgArtista.src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}

gerarItensDropdownArtista();

function editarArtista(artista) {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      alert('Artista atualizado com sucesso!');
      gerarItensDropdownArtista();
      acaoCancelar('artista');
      acaoEditar('artista');
    }
  }

  xmlhttp.open('POST', url + 'putArtista');
  xmlhttp.send(JSON.stringify(artista));
}

function adicionarArtista(artista) {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      console.log(xmlhttp.responseText);
      alert('Artista adicionado com sucesso!');
      gerarItensDropdownArtista();
      acaoCancelar('artista');
      acaoAdicionar('artista');
    }
  }

  xmlhttp.open('POST', url + 'postNovoArtista');
  xmlhttp.send(JSON.stringify(artista));
}

function removerArtista(idArtista) {
  let xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      alert('Artista removido com sucesso!');
      gerarItensDropdownArtista();
      acaoCancelar('artista');
      acaoRemover('artista');
    }
  }

  xmlhttp.open('GET', url + 'deleteArtista?idArtista=' + idArtista);
  xmlhttp.send();
}

btnArtistaSalvar.addEventListener('click', function () {

  if(escolhaBotaoArtista == 1) {
    let artista = {};
    artista.artista = inputNomeArtista.value;
    artista.imagemBase64 = imgArtista.src.split(',')[1];
    console.log(artista);
    adicionarArtista(artista);
  } else if(escolhaBotaoArtista == 2) {
    let artista = {};
    artista.idArtista = idArtistaSelecionado;
    artista.artista = inputNomeArtista.value;
    artista.imagemBase64 = imgArtista.src.split(',')[1];
    console.log(artista);
    editarArtista(artista);
  } else if(escolhaBotaoArtista == 3) {
    let excluir = confirm('Deseja remover o artista ' + inputNomeArtista.value + '?');
    if(excluir) {
      removerArtista(idArtistaSelecionado);
    }
  }
});
// FIM TODAS AS OPERAÇÕES COM ARTISTA

//todas as operações com albuns

function getAlbunsPorArtista(artista)
{
  let xmlhttp = new XMLHttpRequest();
  let resposta;
  xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) 
    {
      resposta = JSON.parse(xmlhttp.responseText);
    }
  }
  xmlhttp.open('GET', url + 'getAlbunsPorArtista?idArtista=' + artista.id, false);
  xmlhttp.send();
  return resposta;
}

function selecionarArtistaAlbum(artista)
{
  let albuns = getAlbunsPorArtista(artista);
  dropdownAlbuns.innerHTML = '';
  selecaoArtistaAlbum.innerText = artista.artista;
  idArtistaAlbumSelecionado = artista.id;
  console.log(albuns);
  albuns.forEach(album => {
    let itemAlbum = document.createElement('p');
    itemAlbum.classList.add('dropdown-item');
    itemAlbum.innerText = album.titulo;

    itemAlbum.addEventListener('click', function () {
      selecionarAlbum(album);
    })

    dropdownAlbuns.appendChild(itemAlbum);
  })
}

function selecionarAlbum(album)
{
  idAlbumSelecionado = album.id;
  nomeAlbum.value = album.titulo;
  anoLancamentoAlbum.value = album.lancamento;
  selecaoAlbum.innerText = album.titulo;
  imgAlbum.src = 'data:image/jpeg;base64,' + album.capa;
}

function carregarFotoAlbum(input) 
{
  if(input.files && input.files[0]) 
  {
    var reader = new FileReader();

    reader.onload = function (e) {
      imgAlbum.src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function adicionarAlbum(album)
{
  let xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      alert('Album adicionado com sucesso!');
      gerarItensDropdownArtista();
      acaoCancelar('album');
      acaoAdicionar('album');
    }
  }

  xmlhttp.open('POST', url + 'postNovoAlbum');
  xmlhttp.send(JSON.stringify(album));
}

function editarAlbum(album)
{
  let xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      alert('Album editado com sucesso!');
      gerarItensDropdownArtista();
      acaoCancelar('album');
      acaoEditar('album');
    }
  }

  xmlhttp.open('POST', url + 'putAlbum');
  xmlhttp.send(JSON.stringify(album));
}

function removerAlbum(idAlbum)
{
  let xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200) {
      alert('Album removido com sucesso!');
      gerarItensDropdownArtista();
      acaoCancelar('album');
      acaoRemover('album');
    }
  }

  xmlhttp.open('GET', url + 'deleteAlbum?idAlbum=' + idAlbum);
  xmlhttp.send();
}

btnAlbumSalvar.addEventListener('click', function ()
{
  if(escolhaBotaoAlbum == 1)
  {
    let album = {};
    album.idArtista = idArtistaAlbumSelecionado;
    album.titulo = nomeAlbum.value;
    album.lancamento = anoLancamentoAlbum.value;
    album.capa = imgAlbum.src.split(',')[1];

    adicionarAlbum(album);
  }
  else if(escolhaBotaoAlbum == 2)
  {
    let album = {};
    album.idArtista = idArtistaAlbumSelecionado;
    album.id = idAlbumSelecionado
    album.titulo = nomeAlbum.value;
    album.lancamento = anoLancamentoAlbum.value;
    album.capa = imgAlbum.src.split(',')[1];

    editarAlbum(album);
  }
  else if(escolhaBotaoAlbum == 3)
  {
    if(confirm('Deseja remover o album ' + nomeAlbum.value + '?'))
    {
      removerAlbum(idAlbumSelecionado);
    }
  }
})