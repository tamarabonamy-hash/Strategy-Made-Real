// useWordExport.js — Strategy Made Real Brand-Aligned Word Export
// Brand: Forest Green #2C4A3E | Amber Gold #D4A847 | Cream #F7F4EF | Sage #6B8F71
// Typography: Cambria headings | Georgia body | Cambria bold 28-36pt headings

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, ShadingType, Footer
} from "docx";
import { saveAs } from "file-saver";

const FOREST = "2C4A3E", GOLD = "D4A847", CREAM = "F7F4EF", SAGE = "6B8F71", MID = "5A6B5E", WHITE = "FFFFFF", DARK = "1A2E28";

function smrFooter() {
  return new Footer({ children: [new Paragraph({ children: [new TextRun({ text: "Strategy Made Real  ·  Beyond theory. Into delivery. Powered by people.", font: "Cambria", size: 16, color: SAGE, italics: true })], border: { top: { style: BorderStyle.SINGLE, size: 1, color: GOLD } }, spacing: { before: 100 } })] });
}
function brandBlock() {
  return new Paragraph({ children: [new TextRun({ text: "STRATEGY ", font: "Cambria", bold: true, size: 24, color: WHITE, characterSpacing: 80 }), new TextRun({ text: "Made Real", font: "Cambria", italics: true, size: 24, color: GOLD })], shading: { type: ShadingType.SOLID, color: FOREST }, spacing: { before: 0, after: 0 }, indent: { left: 360, right: 360 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD } } });
}
function docSub(text) {
  return new Paragraph({ children: [new TextRun({ text, font: "Cambria", size: 20, color: GOLD, italics: true })], shading: { type: ShadingType.SOLID, color: FOREST }, spacing: { before: 0, after: 200 }, indent: { left: 360 } });
}
function h1(text) {
  return new Paragraph({ children: [new TextRun({ text: text.toUpperCase(), font: "Cambria", bold: true, size: 32, color: WHITE, characterSpacing: 40 })], shading: { type: ShadingType.SOLID, color: FOREST }, spacing: { before: 400, after: 0 }, indent: { left: 360, right: 360 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD } } });
}
function h2(text) {
  return new Paragraph({ children: [new TextRun({ text: text.toUpperCase(), font: "Cambria", bold: true, size: 22, color: FOREST, characterSpacing: 30 })], spacing: { before: 320, after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: GOLD } } });
}
function h3(text) {
  return new Paragraph({ children: [new TextRun({ text, font: "Cambria", bold: true, size: 20, color: FOREST })], spacing: { before: 240, after: 80 } });
}
function body(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text: text || "—", font: "Georgia", size: 22, color: opts.color || DARK, italics: opts.italic || false })], spacing: { after: 120 }, indent: opts.indent ? { left: 360 } : {} });
}
function bullet(text) {
  return new Paragraph({ children: [new TextRun({ text: "\u2014  ", font: "Cambria", size: 20, color: GOLD, bold: true }), new TextRun({ text, font: "Georgia", size: 20, color: DARK })], spacing: { after: 80 }, indent: { left: 360 } });
}
function lv(label, value) {
  return new Paragraph({ children: [new TextRun({ text: label + ":  ", font: "Cambria", bold: true, size: 20, color: FOREST }), new TextRun({ text: value || "\u2014", font: "Georgia", size: 20, color: DARK })], spacing: { after: 100 } });
}
function divider() {
  return new Paragraph({ text: "", border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "C8D4C0" } }, spacing: { before: 200, after: 200 } });
}
function sp() { return new Paragraph({ text: "", spacing: { after: 120 } }); }
function goldPill(text) {
  return new Paragraph({ children: [new TextRun({ text: "  " + text.toUpperCase() + "  ", font: "Cambria", bold: true, size: 16, color: FOREST, characterSpacing: 30 })], shading: { type: ShadingType.SOLID, color: GOLD }, spacing: { before: 160, after: 80 } });
}
function greenPill(text) {
  return new Paragraph({ children: [new TextRun({ text: "  " + text.toUpperCase() + "  ", font: "Cambria", bold: true, size: 16, color: WHITE, characterSpacing: 20 })], shading: { type: ShadingType.SOLID, color: MID }, spacing: { before: 160, after: 80 } });
}
function forestPill(text) {
  return new Paragraph({ children: [new TextRun({ text: "  " + text.toUpperCase() + "  ", font: "Cambria", bold: true, size: 16, color: WHITE, characterSpacing: 20 })], shading: { type: ShadingType.SOLID, color: FOREST }, spacing: { before: 160, after: 80 } });
}
function tHead(cells) {
  return new TableRow({ tableHeader: true, children: cells.map(t => new TableCell({ shading: { type: ShadingType.SOLID, color: FOREST }, margins: { top: 100, bottom: 100, left: 150, right: 150 }, children: [new Paragraph({ children: [new TextRun({ text: t, font: "Cambria", bold: true, size: 18, color: WHITE, characterSpacing: 20 })] })] })) });
}
function tRow(cells, even = false) {
  return new TableRow({ children: cells.map((c, i) => new TableCell({ shading: { type: ShadingType.SOLID, color: even ? "EDF2EE" : WHITE }, margins: { top: 80, bottom: 80, left: 150, right: 150 }, children: [new Paragraph({ children: [new TextRun({ text: String(c || "\u2014"), font: i === 0 ? "Cambria" : "Georgia", bold: i === 0, size: 18, color: i === 0 ? FOREST : DARK })] })] })) });
}
function mkTable(headers, rows) {
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: { top: { style: BorderStyle.SINGLE, size: 2, color: FOREST }, bottom: { style: BorderStyle.SINGLE, size: 2, color: FOREST }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.SINGLE, size: 1, color: "C8D4C0" }, insideV: { style: BorderStyle.NONE } }, rows: [tHead(headers), ...rows.map((r, i) => tRow(r, i % 2 === 0))] });
}
function smrCredit() {
  return new Paragraph({ children: [new TextRun({ text: "Strategy Made Real  \u00b7  Beyond theory. Into delivery. Powered by people.", font: "Cambria", size: 16, color: SAGE, italics: true })], alignment: AlignmentType.CENTER });
}
const PAGE = { properties: { page: { margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 } } } };

