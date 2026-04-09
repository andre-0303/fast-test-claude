class QuizApp {
    constructor() {
        this.currentCategory = null;
        this.questions = [];
        this.userAnswers = {};
        this.score = 0;

        this.categorySelection = document.getElementById('category-selection');
        this.quizSection = document.getElementById('quiz-section');
        this.quizTitle = document.getElementById('quiz-title');
        this.questionContainer = document.getElementById('question-container');
        this.submitBtn = document.getElementById('submit-btn');
        this.resultContainer = document.getElementById('result-container');
        this.backBtn = document.getElementById('back-btn');

        this.submitBtn.addEventListener('click', () => this.submitAnswers());
        this.backBtn.addEventListener('click', () => this.goBack());

        this.loadCategories();
    }

    async loadCategories() {
        try {
            const response = await fetch('/api/tests');
            const categories = await response.json();
            this.displayCategories(categories);
        } catch (error) {
            console.error('Error loading categories:', error);
            alert('Erro ao carregar categorias');
        }
    }

    displayCategories(categories) {
        const categoryButtons = document.getElementById('category-buttons');
        categoryButtons.innerHTML = '';

        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = 'category-btn';
            btn.textContent = this.formatCategoryName(category);
            btn.addEventListener('click', () => this.startQuiz(category));
            categoryButtons.appendChild(btn);
        });
    }

    formatCategoryName(category) {
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    async startQuiz(category) {
        this.currentCategory = category;
        this.userAnswers = {};
        this.score = 0;

        try {
            const response = await fetch(`/api/tests/${category}`);
            this.questions = await response.json();
            this.displayQuiz();
        } catch (error) {
            console.error('Error loading questions:', error);
            alert('Erro ao carregar questões');
        }
    }

    displayQuiz() {
        this.categorySelection.classList.add('hidden');
        this.quizSection.classList.remove('hidden');
        this.resultContainer.classList.add('hidden');
        this.resultContainer.innerHTML = '';

        this.quizTitle.textContent = this.formatCategoryName(this.currentCategory);

        this.questionContainer.innerHTML = '';
        this.questions.forEach((question, index) => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';

            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `${index + 1}. ${question.pergunta}`;
            questionCard.appendChild(questionTitle);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';

            question.opcoes.forEach((option, optionIndex) => {
                const optionLabel = document.createElement('label');
                optionLabel.className = 'option-label';

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question_${question.id}`;
                radio.value = option;

                const optionText = document.createElement('span');
                optionText.textContent = option;

                optionLabel.appendChild(radio);
                optionLabel.appendChild(optionText);
                optionsDiv.appendChild(optionLabel);
            });

            questionCard.appendChild(optionsDiv);
            this.questionContainer.appendChild(questionCard);
        });
    }

    submitAnswers() {
        // Collect user answers
        this.questions.forEach(question => {
            const selectedOption = document.querySelector(`input[name="question_${question.id}"]:checked`);
            if (selectedOption) {
                this.userAnswers[question.id] = selectedOption.value;
            }
        });

        // Calculate score
        this.score = 0;
        this.questions.forEach(question => {
            if (this.userAnswers[question.id] === question.resposta_correta) {
                this.score++;
            }
        });

        // Display results
        this.questionContainer.innerHTML = '';
        this.resultContainer.classList.remove('hidden');

        const percentage = Math.round((this.score / this.questions.length) * 100);

        if (percentage >= 70) {
            this.resultContainer.className = 'result-success';
            this.resultContainer.innerHTML = `
                <h3>Parabéns! Você passou!</h3>
                <p>Você acertou ${this.score} de ${this.questions.length} questões (${percentage}%)</p>
            `;
        } else {
            this.resultContainer.className = 'result-error';
            this.resultContainer.innerHTML = `
                <h3>Você precisa estudar mais!</h3>
                <p>Você acertou ${this.score} de ${this.questions.length} questões (${percentage}%)</p>
            `;
        }

        // Add restart button
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Fazer outro teste';
        restartBtn.className = 'btn-primary';
        restartBtn.style.marginTop = '15px';
        restartBtn.addEventListener('click', () => this.restartQuiz());
        this.resultContainer.appendChild(restartBtn);
    }

    restartQuiz() {
        this.quizSection.classList.add('hidden');
        this.categorySelection.classList.remove('hidden');
        this.resultContainer.classList.add('hidden');
    }

    goBack() {
        this.quizSection.classList.add('hidden');
        this.categorySelection.classList.remove('hidden');
        this.resultContainer.classList.add('hidden');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});