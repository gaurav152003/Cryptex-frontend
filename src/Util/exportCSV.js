export const exportToCsv = (filename, rows) => {
  if (!rows || !rows.length) {
    alert("No data available to export");
    return;
  }

  const csvContent =
    Object.keys(rows[0]).join(",") +
    "\n" +
    rows
      .map((row) =>
        Object.values(row)
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
