import { useState } from "react";
import User from "./classes/User";
import Registration from "./components/Registration";
import Clients from "./components/Clients";
import { Container, Grid } from "@mui/material";

function App() {
  const submit = 'http://localhost:8091/poc/user';
  const countryAPI = 'https://run.mocky.io/v3/f9621b2e-0431-4d86-bd22-ba799f29c64c';
  const clientsDataUrl = 'https://jsonplaceholder.typicode.com/users';

  const [formData, setFormData] = useState<User>({
    name: '',
    exp: '',
    country: '',
    skills: [],
    passport: false
  })

  const [agreement, setAgreement] = useState<boolean>(false);

  return (
    <Container>
      <Registration
        countryAPI={countryAPI}
        submitAPI={submit}
        formData={formData}
        setFormData={setFormData}
        agreement={agreement}
        setAgreement={setAgreement} />

      <Clients clientsDataUrl={clientsDataUrl} />
    </Container>
  );
}

export default App;
