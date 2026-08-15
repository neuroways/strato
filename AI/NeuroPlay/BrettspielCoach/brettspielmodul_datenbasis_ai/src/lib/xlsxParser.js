const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

class XLSXParser {
  constructor(filePath) {
    this.filePath = filePath;
    this.buffer = fs.readFileSync(filePath);
    this.files = this._parseZip();
  }

  _parseZip() {
    let endOfCD = -1;
    for (let i = this.buffer.length - 22; i >= this.buffer.length - 65557; i--) {
      if (this.buffer[i] === 0x50 && this.buffer[i+1] === 0x4B && 
          this.buffer[i+2] === 0x05 && this.buffer[i+3] === 0x06) {
        endOfCD = i;
        break;
      }
    }

    if (endOfCD === -1) throw new Error('Invalid ZIP file');

    const cdOffset = this.buffer.readUInt32LE(endOfCD + 16);
    let cdPos = cdOffset;
    const files = {};

    while (cdPos < endOfCD) {
      if (this.buffer[cdPos] !== 0x50 || this.buffer[cdPos+1] !== 0x4B || 
          this.buffer[cdPos+2] !== 0x01 || this.buffer[cdPos+3] !== 0x02) break;

      const filenameLen = this.buffer.readUInt16LE(cdPos + 28);
      const filename = this.buffer.toString('utf8', cdPos + 46, cdPos + 46 + filenameLen);
      const localOffset = this.buffer.readUInt32LE(cdPos + 42);
      const compSize = this.buffer.readUInt32LE(cdPos + 20);

      files[filename] = { localOffset, compSize };

      const extraLen = this.buffer.readUInt16LE(cdPos + 30);
      const commentLen = this.buffer.readUInt16LE(cdPos + 32);
      cdPos += 46 + filenameLen + extraLen + commentLen;
    }

    return files;
  }

  _extractFile(filename) {
    const info = this.files[filename];
    if (!info) return null;

    let pos = info.localOffset;
    const filenameLen = this.buffer.readUInt16LE(pos + 26);
    const extraLen = this.buffer.readUInt16LE(pos + 28);
    const dataStart = pos + 30 + filenameLen + extraLen;
    const compMethod = this.buffer.readUInt16LE(pos + 8);

    const data = this.buffer.slice(dataStart, dataStart + info.compSize);

    if (compMethod === 0) return data.toString('utf8');
    if (compMethod === 8) {
      try {
        return zlib.inflateSync(data).toString('utf8');
      } catch (e1) {
        try {
          return zlib.inflateRawSync(data).toString('utf8');
        } catch (e2) {
          return null;
        }
      }
    }
    return null;
  }

  getSheets() {
    const wb = this._extractFile('xl/workbook.xml');
    if (!wb) return [];

    const sheets = [];
    const matches = wb.match(/<x:sheet[^>]*>/g) || [];

    matches.forEach((m, i) => {
      const name = m.match(/name="([^"]+)"/)?.[1] || '';
      const sheetId = m.match(/sheetId="([^"]+)"/)?.[1] || '';
      const rid = m.match(/r:id="([^"]+)"/)?.[1] || '';
      
      if (name) {
        sheets.push({ idx: i + 1, name, sheetId, rid });
      }
    });

    return sheets;
  }

  getSharedStrings() {
    const xml = this._extractFile('xl/sharedStrings.xml');
    if (!xml) return [];

    const strings = [];
    const matches = xml.match(/<si>[\s\S]*?<\/si>/g) || [];

    matches.forEach(si => {
      let text = '';
      const tMatches = si.match(/<t[^>]*>([^<]*)<\/t>/g) || [];
      tMatches.forEach(t => {
        const contentMatch = t.match(/<t[^>]*>([^<]*)<\/t>/);
        const content = contentMatch ? contentMatch[1] : '';
        text += content;
      });
      strings.push(text);
    });

    return strings;
  }

  getWorkbookRels() {
    const xml = this._extractFile('xl/_rels/workbook.xml.rels');
    if (!xml) return {};

    const rels = {};
    const matches = xml.match(/<Relationship[^>]*>/g) || [];

    matches.forEach(m => {
      const id = m.match(/Id="([^"]+)"/)?.[1];
      const target = m.match(/Target="([^"]+)"/)?.[1];
      if (id && target) rels[id] = target;
    });

    return rels;
  }

  parseSheet(sheetName) {
    const sheets = this.getSheets();
    const sheet = sheets.find(s => s.name === sheetName);
    if (!sheet) return { headers: [], rows: [] };

    const rels = this.getWorkbookRels();
    const sheetPath = rels[sheet.rid];
    if (!sheetPath) return { headers: [], rows: [] };

    const sheetXml = this._extractFile(`xl/${sheetPath}`);
    if (!sheetXml) return { headers: [], rows: [] };

    const strings = this.getSharedStrings();

    // Parse Dimension
    const dimMatch = sheetXml.match(/dimension ref="([^"]+)"/);
    const ref = dimMatch ? dimMatch[1] : '';

    // Parse Rows
    const rows = [];
    const rowMatches = sheetXml.match(/<row[\s\S]*?<\/row>/g) || [];

    rowMatches.forEach(rowXml => {
      const cells = [];
      const cellMatches = rowXml.match(/<c[^>]*>[\s\S]*?<\/c>/g) || [];

      cellMatches.forEach(cellXml => {
        const ref = cellXml.match(/r="([^"]+)"/)?.[1] || '';
        const t = cellXml.match(/t="([^"]+)"/)?.[1] || '';
        
        let value = '';
        const vMatch = cellXml.match(/<v>([^<]*)<\/v>/);
        if (vMatch) {
          value = vMatch[1];
          if (t === 's') {
            value = strings[parseInt(value)] || '';
          }
        }

        cells.push({ ref, type: t, value });
      });

      rows.push(cells);
    });

    // Group cells by row and extract headers + data
    const grouped = {};
    rows.forEach(cells => {
      cells.forEach(cell => {
        if (!cell.ref) return;
        const rowMatch = cell.ref.match(/(\d+)$/);
        if (!rowMatch) return;
        const rowNum = parseInt(rowMatch[1]);
        const colMatch = cell.ref.match(/^([A-Z]+)/);
        const colLetter = colMatch ? colMatch[1] : '';
        
        if (!grouped[rowNum]) grouped[rowNum] = {};
        grouped[rowNum][colLetter] = cell.value;
      });
    });

    const sortedRows = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b));

    let headers = [];
    let dataRows = [];

    if (sortedRows.length > 0) {
      headers = Object.values(grouped[sortedRows[0]]);
      dataRows = sortedRows.slice(1).map(rowNum => 
        Object.values(grouped[rowNum])
      );
    }

    return { headers, rows: dataRows, ref };
  }
}

module.exports = XLSXParser;