// ─── TOOL 4: ROLE SUCCESS PROFILE ─────────────────────────────────────────────
export async function exportRoleAnalyser({ form, result }) {
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("Role Success Profile"), sp(),
    new Paragraph({ children: [new TextRun({ text: form.role, font: "Cambria", bold: true, size: 52, color: FOREST })], spacing: { before: 200, after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: form.org, font: "Cambria", italics: true, size: 28, color: GOLD })], spacing: { after: 200 } }),
    ...[form.level && lv("Level / Seniority", form.level), form.reports && lv("Direct Reports", form.reports)].filter(Boolean),
    divider(),
    h1("01  Role Context"), sp(),
    mkTable(["Field", "Detail"], [["Role Title", result.roleContext?.title || form.role], ["Function / Business Unit", result.roleContext?.function || "\u2014"], ["Reports To", result.roleContext?.reportsTo || "\u2014"], ["Location", result.roleContext?.location || "\u2014"]]),
    sp(), h1("02  Purpose & Strategy Alignment"), sp(),
    h3("Organisation Purpose"), body(result.purposeAndStrategy?.organisationPurpose), sp(),
    h3("Strategic Contribution of This Role"), body(result.purposeAndStrategy?.roleContribution), sp(),
    h1("03  Success in This Business"), sp(),
    new Paragraph({ children: [new TextRun({ text: result.successInBusiness || "\u2014", font: "Georgia", size: 22, color: DARK })], shading: { type: ShadingType.SOLID, color: CREAM }, spacing: { after: 200 }, indent: { left: 360, right: 360 }, border: { left: { style: BorderStyle.SINGLE, size: 8, color: SAGE } } }),
    h1("04  Role Success Statement"), sp(),
    new Paragraph({ children: [new TextRun({ text: result.roleSuccessStatement || "\u2014", font: "Georgia", size: 22, color: DARK })], shading: { type: ShadingType.SOLID, color: CREAM }, spacing: { after: 200 }, indent: { left: 360, right: 360 }, border: { left: { style: BorderStyle.SINGLE, size: 12, color: GOLD } } }),
    h1("05  Core Accountability Pillars"), sp(),
    ...(result.accountabilityPillars || []).map((p, i) => new Paragraph({ children: [new TextRun({ text: String(i + 1).padStart(2, "0") + "  ", font: "Cambria", bold: true, size: 22, color: GOLD }), new TextRun({ text: p, font: "Cambria", bold: true, size: 22, color: FOREST })], spacing: { after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "C8D4C0" } } })),
    h1("06  Responsibilities by Pillar"),
    ...(result.responsibilitiesByPillar || []).flatMap(p => [sp(), goldPill(p.pillar), body(p.purpose || "", { italic: true, color: MID }), ...(p.responsibilities || []).map(r => bullet(r))]),
    sp(), h1("07  Key Competencies"), sp(),
    mkTable(["Competency", "What This Looks Like in Practice"], (result.keyCompetencies || []).map(c => [c.name || "\u2014", c.description || "\u2014"])),
    sp(), h1("08  What Success Looks Like"), sp(),
    ...(result.whatSuccessLooksLike || []).flatMap(item => [greenPill(item.areaOfFocus), body(item.purpose || "", { italic: true, color: MID }), ...(item.keyActivities || []).map(a => bullet(a)), sp()]),
    h1("09  Circle of Influence"), sp(),
    mkTable(["Key Internal Relationships", "Key External Relationships"], (() => { const int = result.circleOfInfluence?.internal || []; const ext = result.circleOfInfluence?.external || []; return Array.from({ length: Math.max(int.length, ext.length) }, (_, i) => [int[i] || "", ext[i] || ""]); })()),
    sp(), h1("10  Values & Behaviour Alignment"), sp(),
    ...(result.valuesAndBehaviours || []).flatMap(v => [h3(v.value), body(v.description || "\u2014", { indent: true })]),
    sp(), h1("11  Time-Based Success Metrics"), sp(),
    goldPill("Quarterly Priorities"),
    ...(result.timeBasedMetrics?.quarterly || []).map((q, i) => new Paragraph({ children: [new TextRun({ text: (i + 1) + ".  ", font: "Cambria", bold: true, size: 20, color: GOLD }), new TextRun({ text: q, font: "Georgia", size: 20, color: DARK })], spacing: { after: 80 }, indent: { left: 360 } })),
    sp(), greenPill("6-Month Goals"),
    ...(result.timeBasedMetrics?.sixMonth || []).map((g, i) => new Paragraph({ children: [new TextRun({ text: (i + 1) + ".  ", font: "Cambria", bold: true, size: 20, color: MID }), new TextRun({ text: g, font: "Georgia", size: 20, color: DARK })], spacing: { after: 80 }, indent: { left: 360 } })),
    sp(), forestPill("Annual Measures"),
    ...(result.timeBasedMetrics?.annual || []).map((a, i) => new Paragraph({ children: [new TextRun({ text: (i + 1) + ".  ", font: "Cambria", bold: true, size: 20, color: FOREST }), new TextRun({ text: a, font: "Georgia", size: 20, color: DARK })], spacing: { after: 80 }, indent: { left: 360 } })),
    divider(), h2("Acknowledgement"),
    body("This Success Profile describes what success looks like for this role. It is not intended to be an exhaustive list of duties."),
    sp(), body("I certify that I have read, understood, and accept the responsibilities outlined in this Success Profile."),
    sp(), sp(),
    mkTable(["", "Name", "Signature", "Date"], [["Employee", "", "", ""], [form.org + " Representative", "", "", ""]]),
    sp(), divider(), smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-Role-Success-Profile-" + form.role.replace(/\s+/g, "-") + ".docx");
}

