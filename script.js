const todoInput = document.getElementById('todo-input');
        const addTodoButton = document.getElementById('add-todo');
        const todoList = document.getElementById('todo-list');
        const clearAllButton = document.getElementById('clear-all');
        const loadTodos = () => {
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.forEach(todo => renderTodoItem(todo.text, todo.completed));
        };
        const saveTodos = () => {
            const todos = [];
            document.querySelectorAll('.todo-item').forEach(item => {
                todos.push({
                    text: item.querySelector('span').textContent,
                    completed: item.querySelector('input[type="checkbox"]').checked
                });
            });
            localStorage.setItem('todos', JSON.stringify(todos));
        };
        const renderTodoItem = (text, completed = false) => {
            const li = document.createElement('li');
            li.className = `todo-item ${completed ? 'completed' : ''}`;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = completed;
            checkbox.addEventListener('change', () => {
                li.classList.toggle('completed');
                saveTodos();
            });

            const span = document.createElement('span');
            span.textContent = text;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                li.remove();
                saveTodos();
            });

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        };
        addTodoButton.addEventListener('click', () => {
            const text = todoInput.value.trim();
            if (text) {
                renderTodoItem(text);
                saveTodos();
                todoInput.value = '';
            }
        });
        clearAllButton.addEventListener('click', () => {
            todoList.innerHTML = '';
            localStorage.removeItem('todos');
        });

        loadTodos();