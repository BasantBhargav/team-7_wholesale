# 🏭 Wholesale / Bulk Order Management System

> A production-grade B2B commerce platform built for **wholesalers and retailers** — featuring real-time inventory, tiered pricing, credit management, RFQ workflows, and automated invoice generation.

---

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Spring Boot · MongoDB · JWT Security · iText7 |
| Frontend | React 18 · Tailwind CSS · Redux Toolkit |
| Auth | Role-Based Access Control (ADMIN / RETAILER) |
| Docs | Swagger UI |

---

## 🗂️ Project Structure

```
BulkOrderManagement/
├── backend/                        # Spring Boot + MongoDB REST APIs
│   └── src/main/java/com/bom/
│       ├── config/                 # App + Security configuration
│       ├── controller/             # REST endpoints
│       ├── dto/                    # Request / Response models
│       ├── entity/                 # MongoDB document models
│       ├── exception/              # Global exception handler
│       ├── repository/             # Mongo repositories
│       ├── security/               # JWT filter + UserDetails
│       ├── service/                # Business logic layer
│       └── util/                   # Helpers & utilities
│
└── frontend/                       # React + Tailwind SPA
    └── src/
        ├── components/             # Reusable UI components
        ├── hooks/                  # Custom React hooks
        ├── layouts/                # Page layout wrappers
        ├── pages/
        │   ├── admin/              # Admin panel pages
        │   ├── auth/               # Login / Register
        │   └── retailer/           # Retailer-facing pages
        ├── redux/                  # Store, slices, thunks
        ├── services/               # Axios API service layer
        └── utils/                  # Formatters, validators
```

---

## 🚀 Getting Started

### Prerequisites

- **Java** 17+
- **Maven** 3.9+
- **Node.js** 18+
- **MongoDB** running on `mongodb://localhost:27017`

---

### ▶️ Backend

```bash
cd backend
mvn spring-boot:run
```

