let domain = ''
if (process.env.NODE_ENV === 'production') {
  domain = 'http://rapapi.org/mockjsdata/18200'
}

module.exports = {
  seller: `${domain}/api/seller`,
  goods: `${domain}/api/goods`,
  ratings: `${domain}/api/ratings`
}
