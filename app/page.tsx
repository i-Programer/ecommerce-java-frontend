import { paths } from "@/src/api/types"; // Tipe data dari openapi-typescript

async function getProducts() {
  // Panggil Route Handler Next.js (BFF)
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tes Koneksi: Next.js + Java API</h1>
      
      <div className="grid gap-4">
        {products.length === 0 ? (
          <p className="text-gray-500">Tidak ada produk / API Java belum menyala.</p>
        ) : (
          products.map((item: any) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-600">Rp {item.price}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}