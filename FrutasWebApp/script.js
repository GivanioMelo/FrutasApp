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