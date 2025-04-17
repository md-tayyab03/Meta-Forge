import React from 'react';
import { parseSummaryFromResponse } from '../utils';

const OptimizationSection = ({
  result,
  isOptimizing,
  optimizationComplete,
  optimizedCode,
  optimizationSummary,
  optimizeHtmlCode,
  copyOptimizedCode
}) => {
  const renderSummaryItem = (item, index) => {
    const hasCategoryPrefix = item.includes(":");

    if (hasCategoryPrefix) {
      const [category, content] = item.split(":", 2);
      return (
        <div key={index} className="summary-item">
          <span className="bullet-point">•</span>
          <span className="category">{category}</span>
          <span className="colon">:</span>
          <span className="description">{content.trim()}</span>
        </div>
      );
    } else {
      return (
        <div key={index} className="summary-item">
          <span className="bullet-point">•</span>
          <span className="description">{item}</span>
        </div>
      );
    }
  };

  return (
    <div className="optimization-section">
      {result && result.length > 0 && (
        <>
          {!optimizationComplete ? (
            <button
              onClick={optimizeHtmlCode}
              disabled={isOptimizing}
              className={isOptimizing ? "optimizing-button" : ""}
            >
              {isOptimizing ? "OPTIMIZING..." : "OPTIMIZE MY CODE"}
            </button>
          ) : (
            <div className="optimized-code-container">
              <h3>Optimized HTML Code</h3>
              <textarea
                className="optimized-code"
                value={optimizedCode}
                readOnly
              ></textarea>

              {optimizationSummary.length > 0 && (
                <div className="optimization-summary">
                  <h3>Optimization Summary</h3>
                  <div className="summary-list">
                    {optimizationSummary.map((item, index) => renderSummaryItem(item, index))}
                  </div>
                </div>
              )}

              <button onClick={copyOptimizedCode}>copy optimized code</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OptimizationSection; 