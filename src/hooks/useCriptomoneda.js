import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const useCriptoMoneda = (label, stateInicial, options) => {

    const [ state, actualizarState ] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="">-Seleccione-</option>
                {options.map(option => (
                    <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>{option.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    )

    return [state, SelectCripto, actualizarState];

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

useCriptoMoneda.propTypes = {
    label: PropTypes.string.isRequired,
    stateInicial: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired
}

export default useCriptoMoneda;