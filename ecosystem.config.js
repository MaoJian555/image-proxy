module.exports = {
  apps: [
    {
      name: 'image-proxy',
      script: './index.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      max_memory_restart: '1G',
      restart_delay: 1000,
      log_date_format: 'YYYY-MM-DD HH:mm:ss'
    }
  ]
};