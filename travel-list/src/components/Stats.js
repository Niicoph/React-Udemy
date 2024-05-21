export default function Stats({numItems , items}) {
    if (!items.length) {
      return (
        <footer className="stats">
          <em>Start adding some items! 🚀</em>
        </footer>  
      );
    }
  
    const numPackedItems = items.filter( item => item.packed).length;
    const percentagePacked = numItems ? numPackedItems / numItems * 100 : 0;
  
    
    return (
      <footer className="stats">
        { percentagePacked !== 100 ?  
        <em>  You have {numItems} items on your list, and you already packed {numPackedItems} (  {  Math.round(percentagePacked)} %) 🧳  </em>
        :
        <em> You got everything! Ready to go ✈️ </em>
        }
      </footer>
    );
  }