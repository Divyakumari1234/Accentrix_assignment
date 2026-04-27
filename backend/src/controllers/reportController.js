import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';

const getRangeQuery = (query) => {
  const range = {};
  if (query.startDate) range.$gte = new Date(query.startDate);
  if (query.endDate) range.$lte = new Date(query.endDate);
  return Object.keys(range).length ? { generatedAt: range } : {};
};

export const listReports = asyncHandler(async (req, res) => {
  const reports = await Report.find(getRangeQuery(req.query)).sort({ generatedAt: -1 });
  res.json(reports);
});

export const exportReportsCsv = asyncHandler(async (req, res) => {
  const reports = await Report.find(getRangeQuery(req.query)).sort({ generatedAt: -1 });
  const rows = [
    ['Title', 'Type', 'Value', 'Generated At', 'Notes'],
    ...reports.map((r) => [
      r.title,
      r.type,
      r.value,
      r.generatedAt.toISOString(),
      (r.notes || '').replaceAll('"', '""')
    ])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
  res.header('Content-Type', 'text/csv');
  res.attachment('reports.csv');
  res.send(csv);
});
