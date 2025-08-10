export const extractTextFromContent = (content, maxLength = 100) => {
  if (!content || !content.content) return '';

  const text = content.content
    .map(block => {
      if (block.type === 'paragraph' && block.content) {
        return block.content.map(c => c.text || '').join('');
      }
      return '';
    })
    .join(' ')
    .trim();

  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};