// Export all business data to a SQL file for VPS deployment.
import { getDb } from "../api/queries/connection";
import { sql } from "drizzle-orm";
import * as fs from "fs";

function esc(v: unknown): string {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number" || typeof v === "bigint") return String(v);
  if (typeof v === "boolean") return v ? "1" : "0";
  if (v instanceof Date) return `'${v.toISOString().slice(0, 19).replace("T", " ")}'`;
  return `'${String(v).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

async function dump(table: string): Promise<string> {
  const db = getDb();
  const rows: any[] = (await db.execute(sql.raw(`SELECT * FROM \`${table}\``)))[0] as any[];
  if (!rows.length) return `-- table ${table}: no rows\n`;
  const cols = Object.keys(rows[0]);
  const lines = rows.map(
    (r) => `INSERT INTO \`${table}\` (${cols.map((c) => `\`${c}\``).join(",")}) VALUES (${cols.map((c) => esc(r[c])).join(",")});`
  );
  return `-- table ${table}: ${rows.length} rows\n${lines.join("\n")}\n`;
}

const out: string[] = ["-- PASHIJIA site data export", "SET NAMES utf8mb4;", ""];
for (const t of ["categories", "species", "settings", "inquiries"]) {
  out.push(await dump(t));
}
fs.writeFileSync("/mnt/agents/output/pashijia-数据备份.sql", out.join("\n"), "utf8");
console.log("done");
process.exit(0);
