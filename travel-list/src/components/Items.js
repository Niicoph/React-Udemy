export default function Item( {item , onDeleteItems , onToggleItem} ) {
    return (
      <li>
        <input type="checkbox" value={item.packed} onChange={ () => onToggleItem(item.id) }/>
        <span style= { item.packed ? {textDecoration: "line-through"} : {} }  > {item.quantity}  {item.description}  </span>
        <button onClick={ () => onDeleteItems(item.id) }>❌</button> {/* in order to delete the item we need the id , and to do that we need a callback function */}
      </li>
    );
  }