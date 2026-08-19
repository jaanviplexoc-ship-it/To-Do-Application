function TodoModel(text) {
    return {
        id: Date.now(),
        text: text,
        completed: false
    };
}

export default TodoModel;