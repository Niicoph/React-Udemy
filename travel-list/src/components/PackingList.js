import React, {useState} from 'react';
import Item from './Items';



export default function PackingList({items , onDeleteItems , onToggleItem , onClearItems}) {

    const [sortBy , setSortBy] = useState('input');
    
    let sortedItems;
  
    if (sortBy === "input")   sortedItems = items
    if (sortBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed))
    if (sortBy === "description")  sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description))
  
    
  
     return (
      <div className="list">
        <ul>
          {sortedItems.map( item => <Item item ={item} onDeleteItems={onDeleteItems}  onToggleItem = {onToggleItem} key = {item.id}/> )}
        </ul>
      <div className='actions'>
        <select  value={sortBy} onChange={ (e) => setSortBy(e.target.value) }>
          <option value='input' >Sort by the input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'> Sort by status </option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
      </div>
     );
  }