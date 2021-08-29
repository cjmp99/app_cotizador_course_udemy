import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptoMoneda from '../hooks/useCriptomoneda';
import Error from '../components/Error';
import axios from 'axios';
import PropTypes from 'prop-types';

const Formulario = ({ guardarMoneda ,guardarCriptoMoneda }) => {

    const [ listaCripto, setListaCripto ] = useState([]);
    const [ error, setError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ]

    const [ moneda, SelectMoneda ] = useMoneda('Elije Tu Moneda', '', MONEDAS);

    const [ criptomoneda, SelectCripto ] = useCriptoMoneda('Elije Tu CriptoMoneda', '', listaCripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const resultado = await axios.get(url)
            setListaCripto(resultado.data.Data);
        }
        consultarAPI()
    }, [])

    const cotizarMoneda = e => {
        e.preventDefault();

        if(moneda === '' || criptomoneda === ''){
            setError(true)
            return;
        }

        setError(false);
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);
    }

    return (
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMoneda />
            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
    )
};

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`;

Formulario.protoTypes = {
    guardarMoneda: PropTypes.func.isRequired,
    guardarCriptoMoneda: PropTypes.func.isRequired
}

export default Formulario;
