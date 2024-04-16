from flask import Flask, jsonify
from flask_cors import CORS  # Importa CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/tasks": {"origins": "http://localhost:3000"}})

# Carregue o arquivo JSON de tarefas
with open('./src/data/tasks.json') as f:
    tasks_data = json.load(f)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    # Suponha que tasks_data seja um objeto com uma propriedade 'tasks'
    tasks = tasks_data.get('tasks', [])
    return jsonify(tasks)  # Retorne apenas o array de tarefas

if __name__ == '__main__':
    app.run(port=3001)  # Inicia o servidor na porta 3001