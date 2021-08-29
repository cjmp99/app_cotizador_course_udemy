import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Resultado = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 28px;

    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;

    span{
        font-weight: bold;
    }
`;

const Cotización = ({resultado}) => {
    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado);
    return (
        <Resultado>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio más alto: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio más bajo: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Última actualización: <span>{resultado.LASTUPDATE}</span></Info>
        </Resultado>
    )
}

Cotización.propTypes = {
    resultado: PropTypes.object.isRequired
}

export default Cotización
