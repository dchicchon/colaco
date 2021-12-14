import React from 'react';
import './style.css'

const SodaLabel = ({ soda }) => {
    return (
        <div className='soda-label'>
            <div className='button-wrapper'>
                <button className='soda-button'></button>
            </div>
            <div className='text-wrapper'>
                ${soda.price} {soda.label} : {soda.quantity}
            </div>
        </div>
    )
}


const sodas = [{ quantity: 100, price: 1, label: 'Sprite' }, { quantity: 100, price: 1, label: 'Dr.Pepper' }, { quantity: 100, price: 1, label: 'Coke' }, { quantity: 100, price: 1, label: 'Squirt' }]

/**
 * 
 * 
 * sodas is going to be a list of objects, each of those objects will have a field
 * @param count number of sodas
 * @param label type of soda
 * @param price cost of soda
* 
 * 
 */

const SodaMachine = () => {
    return (
        <div id='soda-machine'>
            <h4>Soda Machine</h4>
            {sodas.map((soda, i) => (
                <SodaLabel key={i} soda={soda} />
            ))}
        </div>
    )
}

export default SodaMachine