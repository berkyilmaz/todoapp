import Header from "./Components/Header";
import React, { useState, useEffect } from "react";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]); //todosa heryerden erişebilmek için parentta oluşturuldu.
  const [status, setStatus] = useState("all"); //footerdaki butonların çalışması için oluşturuldu.
  const [filteredTodos, setFilteredTodos] = useState([]); //footerdaki status durumlarına göre filterelenmiş todos(todosda yapılsaydı filterelendiği zaman digerleri kaybolacaktı)

  useEffect(() => {
    getTodos();
  }, []); //sayfa ilk açıldığında todosları gelir.
  useEffect(() => {
    statusHandler(); //todos ve status statelerinde değişiklik olunca statusHandler fonksiyonunu çalıştırır.
    saveTodos(); //yapılan her işlemden sonra browserda bulunan localstorage'a günceller.
  }, [todos, status]);
  const statusHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true)); //tamamlanmış todoları gösterir.
        break;
      case "active":
        setFilteredTodos(todos.filter((todo) => todo.completed === false)); //tamamlanmamışları gösterir.
        break;
      default: //tüm todoları gösterir.
        setFilteredTodos(todos);
        break;
    } //status durumlarına göre todosu filtreleyerek yeni filtrelenmiş todosu oluşturur.
  };
  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
  return (
    <section className="todoapp">
      {/* Componentlerden de erişebilmek iiçin stateleri prop olarak gonderdik */}
      <Header todos={todos} setTodos={setTodos} />

      {/* todosun length 0dan büyükse main ve footer göster */}
      {todos.length > 0 ? (
        <>
          <Main
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
            status={status}
            setStatus={setStatus}
          />
          <Footer
            todos={todos}
            setTodos={setTodos}
            filteredTodos={filteredTodos}
            status={status}
            setStatus={setStatus}
          />
        </>
      ) : null}
    </section>
  );
}

export default App;
