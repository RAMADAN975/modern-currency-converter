import { useState, useEffect, useMemo } from 'react';
import './index.css';
import InputBox from './Components/InputBox';
import useCurrencyInfo from './Hooks/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("egp");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { data: currencyInfo, loading, error } = useCurrencyInfo(from);

  const options = useMemo(() => Object.keys(currencyInfo), [currencyInfo]);

  useEffect(() => {
    if (!amount || !currencyInfo[to]) {
      setConvertedAmount(0);
      return;
    }

    const timeout = setTimeout(() => {
      try {
        const result = amount * currencyInfo[to];
        setConvertedAmount(Number(result.toFixed(2)));
      } catch {
        setConvertedAmount(0);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [amount, to, currencyInfo]);

  const swap = () => {
    setFrom((prevFrom) => {
      setTo(prevFrom);
      return to;
    });

    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div
      className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ background: '#1e293b' }}
    >
      <div
        className="card p-4 border-0 shadow-lg"
        style={{
          maxWidth: '450px',
          width: '100%',
          borderRadius: '25px',
          backgroundColor: '#334155'
        }}
      >
        <h3 className="text-center mb-2 fw-bold text-white">
          Currency Converter
        </h3>

        <p className="text-center text-secondary small mb-3">
          Live exchange rates
        </p>

        {loading && (
          <p className="text-center text-info">Loading...</p>
        )}

        {error && (
          <p className="text-center text-danger">{error}</p>
        )}

        <form onSubmit={(e) => e.preventDefault()}>

          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={setFrom}
            selectCurrency={from}
            onAmountChange={setAmount}
            amountDisable={loading}
            currencyDisable={loading}
          />

          <div className="text-center my-3">
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4 shadow"
              onClick={swap}
              disabled={loading}
            >
              {loading ? "..." : "🔄 Swap"}
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={setTo}
            selectCurrency={to}
            amountDisable
            currencyDisable={loading}
          />

        </form>
      </div>
    </div>
  );
}

export default App;