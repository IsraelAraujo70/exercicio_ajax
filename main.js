const nomeElemento = document.querySelector('h1.profile-name');
const usernameElemento = document.querySelector('h2.profile-username');
const avatarElemento = document.querySelector('img.profile-avatar');
const reposElemento = document.querySelector('#repos');
const seguidoresElemento = document.querySelector('#seguidores');
const seguindoElemento = document.querySelector('#seguindo');
const linkElemento = document.querySelector('a.profile-link');
let username = window.prompt('Digite o username a ser exibido:');

function buscarElementos() {
    fetch(`https://api.github.com/users/${username}`)
        .then(function (res) {
            if (!res.ok) {
                throw new Error(`Erro ${res.status}: Usuário não encontrado`);
            }
            return res.json();
        })
        .then(function (json) {
            nomeElemento.innerText = json.name || 'Nome não disponível';
            usernameElemento.innerText = json.login || 'Login não disponível';
            avatarElemento.src = json.avatar_url || 'default-avatar.png';
            seguidoresElemento.innerText = json.followers || '0';
            seguindoElemento.innerText = json.following || '0';
            reposElemento.innerText = json.public_repos || '0';
            linkElemento.href = json.html_url || '#';
        })
        .catch(function (error) {
            alert(error.message);
            username = window.prompt('Digite o username a ser exibido novamente:');
            buscarElementos();
        });
}

document.addEventListener('DOMContentLoaded', function () {
    buscarElementos();
});
