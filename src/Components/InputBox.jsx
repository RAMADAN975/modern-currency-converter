import React, { useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId();

    return (
        <div className={`p-4 d-flex shadow-lg ${className}`}
            style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
            }}>
            <div className="w-50 text-start">
                <label htmlFor={amountInputId} className="text-secondary small mb-3 d-block fw-semibold">
                    {label.toUpperCase()}
                </label>
                <input
                    id={amountInputId}
                    className="form-control border-0 p-0 fw-bold text-white"
                    style={{ fontSize: '1.5rem', background: 'transparent', boxShadow: 'none' }}
                    type="number"
                    placeholder="0"
                    disabled={amountDisable}
                    value={amount === 0 ? "" : amount}
                    onChange={(e) => onAmountChange && onAmountChange(e.target.value === "" ? 0 : Number(e.target.value))}
                />
            </div>
            <div className="w-50 text-end d-flex flex-column align-items-end">
                <p className="text-secondary small mb-3 fw-semibold">CURRENCY</p>
                <select
                    className="form-select border-0 fw-bold text-white text-center"
                    style={{
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        width: 'fit-content',
                        cursor: 'pointer'
                    }}
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency} className="bg-dark">
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;