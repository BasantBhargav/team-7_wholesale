# Wholesale / Bulk Order Management System

Production-style B2B commerce platform with retailer and wholesaler workflows.

## 1) Folder Structure

```text
BulkOrderManagement/
  backend/                       # Spring Boot + MongoDB APIs
    src/main/java/com/bom/
      config/
      controller/
      dto/
      entity/
      exception/
      repository/
      security/
      service/
      util/
    src/main/resources/application.yml
    pom.xml
  frontend/                      # React + Tailwind + Redux
    src/
      components/
      hooks/
      layouts/
      pages/
        admin/
        auth/
        retailer/
      redux/
      services/
      utils/
    package.json
```

## 2) Backend Setup

### Prerequisites
- Java 17+
- Maven 3.9+
- MongoDB running on `mongodb://localhost:27017`

### Run
```bash
cd backend
mvn spring-boot:run
```

Swagger: <http://localhost:8080/swagger-ui.html>

## 3) Frontend Setup

### Prerequisites
- Node.js 18+

### Run
```bash
cd frontend
npm install
npm run dev
```

App URL: <http://localhost:5173>

## 4) Core Features Included

- JWT authentication and role-based security
- Retailer registration with pending approval flow
- Product catalog with MOQ and tier-pricing engine
- Cart APIs (add/update/remove/clear) with MOQ + tier-price validation
- Order placement (pay now / net 30 credit)
- Quick reorder from previous orders
- Admin order status management
- Credit limit assignment and validation
- RFQ create/respond flow
- CSV bulk upload parsing, SKU validation, and auto add-to-cart
- Invoice PDF generation (iText7) + retailer invoice list + download endpoint
- Admin + Retailer dashboards
- Admin analytics API endpoint
- API response wrapper + global exception handler

## 5) API Testing Examples

### Register Retailer
```http
POST /api/auth/register
Content-Type: application/json

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

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "ravi@abc.com",
  "password": "Password@123"
}
```

### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentMode": "CREDIT_NET_30",
  "skuQtyMap": {
    "SKU-101": 55,
    "SKU-404": 120
  }
}
```

### Cart Add Item
```http
POST /api/cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "sku": "SKU-101",
  "quantity": 60
}
```

### Quick Reorder
```http
POST /api/orders/{orderId}/quick-reorder
Authorization: Bearer <token>
```

### Invoice Download
```http
GET /api/invoices/download/{invoiceNumber}
Authorization: Bearer <token>
```

## 6) Deployment Guide

### Backend
- Set production Mongo URI in `application.yml`
- Replace JWT secret with a strong 256-bit value
- Package: `mvn clean package`
- Run jar behind Nginx / cloud load balancer

### Frontend
- Build: `npm run build`
- Deploy `dist/` to Netlify, Vercel, S3+CloudFront, or Nginx
- Set API base URL to production backend

## 7) Dummy Data (Quick Start)
Use Mongo shell:

```javascript
db.users.insertOne({
  businessName: "Wholesale Admin",
  ownerName: "System",
  email: "admin@bom.com",
  phone: "0000000000",
  gstTaxId: "ADMIN-GST",
  address: "HQ",
  password: "$2a$10$2jVt2v/7Dq5hQw8Z2tGvOe9MQ9gK5KlmR3uQ1L2F9Qe6x8m7xNQdK", // password: admin123
  role: "ADMIN",
  retailerStatus: "APPROVED"
});

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
      { minQty: 1, maxQty: 50, unitPrice: 100 },
      { minQty: 51, maxQty: 100, unitPrice: 90 },
      { minQty: 101, maxQty: 0, unitPrice: 80 }
    ],
    status: "ACTIVE"
  }
]);
```

## 8) Production Hardening Checklist

- Add refresh token persistence and rotation
- Add unit/integration test suites (JUnit + React Testing Library)
- Add audit logs for approvals/status updates
- Add S3/Blob storage for invoices and product images
- Add background jobs for due-payment reminders
- Add CI/CD pipeline and environment-based configs

