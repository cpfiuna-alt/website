
// Function to parse markdown content with front matter in browser environment
export function parseMarkdown(content: string) {
  try {
    // Trim leading/trailing whitespace to handle files with empty lines at the start
    const trimmedContent = content.trim();
    
    // Simple frontmatter parser for browser environment
    // Updated regex to handle both Unix (\n) and Windows (\r\n) line endings
    const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)/;
    const match = trimmedContent.match(frontMatterRegex);
    
    if (!match) {
      return { frontMatter: {}, content: trimmedContent };
    }
    
    const [, frontMatterStr, markdownContent] = match;
    
    // Parse the front matter
    const frontMatter: Record<string, unknown> = {};
    const lines = frontMatterStr.split('\n');
    
    // Track multiline array/object parsing
    let currentKey: string | null = null;
    let multilineValue: string[] = [];
    let isInMultiline = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      // Handle multiline parsing for arrays and objects
      if (isInMultiline) {
        multilineValue.push(line);
        
        // Check if this line ends the multiline value
        if (line === ']' || line === '}') {
          isInMultiline = false;
          if (currentKey) {
            try {
              // Join the multiline value and parse it as JSON
              // Fix: Properly sanitize JSON strings before parsing
              const jsonStr = multilineValue.join('')
                .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
                .replace(/'/g, '"');
              
              try {
                frontMatter[currentKey] = JSON.parse(jsonStr);
              } catch (e) {
                console.warn(`Could not parse JSON for key ${currentKey}, using raw value`, e);
                frontMatter[currentKey] = multilineValue.join('\n');
              }
            } catch (e) {
              console.error('Error parsing multiline JSON:', e);
              frontMatter[currentKey] = multilineValue.join('\n');
            }
            multilineValue = [];
            currentKey = null;
          }
        }
        continue;
      }
      
      // Check if this is the start of a new key-value pair
      if (!isInMultiline && line.includes(':')) {
        const colonIndex = line.indexOf(':');
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        
        // Check if this is the start of a YAML-style array (key: followed by no value)
        if (value === '' || value === null) {
          // Look ahead to see if the next lines are array items
          const yamlArrayItems = [];
          let nextLineIndex = i + 1;
          
          // Collect YAML array items (lines starting with -)
          while (nextLineIndex < lines.length) {
            const nextLine = lines[nextLineIndex].trim();
            if (nextLine.startsWith('- ')) {
              // Extract the value after the dash
              const itemValue = nextLine.slice(2).trim();
              // Remove quotes if present
              const cleanValue = itemValue.replace(/^["'](.*)["']$/, '$1');
              yamlArrayItems.push(cleanValue);
              nextLineIndex++;
            } else if (nextLine === '' || nextLine.startsWith('#')) {
              // Skip empty lines and comments
              nextLineIndex++;
            } else {
              // End of array
              break;
            }
          }
          
          if (yamlArrayItems.length > 0) {
            frontMatter[key] = yamlArrayItems;
            // Skip the lines we've already processed
            i = nextLineIndex - 1;
            continue;
          }
        }
        
        // Check if this is the start of a multiline array or object
        if ((value === '[' || value === '{' || value.endsWith('[') || value.endsWith('{'))) {
          isInMultiline = true;
          currentKey = key;
          multilineValue = [value];
          continue;
        }
        
        // Handle regular single-line values
        if (value === 'true') {
          frontMatter[key] = true;
        } else if (value === 'false') {
          frontMatter[key] = false;
        } else if (!isNaN(Number(value)) && value !== '') {
          frontMatter[key] = Number(value);
        } else if (value.startsWith('[') && value.endsWith(']')) {
          // Parse inline arrays. Prefer JSON.parse for valid JSON arrays,
          // but fall back to a robust splitter that respects quoted items
          // (so commas inside quoted strings don't split the item).
          const arrayStr = value.slice(1, -1).trim();
          if (!arrayStr) {
            frontMatter[key] = [];
          } else {
            let parsedArray: unknown[] | null = null;
            try {
              parsedArray = JSON.parse(value);
            } catch (e) {
              // Try a relaxed JSON conversion replacing single quotes with double
              // then attempt parse; if it still fails, we'll fallback below.
              try {
                const relaxed = value.replace(/'/g, '"');
                parsedArray = JSON.parse(relaxed);
              } catch (e2) {
                parsedArray = null;
              }
            }

            if (Array.isArray(parsedArray)) {
              frontMatter[key] = parsedArray;
            } else {
              // Fallback: split by commas but respect quoted strings
              const items: string[] = [];
              const itemRegex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^,]+)/g;
              let m: RegExpExecArray | null;
              while ((m = itemRegex.exec(arrayStr)) !== null) {
                let token = m[0].trim();
                // Remove surrounding quotes if present
                if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
                  token = token.slice(1, -1);
                }
                items.push(token);
              }
              frontMatter[key] = items.filter(Boolean);
            }
          }
        } else if (value.startsWith('"') && value.endsWith('"')) {
          // Remove quotes from quoted strings
          frontMatter[key] = value.slice(1, -1);
        } else {
          frontMatter[key] = value;
        }
      }
    }
    
    return {
      frontMatter,
      content: markdownContent || ''
    };
  } catch (error) {
    console.error('Error parsing markdown content:', error);
    return {
      frontMatter: {},
      content: ''
    };
  }
}
