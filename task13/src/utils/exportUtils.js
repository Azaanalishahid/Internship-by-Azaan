/**
 * Export data array to CSV format and trigger browser download
 */
export function exportToCSV(data, filename = 'userhub_users_export.csv') {
  if (!data || !data.length) return false

  const headers = ['id', 'full_name', 'email', 'phone', 'gender', 'city', 'country', 'role', 'status', 'created_at']
  
  const csvRows = []
  // Header row
  csvRows.push(headers.join(','))

  // Data rows
  data.forEach(user => {
    const row = headers.map(header => {
      let val = user[header] || ''
      // Escape double quotes and enclose in quotes if contains comma
      val = String(val).replace(/"/g, '""')
      if (val.includes(',') || val.includes('\n') || val.includes('"')) {
        val = `"${val}"`
      }
      return val
    })
    csvRows.push(row.join(','))
  })

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'))
  const link = document.createElement('a')
  link.setAttribute('href', csvContent)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  return true
}

/**
 * Export data array to JSON file format and trigger browser download
 */
export function exportToJSON(data, filename = 'userhub_users_export.json') {
  if (!data || !data.length) return false

  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  return true
}
