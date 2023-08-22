import React from 'react';
import './app.css'
import Header from '../header/header';
import TodoSection from '../todo-section/todo-section';


function App() {
  return (
    <div className='wrapper'>
      <div className="container">
        <Header />
        <main>
          <TodoSection />
        </main>
      </div>
    </div>
  );
}

export default App;