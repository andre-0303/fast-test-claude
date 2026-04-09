---
name: add-question
description: Adiciona novas questões ao questions.json.
  Use quando o usuário pedir para adicionar perguntas,
  criar questões ou expandir o banco de questões.
---

Ao adicionar questões ao questions.json:

1. Leia o arquivo atual: backend/data/questions.json
2. Identifique a categoria correta ou crie uma nova
3. Gere a questão no formato:
   {
   "id": "uuid-unico",
   "pergunta": "texto da pergunta",
   "opcoes": ["A", "B", "C", "D"],
   "resposta_correta": 0,
   "explicacao": "por que essa é a resposta"
   }
4. Valide que o JSON resultante está bem formado
5. Salve e confirme ao usuário

Sempre gere entre 3 e 4 opções por questão.
Dificuldade: intermediária por padrão.
