import React from 'react';

const SampleCodeDialog = ({ showSampleCodeDialog, setShowSampleCodeDialog, sampleCodes, copySampleCode }) => {
  if (!showSampleCodeDialog) return null;

  return (
    <div className="sample-code-dialog-backdrop">
      <div className="sample-code-dialog">
        <div className="dialog-header">
          <h3>SEO Code Templates</h3>
          <button 
            className="close-dialog-button"
            onClick={() => setShowSampleCodeDialog(false)}
          >
            ✕
          </button>
        </div>
        <div className="sample-code-table">
          <table>
            <thead>
              <tr>
                <th>Template Name</th>
                <th>Industry</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sampleCodes.map((sample, index) => (
                <tr key={index}>
                  <td>{sample.name}</td>
                  <td>{sample.keyword}</td>
                  <td>
                    <button 
                      className="copy-sample-button"
                      onClick={() => copySampleCode(sample.code, sample.keyword)}
                    >
                      Use Template
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SampleCodeDialog; 