import nodemailer from "nodemailer";
import { getAllSettings } from "./settings";

export async function notifyNewInquiry(info: {
  id: number;
  name: string;
  email: string;
  country: string;
  buyerType?: string | null;
  permitInfo?: string | null;
  message?: string | null;
  items: { label: string; quantity?: string }[];
}) {
  try {
    const s = await getAllSettings();
    const { smtp_host, smtp_port, smtp_user, smtp_pass, notify_email } = s;
    if (!smtp_host || !smtp_user || !smtp_pass || !notify_email) return;

    const port = Number(smtp_port || 465);
    const transporter = nodemailer.createTransport({
      host: smtp_host,
      port,
      secure: port === 465,
      auth: { user: smtp_user, pass: smtp_pass },
      connectionTimeout: 8000,
    });

    const itemsHtml = info.items.length
      ? `<ol style="margin:8px 0;padding-left:20px">${info.items
          .map((i) => `<li>${i.label}${i.quantity ? ` — 数量：${i.quantity}` : ""}</li>`)
          .join("")}</ol>`
      : "<p style='color:#888'>（未选择具体物种）</p>";

    await transporter.sendMail({
      from: `"爬世家网站" <${smtp_user}>`,
      to: notify_email,
      subject: `🔔 新询盘 #${info.id}：${info.name}（${info.country}）`,
      html: `
        <div style="font-family:sans-serif;max-width:560px">
          <h2 style="color:#06162d">新询盘 #${info.id}</h2>
          <p><b>买家：</b>${info.name} ・ ${info.email}<br>
          <b>国家/地区：</b>${info.country}<br>
          <b>买家类型：</b>${info.buyerType || "—"}</p>
          <h3 style="color:#06162d">物种明细</h3>
          ${itemsHtml}
          ${info.permitInfo ? `<p><b>许可信息：</b>${info.permitInfo}</p>` : ""}
          ${info.message ? `<p><b>留言：</b>${info.message}</p>` : ""}
          <p><a href="https://pashijia.com/admin" style="color:#c9a227">→ 前往后台处理</a></p>
        </div>`,
    });
    console.log(`[notify] inquiry #${info.id} mail sent to ${notify_email}`);
  } catch (e) {
    console.error(`[notify] inquiry #${info.id} mail failed:`, e);
  }
}

export async function sendTestMail(to: string) {
  const s = await getAllSettings();
  const { smtp_host, smtp_port, smtp_user, smtp_pass } = s;
  if (!smtp_host || !smtp_user || !smtp_pass) throw new Error("SMTP 未配置完整");
  const port = Number(smtp_port || 465);
  const transporter = nodemailer.createTransport({
    host: smtp_host,
    port,
    secure: port === 465,
    auth: { user: smtp_user, pass: smtp_pass },
    connectionTimeout: 8000,
  });
  await transporter.sendMail({
    from: `"爬世家网站" <${smtp_user}>`,
    to,
    subject: "✅ 爬世家网站通知测试",
    html: "<p>这封邮件说明你的询盘邮件通知已配置成功。以后每个新询盘都会实时发到这里。</p>",
  });
}
