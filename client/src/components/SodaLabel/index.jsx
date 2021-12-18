import React from 'react';

const SodaLabel = function SodaLabel({ soda, buySoda }) {
    return (
      <div role="document" className="soda-label">
        <div className="button-wrapper">
          <button type="button" disabled={!(soda.quantity > 0)} onClick={() => buySoda(soda.id)} className="soda-button">{' '}</button>
        </div>
        {soda.label}
        {' '}
        :   $
        {soda.price.toFixed(2)}
        {' '}
        -
        {' '}
        {(soda.quantity > 0) ? `${soda.quantity} left` : 'OUT'}
      </div>
    );
};
export default React.memo(SodaLabel);
