/**
 * Simple CSV Parser
 * Handles quoted fields and escaped quotes
 */

export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  
  if (lines.length < 1) {
    return { headers: [], rows: [] };
  }

  // Parse header
  const headers = parseCSVLine(lines[0]);

  // Parse rows
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    const values = parseCSVLine(lines[i]);
    const row = {};
    
    headers.forEach((header, idx) => {
      row[header] = values[idx] || null;
    });
    
    rows.push(row);
  }

  return { headers, rows };
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  // Last field
  result.push(current.trim());
  return result;
}
