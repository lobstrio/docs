module.exports = {
  apps: [
    {
      name: 'lobstrio-docs',
      script: '.next/standalone/server.js',
      cwd: '/home/matrix/mdev/lobstrio-docs',
      env: {
        PORT: 3002,
        HOSTNAME: '127.0.0.1',
        NODE_ENV: 'production',
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: '512M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
