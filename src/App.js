import './App.css';
import List from './components/List';
import Search from './components/Search';

function App() {
  return (
    <main className='h-screen flex justify-center items-center'>
      <div className='py-40 px-20 w-1/2 flex flex-col bg-gray-100 items-center'>
        <Search />
        <List />
      </div>
    </main>
  );
}

export default App;
