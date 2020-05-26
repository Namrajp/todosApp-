
        var todoList = {
            todos : [],
            
            addTodos: function(todoText) {
                this.todos.push({
                    todoText : todoText,
                    completed: false
                });
            },
            changeTodos: function(id,newText) {
                this.todos[id].todoText = newText
            },
            deleteTodos: function(position) {
                this.todos.splice(position,1);
            },
            toggleCompleted: function(position) {
               var todo = this.todos[position];
               todo.completed = !todo.completed;
            },
            toggleAll: function(){
                totalTodos = this.todos.length;
                completedTodos = 0;
                // Computing value of completed todos
                for(i=0; i< this.todos.length; i++) {
                    if(this.todos[i].completed === true) {
                        completedTodos++;
                    }
                }
                // Case 1:if everything is true make everything false 
                
                    if(totalTodos === completedTodos) {
                        for(i=0; i< this.todos.length; i++) {
                        this.todos[i].completed = false;
                        }
                    }  

                    else {
                        for(i=0; i< this.todos.length; i++) {
                        this.todos[i].completed = true;
                    }
                    
                }
            }
        };

        var handlers = {
                // Display initial todos
        // this.onTodoListChanged(todoList.todos) {
        //     onTodoListChanged = todos => {
        //     view.displayTodos(todos)
        //   }
        // }
         // Explicit this binding
        // this.model.bindTodoListChanged(this.onTodoListChanged)

            displayTodos: function() {
                todoList.displayTodos();
            },

            addTodos: function() {
                var addTodoInput = document.getElementById("addTodoInput");
                todoList.addTodos(addTodoInput.value);
                addTodoInput.value = "";
                view.displayTodos();
            },
            changeTodos: function(id,newText) {
                todoList.changeTodos(id,newText);
                view.displayTodos();
            },

            deleteTodos: function(position) {
                todoList.deleteTodos(position);
                view.displayTodos();
            },
            toggleCompleted: function(position) {
                todoList.toggleCompleted(position);
                view.displayTodos();
            },
            toggleAll: function() {
                todoList.toggleAll();
                view.displayTodos();
            }
            
        };

        var view= {
              // Create an element with an optional CSS class
          createElement(tag, className) {
            const element = document.createElement(tag)
            if (className) element.classList.add(className)

            return element
          },

         displayTodos: function() {
            // Create todo item nodes for each todo in state
            const todoUl = document.querySelector('ul')
            todoUl.innerHTML =""

            todoList.todos.forEach((todo,position) => {
            const li = this.createElement('li')
             li.id = position

            // Each todo item will have a checkbox you can toggle
            const checkbox = this.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.checked = todo.completed

            // The todo item text will be in a contenteditable span
            const span = this.createElement('span')
            span.contentEditable = true
            span.classList.add('editable')

            // If the todo is complete, it will have a strikethrough
            if (todo.completed) {
              const strike = this.createElement('s')
              strike.textContent = todo.todoText
              span.append(strike)
            } else {
              // Otherwise just display the text
              span.textContent = todo.todoText
            }

            // The todos will also have a delete button
            const deleteButton = this.createElement('button', 'delete')
            deleteButton.textContent = 'Delete'
            li.append(checkbox, span, deleteButton)

            // Append nodes to the todo list
            todoUl.append(li)
            
          })
        },
        _initLocalListeners() {
            this._temporaryTodoText = ''
            var todoSpan = document.querySelector('span')
            todoSpan.addEventListener('input', event => {
              if (event.target.className === 'editable') {
                this._temporaryTodoText = event.target.innerText
              }
            })
          },
        bindEditTodo: function() {
            var todoUl = document.querySelector('ul')
            todoUL.addEventListener('focusout', event => {
          if (this._temporaryTodoText) {
            const id = parseInt(event.target.parentElement.id)

            handlers.changeTodos(id, this._temporaryTodoText)
            this._temporaryTodoText = ''
          }
        })
      },

        bindDeleteTodos: function() {
            var todoUl = document.querySelector('ul');
            todoUl.addEventListener('click', function(event) {
            var elementClicked = event.target;
            // Checking if a button is clicked or something else
            if (elementClicked.className === 'delete') {
                const id = parseInt(event.target.parentElement.id);
                handlers.deleteTodos(id)
                //console.log(elementClicked);
            }
        })
    },

        bindToggleTodo: function() {
            var todoUl = document.querySelector('ul');
            todoUl.addEventListener('change', event => {
          if (event.target.type === 'checkbox') {
            const id = parseInt(event.target.parentElement.id)
            handlers.toggleCompleted(id)
          }
        })
      },


  //     bindToggleTodo(handler) {
  //   this.todoList.addEventListener('change', event => {
  //     if (event.target.type === 'checkbox') {
  //       const id = parseInt(event.target.parentElement.id)

  //       handler(id)
  //     }
  //   })
  // }
}
view.bindDeleteTodos();
view.bindToggleTodo()

// source https://www.taniarascia.com/javascript-mvc-todo-app/
// watchandcode.com
