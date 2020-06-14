import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding:10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Formulario = () => {

    //state del listado de criptomonedas
    const [ listadocripto, guardarCriptomonedas ] = useState([]);
    const [error, guardaError ] = useState(false)

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'ARG', nombre: 'Pesos Argentino'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libras Estarlinas'}
    ]

    // utlizar useMoneda
    const [ moneda, SelectMonedas, actualizarState ] = useMoneda('Elige tu Moneda', '', MONEDAS);

    // utilizar  useCriptomoneda
    const [criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '',listadocripto);


    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url)
            guardarCriptomonedas(resultado.data.Data);   

        }
        consultarAPI()

    },[]);

    //cuando el user hace un submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === '' ) {
            guardaError(true)
            return;
        }

        // pasar los datos al componente principal
        guardaError(false)
    }


    return ( 
        <form
            onSubmit={ cotizarMoneda }
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas />

            <SelectCripto />
            <Boton
                type="submit"
                value="Calcular"
             />
        </form>
     );
}
 
export default Formulario;