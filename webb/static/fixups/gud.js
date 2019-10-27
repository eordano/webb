define('gud', [], function() {
  return function gud() {
    var key = '__global_unique_id__'
    return (window[key] = (window[key] || 0) + 1)
  }
})
