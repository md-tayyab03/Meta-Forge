import React from 'react';

const ResultDisplay = ({ result }) => {
  const renderResultItem = (item, index) => {
    let icon, className;

    switch (item.status) {
      case "success":
        icon = "✓";
        className = "success-item";
        break;
      case "error":
        icon = "✕";
        className = "error-item";
        break;
      case "warning":
        icon = "✓";
        className = "warning-item";
        break;
      default:
        icon = "";
        className = "info-item";
    }

    return (
      <p key={index} className={className}>
        {icon && <span className="result-icon">{icon}</span>}
        {item.text}
      </p>
    );
  };

  return (
    <div className="result-container">
      {result && result.map((item, index) => renderResultItem(item, index))}
    </div>
  );
};

export default ResultDisplay; 