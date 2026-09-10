import React, { useState } from 'react';
import { Calculator, Info, RotateCcw, Activity } from 'lucide-react';
import './BMI.css';

export default function BMI() {
  const [unit, setUnit] = useState('metric'); // 'metric' (cm, kg) or 'imperial' (ft/in, lbs)
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [calculatedBmi, setCalculatedBmi] = useState(22.9);
  const [category, setCategory] = useState({
    label: 'Normal Weight',
    color: '#10B981',
    description: 'You have a healthy body weight! Keep maintaining your current workout and balanced diet routines.'
  });

  const calculateBmiValue = (h, w, u) => {
    let bmiVal = 0;
    if (u === 'metric') {
      const heightInMeters = h / 100;
      bmiVal = w / (heightInMeters * heightInMeters);
    } else {
      // Imperial: weight in lbs, height in inches
      bmiVal = (w / (h * h)) * 703;
    }

    const roundedBmi = parseFloat(bmiVal.toFixed(1));
    setCalculatedBmi(roundedBmi);

    if (roundedBmi < 18.5) {
      setCategory({
        label: 'Underweight',
        color: '#3B82F6',
        description: 'You are below the recommended healthy weight range. Consider our Strength & Nutrition programs.'
      });
    } else if (roundedBmi >= 18.5 && roundedBmi <= 24.9) {
      setCategory({
        label: 'Normal Weight',
        color: '#10B981',
        description: 'You have a healthy body weight! Keep maintaining your current workout and balanced diet routines.'
      });
    } else if (roundedBmi >= 25 && roundedBmi <= 29.9) {
      setCategory({
        label: 'Overweight',
        color: '#F97316',
        description: 'You are slightly above ideal weight. Try our Weight Loss HIIT and cardio sessions.'
      });
    } else {
      setCategory({
        label: 'Obese Range',
        color: '#EF4444',
        description: 'We recommend personalized personal coaching and cardio conditioning for optimal health.'
      });
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateBmiValue(heightCm, weightKg, unit);
  };

  return (
    <section className="section-padding bmi-section">
      <div className="container">
        <div className="bmi-card-wrapper">
          <div className="bmi-grid">
            {/* Left Column: Input Form */}
            <div className="bmi-form-col">
              <div className="section-badge">Health Calculator</div>
              <h2 className="bmi-title">
                Calculate Your <span className="text-gradient-blue">BMI Status</span>
              </h2>
              <p className="bmi-subtitle">
                Body Mass Index (BMI) is a quick indicator of body fat based on your height and weight ratio.
              </p>

              {/* Unit Selector Switch */}
              <div className="unit-selector">
                <button
                  type="button"
                  className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
                  onClick={() => { setUnit('metric'); setHeightCm(175); setWeightKg(70); }}
                >
                  Metric (cm / kg)
                </button>
                <button
                  type="button"
                  className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
                  onClick={() => { setUnit('imperial'); setHeightCm(69); setWeightKg(154); }}
                >
                  Imperial (in / lbs)
                </button>
              </div>

              <form onSubmit={handleCalculate} className="bmi-form">
                <div className="input-group">
                  <label htmlFor="height-input" className="input-label">
                    Height ({unit === 'metric' ? 'cm' : 'inches'})
                  </label>
                  <input
                    id="height-input"
                    type="number"
                    min={unit === 'metric' ? 100 : 40}
                    max={unit === 'metric' ? 240 : 96}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="bmi-input"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="weight-input" className="input-label">
                    Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    id="weight-input"
                    type="number"
                    min={unit === 'metric' ? 30 : 60}
                    max={unit === 'metric' ? 200 : 450}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="bmi-input"
                    required
                  />
                </div>

                <div className="bmi-form-actions">
                  <button type="submit" className="btn btn-primary-blue full-width">
                    <Calculator size={18} />
                    Calculate BMI
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Dynamic Gauge & Interpretation */}
            <div className="bmi-result-col">
              <div className="result-display-card">
                <div className="result-header">
                  <Activity size={24} className="text-orange" />
                  <h3>Your BMI Result</h3>
                </div>

                <div className="bmi-value-circle" style={{ borderColor: category.color }}>
                  <span className="bmi-number">{calculatedBmi}</span>
                  <span className="bmi-unit-text">Score</span>
                </div>

                <div className="category-tag" style={{ backgroundColor: category.color }}>
                  {category.label}
                </div>

                <p className="category-desc">{category.description}</p>

                {/* Visual Scale Bar */}
                <div className="bmi-scale-bar">
                  <div className="scale-segment seg-under" title="Underweight (< 18.5)">
                    <span>Under</span>
                  </div>
                  <div className="scale-segment seg-normal" title="Normal (18.5 - 24.9)">
                    <span>Normal</span>
                  </div>
                  <div className="scale-segment seg-over" title="Overweight (25 - 29.9)">
                    <span>Over</span>
                  </div>
                  <div className="scale-segment seg-obese" title="Obese (>= 30)">
                    <span>Obese</span>
                  </div>
                </div>

                <div className="result-footer-note">
                  <Info size={14} />
                  <span>BMI is a preliminary assessment. Consult our certified trainers for complete body composition scans.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
