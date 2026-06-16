// src/services/exportResult.js

export const handleExportReport = (history) => {
  if (!history || history.length === 0) {
    alert("Hiện tại chưa có dữ liệu lịch sử quét nào để xuất báo cáo!");
    return;
  }

  const headers = ["STT", "Mã Quét (ID)", "Tên Loại Quả", "Trạng Thái", "Độ Tin Cậy (%)", "Tỉ Lệ Xanh (%)", "Tỉ Lệ Chín (%)", "Thời Gian Quét"];

  const rows = history.map((item, index) => [
    index + 1,
    item.id,
    item.name,
    item.isGreen ? "Còn Xanh" : "Đã Chín",
    item.confidence?.toFixed(1),
    item.green_confidence?.toFixed(1),
    item.ripe_confidence?.toFixed(1),
    `"${item.time}"`
  ]);

  const csvContent = [
    headers.join(";"),
    ...rows.map(row => row.join(";"))
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute("download", `Bao_cao_Phan_loai_Nong_san_${dateStr}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};