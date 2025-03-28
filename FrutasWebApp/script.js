function frutaAleatoria()
{
    let url = "http://localhost:5000/fruta";
    fetch(url).then(response => response.json())
    .then(data => {
        let container = document.getElementById("frutaAleatoria");
        if(data.fruta){
            container.innerHTML = "Fruta recuperada aleatoriamente: " + data.fruta;
            container.classList = "success";
        }
        else
        {
            container.innerHTML = "Não foi possivel recuperar nenhuma fruta";
            container.classList = "error";
        }
    });
}

function frutaPeloId()
{
    let id = Number(document.getElementById("frutaId").value);
    let url = "http://localhost:5000/fruta/" + id.toFixed();
    fetch(url).then(response => response.json())
    .then(data => {
        let container = document.getElementById("frutaPeloId");
        if(data.fruta){
            container.innerHTML = "Fruta recuperada pelo id ["+id+"]:" + data.fruta;
            container.classList = "success";
        }
        else
        {
            container.innerHTML = "Não existe fruta para esse ID";
            container.classList = "error";
        }
    });
}

function adicionarFruta()
{
    let inputFruta = document.getElementById("inputFruta");
    let novaFruta = inputFruta.value.trim();
    inputFruta.value = "";
    let resposta = document.getElementById("resposta");

    if(novaFruta === ""){
        resposta.innerHTML = "Erro: Digite uma fruta válida!";
        resposta.classList = "error";
        return;
    }

    let url = "http://localhost:5000/fruta";
    let request = {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({fruta:novaFruta})
    };

    fetch(url, request).then(response => response.json())
    .then(data => {
        if(data.erro){
            resposta.innerHTML = "Erro: " + data.erro;
            resposta.classList = "error";
            return;
        }
        resposta.innerHTML = "Sucesso: " + data.info;
        resposta.classList = "success";
    });
}

function atualizarFruta()
{
    let inputId = document.getElementById("atualizarFrutaId");
    let inputNovoNome = document.getElementById("frutaNovoNome");
    let id = Number(inputId.value.trim());
    let novaFruta = inputNovoNome.value.trim();

    resposta = document.getElementById("updateResponse");
    if (novaFruta === "") {
        resposta.innerText = "Por favor, forneça o novo nome da fruta!";
        resposta.classList = "error";
        return;
    }

    inputId.value = 0;
    inputNovoNome.value = "";

    let url = "http://127.0.0.1:5000/fruta/" + id.toFixed();
    let request = {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({fruta:novaFruta})
    };

    fetch(url,request)
    .then(response => response.json())
    .then(data => {
        if (data.erro)
        {
            resposta.innerText = "Erro: " + data.erro;
            resposta.classList = "error";
            return;
        }
        resposta.innerText = "Sucesso: " + data.mensagem;
        resposta.classList = "success";
    });
}

function deletarFruta()
{
    let id = Number(document.getElementById("deleteFruitId").value);

    let url = "http://127.0.0.1:5000/fruta/"+id.toFixed();
    request = { method: "DELETE" };

    let resposta = document.getElementById("deleteResponse");
    fetch(url,request)
    .then(response => response.json())
    .then(data => {
        if (data.erro)
        {
            resposta.innerText = "Erro: " + data.erro;
            resposta.classList = "error";
            return;
        }
        resposta.innerText = "Sucesso: " + data.mensagem;
        resposta.classList = "success";
    });
}