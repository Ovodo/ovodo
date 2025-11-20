# Subdomain Routing Setup Guide for ovd.dev

## Overview
This setup allows you to route different subdomains (e.g., music.ovd.dev) to different sections of your Next.js app while keeping everything in one codebase.

## What's Been Added

### 1. Middleware (`middleware.ts`)
- Intercepts all requests and checks the hostname
- Routes `music.ovd.dev` → `/music` route
- Supports localhost testing with `music.localhost:3000`
- Keeps the URL as `music.ovd.dev` (transparent rewrite)

### 2. Test Page (`app/music/page.tsx`)
- Demo page that shows subdomain routing is working
- Displays current hostname and routing info

## Local Testing

### Test with localhost subdomains:

1. Edit your `/etc/hosts` file:
   ```bash
   sudo nano /etc/hosts
   ```

2. Add these lines:
   ```
   127.0.0.1 music.localhost
   127.0.0.1 localhost
   ```

3. Save and start your dev server:
   ```bash
   bun dev
   ```

4. Visit in browser:
   - `http://localhost:3000` → Main site
   - `http://music.localhost:3000` → Music subdomain

## DNS Configuration (Production)

### For Vercel/Netlify/Similar Platforms:

1. **Add domain to your platform:**
   - Go to your project settings
   - Add both `ovd.dev` and `music.ovd.dev` as domains

2. **Configure DNS (at your domain registrar):**
   ```
   Type    Name     Value                      TTL
   A       @        <your-server-ip>          3600
   CNAME   music    <your-deployment-url>     3600
   CNAME   www      <your-deployment-url>     3600
   ```

### For Custom Server (VPS/EC2):

1. **All subdomains point to same server:**
   ```
   Type    Name     Value               TTL
   A       @        <your-server-ip>   3600
   A       music    <your-server-ip>   3600
   CNAME   www      ovd.dev            3600
   ```

2. **Nginx/Apache configuration** (if using reverse proxy):
   
   **Nginx:**
   ```nginx
   server {
       listen 80;
       server_name ovd.dev www.ovd.dev music.ovd.dev *.ovd.dev;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Project Structure

```
/home/ovd/projects/ovd/          (this project - Next.js)
└── middleware.ts                 ← Handles subdomain routing
└── app/
    ├── page.tsx                  ← Main domain (www.ovd.dev, ovd.dev)
    ├── music/
    │   └── page.tsx              ← Music subdomain (music.ovd.dev)
    ├── sounds/
    │   └── page.tsx              ← Available on both domains
    └── ...

/home/ovd/projects/ovodo/         (your production site)
└── ...                           ← Separate project
```

## Adding More Subdomains

### Example: blog.ovd.dev

1. **Update middleware.ts:**
   ```typescript
   if (isProduction && subdomain === 'blog') {
     url.pathname = `/blog${url.pathname === '/' ? '' : url.pathname}`;
     return NextResponse.rewrite(url);
   }
   ```

2. **Create blog page:**
   ```bash
   mkdir -p app/blog
   # Create app/blog/page.tsx
   ```

3. **Add DNS record:**
   ```
   CNAME   blog    ovd.dev   3600
   ```

## Important Notes

### Single Next.js Instance
- All subdomains run from the **same Next.js app**
- They share the same build, dependencies, and components
- Middleware routes requests to different `/app` directories

### Multiple Separate Apps Approach (Alternative)
If you want completely separate applications per subdomain:

1. Deploy separate Next.js apps:
   - `ovd.dev` → /home/ovd/projects/ovodo (port 3000)
   - `music.ovd.dev` → /home/ovd/projects/ovd (port 3001)

2. Use Nginx to route by subdomain:
   ```nginx
   # Main domain
   server {
       server_name ovd.dev www.ovd.dev;
       location / {
           proxy_pass http://localhost:3000;
       }
   }
   
   # Music subdomain
   server {
       server_name music.ovd.dev;
       location / {
           proxy_pass http://localhost:3001;
       }
   }
   ```

## Testing Checklist

- [ ] Test localhost subdomains locally
- [ ] Verify middleware routing works
- [ ] Test on production after DNS propagation (24-48 hours)
- [ ] Verify SSL certificates cover all subdomains
- [ ] Test mobile responsiveness
- [ ] Check that API routes work on all subdomains

## Deployment Steps

1. **Commit changes:**
   ```bash
   git add middleware.ts app/music/
   git commit -m "Add subdomain routing for music.ovd.dev"
   git push
   ```

2. **Deploy to production:**
   - If using Vercel/Netlify: Auto-deploys on push
   - If using custom server: Pull latest code and restart

3. **Add DNS records** (as shown above)

4. **Wait for DNS propagation** (check with: `dig music.ovd.dev`)

5. **Test:**
   - Visit https://music.ovd.dev
   - Should see the test page

## Troubleshooting

### Subdomain shows 404
- Check DNS records are correct
- Verify middleware.ts is in root directory
- Check middleware matcher config
- Clear browser cache

### SSL certificate errors
- Ensure wildcard cert or individual certs for each subdomain
- For Let's Encrypt: `certbot --nginx -d ovd.dev -d www.ovd.dev -d music.ovd.dev`

### Middleware not running
- Must be in root directory (next to `app/`)
- Check file is named exactly `middleware.ts` (not in a folder)
- Restart dev server

## Resources

- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Next.js Multi-tenant Apps](https://nextjs.org/docs/app/building-your-application/routing/middleware#multi-tenant-applications)
