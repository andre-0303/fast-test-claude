---
name: validate-json
description: Valida o schema do questions.json.
  Use antes de qualquer commit que altere questões.
allowed-tools: [Read, Bash]
---

Valide o arquivo backend/data/questions.json:

1. Parse o JSON e verifique sintaxe
2. Para cada questão, cheque:
   - id: string única, não-vazia
   - pergunta: string não-vazia
   - opcoes: array de 3–4 strings
   - resposta_correta: número 0–3
   - explicacao: string não-vazia
3. Reporte erros com número de linha e campo
4. Se válido: "✓ JSON válido — N questões em K categorias"