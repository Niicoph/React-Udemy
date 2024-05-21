import './App.css';
import { useState } from 'react';
import Logo from './components/Logo';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';

function App() {

  const [items , setItems] = useState([]); // state variable items(array) and setItems function to update the state variable
  const numItems = items.length;
  function handleAddItems(item) {                // recibe un item y lo agrega al array de items (array nuevo dado que es inmutable)
    setItems( (items) => [...items , item] ) 
  }

  function handleDeleteItems(id) {
    setItems( (items) => items.filter( (item) => item.id !== id ) );
  }
  function handleToggleItem(id) {
    setItems( items => items.map ( item => item.id === id ? {...item , packed: !item.packed} : item))
  }

  function handleClearItems() {
    const confirmed = window.confirm("Are you sure you want to clear the list? 🧳")
    if (confirmed) setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form  onAddItems = {handleAddItems}/> {/* luego form puede agregar items */}
       <PackingList items = {items} onDeleteItems = {handleDeleteItems} onToggleItem = {handleToggleItem} onClearItems = {handleClearItems} /> {/* luego PackingList se encarga de renderizar el array con los items */}
      <Stats numItems = {numItems} items = {items}/>
    </div>
  );
}


export default App;
