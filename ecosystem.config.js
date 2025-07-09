// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'grab-staging',
      script: './backend/index.js',
      env: {
        NODE_ENV: 'staging'
      }
    },
    {
      name: 'grab-production',
      script: './backend/index.js',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
