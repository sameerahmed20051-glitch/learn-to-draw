const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  LevelFormat
} = require('docx');
const fs = require('fs');
const path = require('path');

const b = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: b, bottom: b, left: b, right: b };
const hb = { style: BorderStyle.SINGLE, size: 1, color: "1E3A5F" };
const hborders = { top: hb, bottom: hb, left: hb, right: hb };

function gap(before = 100, after = 100) {
  return new Paragraph({ spacing: { before, after }, children: [] });
}
function divider() {
  return new Paragraph({
    spacing: { before: 180, after: 180 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0", space: 1 } },
    children: []
  });
}
function cell(text, fill, color, bold, width, center) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill, type: ShadingType.CLEAR },
    margins: { top: 90, bottom: 90, left: 130, right: 130 },
    children: [new Paragraph({
      alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: [new TextRun({ text, font: "Arial", size: 20, bold: bold || false, color: color || "333333" })]
    })]
  });
}
function hcell(text, width) {
  return new TableCell({
    borders: hborders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: "1E3A5F", type: ShadingType.CLEAR },
    margins: { top: 100, bottom: 100, left: 130, right: 130 },
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: "FFFFFF" })]
    })]
  });
}

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
    }]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: "1E3A5F" },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial", color: "2E6DA4" },
        paragraph: { spacing: { before: 200, after: 80 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1260, right: 1260, bottom: 1260, left: 1260 }
      }
    },
    children: [

      // ── TITLE BLOCK ──
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 60 },
        children: [new TextRun({ text: "AI Cost Analysis", bold: true, size: 52, font: "Arial", color: "1E3A5F" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 40 },
        children: [new TextRun({ text: "Activity Generation — Grade 1 to 4 Full Curriculum", size: 26, font: "Arial", color: "4B5563" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 260 },
        children: [new TextRun({ text: "NEXTGEN SCHOOLING", bold: true, size: 18, font: "Arial", color: "9CA3AF" })]
      }),

      divider(),

      // ── SECTION 1: SCOPE ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "1.  Curriculum Scope", bold: true, size: 30, font: "Arial", color: "1E3A5F" })]
      }),
      gap(60, 100),

      new Table({
        width: { size: 9720, type: WidthType.DXA },
        columnWidths: [3240, 2160, 4320],
        rows: [
          new TableRow({ children: [hcell("Component", 3240), hcell("Value", 2160), hcell("Cumulative Total", 4320)] }),
          new TableRow({ children: [cell("Grades", "F8FAFC", "333333", false, 3240), cell("4  (Grade 1, 2, 3, 4)", "F8FAFC", "1E3A5F", true, 2160, true), cell("4 grades", "F8FAFC", "333333", false, 4320)] }),
          new TableRow({ children: [cell("Subjects per Grade", "FFFFFF", "333333", false, 3240), cell("5", "FFFFFF", "1E3A5F", true, 2160, true), cell("4 × 5 = 20 subjects", "FFFFFF", "333333", false, 4320)] }),
          new TableRow({ children: [cell("Terms per Subject", "F8FAFC", "333333", false, 3240), cell("4", "F8FAFC", "1E3A5F", true, 2160, true), cell("20 × 4 = 80 subject-terms", "F8FAFC", "333333", false, 4320)] }),
          new TableRow({ children: [cell("Weeks per Term", "FFFFFF", "333333", false, 3240), cell("10", "FFFFFF", "1E3A5F", true, 2160, true), cell("80 × 10 = 800 weeks", "FFFFFF", "333333", false, 4320)] }),
          new TableRow({ children: [cell("Days per Week", "F8FAFC", "333333", false, 3240), cell("2", "F8FAFC", "1E3A5F", true, 2160, true), cell("800 × 2 = 1,600 days", "F8FAFC", "333333", false, 4320)] }),
          new TableRow({ children: [cell("Activities per Day", "FFFFFF", "333333", false, 3240), cell("2", "FFFFFF", "1E3A5F", true, 2160, true), cell("1,600 × 2 = 3,200 activities", "FFFFFF", "333333", false, 4320)] }),
          new TableRow({ children: [
            new TableCell({ borders: hborders, width: { size: 3240, type: WidthType.DXA }, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, margins: { top: 110, bottom: 110, left: 130, right: 130 },
              children: [new Paragraph({ children: [new TextRun({ text: "TOTAL ACTIVITIES", bold: true, font: "Arial", size: 22, color: "FFFFFF" })] })] }),
            new TableCell({ borders: hborders, width: { size: 2160, type: WidthType.DXA }, shading: { fill: "2E6DA4", type: ShadingType.CLEAR }, margins: { top: 110, bottom: 110, left: 130, right: 130 },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "3,200", bold: true, font: "Arial", size: 26, color: "FFFFFF" })] })] }),
            new TableCell({ borders: hborders, width: { size: 4320, type: WidthType.DXA }, shading: { fill: "1E3A5F", type: ShadingType.CLEAR }, margins: { top: 110, bottom: 110, left: 130, right: 130 },
              children: [new Paragraph({ children: [new TextRun({ text: "4 × 5 × 4 × 10 × 2 × 2 = 3,200 files", bold: true, font: "Arial", size: 20, color: "FFFFFF" })] })] }),
          ]}),
        ]
      }),

      gap(160, 60),
      divider(),

      // ── SECTION 2: TOKEN ESTIMATE ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "2.  Token Estimate per Activity", bold: true, size: 30, font: "Arial", color: "1E3A5F" })]
      }),
      gap(60, 100),

      new Table({
        width: { size: 9720, type: WidthType.DXA },
        columnWidths: [3240, 2160, 4320],
        rows: [
          new TableRow({ children: [hcell("Token Type", 3240), hcell("Tokens", 2160), hcell("Description", 4320)] }),
          new TableRow({ children: [cell("Input (reading text)", "F8FAFC", "333333", false, 3240), cell("~500", "F8FAFC", "2E6DA4", true, 2160, true), cell("Reading passage fed to model", "F8FAFC", "333333", false, 4320)] }),
          new TableRow({ children: [cell("Output (activity generated)", "FFFFFF", "333333", false, 3240), cell("~800", "FFFFFF", "2E6DA4", true, 2160, true), cell("Questions, tasks, interactions", "FFFFFF", "333333", false, 4320)] }),
          new TableRow({ children: [cell("Total per activity", "EBF5FF", "333333", true, 3240), cell("~1,300", "EBF5FF", "1E3A5F", true, 2160, true), cell("3,200 × 1,300 = ~4.16M tokens total", "EBF5FF", "1E3A5F", true, 4320)] }),
        ]
      }),

      gap(160, 60),
      divider(),

      // ── SECTION 3: COST TABLE ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "3.  Cost & Quality — All Models", bold: true, size: 30, font: "Arial", color: "1E3A5F" })]
      }),
      gap(60, 100),

      new Table({
        width: { size: 9720, type: WidthType.DXA },
        columnWidths: [2200, 1400, 1320, 1320, 1320, 2160],
        rows: [
          new TableRow({ children: [
            hcell("Model", 2200), hcell("Total Cost", 1400),
            hcell("Accuracy", 1320), hcell("Quality", 1320),
            hcell("Kid-Friendly", 1320), hcell("Verdict", 2160)
          ]}),
          // Gemini 1.5 Flash
          new TableRow({ children: [
            cell("Gemini 1.5 Flash", "F8FAFC", "333333", false, 2200),
            cell("~$0.50", "F8FAFC", "1A6B3C", true, 1400, true),
            cell("⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("Budget option", "F8FAFC", "6B7280", false, 2160),
          ]}),
          // Gemini 2.0 Flash
          new TableRow({ children: [
            cell("Gemini 2.0 Flash", "FFFFFF", "333333", false, 2200),
            cell("~$0.70", "FFFFFF", "1A6B3C", true, 1400, true),
            cell("⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("Best value", "FFFFFF", "2E6DA4", true, 2160),
          ]}),
          // GPT-4o Mini
          new TableRow({ children: [
            cell("GPT-4o Mini", "F8FAFC", "333333", false, 2200),
            cell("~$1.20", "F8FAFC", "B8860B", true, 1400, true),
            cell("⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("Strong budget", "F8FAFC", "6B7280", false, 2160),
          ]}),
          // Claude Haiku
          new TableRow({ children: [
            cell("Claude Haiku 3.5", "FFFFFF", "333333", false, 2200),
            cell("~$3.50", "FFFFFF", "B8860B", true, 1400, true),
            cell("⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("Reliable", "FFFFFF", "6B7280", false, 2160),
          ]}),
          // Gemini 1.5 Pro
          new TableRow({ children: [
            cell("Gemini 1.5 Pro", "F8FAFC", "333333", false, 2200),
            cell("~$8.00", "F8FAFC", "B8860B", true, 1400, true),
            cell("⭐⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("Quality jump", "F8FAFC", "6B7280", false, 2160),
          ]}),
          // GPT-4o  ← RECOMMENDED
          new TableRow({ children: [
            cell("GPT-4o  ⭐", "FFF9E6", "333333", true, 2200),
            cell("~$12.00", "FFF9E6", "B8860B", true, 1400, true),
            cell("⭐⭐⭐⭐⭐", "FFF9E6", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "FFF9E6", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "FFF9E6", "333333", false, 1320, true),
            cell("RECOMMENDED", "FFF9E6", "B8860B", true, 2160),
          ]}),
          // Claude Sonnet ← RECOMMENDED
          new TableRow({ children: [
            cell("Claude Sonnet 3.5  ⭐", "EDFAF3", "333333", true, 2200),
            cell("~$15.00", "EDFAF3", "1A6B3C", true, 1400, true),
            cell("⭐⭐⭐⭐⭐", "EDFAF3", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "EDFAF3", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "EDFAF3", "333333", false, 1320, true),
            cell("RECOMMENDED", "EDFAF3", "1A6B3C", true, 2160),
          ]}),
          // GPT-4 Turbo
          new TableRow({ children: [
            cell("GPT-4 Turbo", "F8FAFC", "333333", false, 2200),
            cell("~$42.00", "F8FAFC", "CC2200", true, 1400, true),
            cell("⭐⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "F8FAFC", "333333", false, 1320, true),
            cell("Overkill", "F8FAFC", "6B7280", false, 2160),
          ]}),
          // Claude Opus
          new TableRow({ children: [
            cell("Claude Opus", "FFFFFF", "333333", false, 2200),
            cell("~$75.00", "FFFFFF", "CC2200", true, 1400, true),
            cell("⭐⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("⭐⭐⭐⭐⭐", "FFFFFF", "333333", false, 1320, true),
            cell("Overkill", "FFFFFF", "6B7280", false, 2160),
          ]}),
        ]
      }),

      gap(160, 60),
      divider(),

      // ── SECTION 4: SWEET SPOT ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "4.  Sweet Spot Summary", bold: true, size: 30, font: "Arial", color: "1E3A5F" })]
      }),
      gap(60, 100),

      new Table({
        width: { size: 9720, type: WidthType.DXA },
        columnWidths: [2400, 1600, 5720],
        rows: [
          new TableRow({ children: [hcell("Model", 2400), hcell("Cost", 1600), hcell("Best For", 5720)] }),
          new TableRow({ children: [
            cell("Gemini 2.0 Flash", "F8FAFC", "333333", false, 2400),
            cell("~$0.70", "F8FAFC", "1A6B3C", true, 1600, true),
            cell("Testing & prototyping — check quality pehle", "F8FAFC", "333333", false, 5720),
          ]}),
          new TableRow({ children: [
            cell("GPT-4o  ⭐", "FFF9E6", "333333", true, 2400),
            cell("~$12.00", "FFF9E6", "B8860B", true, 1600, true),
            cell("Best quality/cost balance for full generation", "FFF9E6", "B8860B", true, 5720),
          ]}),
          new TableRow({ children: [
            cell("Claude Sonnet 3.5  ⭐", "EDFAF3", "333333", true, 2400),
            cell("~$15.00", "EDFAF3", "1A6B3C", true, 1600, true),
            cell("Best for educational + kid-friendly content specifically", "EDFAF3", "1A6B3C", true, 5720),
          ]}),
        ]
      }),

      gap(160, 60),
      divider(),

      // ── SECTION 5: FINAL RECOMMENDATION ──
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun({ text: "5.  Final Recommendation", bold: true, size: 30, font: "Arial", color: "1E3A5F" })]
      }),
      gap(60, 80),

      new Paragraph({
        spacing: { before: 80, after: 80 },
        shading: { fill: "EBF5FF", type: ShadingType.CLEAR },
        border: { left: { style: BorderStyle.SINGLE, size: 14, color: "2E6DA4", space: 10 } },
        indent: { left: 200, right: 200 },
        children: [
          new TextRun({ text: "Step 1: ", bold: true, font: "Arial", size: 22, color: "1E3A5F" }),
          new TextRun({ text: "Gemini 2.0 Flash se 50–100 activities generate karo (~$0.01). Quality check karo.", font: "Arial", size: 22, color: "333333" }),
        ]
      }),
      gap(40, 40),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        shading: { fill: "EDFAF3", type: ShadingType.CLEAR },
        border: { left: { style: BorderStyle.SINGLE, size: 14, color: "1A6B3C", space: 10 } },
        indent: { left: 200, right: 200 },
        children: [
          new TextRun({ text: "Step 2: ", bold: true, font: "Arial", size: 22, color: "1A6B3C" }),
          new TextRun({ text: "Agar quality theek lage → Gemini se sab generate karo ($0.70). Done.", font: "Arial", size: 22, color: "333333" }),
        ]
      }),
      gap(40, 40),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        shading: { fill: "FFF9E6", type: ShadingType.CLEAR },
        border: { left: { style: BorderStyle.SINGLE, size: 14, color: "B8860B", space: 10 } },
        indent: { left: 200, right: 200 },
        children: [
          new TextRun({ text: "Step 3: ", bold: true, font: "Arial", size: 22, color: "B8860B" }),
          new TextRun({ text: "Agar aur better quality chahiye → Claude Sonnet ya GPT-4o use karo ($12–15). One-time cost.", font: "Arial", size: 22, color: "333333" }),
        ]
      }),

      gap(200, 60),

      // FOOTER
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 0 },
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E2E8F0", space: 8 } },
        children: [new TextRun({ text: "NEXTGEN SCHOOLING  —  AI Cost Analysis  —  Grade 1–4 Full Curriculum  —  3,200 Activities", size: 17, font: "Arial", color: "9CA3AF" })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outputPath = path.join(process.cwd(), "AI_Cost_Analysis_Final.docx");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Done! File saved to: ${outputPath}`);
});
