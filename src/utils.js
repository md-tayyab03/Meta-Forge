export const extractTitleContent = (html) => {
  const titleStartIndex = html.indexOf("<title>") + 7;
  const titleEndIndex = html.indexOf("</title>");
  return (titleStartIndex !== -1 && titleEndIndex !== -1) ?
    html.substring(titleStartIndex, titleEndIndex).trim() :
    "";
};

export const extractDescriptionContent = (html) => {
  const descStartIndex = html.indexOf('<meta name="description" content="') + 33;
  const descEndIndex = html.indexOf('">', descStartIndex);
  return (descStartIndex !== -1 && descEndIndex !== -1) ?
    html.substring(descStartIndex, descEndIndex).trim() :
    "";
};

export const extractFirstParagraph = (html) => {
  const paragraphStartIndex = html.indexOf("<p>") + 3;
  const paragraphEndIndex = html.indexOf("</p>");
  if (paragraphStartIndex !== -1 && paragraphEndIndex !== -1) {
    return html.substring(paragraphStartIndex, paragraphEndIndex).trim();
  }
  return "";
};

export const countTags = (html, tagName) => {
  const tagMatches = html.match(new RegExp('<' + tagName, 'gi'));
  return tagMatches ? tagMatches.length : 0;
};

export const countOccurrences = (array, word) => {
  return array.filter(item => item.toLowerCase() === word.toLowerCase()).length;
};

export const calculateKeywordDensity = (html, keyword) => {
  const paragraphMatches = html.match(/<p>.*?<\/p>/g);
  let wordCount = 0;
  let keywordCount = 0;

  if (paragraphMatches) {
    paragraphMatches.forEach(paragraph => {
      const words = paragraph.split(/\s+/);
      wordCount += words.length;
      keywordCount += countOccurrences(words, keyword);
    });
  }

  const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;
  return { wordCount, keywordDensity };
};

export const isInternalLink = (href, domainUrl) => {
  return href.startsWith('#') || href.startsWith('/') ||
    (domainUrl && href.includes(domainUrl));
};

export const countInternalLinks = (html, domainUrl) => {
  const linkMatches = html.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi);
  let internalLinkCount = 0;

  if (linkMatches && domainUrl) {
    linkMatches.forEach(link => {
      const href = link.match(/href=["'](.*?)["']/)[1];
      if (isInternalLink(href, domainUrl)) {
        internalLinkCount++;
      }
    });
  }

  return internalLinkCount;
};

export const findExternalLinks = (html, domainUrl) => {
  const linkMatches = html.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi);
  const externalLinks = [];

  if (linkMatches && domainUrl) {
    linkMatches.forEach(link => {
      const hrefMatch = link.match(/href=["'](.*?)["']/);
      if (hrefMatch) {
        const href = hrefMatch[1];
        if (href && href.startsWith('http') && !href.includes(domainUrl)) {
          externalLinks.push(href);
        }
      }
    });
  }

  return externalLinks;
};

export const parseSummaryFromResponse = (responseText) => {
  const parts = responseText.split(/```html|```/);

  if (parts.length > 2) {
    const summaryText = parts[2];
    const summaryLines = summaryText.split('\n')
      .filter(line => line.trim().startsWith('*') || line.trim().startsWith('-'))
      .map(line => line.trim().replace(/^\*\s*|-\s*/, ''))
      .filter(line => line.length > 0);

    return summaryLines;
  }

  const lines = responseText.split('\n');
  const summaryLines = lines
    .filter(line => line.trim().startsWith('*') || line.trim().startsWith('-'))
    .map(line => line.trim().replace(/^\*\s*|-\s*/, ''))
    .filter(line => line.length > 0);

  return summaryLines;
}; 