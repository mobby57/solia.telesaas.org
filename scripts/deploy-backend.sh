#!/bin/bash
# Script to deploy backend Fastify app on a VPS

# Update and install dependencies
sudo apt update && sudo apt install -y nodejs npm nginx certbot python3-certbot-nginx

# Clone the backend repo (replace with your repo URL)
if [ ! -d "solia-backend" ]; then
  git clone https://your-repo-url/solia-backend.git
fi

cd solia-backend

# Install dependencies and build
npm install
npm run build

# Setup PM2 to run the backend
npm install -g pm2
pm2 start dist/server.js --name solia-backend
pm2 save
pm2 startup

# Setup Nginx reverse proxy config
sudo tee /etc/nginx/sites-available/solia <<EOF
server {
    listen 80;
    server_name solia.telesaas.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -sf /etc/nginx/sites-available/solia /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Obtain SSL certificate with certbot
sudo certbot --nginx -d solia.telesaas.org

echo "Deployment complete. Your backend should be running and accessible at https://solia.telesaas.org"
