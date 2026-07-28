# 🎨 E-Commerce Frontend (Next.js 16 & React 19)

A modern, high-performance E-Commerce Web Client built using **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **shadcn/ui**. 

The architecture implements a **Backend-For-Frontend (BFF)** pattern with a strict 3-Tier Data Pipeline to securely bridge client interactions with the Java Spring Boot microservice ecosystem.

---

## 🛠️ Key Architectural Highlights

* **End-to-End Type Safety (OpenAPI CodeGen):** TypeScript interfaces are automatically generated directly from the Java Spring Boot backend's OpenAPI/Swagger specs via `npm run generate-types`. This ensures type parity between backend DTOs and frontend components.
* **Modern UI System:** Built with **shadcn/ui** and **Tailwind CSS** for clean, accessible, and customizable UI components.
* **3-Tier BFF Model:** Obfuscates backend infrastructure, enforces server-side token security, and shapes payloads specifically for UI needs.

---

## 🏗️ Architecture & Data Flow

Request flows strictly follow a 3-tier BFF pattern:

```text
UI Component (shadcn/ui)  --->  Server Action (lib/actions.ts)  --->  API Client (lib/api.ts)  --->  Route Handler (app/api/...)  --->  Java Spring Boot Microservice
```

### Why this 3-Tier BFF Model?

1. **Security:** Raw backend endpoints, internal routing structures, and downstream API signatures are completely hidden from the browser.
2. **Server-Side Security:** Sensitive tokens and headers remain on the Node.js server environment via Server Actions and Route Handlers.
3. **Data Transformation & Type Safety:** Payload transformations map directly to contract types derived from OpenAPI specs.

---


## 🎯 Current Implementation Status

* [x] Next.js 16 (App Router), React 19, & TypeScript setup
* [x] shadcn/ui design system integration
* [x] OpenAPI Type Generation (`npm run generate-types`) aligned with Java Spring Boot DTOs
* [x] 3-Tier BFF Data Fetching Architecture (`UI` -> `Actions` -> `API Client` -> `Route Handlers`)
* [-] **Seller Dashboard:**
  * [x] Product Management (Full CRUD: List, Create, Edit, Delete)
  * [x] Responsive layout with dark/light theme support
  * [ ] Category Management UI *(Planned)*
* [ ] **Buyer Features:**
  * [ ] Store Homepage & Catalog View
  * [ ] Product Details & Filtering
  * [ ] Cart & Checkout Flow
* [ ] **Authentication & Security:**
  * [ ] JWT authentication integration with Spring Boot user service
  * [ ] Route protection via middleware/proxies

---

## 🚀 Getting Started

### Prerequisites

* **Node.js:** `20.9+`
* **Package Manager:** `npm`, `pnpm`, or `yarn`
* **Java Spring Boot Backend:** Running locally with OpenAPI / Swagger enabled

### Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/ecommerce-frontend.git](https://github.com/your-username/ecommerce-frontend.git)
   cd ecommerce-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Generate OpenAPI TypeScript Types:**
   Ensure the Java Spring Boot product service is running, then execute:
   ```bash
   npm run generate-types
   ```

4. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   ```

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔮 Roadmap

- [ ] Add Category Management screens to the Seller Dashboard.
- [ ] Build the Buyer Experience (Public Store Homepage, Catalog, Product Search).