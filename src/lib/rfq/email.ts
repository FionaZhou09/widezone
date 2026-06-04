import type { RfqSubmission } from "./schema";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]!,
  );
}

export function renderRfqEmail(rfq: RfqSubmission) {
  const itemText = rfq.items
    .map((item, index) => `${index + 1}. ${item.nameZh} / ${item.nameEn} | ${item.unit || "N/A"} | ${item.quantity}`)
    .join("\n");
  const itemRows = rfq.items
    .map(
      (item) => `<tr>
        <td style="padding:10px;border-bottom:1px solid #e0d4c0">${escapeHtml(item.nameZh)}<br><span style="color:#7a6552">${escapeHtml(item.nameEn)}</span></td>
        <td style="padding:10px;border-bottom:1px solid #e0d4c0">${escapeHtml(item.unit || "N/A")}</td>
        <td style="padding:10px;border-bottom:1px solid #e0d4c0"><strong>${escapeHtml(item.quantity)}</strong></td>
      </tr>`,
    )
    .join("");

  return {
    subject: `New RFQ / 新询价 - ${rfq.businessName}`,
    text: `New RFQ / 新询价

Business / 公司: ${rfq.businessName}
Contact / 联系人: ${rfq.contactName}
Email: ${rfq.email}
Phone / 电话: ${rfq.phone}
Delivery / 送货地点: ${rfq.location}

Products / 产品:
${itemText}

Notes / 备注:
${rfq.notes || "None / 无"}`,
    html: `<div style="font-family:Arial,sans-serif;color:#1a1008;max-width:720px;margin:auto">
      <div style="background:#1a1008;color:#faf6f0;padding:24px">
        <div style="color:#c9a84c;letter-spacing:3px;font-size:11px">WIDE ZONE FOOD</div>
        <h1 style="margin:8px 0 0;font-size:26px">New RFQ / 新询价</h1>
      </div>
      <div style="padding:24px;background:#faf6f0">
        <p><strong>Business / 公司:</strong> ${escapeHtml(rfq.businessName)}</p>
        <p><strong>Contact / 联系人:</strong> ${escapeHtml(rfq.contactName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(rfq.email)}</p>
        <p><strong>Phone / 电话:</strong> ${escapeHtml(rfq.phone)}</p>
        <p><strong>Delivery / 送货地点:</strong> ${escapeHtml(rfq.location)}</p>
        <table style="width:100%;border-collapse:collapse;background:white;margin-top:20px">
          <thead><tr style="background:#c0392b;color:white"><th style="padding:10px;text-align:left">Product / 产品</th><th style="padding:10px;text-align:left">Unit</th><th style="padding:10px;text-align:left">Quantity / 数量</th></tr></thead>
          <tbody>${itemRows}</tbody>
        </table>
        <p style="margin-top:20px"><strong>Notes / 备注:</strong><br>${escapeHtml(rfq.notes || "None / 无")}</p>
      </div>
    </div>`,
  };
}