// ─── TOOL 1 ────────────────────────────────────────────────────────────────────
export async function exportDiagnostic({ scores, dims, slabels, risks, cautions, strengths, roadmapActions, riskMsgs }) {
  const avg = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
  const ml = avg < 2 ? "Critical" : avg < 3 ? "Weak" : avg < 4 ? "Developing" : avg < 5 ? "Capable" : "Leading";
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("Strategy\u2013Execution Diagnostic"), sp(),
    new Paragraph({ children: [new TextRun({ text: "Overall Score: " + avg.toFixed(1) + " / 5.0 \u2014 " + ml, font: "Cambria", bold: true, size: 36, color: FOREST })], spacing: { before: 200, after: 80 } }),
    lv("Critical Gaps", String(risks.length)), lv("Caution Areas", String(cautions.length)), lv("Strengths", String(strengths.length)),
    divider(), h1("Dimension Scores"), sp(),
    mkTable(["Dimension", "Score", "Level", "Description"], dims.map(dim => [dim.label, String(scores[dim.id]), slabels[scores[dim.id]], dim.levels[scores[dim.id] - 1]?.desc || ""])),
    ...(risks.length > 0 ? [sp(), h1("Key Risk Areas"), sp(), ...risks.flatMap(dim => [goldPill(dim.label), body(riskMsgs[dim.id] || ""), sp()])] : []),
    h1("Improvement Roadmap"),
    ...[{ label: "Immediate \u2014 Address First", dims: risks }, { label: "Short-Term \u2014 Strengthen", dims: cautions }, { label: "Sustain \u2014 Protect Strengths", dims: strengths }].filter(t => t.dims.length > 0).flatMap(tier => [sp(), new Paragraph({ children: [new TextRun({ text: tier.label.toUpperCase(), font: "Cambria", bold: true, size: 20, color: FOREST, characterSpacing: 20 })], spacing: { before: 200, after: 80 } }), ...tier.dims.flatMap(dim => [h3(dim.label), ...(roadmapActions[dim.id] || []).map(a => bullet(a))])]),
    divider(), smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-Strategy-Diagnostic.docx");
}

