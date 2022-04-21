import { useState } from "react";

function Header({ todos, setTodos }) {
  //todos ve setTodos proplarını karşılaştırır.
  //input için state oluşturduk
  const [input, setInput] = useState("");
  //inputun value değiştikçe onu state'e yaz
  const onChangeInput = (e) => {
    setInput(e.target.value);
  };
  //veri submit edildiğinde default fonksiyonu (formu gönderip sayfa yenilemeyi) durdur
  const onSubmit = (e) => {
    e.preventDefault();
    if (input === "") {
      // input boşsa uyarı ver ve işlemi gerçekleştirme
      alert("Eksik bilgi girdiniz!");
      return false;
    }
    //inputun değerini state'e ekle
    setTodos([
      ...todos, //todos içindekiler aynı şekilde kalsın virgülden sonraki yazdıklarımı güncelle
      { text: input, completed: false, id: Math.random() * 1000 }, //unique id oluşturmak için kullandık
    ]);
    setInput(""); //input gonderildikten sonra input alanını boşalt
  };

  return (
    <header className="header">
      <h1>To-Do List</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={input} //stateteki input degerini verir
          onChange={onChangeInput} //input degistikce inputun degerini state gonder
        />
      </form>
    </header>
  );
}

export default Header;
