-- Tabelas
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    pergunta TEXT NOT NULL,
    opcoes TEXT[] NOT NULL,
    resposta_correta TEXT NOT NULL,
    explicacao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados: Categorias
INSERT INTO categories (name) VALUES 
    ('engenharia-software'),
    ('sql'),
    ('docker'),
    ('entrevistas-tech'),
    ('python'),
    ('fundamentos-algoritmos')
ON CONFLICT (name) DO NOTHING;

-- Dados: Questões Engenharia de Software
INSERT INTO questions (category_id, pergunta, opcoes, resposta_correta, explicacao) VALUES
(1, 'Qual é o principal objetivo do modelo em cascata (Waterfall) no desenvolvimento de software?', 
 ARRAY['Permitir mudanças frequentes durante o desenvolvimento', 'Entregar software funcional em ciclos curtos', 'Seguir um processo sequencial e linear de fases', 'Priorizar a interação com o cliente sobredocumentação'], 
 'Seguir um processo sequencial e linear de fases', 
 'O modelo Waterfall é caracterizado por suas fases sequenciais: requisitos, design, implementação, teste e manutenção, onde cada fase deve ser concluída antes da próxima começar.'),

(1, 'Na metodologia Scrum, qual é a responsabilidade do Product Owner?', 
 ARRAY['Facilitar as cerimônias do Scrum e remover impedimentos', 'Desenvolver o produto e escrever o código', 'Maximizar o valor do produto gerenciando o backlog', 'Garantir que a equipe siga as práticas do Scrum'], 
 'Maximizar o valor do produto gerenciando o backlog', 
 'O Product Owner é responsável por maximizar o valor do produto resultante do trabalho da equipe de desenvolvimento, gerenciando o Product Backlog.');

-- Dados: Questões SQL
INSERT INTO questions (category_id, pergunta, opcoes, resposta_correta, explicacao) VALUES
(2, 'Qual comando SQL é usado para recuperar dados de uma tabela?', 
 ARRAY['GET', 'SELECT', 'READ', 'FETCH'], 
 'SELECT', 
 'O comando SELECT é usado no SQL para consultar e recuperar dados de uma ou mais tabelas.'),

(2, 'Qual cláusula SQL é usada para filtrar registros após o agrupamento com GROUP BY?', 
 ARRAY['WHERE', 'HAVING', 'FILTER', 'WHERE GROUP'], 
 'HAVING', 
 'A cláusula HAVING é usada para filtrar grupos após a aplicação do GROUP BY, enquanto WHERE filtra linhas individuais antes do agrupamento.'),

(2, 'O que a função COALESCE retorna quando todos os argumentos são NULL?', 
 ARRAY['0', 'Uma string vazia', 'NULL', 'FALSE'], 
 'NULL', 
 'COALESCE retorna o primeiro valor não-NULL de seus argumentos. Se todos os argumentos forem NULL, retorna NULL.');

-- Dados: Questões Docker
INSERT INTO questions (category_id, pergunta, opcoes, resposta_correta, explicacao) VALUES
(3, 'Qual é o propósito do Dockerfile?', 
 ARRAY['Definir as variáveis de ambiente do container', 'Listar todos os containers em execução', 'Descrever como construir uma imagem Docker', 'Orquestrar múltiplos containers'], 
 'Descrever como construir uma imagem Docker', 
 'Um Dockerfile é um script contendo uma série de comandos e instruções que o Docker executa automaticamente para construir uma nova imagem.'),

(3, 'Qual comando é usado para iniciar um container Docker a partir de uma imagem?', 
 ARRAY['docker build', 'docker pull', 'docker run', 'docker start'], 
 'docker run', 
 'O comando docker run cria e inicia um novo container a partir de uma imagem Docker especificada.'),

(3, 'Qual comando Docker é usado para listar os containers em execução?', 
 ARRAY['docker list', 'docker ps', 'docker show', 'docker containers'], 
 'docker ps', 
 'O comando docker ps lista todos os containers em execução. Para listar também os containers parados, usa-se docker ps -a.');

-- Dados: Questões Entrevistas Tech
INSERT INTO questions (category_id, pergunta, opcoes, resposta_correta, explicacao) VALUES
(4, 'Em uma entrevista técnica, qual é a melhor abordagem quando você não sabe a resposta para uma pergunta?', 
 ARRAY['Inventar uma resposta para parecer confiante', 'Dizer que não sabe e parar de falar', 'Admitir que não sabe, explicar seu raciocínio e oferecer para descobrir', 'Mudar de assunto rapidamente'], 
 'Admitir que não sabe, explicar seu raciocínio e oferecer para descobrir', 
 'Entrevistadores valorizam a honestidade e a capacidade de resolver problemas. Mostrar seu processo de pensamento é mais importante do que saber todas as respostas.'),

(4, 'O que é mais importante demonstrar em uma entrevista de programação?', 
 ARRAY['Memorização de algoritmos complexos', 'Velocidade de digitação', 'Habilidade de resolver problemas e escrever código limpo', 'Conhecimento de todas as linguagens de programação'], 
 'Habilidade de resolver problemas e escrever código limpo', 
 'Entrevistas técnicas focam em avaliar suas habilidades de resolução de problemas, pensamento lógico e capacidade de escrever código funcional e mantenível.');

-- Dados: Questões Python
INSERT INTO questions (category_id, pergunta, opcoes, resposta_correta, explicacao) VALUES
(5, 'Qual é a diferença entre listas e tuplas em Python?', 
 ARRAY['Listas são mais rápidas', 'Tuplas são imutáveis', 'Não há diferença', 'Listas usam menos memória'], 
 'Tuplas são imutáveis', 
 'A principal diferença é que listas são mutáveis (podem ser modificadas) enquanto tuplas são imutáveis (não podem ser modificadas após a criação).'),

(5, 'O que o método .append() faz em uma lista Python?', 
 ARRAY['Remove o último elemento', 'Adiciona um elemento ao final', 'Ordena a lista', 'Inverte a lista'], 
 'Adiciona um elemento ao final', 
 'O método .append() adiciona um elemento ao final da lista, aumentando seu comprimento em 1.'),

(5, 'Como você cria um dicionário vazio em Python?', 
 ARRAY['{}', '[]', 'dict()', ' Ambas {} e dict()'], 
 ' Ambas {} e dict()', 
 'Você pode criar um dicionário vazio usando {} (chaves vazias) ou dict(). Ambos os métodos criam um dicionário vazio.');

-- Dados: Questões Fundamentos Algoritmos
INSERT INTO questions (category_id, pergunta, opcoes, resposta_correta, explicacao) VALUES
(6, 'Qual é a complexidade de tempo do algoritmo de busca binária?', 
 ARRAY['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], 
 'O(log n)', 
 'A busca binária tem complexidade O(log n) porque divide o problema pela metade a cada iteração, sendo muito mais eficiente que a busca linear O(n).'),

(6, 'O que é uma estrutura de dados pilha (stack)?', 
 ARRAY['FIFO - First In First Out', 'LIFO - Last In First Out', 'Aleatória', 'Ordenada por valor'], 
 'LIFO - Last In First Out', 
 'Uma pilha segue o princípio LIFO (Last In First Out), onde o último elemento adicionado é o primeiro a ser removido.'),

(6, 'Qual é a complexidade de tempo do QuickSort no caso médio?', 
 ARRAY['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'], 
 'O(n log n)', 
 'No caso médio, o QuickSort tem complexidade O(n log n). No pior caso (quando o pivô é sempre o menor ou maior elemento), a complexidade é O(n²).');