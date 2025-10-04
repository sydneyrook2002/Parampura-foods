# Parampara Foods - Port Management Guide

## 🚀 Quick Start Commands

### Standardized Ports
- **Frontend**: `http://localhost:3000` / `http://192.168.1.10:3000` (Mobile Access)
- **Backend**: `http://localhost:5123` / `http://192.168.1.10:5123` (Mobile Access)

### Scripts Location
- **All Scripts**: `D:\cursor\Parampura-foods\scripts\`

## 📋 Available Scripts

### 1. Complete Project Setup (Recommended)
```bash
# Complete reset: kill processes, reset DB, seed data, start both services
scripts\start.bat
```
**This script will:**
- Kill all existing processes (node.exe, dotnet.exe)
- Reset and seed the database with fresh data
- Start backend on port 5123 (mobile-accessible)
- Start frontend on port 3000 (mobile-accessible)
- Display access URLs for both local and mobile testing

### 2. Development Workflow Scripts
```bash
# Backend Development (stop, edit, restart)
scripts\backend-dev.bat

# Frontend Development (start without stopping)
scripts\frontend-dev.bat

# Kill All Processes
scripts\stop.bat
```

## 🔄 Development Workflow

### For Daily Development:
1. Run `scripts\start.bat` - This will:
   - Kill all existing processes
   - Reset and seed the database
   - Start both services with mobile access
   - Ensure consistent state

### For Backend Development:
1. Run `scripts\backend-dev.bat` - This will:
   - Stop the backend process
   - Allow you to make changes
   - Restart the backend when ready

### For Frontend Development:
1. Run `scripts\frontend-dev.bat` - This will:
   - Start the frontend without stopping it first
   - Enable hot reload for development

### For Quick Restart:
1. Run `scripts\stop.bat` to kill all processes
2. Run `scripts\start.bat` to restart everything

## 📊 Database Seeding

The database is automatically seeded with:
- **23 Products** with realistic Indian Rupee pricing
- **6 Categories** (Vegetables, Fruits, Dairy, Grains, Herbs, Beverages)
- **2 Users** (1 admin: `admin@parampara.com` / `Admin123!`, 1 user: `user@parampara.com` / `User123!`)
- **Enhanced pricing system** (MRP + Sale Price)
- **Role-based access control** (Admin and User roles)

## 🎯 Benefits

1. **Consistent Ports**: Always use 3000 (frontend) and 5123 (backend)
2. **Mobile Access**: Services accessible on network IP (192.168.1.10)
3. **Clean State**: Scripts ensure no port conflicts
4. **Fresh Data**: Database is always seeded with consistent data
5. **Easy Setup**: One script to rule them all
6. **No Manual Steps**: Everything is automated

## 📱 Mobile Testing

### Network Access
- **Frontend**: `http://192.168.1.10:3000`
- **Backend**: `http://192.168.1.10:5123`

### Mobile Features Tested
- ✅ **Responsive Design** - Works on all device sizes
- ✅ **Mobile Navigation** - Hamburger menu and touch-friendly UI
- ✅ **Mobile Search** - Accessible search functionality
- ✅ **Mobile Checkout** - Optimized checkout flow
- ✅ **Mobile Admin** - Full admin functionality on mobile

## 🚨 Troubleshooting

### Port Already in Use:
```bash
scripts\stop.bat
```

### Database Issues:
```bash
scripts\start.bat
# This will reset the database automatically
```

### Complete Reset:
```bash
scripts\start.bat
# This will kill processes, reset DB, and start services
```

### Backend Not Starting:
1. Check if port 5123 is available
2. Run `scripts\stop.bat` to kill all processes
3. Run `scripts\start.bat` to restart

### Frontend Not Starting:
1. Check if port 3000 is available
2. Run `scripts\stop.bat` to kill all processes
3. Run `scripts\start.bat` to restart

## 🔧 Technical Details

### Backend Configuration
- **Port**: 5123
- **Host**: 0.0.0.0 (allows network access)
- **Database**: SQL Server with Entity Framework Core
- **Authentication**: JWT + ASP.NET Identity

### Frontend Configuration
- **Port**: 3000
- **Host**: 0.0.0.0 (allows network access)
- **Framework**: React 18 + TypeScript + Vite
- **UI**: Shadcn/ui + Tailwind CSS

### Network Configuration
- **Local Access**: `localhost:3000` and `localhost:5123`
- **Mobile Access**: `192.168.1.10:3000` and `192.168.1.10:5123`
- **CORS**: Configured for both local and network access

## 🎯 Production Readiness

### ✅ Ready for Production
- **Core E-Commerce**: Complete shopping experience
- **User Management**: Registration, login, role-based access
- **Admin Panel**: Full management capabilities
- **Mobile Support**: Responsive design and mobile access
- **Security**: JWT authentication and input validation
- **Performance**: Optimized loading and smooth navigation

### 🔑 Test Credentials
- **Admin**: `admin@parampara.com` / `Admin123!`
- **User**: `user@parampara.com` / `User123!`

### 📊 Application Statistics
- **Products**: 23 organic products
- **Categories**: 6 product categories
- **Users**: 2 seeded users (1 admin, 1 user)
- **Orders**: 0 (ready for production orders)
- **Revenue**: ₹0.00 (ready for production sales)

---

**Remember**: Always use the scripts instead of manual commands for consistency!

**Status**: ✅ Production Ready - All features implemented and tested