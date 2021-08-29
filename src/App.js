import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotización from './components/Cotización';
import Spinner from './components/Spinner';
import axios from 'axios';

function App() {

  const [ moneda, guardarMoneda ] = useState('');
  const [ criptMoneda, guardarCriptoMoneda ] = useState('');
  const [ resultado, guardarresultado ] = useState({});
  const [ cargando, setCargando ] = useState(false);

  useEffect(() => {
    
    const cotizarCriptomoneda = async () => {
      if(moneda === '') return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptMoneda}&tsyms=${moneda}`

      const resultado = await axios.get(url);
      setCargando(true)

      setTimeout(() => {
        setCargando(false)
        guardarresultado(resultado.data.DISPLAY[criptMoneda][moneda]);
      }, 2000);
      
    }
    cotizarCriptomoneda()
  }, [moneda, criptMoneda])

  const componente = (cargando) ? <Spinner/> : <Cotización resultado={resultado}/>

  return (
    <Contenedor >
      <div>
          <Imagen 
            src={imagen}
            alt="Imagen cripto"
            />
      </div>
      <div>
          <Heading>Cotiza Criptomonedas al instante</Heading>

          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptoMoneda={guardarCriptoMoneda}
          />

          {componente}
      </div>
    </Contenedor>
  );
};

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`

export default App;
