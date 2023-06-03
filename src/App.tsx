import Registration from "./components/Registration";

function App() {

  const countryAPI = 'https://run.mocky.io/v3/f9621b2e-0431-4d86-bd22-ba799f29c64c';

  return (
    <div>
      <Registration countryAPI={countryAPI}/>
    </div>
  );
}

export default App;
