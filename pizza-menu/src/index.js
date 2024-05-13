import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';



const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
    <App />     
    </div>
    
  </React.StrictMode>
);

function App() {
  return (
    <div className='container'>
      <Header />
      <Menu />
      <Footer/>
    </div>
  );
}

function Header() {
  return (
    <header className='header'>
      <h1> Fast React Pizza Co. </h1>
    </header>
  )
}
function Menu() {
  const pizzas = pizzaData;

  return (
    <main className='menu'>
      <h2>Our Menu!</h2>   
  
        {pizzas && pizzas.length > 0 ? (   /* if there are pizzas and the length is higher than zero */
        <React.Fragment> {/* React fragment -> allows to return multiple elements on JSX */}
          <p>
            Welcome to Fast React Pizza Co. We offer a variety of delicious pizzas. 
            You can order online or visit us at our restaurant.
          </p>

          <ul className='pizzas'>            
             {pizzas.map(                 // loop over the pizzas
               pizza => <Pizza pizzaObj = {pizza} key = {pizza.name}/>  // for each pizza, create a Pizza component and use the pizza object as a prop 
             )}
          </ul>
        </React.Fragment>
        ) : <p>Sorry, we are currently out of pizzas</p>}       {/* else , display a message  */}
        
    </main>
  )
}

function Pizza(props) {
  const name = props.pizzaObj.name;
  const ingredients = props.pizzaObj.ingredients;
  const price = props.pizzaObj.price;
  const photoName = props.pizzaObj.photoName;
  const soldOut = props.pizzaObj.soldOut;

  // if (soldOut) return null;
  return (
    <li className= {`pizza ${soldOut ? 'sold-out' : ''}`} >  
      <img src={photoName} alt="Pizza Spinaci"/>
      <div>
        <h1> {name} </h1>
        <p>{ingredients}</p>
        <p>  {soldOut  ? 'SOLD OUT' :  price}     </p>
      </div>
    </li>
  )
}


function Footer() {
  const hour = new Date().getHours();
  const closeHour = 21;
  const openHour = 7;
  const isOpen = hour >=  openHour && hour < closeHour;
  
  return (
    <footer className='footer'>
      <div className='order'>
        {isOpen ? <Order closeHour = {closeHour}/> : <p>Sorry, we are closed now. Come back tomorrow!</p>}
      </div>
    </footer>
      
  )
}

function Order(props) {
  const closeHour = props.closeHour;
  return (
    <div className='order'>
    <p>We are open until {closeHour}:00 . Come visit us or order online!</p>  
    <button className='btn'>Order Now!</button>
    </div>

  );
}

reportWebVitals();
