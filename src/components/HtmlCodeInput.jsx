import React from 'react';

const HtmlCodeInput = ({ htmlCode, setHtmlCode }) => {
  return (
    <div className="input-group">
      <label htmlFor="htmlCode">HTML Code:</label>
      <textarea
        id="htmlCode"
        className="code-input"
        placeholder="Enter HTML code"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
      ></textarea>
    </div>
  );
};

export default HtmlCodeInput; 