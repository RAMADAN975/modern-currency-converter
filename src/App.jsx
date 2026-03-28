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

  // ✅ Auto Convert (Debounce)
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!currencyInfo[to]) return;

      const result = amount * currencyInfo[to];
      setConvertedAmount(Number(result.toFixed(2)));
    }, 300);

    return () => clearTimeout(timeout);
  }, [amount, to, currencyInfo]);

  // ✅ Swap FIXED
  const swap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);

    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ background: '#1e293b' }}>

      <div className="card p-4 border-0 shadow-lg"
        style={{ maxWidth: '450px', width: '100%', borderRadius: '25px', backgroundColor: '#334155' }}>

        <h3 className="text-center mb-4 fw-bold text-white">Currency Converter</h3>

        {/* Loading */}
        {loading && <p className="text-center text-info">Loading...</p>}

        {/* Error */}
        {error && <p className="text-center text-danger">{error}</p>}

        <form onSubmit={(e) => e.preventDefault()}>

          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={setFrom}
            selectCurrency={from}
            onAmountChange={setAmount}
          />

          {/* Swap */}
          <div className="text-center my-3">
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4 shadow"
              onClick={swap}
            >
              🔄 SWAP
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={setTo}
            selectCurrency={to}
            amountDisable
          />

        </form>
      </div>
    </div>
  );
}

export default App;