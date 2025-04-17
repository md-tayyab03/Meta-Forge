import React, { useState } from 'react';
import './App.css';
import KeywordInput from './components/KeywordInput';
import HtmlCodeInput from './components/HtmlCodeInput';
import ResultDisplay from './components/ResultDisplay';
import OptimizationSection from './components/OptimizationSection';
import SampleCodeDialog from './components/SampleCodeDialog';
import CodeSnippets from './components/CodeSnippets';
import {
  extractTitleContent,
  extractDescriptionContent,
  extractFirstParagraph,
  countTags,
  countOccurrences,
  calculateKeywordDensity,
  isInternalLink,
  countInternalLinks,
  findExternalLinks,
  parseSummaryFromResponse
} from './utils';

const App = () => {
  const [focusKeyword, setFocusKeyword] = useState('');
  const [domainUrl, setDomainUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [result, setResult] = useState(null);
  const [optimizedCode, setOptimizedCode] = useState('');
  const [optimizationSummary, setOptimizationSummary] = useState([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationComplete, setOptimizationComplete] = useState(false);
  const [showSampleCodeDialog, setShowSampleCodeDialog] = useState(false);

  const sampleCodes = [
    {
      name: "Digital Marketing Template",
      keyword: "Digital Marketing",
      code: CodeSnippets.digitalMarketing
    },
    {
      name: "Healthcare Template",
      keyword: "Healthcare",
      code: CodeSnippets.healthcare
    },
    {
      name: "AI Solutions Template",
      keyword: "Artificial Intelligence",
      code: CodeSnippets.ai
    }
  ];

  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  const optimizeHtmlCode = async () => {
    setIsOptimizing(true);

    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_new_api_key_here') {
        throw new Error('API key is not properly configured. Please check your .env file.');
      }

      const issues = result.filter(item => item.status === "error").map(item => item.text);

      const prompt = `
You are an expert SEO and HTML optimizer.

Your task is to analyze and fully optimize the following HTML code for best SEO performance based on the provided analysis. Focus on improving search engine visibility, user experience, and semantic structure.

Primary focus:
- Improve overall on-page SEO.
- Ensure strategic use of the focus keyword: "${focusKeyword}"
- Address all identified SEO issues listed below.

Also:
- Optimize title and meta tags, heading structure, image alt text, and internal links if needed.
- Ensure proper HTML5 semantic usage (use <main>, <section>, <article>, etc. appropriately).
- Improve content readability and structure where necessary.
- Include schema markup if relevant.

List of issues to fix:
${issues.join('\n')}

Instructions:
1. Return only the fully optimized HTML code first inside a code block.
2. After the code block, provide a bulleted summary of all changes made. Each bullet point should start with "-" followed by a category name and ":". For example: "Title Tag: Improved title with focus keyword at beginning" and all the points should be alligned from left to right.
3. Do NOT include any extra commentary, explanations, or non-relevant text.

Original HTML:
${htmlCode}
`;

      console.log("Making API call with key:", GEMINI_API_KEY);

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192,
            topP: 0.8,
            topK: 40
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Details:", errorData);
        throw new Error(`API request failed with status ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const fullResponseText = data.candidates[0].content.parts[0].text;

      let optimizedHtml = '';
      if (fullResponseText.includes('```html')) {
        const htmlMatch = fullResponseText.match(/```html\s*([\s\S]*?)\s*```/);
        if (htmlMatch && htmlMatch[1]) {
          optimizedHtml = htmlMatch[1].trim();
        }
      } else if (fullResponseText.includes('```')) {
        const htmlMatch = fullResponseText.match(/```\s*([\s\S]*?)\s*```/);
        if (htmlMatch && htmlMatch[1]) {
          optimizedHtml = htmlMatch[1].trim();
        }
      } else {
        optimizedHtml = fullResponseText.split('\n\n')[0].trim();
      }

      const summaryItems = parseSummaryFromResponse(fullResponseText);

      setOptimizedCode(optimizedHtml);
      setOptimizationSummary(summaryItems);
      setOptimizationComplete(true);
    } catch (error) {
      console.error("Optimization failed:", error);
      localOptimization();
    } finally {
      setIsOptimizing(false);
    }
  };

  const localOptimization = () => {
    let optimized = htmlCode;
    const summaryItems = [];

    const title = extractTitleContent(htmlCode);
    if (!title) {
      optimized = optimized.replace(/<head>([\s\S]*?)<\/head>/,
        `<head>$1<title>${focusKeyword} - Optimized Page</title></head>`);
      summaryItems.push("Title Tag: Added title with focus keyword at beginning");
    } else if (!title.toLowerCase().startsWith(focusKeyword.toLowerCase())) {
      optimized = optimized.replace(/<title>([\s\S]*?)<\/title>/,
        `<title>${focusKeyword} - $1</title>`);
      summaryItems.push("Title Tag: Improved title with focus keyword at beginning");
    }

    const desc = extractDescriptionContent(htmlCode);
    if (!desc) {
      optimized = optimized.replace(/<head>([\s\S]*?)<\/head>/,
        `<head>$1<meta name="description" content="Learn about ${focusKeyword}. This page provides comprehensive information about ${focusKeyword} with examples and practical tips."></head>`);
      summaryItems.push("Meta Description: Added description containing focus keyword");
    } else if (!desc.toLowerCase().includes(focusKeyword.toLowerCase())) {
      optimized = optimized.replace(/<meta name="description" content="([\s\S]*?)">/,
        `<meta name="description" content="$1 Learn more about ${focusKeyword}.">`);
      summaryItems.push("Meta Description: Updated to include focus keyword");
    }

    const firstP = extractFirstParagraph(optimized);
    if (firstP && !firstP.toLowerCase().includes(focusKeyword.toLowerCase())) {
      optimized = optimized.replace(/<p>([\s\S]*?)<\/p>/,
        `<p>${focusKeyword} is important. $1</p>`);
      summaryItems.push("Content: Added focus keyword to first paragraph");
    }

    setOptimizedCode(optimized);
    setOptimizationSummary(summaryItems);
    setOptimizationComplete(true);
  };

  const copyOptimizedCode = () => {
    navigator.clipboard.writeText(optimizedCode)
      .then(() => {
        alert("Optimized code copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy:", err);
        alert("Failed to copy code. Please try again.");
      });
  };

  const copySampleCode = (code, keyword) => {
    setHtmlCode(code);
    setFocusKeyword(keyword);
    setShowSampleCodeDialog(false);
  };

  const checkKeyword = () => {
    if (!focusKeyword.trim()) {
      setResult([{
        text: "Please enter a focus keyword.",
        status: "error"
      }]);
      return;
    }

    if (!htmlCode.trim()) {
      setResult([{
        text: "No HTML code found.",
        status: "error"
      }]);
      return;
    }

    const results = [];

    const titleContent = extractTitleContent(htmlCode);
    const descriptionContent = extractDescriptionContent(htmlCode);

    const titleStart = titleContent.substring(0, 30);
    if (titleStart.toLowerCase().includes(focusKeyword.toLowerCase())) {
      results.push({
        text: "Focus keyword matched at the beginning of the title",
        status: "success"
      });
    } else {
      results.push({
        text: "Focus keyword not found in the beginning of the title.",
        status: "error"
      });
    }

    const numberInTitle = /\d/.test(titleContent);
    if (numberInTitle) {
      results.push({
        text: "Number appears in the title",
        status: "success"
      });
    } else {
      results.push({
        text: "Number doesn't appear in the title.",
        status: "error"
      });
    }

    const titleLength = titleContent.length;
    if (titleLength < 15) {
      results.push({
        text: "Insufficient length of title",
        status: "error"
      });
    } else if (titleLength >= 15 && titleLength < 40) {
      results.push({
        text: "Sufficient length of title",
        status: "warning"
      });
    } else if (titleLength >= 40 && titleLength <= 60) {
      results.push({
        text: "Satisfied length of title",
        status: "success"
      });
    } else {
      results.push({
        text: "Length of title is more",
        status: "error"
      });
    }

    if (descriptionContent.toLowerCase().includes(focusKeyword.toLowerCase())) {
      results.push({
        text: "Focus keyword found in the description",
        status: "success"
      });
    } else {
      results.push({
        text: "Focus keyword not found in the description.",
        status: "error"
      });
    }

    const descLen = descriptionContent.length;
    if (descLen < 80) {
      results.push({
        text: "Insufficient length of description",
        status: "error"
      });
    } else if (descLen >= 80 && descLen < 105) {
      results.push({
        text: "Sufficient length of description",
        status: "warning"
      });
    } else if (descLen >= 105 && descLen <= 160) {
      results.push({
        text: "Satisfied length of description",
        status: "success"
      });
    } else {
      results.push({
        text: "Length of description is more",
        status: "error"
      });
    }

    const { wordCount, keywordDensity } = calculateKeywordDensity(htmlCode, focusKeyword);
    results.push({
      text: `Word Count: ${wordCount}`,
      status: "info"
    });

    results.push({
      text: `Keyword Density: ${keywordDensity.toFixed(2)}%`,
      status: "info"
    });

    if (keywordDensity >= 1 && keywordDensity <= 1.5) {
      results.push({
        text: "Keyword density within the recommended range",
        status: "success"
      });
    } else if (keywordDensity > 2.5) {
      results.push({
        text: "Keyword density exceeds 2.5%",
        status: "error"
      });
    } else {
      results.push({
        text: "Keyword density is outside the recommended range",
        status: "error"
      });
    }

    const imageCount = countTags(htmlCode, 'img');
    const embedVideoCount = countTags(htmlCode, 'iframe');
    const videoCount = countTags(htmlCode, 'video');

    if (imageCount === 0 && embedVideoCount === 0 && videoCount === 0) {
      results.push({
        text: "No images or videos found",
        status: "error"
      });
    } else if ((imageCount === 1 || embedVideoCount === 1 || videoCount === 1) && (imageCount + embedVideoCount + videoCount) < 4) {
      results.push({
        text: "Single image or video found",
        status: "warning"
      });
    } else if (imageCount + embedVideoCount + videoCount >= 4) {
      results.push({
        text: "4 or more images or videos found",
        status: "success"
      });
    }

    const internalLinkCount = countInternalLinks(htmlCode, domainUrl);

    if (internalLinkCount >= 4 && internalLinkCount <= 7) {
      results.push({
        text: "4 to 7 internal links found",
        status: "success"
      });
    } else if (internalLinkCount === 0) {
      results.push({
        text: "No internal links found",
        status: "error"
      });
    } else if (internalLinkCount === 1) {
      results.push({
        text: "Single internal link found",
        status: "warning"
      });
    }

    if (internalLinkCount > 0) {
      results.push({
        text: "You are linking to other resources on your website which is great.",
        status: "success"
      });
    } else {
      results.push({
        text: "We found 0 internal links in your content.",
        status: "error"
      });
    }

    const externalLinks = findExternalLinks(htmlCode, domainUrl);
    if (externalLinks.length > 0) {
      results.push({
        text: "You are linking to other resources website, which is great.",
        status: "success"
      });
    } else {
      results.push({
        text: "We found 0 external links in your content.",
        status: "error"
      });
    }

    const subheadingTags = ['h2', 'h3', 'h4', 'h5', 'h6'];
    const keywordFoundInSubheadings = subheadingTags.some(tag => {
      const tagMatches = htmlCode.match(new RegExp('<' + tag + '.*?>(.*?)</' + tag + '>', 'gi'));
      return tagMatches && tagMatches.some(match => match.toLowerCase().includes(focusKeyword.toLowerCase()));
    });

    if (keywordFoundInSubheadings) {
      results.push({
        text: "Focus Keyword found in subheading(s) like H2, H3, H4, etc.",
        status: "success"
      });
    } else {
      results.push({
        text: "Focus Keyword not found in subheading(s) like H2, H3, H4, etc.",
        status: "error"
      });
    }

    const imageAltMatches = htmlCode.match(/<img.*?alt=["'](.*?)["']/gi);
    const keywordFoundInImageAlt = imageAltMatches && imageAltMatches.some(match =>
      match.toLowerCase().includes(focusKeyword.toLowerCase())
    );

    if (keywordFoundInImageAlt) {
      results.push({
        text: "Focus Keyword found in image alt attribute(s)",
        status: "success"
      });
    } else {
      results.push({
        text: "Focus Keyword not found in image alt attribute(s)",
        status: "error"
      });
    }

    const paragraphMatches = htmlCode.match(/<p>.*?<\/p>/g);
    const longParagraphFound = paragraphMatches && paragraphMatches.some(paragraph => {
      const words = paragraph.split(/\s+/);
      return words.length > 120;
    });

    if (!longParagraphFound) {
      results.push({
        text: "You are using short paragraphs",
        status: "success"
      });
    } else {
      results.push({
        text: "At least one paragraph is long. Consider using short paragraphs.",
        status: "error"
      });
    }

    const firstParagraph = extractFirstParagraph(htmlCode);
    const totalContentLength = htmlCode.length;
    const tenPercentThreshold = totalContentLength * 0.1;

    if (firstParagraph.toLowerCase().includes(focusKeyword.toLowerCase()) && firstParagraph.length <= tenPercentThreshold) {
      results.push({
        text: "Focus Keyword appears in the first 10% of the content.",
        status: "success"
      });
    } else {
      results.push({
        text: "Focus Keyword does not appear in the first 10% of the content.",
        status: "error"
      });
    }

    setOptimizedCode('');
    setOptimizationSummary([]);
    setOptimizationComplete(false);

    setResult(results);
  };

  return (
    <>
      <div className="container">
        <h1>" METAFORGE "</h1>
        <h1>search engine optimization</h1>

        <KeywordInput
          focusKeyword={focusKeyword}
          setFocusKeyword={setFocusKeyword}
          domainUrl={domainUrl}
          setDomainUrl={setDomainUrl}
        />

        <HtmlCodeInput
          htmlCode={htmlCode}
          setHtmlCode={setHtmlCode}
        />

        <button onClick={checkKeyword}>check keyword</button>

        <ResultDisplay result={result} />

        <OptimizationSection
          result={result}
          isOptimizing={isOptimizing}
          optimizationComplete={optimizationComplete}
          optimizedCode={optimizedCode}
          optimizationSummary={optimizationSummary}
          optimizeHtmlCode={optimizeHtmlCode}
          copyOptimizedCode={copyOptimizedCode}
        />
      </div>

      <button 
        className="sample-code-button"
        onClick={() => setShowSampleCodeDialog(true)}
      >
        sample code snippet's
      </button>
      
      <SampleCodeDialog
        showSampleCodeDialog={showSampleCodeDialog}
        setShowSampleCodeDialog={setShowSampleCodeDialog}
        sampleCodes={sampleCodes}
        copySampleCode={copySampleCode}
      />
    </>
  );
};

export default App;