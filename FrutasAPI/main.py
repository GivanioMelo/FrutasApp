from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import TextUtils

api = Flask(__name__)
CORS(api)

# frutas = ["Maçã", "Banana", "Laranja", "Morango","Kiwi","Abacaxi","Pitomba","Melancia","Melão","Mamão","Jaca","Uva"]
frutas = []

@api.route('/fruta', methods=['GET'])
def getFruta():
    if len(frutas) > 0:
        frutaAleatoria = random.choice(frutas)
        return jsonify({"fruta": frutaAleatoria}),200
    return jsonify({"erro":"nenhuma fruta cadastrada"}),404

@api.route('/fruta/all', methods=['GET'])
def listarFrutas():
    if len(frutas) > 0:
        retorno = {
            "contagem":len(frutas),
            "frutas": frutas
        }
        return jsonify(retorno),200
    return jsonify({"erro":"nenhuma fruta cadastrada"}),404


@api.route('/fruta/<int:id>', methods=['GET'])
def getFrutaById(id:int):
    if id < 0: return jsonify({"erro":"Id não pode ser negativo"}), 400
    if id >= len(frutas): return jsonify({"erro":"Fruta não encontrada"}), 404
    fruta  = frutas[id]
    return jsonify({'fruta': fruta}),200

@api.route('/fruta', methods=['POST'])
def adicionarFruta():
    data = request.get_json()
    if "fruta" in data:
        novaFruta = data["fruta"].strip()
        if not novaFruta: return jsonify({"erro":"Nome invalido."}), 400
        if novaFruta in frutas: return jsonify({"erro":"Essa fruta já existe!"}), 400

        frutas.append(novaFruta)
        TextUtils.printGreen(f"Fruta {novaFruta} adicionada com sucesso!")
        return jsonify({"info":f"Fruta {novaFruta} adicionada com sucesso!"}), 201

