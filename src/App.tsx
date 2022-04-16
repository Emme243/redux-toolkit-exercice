import { useAppDispatch, useAppSelector } from './app/hooks';
import { incremented, amountAdded } from './features/counter/counterSlice';
import { useFetchBreedsQuery } from './features/dogs/dogsApiSlice';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const dispatch = useAppDispatch();

  const count = useAppSelector(state => state.counter.value);
  function handleClick() {
    dispatch(incremented());
  }
  function incrementBy() {
    dispatch(amountAdded(10));
  }

  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  return (
    <div className="App">
      {/*DOGS APP*/}
      <p>Dogs to fetch:</p>
      <select value={numDogs} onChange={e => setNumDogs(Number(e.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <p>{isFetching && 'WAIT PLEASE...'}</p>
      <div>
        <p>Number of dogs fetched: {data.length}</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {data.map(breed => (
              <tr key={breed.id}>
                <td>{breed.name}</td>
                <td>
                  <img src={breed.image.url} alt={breed.name} height={250} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*COUNTER APP*/}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>

          <button type="button" onClick={incrementBy}>
            Increment by 10
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
