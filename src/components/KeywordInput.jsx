import React from 'react';

const KeywordInput = ({ focusKeyword, setFocusKeyword, domainUrl, setDomainUrl }) => {
  return (
    <div>
      <div className="input-group">
        <label htmlFor="focusKeyword">Focus Keyword:</label>
        <input
          type="text"
          id="focusKeyword"
          placeholder="Enter focus keyword"
          value={focusKeyword}
          onChange={(e) => setFocusKeyword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="domainUrl">Domain URL:</label>
        <input
          type="text"
          id="domainUrl"
          placeholder="Enter domain URL"
          value={domainUrl}
          onChange={(e) => setDomainUrl(e.target.value)}
        />
      </div>
    </div>
  );
};

export default KeywordInput; 