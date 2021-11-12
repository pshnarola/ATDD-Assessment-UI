import Flight from './views/Flight/Flight';
import { AppStateProvider } from './context'
import useFlight from './state/useFlight';

function App() {

  const containers = {
    flight: useFlight
  }

  return (
    <div className="App">
      <AppStateProvider containers={containers}>
        <Flight />
      </AppStateProvider>
    </div>
  );
}

export default App;
