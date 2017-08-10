/**
 * Created by wumingli on 14/07/2017.
 */
module.exports = {
  plugins: [
    require('postcss-smart-import')({ /* ...options */ }),
    require('autoprefixer')({browsers: 'last 7 iOS versions'})
  ]
};