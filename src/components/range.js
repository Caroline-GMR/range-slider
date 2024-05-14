import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Range.module.css';

const Range = ({ min, max, step = 1, fixedValues }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const rangeRef = useRef(null);

  // Atualiza os valores mínimo e máximo com base em fixedValues ou impede que eles se cruzem
  useEffect(() => {
    if (fixedValues && fixedValues.length > 0) {
      setMinValue(fixedValues[0]);
      setMaxValue(fixedValues[fixedValues.length - 1]);
    }
  }, [fixedValues]);

  // Função para obter a porcentagem do valor atual em relação ao intervalo total
  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  // Função para encontrar o valor mais próximo com base na posição do cursor
  const findClosestValue = (position) => {
    const range = rangeRef.current.getBoundingClientRect();
    const relativePosition = position - range.left;
    const percentage = relativePosition / range.width;
    const newValue = min + percentage * (max - min);
    return Math.round(newValue / step) * step; // Arredonda para o step mais próximo
  };

  // Manipula o evento mouse down no slider
  const handleMouseDown = (event, isMin) => {
    event.preventDefault();
    const handleMouseMove = (e) => {
      const newValue = findClosestValue(e.clientX);
      if (isMin) {
        setMinValue(prev => Math.max(min, Math.min(newValue, maxValue - step)));
      } else {
        setMaxValue(prev => Math.min(max, Math.max(newValue, minValue + step)));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Renderiza o componente
  return (
    <div className={styles.rangeContainer}>
      <div className={styles.rangeLabels}>
        {fixedValues ? (
          <>
            <span className={styles.rangeLabel}>{(minValue ?? 0).toFixed(2)}</span>
            <span className={styles.rangeLabel}>{(maxValue ?? 0).toFixed(2)}</span>
          </>
        ) : (
          <>
            <input
              type="number"
              value={minValue}
              onChange={(e) => setMinValue(Math.max(min, Math.min(Number(e.target.value), maxValue - step)))}
              className={styles.rangeInput}
              min={min}
              max={max}
              step={step}
            />
            <input
              type="number"
              value={maxValue}
              onChange={(e) => setMaxValue(Math.min(max, Math.max(Number(e.target.value), minValue + step)))}
              className={styles.rangeInput}
              min={min}
              max={max}
              step={step}
            />
          </>
        )}
      </div>
      <div className={styles.rangeTrack} ref={rangeRef}>
        <div
          className={styles.rangeProgress}
          style={{
            left: `${getPercentage(minValue)}%`,
            right: `${100 - getPercentage(maxValue)}%`,
          }}
        />
        <div
          className={styles.rangeThumb}
          style={{ left: `${getPercentage(minValue)}%` }}
          onMouseDown={(e) => handleMouseDown(e, true)}
        />
        <div
          className={styles.rangeThumb}
          style={{ left: `${getPercentage(maxValue)}%` }}
          onMouseDown={(e) => handleMouseDown(e, false)}
        />
      </div>
    </div>
  );
};

export default Range;
