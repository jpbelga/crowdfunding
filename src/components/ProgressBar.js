import React from 'react';

const ProgressBar = ({ percentual, height = "h-2.5", showPercentageText = false, barColor = "bg-brand-primary", backgroundColor = "bg-gray-custom-200" }) => {
  // Garante que o percentual esteja entre 0 e 100
  const clampedPercentual = Math.min(Math.max(parseFloat(percentual) || 0, 0), 100);

  return (
    <div className="w-full">
      <div className={`w-full ${backgroundColor} rounded-full ${height} dark:bg-gray-700 overflow-hidden`}>
        <div
          className={`${barColor} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedPercentual}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentual}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
      {showPercentageText && (
        <p className="text-xs text-gray-custom-600 mt-1 text-center">
          {clampedPercentual.toFixed(0)}% Completo
        </p>
      )}
    </div>
  );
};

export default ProgressBar;

