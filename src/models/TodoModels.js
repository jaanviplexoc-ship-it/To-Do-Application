function TodoModel(text,description) {
    return {
        id: Date.now(),
        text: text,
        description:description,
        completed: false
    };
}

export default TodoModel;