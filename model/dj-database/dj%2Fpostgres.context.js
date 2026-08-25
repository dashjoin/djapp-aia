// JavaScript
var value = { ...context.value }
delete value.markdown
delete value.links

// protect against XSS
function escapeHtml(str) {
  if (typeof str === 'string')
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  else
    return str + ''
}

// display value
function prnt(v) {
  if (Array.isArray(v))
    return '<ul>' + v.map(i => '<li>' + prnt(i) + '</li>').join('') + '</ul>'
  if (typeof (v) === 'string')
    return escapeHtml(v)
  if (typeof (v) === 'object')
    return Object.entries(v).map(([k, v]) => escapeHtml(k) + ': ' + escapeHtml(v)).join(', ')
  return v
}

// table rows
var table = ""
for (let [k, v] of Object.entries(value))
  if (v != null)
    table = table + "<tr><td style='padding: 5px; border: 1px solid black; border-collapse: collapse'>" + escapeHtml(k) + "</td><td style='padding: 5px; border: 1px solid black; border-collapse: collapse'>" + prnt(v) + "</td></tr>"

return "<table style='border: 1px solid black; border-collapse: collapse'" + table + "</table>"