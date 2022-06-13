const addTask = document.querySelector('.add');

const list = document.querySelector('.tasks');

let todos = [];

function addTodo(text) {
  const todo = {
    id: Date.now(),
    text,
  };
  todos.push(todo)
}

function renderTodo() {
  let temp = '';
  todos.forEach(todo => {
    const html = `
    <li key="${todo.id}">
      <span>${todo.text}</span>
    </li>
    `;
  temp += html;
  });

  //HTMLコードに変換
  list.innerHTML = temp;
}

addTask.addEventListener('submit', e => {
  //<form>要素はデフォルトでデータの送信を行うが、今回はJSでデータを取得、処理するためそのアクションをキャンセルする
  e.preventDefault();

  //対象の要素.<input>要素のname.valueで入力値の取得
  //.trim()で文字列の両端の空白を削除
  const text = addTask.add.value.trim();
  if (text !== '') {
    addTodo(text);

    //配列にTodoを入れたら入力フォームをリセットする
    addTask.reset();

    renderTodo();
  }

});