- API Base: `http://localhost:8080`
- Swagger Docs: [`http://localhost:8080/swagger-ui.html`](http://localhost:8080/swagger-ui.html)

---

### ▶️ Frontend

```bash
cd frontend
npm install
npm run dev
```

- App URL: [`http://localhost:5173`](http://localhost:5173)

---

## ✨ Feature Overview

### 🔐 Authentication & Access Control
- JWT-based login with role-based route protection
- Retailer registration with **admin approval workflow** (PENDING → APPROVED / REJECTED)
- Separate dashboards for Admin and Retailer roles

### 🛒 Product Catalog & Cart
- Product management with **SKU, MOQ (Minimum Order Quantity)**, and stock tracking
- **Tiered pricing engine** — unit price auto-adjusts based on quantity ordered
- Cart APIs with real-time MOQ and tier-price validation
- Add, update, remove, and clear cart operations

### 📦 Order Management
- Place orders via two payment modes: **Pay Now** or **Net 30 Credit**
- Quick reorder from order history (one-click repeat)
- Admin order status management (PENDING → PROCESSING → SHIPPED → DELIVERED)
- **Credit limit assignment** per retailer with validation at checkout

### 📄 Invoicing
- Auto-generated **PDF invoices** using iText7
- Retailer invoice list with filters
- Secure invoice download endpoint

### 📊 RFQ (Request for Quotation)
- Retailers can raise RFQs for custom pricing or bulk negotiations
- Admin can respond with custom quotes
- Full RFQ lifecycle management

### 📁 Bulk CSV Upload
- Upload product orders via CSV
- **SKU validation** + MOQ checks + auto add-to-cart
- Error reporting for invalid rows

### 📈 Dashboards & Analytics
- **Admin Dashboard**: Order volume, revenue, retailer stats, pending approvals
- **Retailer Dashboard**: Order history, invoice access, cart summary
- Analytics API endpoint for reporting integrations

---

## 🔌 API Reference

### Register a Retailer

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "businessName": "ABC Traders",
  "ownerName": "Ravi Kumar",
  "email": "ravi@abc.com",
  "phone": "9999999999",
  "gstTaxId": "GSTIN12345",
  "address": "Mumbai",
  "password": "Password@123"
}
```

---

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "ravi@abc.com",
  "password": "Password@123"
}
```

> Returns a JWT `accessToken` — include it as `Authorization: Bearer <token>` in all subsequent requests.

---

### Add Item to Cart

```http
POST /api/cart/items
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "sku": "SKU-101",
  "quantity": 60
}
```

---

### Place an Order

```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "paymentMode": "CREDIT_NET_30",
  "skuQtyMap": {
    "SKU-101": 55,
    "SKU-404": 120
  }
}
```

---

### Quick Reorder

```http
POST /api/orders/{orderId}/quick-reorder
Authorization: Bearer <token>
```

---

### Download Invoice

```http
GET /api/invoices/download/{invoiceNumber}
Authorization: Bearer <token>
```

---

## 🗃️ Quick Start with Dummy Data

Paste this into your **Mongo shell** to seed an admin user and a sample product:

```javascript
// Seed Admin User (password: admin123)
db.users.insertOne({
  businessName: "Wholesale Admin",
  ownerName: "System",
  email: "admin@bom.com",
  phone: "0000000000",
  gstTaxId: "ADMIN-GST",
  address: "HQ",
  password: "$2a$10$2jVt2v/7Dq5hQw8Z2tGvOe9MQ9gK5KlmR3uQ1L2F9Qe6x8m7xNQdK",
  role: "ADMIN",
  retailerStatus: "APPROVED"
});

// Seed Sample Product with Tiered Pricing
db.products.insertMany([
  {
    sku: "SKU-101",
    name: "Industrial Bolts",
    description: "Heavy duty bolts",
    category: "Hardware",
    moq: 10,
    stockQuantity: 5000,
    basePrice: 100,
    tierPricing: [
      { minQty: 1,   maxQty: 50,  unitPrice: 100 },   // ₹100/unit
      { minQty: 51,  maxQty: 100, unitPrice: 90  },   // ₹90/unit
      { minQty: 101, maxQty: 0,   unitPrice: 80  }    // ₹80/unit (100+)
    ],
    status: "ACTIVE"
  }
]);
```

---

## 🚢 Deployment

### Backend

1. Update `application.yml` with your **production MongoDB URI**
2. Replace JWT secret with a **strong 256-bit value**
3. Build the JAR:
   ```bash
   mvn clean package
   ```
4. Run behind **Nginx** or a cloud load balancer (AWS ALB, GCP LB, etc.)

### Frontend

1. Build the static bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist/` folder to one of:
   - **Vercel** / **Netlify** (recommended for ease)
   - **AWS S3 + CloudFront**
   - **Nginx** static server
3. Set the environment variable:
   ```
   VITE_API_BASE_URL=https://your-api-domain.com
   ```

---

## 🔒 Production Hardening Checklist

Before going live, ensure you've addressed the following:

- [ ] **Refresh token rotation** — Implement persistent refresh tokens with rotation and revocation
- [ ] **Test coverage** — Add JUnit integration tests for services + React Testing Library for UI
- [ ] **Audit logs** — Log all critical actions: approvals, status updates, credit changes
- [ ] **File storage** — Move invoice PDFs and product images to S3 / Azure Blob
- [ ] **Background jobs** — Add scheduled reminders for Net-30 payment due dates
- [ ] **CI/CD pipeline** — Automate builds, tests, and deployments (GitHub Actions / Jenkins)
- [ ] **Environment configs** — Separate `application-dev.yml`, `application-prod.yml` profiles
- [ ] **Rate limiting** — Add API rate limiting to prevent abuse on public endpoints
- [ ] **HTTPS** — Enforce TLS with a valid SSL certificate in production
- [ ] **Input sanitization** — Validate and sanitize all user inputs to prevent injection attacks

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

<p align="center">Built with ❤️ for the B2B commerce ecosystem</p>
# Team 7 Wholesale Project

Contribution by Ashutosh