import React, { useState } from "react";
import "./App.css";

const TemperatureConverter = () => {
  const [inputTemp, setInputTemp] = useState("");
  const [unit, setUnit] = useState("celsius");
  const [convertedTemp, setConvertedTemp] = useState(null);
  const [error, setError] = useState("");

  const handleConvert = () => {
    // Clear previous errors and results
    setError("");
    setConvertedTemp(null);

    // Validate input
    if (!inputTemp.trim()) {
      setError("Please enter a temperature");
      return;
    }

    const temp = parseFloat(inputTemp);
    if (isNaN(temp)) {
      setError("Please enter a valid number");
      return;
    }

    // Perform conversion
    let result;
    let resultUnit;

    if (unit === "celsius") {
      // Convert Celsius to Fahrenheit
      result = (temp * 9) / 5 + 32;
      resultUnit = "°F";
    } else {
      // Convert Fahrenheit to Celsius
      result = ((temp - 32) * 5) / 9;
      resultUnit = "°C";
    }

    setConvertedTemp({
      value: result.toFixed(2),
      unit: resultUnit,
    });
  };

  const handleInputChange = (e) => {
    setInputTemp(e.target.value);
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleConvert();
    }
  };

  const handleReset = () => {
    setInputTemp("");
    setUnit("celsius");
    setConvertedTemp(null);
    setError("");
  };

  return (
    <div className="app-container">
      <h1>🌡️ Temperature Converter</h1>

      <div className="converter-card">
        <div className="input-section">
          <div className="input-group">
            <label htmlFor="temperature">Temperature:</label>
            <input
              id="temperature"
              type="text"
              value={inputTemp}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter temperature"
              className={error ? "error" : ""}
            />
          </div>

          <div className="unit-selection">
            <p>Select input unit:</p>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  value="celsius"
                  checked={unit === "celsius"}
                  onChange={(e) => setUnit(e.target.value)}
                />
                <span className="radio-label">Celsius (°C)</span>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  value="fahrenheit"
                  checked={unit === "fahrenheit"}
                  onChange={(e) => setUnit(e.target.value)}
                />
                <span className="radio-label">Fahrenheit (°F)</span>
              </label>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button
              onClick={handleConvert}
              className="convert-btn"
              disabled={!inputTemp.trim()}
            >
              Convert
            </button>
            <button onClick={handleReset} className="reset-btn">
              Reset
            </button>
          </div>
        </div>

        {convertedTemp && (
          <div className="result-section">
            <h3>Converted Temperature:</h3>
            <div className="result-display">
              <span className="result-value">{convertedTemp.value}</span>
              <span className="result-unit">{convertedTemp.unit}</span>
            </div>
            <div className="conversion-info">
              {unit === "celsius" ? (
                <p>
                  {inputTemp}°C = {convertedTemp.value}°F
                </p>
              ) : (
                <p>
                  {inputTemp}°F = {convertedTemp.value}°C
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="help-section">
        <h4>📝 How to use:</h4>
        <ul>
          <li>Enter a temperature value (e.g., 32, 100.5, -40)</li>
          <li>Select whether your input is in Celsius or Fahrenheit</li>
          <li>Click "Convert" or press Enter</li>
          <li>View the converted temperature in the result area</li>
        </ul>
      </div>
    </div>
  );
};

export default TemperatureConverter;
