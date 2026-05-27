"use client";

import { useEffect, useState } from "react";
import { request } from "@/lib/api/request";
import { Search, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

type Product = {
  id: number;
  nameEn: string;
  nameZh: string;
  category: string;
  unit: string;
  price: number;
};

const CATEGORIES = [
  { key: "all", label: "全部", labelEn: "All" },
  { key: "Beef", label: "牛肉", labelEn: "Beef" },
  { key: "Pork", label: "猪肉", labelEn: "Pork" },
  { key: "Poultry", label: "禽类", labelEn: "Poultry" },
  { key: "Seafood", label: "海鲜", labelEn: "Seafood" },
  { key: "Hotpot Base", label: "火锅底料", labelEn: "Hotpot Base" },
  { key: "Beverages & Other", label: "饮料/其他", labelEn: "Beverages & Other" },
];

export function CatalogScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingPrices, setEditingPrices] = useState<Record<number, number>>({});
  const [savingPrices, setSavingPrices] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await request("/api/products");
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePriceChange = (productId: number, newPrice: number) => {
    setEditingPrices({ ...editingPrices, [productId]: newPrice });
  };

  const handlePriceSave = async (productId: number) => {
    const newPriceDollars = editingPrices[productId];
    if (newPriceDollars === undefined) return;

    // Convert dollars to cents for storage
    const newPriceCents = Math.round(newPriceDollars * 100);

    setSavingPrices({ ...savingPrices, [productId]: true });
    try {
      await request(`/api/products/${productId}`, {
        method: "PATCH",
        body: JSON.stringify({ price: newPriceCents }),
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === productId ? { ...p, price: newPriceCents } : p))
      );
      const newEditing = { ...editingPrices };
      delete newEditing[productId];
      setEditingPrices(newEditing);
      toast.success("价格已更新 / Price updated");
    } catch (error) {
      console.error("Failed to update price:", error);
      toast.error("更新失败 / Update failed");
    } finally {
      setSavingPrices({ ...savingPrices, [productId]: false });
    }
  };

  const getPriceDisplay = (product: Product) => {
    if (editingPrices[product.id] !== undefined) {
      return editingPrices[product.id];
    }
    return (product.price / 100).toFixed(2);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameZh.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="p-4 md:p-8 space-y-4">
        <div className="h-8 bg-white rounded-lg animate-pulse" />
        <div className="h-10 bg-white rounded-xl animate-pulse" />
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 bg-white rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#2E5A35]">
            产品供货价格目录 / Catalog
          </h2>
          <p className="text-[10px] text-[#7A9682]">
            Live pricing for {products.length} SKUs across 6 categories
          </p>
        </div>
        <span className="bg-[#F5F7F5] border border-[#D2DFD6] text-[#2E5A35] text-[10px] font-extrabold px-2.5 py-1 rounded-full">
          Bilingual DB
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#7A9682] absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-[#D2DFD6] placeholder-[#7A9682] focus:outline-none focus:ring-1 focus:ring-[#429362]"
          placeholder="输入中英文产品名称 (e.g. 五花肉, Pork Belly)..."
        />
      </div>

      {/* Category Filter Grid */}
      <div className="grid grid-cols-4 gap-1 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`text-[9px] font-bold py-1.5 px-1 rounded text-center cursor-pointer transition-colors whitespace-nowrap ${
              selectedCategory === cat.key
                ? "bg-[#2E5A35] text-white"
                : "bg-white border border-[#D2DFD6] text-[#3B5E43]"
            }`}
          >
            {cat.label} {cat.key !== "all" ? `/ ${cat.labelEn}` : ""}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="flex flex-col gap-2">
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#D2DFD6] p-8 rounded-2xl text-center">
            <p className="text-[#7A9682] text-sm">未找到匹配产品 / No matching products</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.3) }}
              className="bg-white border border-[#D2DFD6] rounded-xl p-3 flex items-center justify-between gap-3"
            >
              <div className="flex flex-col gap-0.5 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] font-extrabold text-[#2E5A35] bg-[#F5F7F5] px-1.5 py-0.5 rounded">
                    #{product.id}
                  </span>
                  <span className="text-[10px] bg-stone-100 text-stone-700 px-1 py-0.5 rounded font-semibold">
                    {product.category}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-[#142517] mt-1">{product.nameZh}</h4>
                <h5 className="text-[10px] text-[#7A9682] font-normal">{product.nameEn}</h5>
                <p className="text-[9px] text-[#3B5E43]">单位 / Unit: {product.unit}</p>
              </div>

              {/* Price Edit Panel */}
              <div className="text-right flex flex-col items-end gap-1 shrink-0">
                <span className="text-[9px] text-[#7A9682]">标准协议价 / Price:</span>
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-extrabold text-[#142517]">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={getPriceDisplay(product)}
                    onChange={(e) => handlePriceChange(product.id, parseFloat(e.target.value))}
                    onBlur={() => {
                      if (editingPrices[product.id] !== undefined) {
                        handlePriceSave(product.id);
                      }
                    }}
                    className="w-16 bg-[#F5F7F5] border border-[#D2DFD6] rounded py-1 text-center font-bold text-xs focus:outline-none focus:border-[#429362]"
                  />
                </div>
                {editingPrices[product.id] !== undefined ? (
                  <button
                    onClick={() => handlePriceSave(product.id)}
                    disabled={savingPrices[product.id]}
                    className="text-[8px] text-white bg-[#2E5A35] px-2 py-0.5 rounded font-semibold"
                  >
                    {savingPrices[product.id] ? "..." : "保存 / Save"}
                  </button>
                ) : (
                  <span className="text-[8px] text-[#429362] font-semibold">Active Baseline</span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