// ─── TOOL 2 ────────────────────────────────────────────────────────────────────
export async function exportPrioritisation({ initiatives }) {
  const sorted = [...initiatives].sort((a, b) => b.weightedScore - a.weightedScore);
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("Initiative Prioritisation Report"), sp(),
    lv("Total Initiatives", String(initiatives.length)), lv("Do Now", String(sorted.filter(i => i.weightedScore >= 3.8).length)), lv("Plan", String(sorted.filter(i => i.weightedScore >= 2.8 && i.weightedScore < 3.8).length)), lv("Defer / Stop", String(sorted.filter(i => i.weightedScore < 2.8).length)),
    divider(), h1("Priority Ranking"), sp(),
    mkTable(["#", "Initiative", "Owner", "Score", "Tier"], sorted.map((init, idx) => [String(idx + 1), init.name, init.owner, init.weightedScore.toFixed(2), init.weightedScore >= 3.8 ? "Do Now" : init.weightedScore >= 2.8 ? "Plan" : init.weightedScore >= 2.0 ? "Defer" : "Stop"])),
    divider(), smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-Initiative-Prioritisation.docx");
}

// ─── TOOL 3 ────────────────────────────────────────────────────────────────────
export async function exportDecisionStack({ title, names, scores, ws, winner, dims }) {
  const opts = ["a", "b", "c"]; const wi = opts.indexOf(winner);
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("The Decision Stack"), sp(),
    lv("Decision", title), lv("Recommended Option", names[wi] || "Option " + winner.toUpperCase()),
    divider(), h1("Score Summary"), sp(),
    mkTable(["Dimension", "Weight", ...names.map((n, i) => n || "Option " + opts[i].toUpperCase())], [...dims.map(dim => [dim.label, Math.round(dim.weight * 100) + "%", ...opts.map(opt => String(scores[opt][dim.id] || 0))]), ["WEIGHTED TOTAL", "", ...opts.map(opt => ws[opt].toFixed(2))]]),
    divider(), smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-Decision-Stack.docx");
}

