let infos = JSON.parse(localStorage.getItem('infos')) ?? {
  todos: [
  ],
};

export const generateInfo = (todo) => {
  infos.todos.push(todo)
  saveToLocalStorage()
}

export const deleteRecord = (id) => {
  const todoIndex = infos.todos.findIndex(todo => todo.id == id);
  todoIndex !== -1 ? infos.todos.splice(todoIndex, 1) : ''
  saveToLocalStorage()
}

export const setComplete = (id) => {
  const todoIndex = infos.todos.findIndex(todo => todo.id == id);
  if(infos.todos[todoIndex].completed == true) {
    infos.todos[todoIndex].completed = false;
    saveToLocalStorage()
    return false;
  } else {
    infos.todos[todoIndex].completed = true;
    saveToLocalStorage()
    return true;
  }
  
}

const saveToLocalStorage = () => {
  localStorage.setItem('infos', JSON.stringify(infos))
}

export default infos;
/*
{
    todos: [
      {
        id: 1,
        title: 'Task 1',
        completed: false,
        category: 'Work'
      },
      {
        id: 2,
        title: 'Task 2',
        completed: true,
        category: 'Personal'
      },
    ],
  };
  */