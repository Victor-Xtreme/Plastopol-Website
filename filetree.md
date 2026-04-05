src/
│
├── app/                         
│   ├── layout.tsx
│   ├── page.tsx                  # Home page
│   │
│   ├── products/
│   │   ├── page.tsx              # Product listing (catalog view)
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Individual product page
│   │
│   ├── catalog/
│   │   └── page.tsx              # Search + filters combined page
│
├── components/
│   ├── ui/                       
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │
│   ├── layout/                   
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── Container.tsx
│   │
│   ├── product/                  
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetails.tsx
│   │   ├── ProductImages.tsx
│   │   ├── ProductSpecs.tsx
│   │
│   ├── catalog/                  # 🔁 renamed from filters/search
│   │   ├── CatalogBrowser.tsx    # search + results combined
│   │   ├── FilterSidebar.tsx
│   │   ├── PriceFilter.tsx
│   │   ├── CategoryFilter.tsx
│
├── features/                     
│   ├── products/
│   │   ├── getProducts.ts
│   │   ├── getProductBySlug.ts
│   │   ├── productUtils.ts
│   │
│   ├── catalog/                  # 🔁 merged search + filter logic
│   │   ├── catalogIndex.ts       # Fuse.js setup
│   │   ├── filterProducts.ts
│   │   ├── sortProducts.ts
│
├── lib/                          
│   ├── formatPrice.ts
│   ├── slugify.ts
│   ├── constants.ts
│
├── data/                         
│   ├── products.json
│
├── styles/
│   ├── globals.css
│
├── public/
│   ├── products/
│       ├── chair-001.jpg
│
├── types/
│   ├── index.ts
