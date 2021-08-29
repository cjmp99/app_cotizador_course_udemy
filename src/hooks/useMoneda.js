import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const useMoneda = (label, stateInicial, options) => {

    const [ state, actualizarState ] = useState(stateInicial);

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-Seleccione-</option>
                {options.map(option => (
                    <option key={option.codigo} value={option.codigo}>{option.nombre}</option>
                ))}
            </Select>
        </Fragment>
    )

    return [state, Seleccionar, actualizarState];

}

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    outline: none;
    font-size: 1.2rem;
`;

useMoneda.propTypes = {
    label: PropTypes.string.isRequired,
    stateInicial: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
}

export default useMoneda;