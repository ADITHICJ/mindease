export function splitBySize(text: string, maxSize = 1200) {
  const parts: string[] = [];
  for (let i = 0; i < text.length; i += maxSize) {
    parts.push(text.slice(i, i + maxSize));
  }
  return parts;
}