// ─── TOOL 5 ────────────────────────────────────────────────────────────────────
export async function exportRhythm({ orgName, meetings }) {
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("Operating Rhythm Register"), sp(),
    ...[orgName && lv("Organisation / Programme", orgName), lv("Total Meetings", String(meetings.length))].filter(Boolean),
    divider(), h1("Meeting Register"), sp(),
    mkTable(["Meeting", "Cadence", "Duration", "Purpose", "Owner"], meetings.map(m => [m.label, m.cadence, m.duration, m.purpose || "\u2014", m.owner || "\u2014"])),
    divider(), smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-Operating-Rhythm.docx");
}

// ─── TOOL 6 ────────────────────────────────────────────────────────────────────
export async function exportKPIs({ kpis, pillars }) {
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("KPI & Performance Scorecard"), sp(),
    lv("Total KPIs", String(kpis.length)), lv("Lead Indicators", String(kpis.filter(k => k.lead).length)), lv("Lag Indicators", String(kpis.filter(k => !k.lead).length)),
    divider(),
    ...pillars.flatMap(pillar => { const pk = kpis.filter(k => k.pillar === pillar.id); if (!pk.length) return []; return [h2(pillar.label), sp(), mkTable(["KPI", "Target", "Frequency", "Type", "Formula"], pk.map(k => [k.name, k.target, k.frequency, k.lead ? "Lead" : "Lag", k.formula])), sp()]; }),
    smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-KPI-Scorecard.docx");
}

// ─── TOOL 7 ────────────────────────────────────────────────────────────────────
export async function exportCapability({ domains, scores, imp, notes }) {
  const capLabel = s => !s ? "Not assessed" : ["", "Critical Gap", "Significant Gap", "Partial", "Capable", "Strong"][s];
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("Capability & Gap Map"), sp(),
    lv("Domains Assessed", String(domains.filter(d => scores[d.id] > 0).length)), lv("Critical Gaps", String(domains.filter(d => scores[d.id] === 1).length)), lv("Strengths", String(domains.filter(d => scores[d.id] >= 4).length)),
    divider(), h1("Capability Assessment"), sp(),
    mkTable(["Domain", "Score", "Importance", "Status", "Notes"], domains.map(d => [d.label, scores[d.id] ? scores[d.id] + "/5" : "\u2014", (imp[d.id] || 3) + "/5", capLabel(scores[d.id]), notes[d.id] || "\u2014"])),
    divider(), smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-Capability-Map.docx");
}

// ─── TOOL 8 ────────────────────────────────────────────────────────────────────
export async function exportChange({ changeName, changeType, groups, scope, adkarScores, rfactors, adkar, resistance, resResp, interventions }) {
  const weakest = adkar.reduce((min, el) => !adkarScores[el.id] || adkarScores[el.id] < (adkarScores[min?.id] || 6) ? el : min, null);
  const doc = new Document({ sections: [{ ...PAGE, footers: { default: smrFooter() }, children: [
    brandBlock(), docSub("Change & Adoption Plan"), sp(),
    lv("Change", changeName), lv("Type", changeType), ...[groups && lv("Impacted Groups", groups)].filter(Boolean), lv("Scale", scope + "/5"),
    divider(), h1("ADKAR Assessment"), sp(),
    mkTable(["Element", "Score", "Status"], adkar.map(el => [el.label, adkarScores[el.id] ? adkarScores[el.id] + "/5" : "Not scored", el.id === weakest?.id ? "\u26a0 Barrier Point" : adkarScores[el.id] >= 4 ? "Strong" : "Needs attention"])),
    sp(), h1("Recommended Interventions"),
    ...adkar.filter(el => (adkarScores[el.id] || 0) < 4).flatMap(el => [sp(), goldPill(el.label), ...(interventions[el.id] || []).slice(0, adkarScores[el.id] === 1 ? 5 : adkarScores[el.id] === 2 ? 4 : 3).map(a => bullet(a))]),
    ...(rfactors.length > 0 ? [divider(), h1("Resistance Response Plan"), ...rfactors.flatMap(id => { const f = resistance.find(r => r.id === id); return [sp(), greenPill(f.label), body(resResp[id] || "")]; })] : []),
    divider(), smrCredit(),
  ]}] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "SMR-Change-Adoption-Plan.docx");
}
