import "dotenv/config";
import { db } from "../src/lib/db/client";
import { products } from "../src/lib/db/schema";

const productData = [
  // Beef
  { nameEn: "Beef Brisket", nameZh: "牛腩", category: "Beef", unit: "1kg", price: 2500 },
  { nameEn: "Beef Ribs", nameZh: "牛肋骨", category: "Beef", unit: "1kg", price: 2800 },
  { nameEn: "Beef Short Ribs", nameZh: "牛仔骨", category: "Beef", unit: "1kg", price: 3200 },
  { nameEn: "Beef Tendon", nameZh: "牛筋", category: "Beef", unit: "1kg", price: 2200 },
  { nameEn: "Beef Shank", nameZh: "牛腱", category: "Beef", unit: "1kg", price: 2400 },
  { nameEn: "Beef Tripe", nameZh: "牛百叶", category: "Beef", unit: "500g", price: 1500 },
  { nameEn: "Beef Tongue", nameZh: "牛舌", category: "Beef", unit: "500g", price: 3500 },
  { nameEn: "Beef Chuck", nameZh: "牛肩肉", category: "Beef", unit: "1kg", price: 2600 },
  { nameEn: "Beef Sirloin", nameZh: "西冷牛排", category: "Beef", unit: "1kg", price: 4500 },
  { nameEn: "Beef Ribeye", nameZh: "肉眼牛排", category: "Beef", unit: "1kg", price: 5000 },
  { nameEn: "Ground Beef", nameZh: "牛绞肉", category: "Beef", unit: "1kg", price: 2000 },
  { nameEn: "Beef Liver", nameZh: "牛肝", category: "Beef", unit: "500g", price: 1200 },
  { nameEn: "Beef Heart", nameZh: "牛心", category: "Beef", unit: "500g", price: 1100 },
  { nameEn: "Beef Tail", nameZh: "牛尾", category: "Beef", unit: "1kg", price: 2800 },
  { nameEn: "Beef Oxtail", nameZh: "牛尾巴", category: "Beef", unit: "1kg", price: 3000 },
  
  // Pork
  { nameEn: "Pork Belly", nameZh: "五花肉", category: "Pork", unit: "1kg", price: 1800 },
  { nameEn: "Pork Shoulder", nameZh: "猪肩肉", category: "Pork", unit: "1kg", price: 1600 },
  { nameEn: "Pork Chop", nameZh: "猪排", category: "Pork", unit: "1kg", price: 2000 },
  { nameEn: "Pork Ribs", nameZh: "猪肋排", category: "Pork", unit: "1kg", price: 2200 },
  { nameEn: "Pork Loin", nameZh: "里脊肉", category: "Pork", unit: "1kg", price: 1900 },
  { nameEn: "Pork Tenderloin", nameZh: "小里脊", category: "Pork", unit: "500g", price: 1200 },
  { nameEn: "Pork Feet", nameZh: "猪蹄", category: "Pork", unit: "1kg", price: 1400 },
  { nameEn: "Pork Ears", nameZh: "猪耳朵", category: "Pork", unit: "500g", price: 800 },
  { nameEn: "Pork Liver", nameZh: "猪肝", category: "Pork", unit: "500g", price: 900 },
  { nameEn: "Pork Kidney", nameZh: "猪腰", category: "Pork", unit: "500g", price: 1000 },
  { nameEn: "Ground Pork", nameZh: "猪绞肉", category: "Pork", unit: "1kg", price: 1500 },
  { nameEn: "Pork Tongue", nameZh: "猪舌", category: "Pork", unit: "500g", price: 1300 },
  { nameEn: "Pork Intestine", nameZh: "猪大肠", category: "Pork", unit: "500g", price: 1100 },
  { nameEn: "Pork Skin", nameZh: "猪皮", category: "Pork", unit: "500g", price: 600 },
  { nameEn: "Pork Back Fat", nameZh: "猪板油", category: "Pork", unit: "500g", price: 500 },
  
  // Poultry
  { nameEn: "Whole Chicken", nameZh: "整鸡", category: "Poultry", unit: "1.5kg", price: 1200 },
  { nameEn: "Chicken Breast", nameZh: "鸡胸肉", category: "Poultry", unit: "1kg", price: 1400 },
  { nameEn: "Chicken Thigh", nameZh: "鸡腿肉", category: "Poultry", unit: "1kg", price: 1300 },
  { nameEn: "Chicken Wings", nameZh: "鸡翅", category: "Poultry", unit: "1kg", price: 1600 },
  { nameEn: "Chicken Drumsticks", nameZh: "鸡腿", category: "Poultry", unit: "1kg", price: 1500 },
  { nameEn: "Chicken Feet", nameZh: "凤爪", category: "Poultry", unit: "500g", price: 800 },
  { nameEn: "Chicken Liver", nameZh: "鸡肝", category: "Poultry", unit: "500g", price: 600 },
  { nameEn: "Chicken Gizzard", nameZh: "鸡胗", category: "Poultry", unit: "500g", price: 700 },
  { nameEn: "Chicken Heart", nameZh: "鸡心", category: "Poultry", unit: "500g", price: 650 },
  { nameEn: "Duck Breast", nameZh: "鸭胸肉", category: "Poultry", unit: "500g", price: 1800 },
  { nameEn: "Duck Legs", nameZh: "鸭腿", category: "Poultry", unit: "500g", price: 1600 },
  { nameEn: "Whole Duck", nameZh: "整鸭", category: "Poultry", unit: "2kg", price: 2500 },
  { nameEn: "Duck Tongue", nameZh: "鸭舌", category: "Poultry", unit: "200g", price: 1200 },
  { nameEn: "Quail", nameZh: "鹌鹑", category: "Poultry", unit: "6pcs", price: 1000 },
  { nameEn: "Turkey Breast", nameZh: "火鸡胸", category: "Poultry", unit: "1kg", price: 2200 },
  
  // Seafood
  { nameEn: "Shrimp (Large)", nameZh: "大虾", category: "Seafood", unit: "1kg", price: 3500 },
  { nameEn: "Shrimp (Medium)", nameZh: "中虾", category: "Seafood", unit: "1kg", price: 2800 },
  { nameEn: "Shrimp (Small)", nameZh: "小虾", category: "Seafood", unit: "1kg", price: 2200 },
  { nameEn: "Prawns", nameZh: "对虾", category: "Seafood", unit: "1kg", price: 4000 },
  { nameEn: "Crab", nameZh: "螃蟹", category: "Seafood", unit: "1kg", price: 4500 },
  { nameEn: "Lobster", nameZh: "龙虾", category: "Seafood", unit: "1kg", price: 8000 },
  { nameEn: "Squid", nameZh: "鱿鱼", category: "Seafood", unit: "1kg", price: 2500 },
  { nameEn: "Octopus", nameZh: "章鱼", category: "Seafood", unit: "1kg", price: 3000 },
  { nameEn: "Scallops", nameZh: "扇贝", category: "Seafood", unit: "500g", price: 3500 },
  { nameEn: "Clams", nameZh: "蛤蜊", category: "Seafood", unit: "1kg", price: 1800 },
  { nameEn: "Mussels", nameZh: "青口", category: "Seafood", unit: "1kg", price: 1600 },
  { nameEn: "Oysters", nameZh: "生蚝", category: "Seafood", unit: "12pcs", price: 3000 },
  { nameEn: "Sea Bass", nameZh: "鲈鱼", category: "Seafood", unit: "1kg", price: 2800 },
  { nameEn: "Salmon Fillet", nameZh: "三文鱼片", category: "Seafood", unit: "500g", price: 4500 },
  { nameEn: "Cod Fillet", nameZh: "鳕鱼片", category: "Seafood", unit: "500g", price: 3800 },
  { nameEn: "Tilapia", nameZh: "罗非鱼", category: "Seafood", unit: "1kg", price: 1800 },
  { nameEn: "Catfish", nameZh: "鲶鱼", category: "Seafood", unit: "1kg", price: 1600 },
  { nameEn: "Eel", nameZh: "鳗鱼", category: "Seafood", unit: "500g", price: 4000 },
  { nameEn: "Sea Cucumber", nameZh: "海参", category: "Seafood", unit: "200g", price: 8000 },
  { nameEn: "Abalone", nameZh: "鲍鱼", category: "Seafood", unit: "6pcs", price: 6000 },
  
  // Hotpot Base
  { nameEn: "Spicy Hotpot Base", nameZh: "麻辣火锅底料", category: "Hotpot Base", unit: "500g", price: 800 },
  { nameEn: "Tomato Hotpot Base", nameZh: "番茄火锅底料", category: "Hotpot Base", unit: "500g", price: 700 },
  { nameEn: "Mushroom Hotpot Base", nameZh: "菌菇火锅底料", category: "Hotpot Base", unit: "500g", price: 750 },
  { nameEn: "Bone Broth Hotpot Base", nameZh: "骨汤火锅底料", category: "Hotpot Base", unit: "500g", price: 850 },
  { nameEn: "Clear Broth Hotpot Base", nameZh: "清汤火锅底料", category: "Hotpot Base", unit: "500g", price: 650 },
  { nameEn: "Satay Hotpot Base", nameZh: "沙茶火锅底料", category: "Hotpot Base", unit: "500g", price: 900 },
  { nameEn: "Sichuan Spicy Base", nameZh: "四川麻辣底料", category: "Hotpot Base", unit: "1kg", price: 1500 },
  { nameEn: "Thai Tom Yum Base", nameZh: "泰式冬阴功底料", category: "Hotpot Base", unit: "500g", price: 1000 },
  { nameEn: "Japanese Miso Base", nameZh: "日式味噌底料", category: "Hotpot Base", unit: "500g", price: 1100 },
  { nameEn: "Curry Hotpot Base", nameZh: "咖喱火锅底料", category: "Hotpot Base", unit: "500g", price: 950 },
  
  // Beverages & Other
  { nameEn: "Soy Sauce", nameZh: "酱油", category: "Beverages & Other", unit: "1L", price: 600 },
  { nameEn: "Oyster Sauce", nameZh: "蚝油", category: "Beverages & Other", unit: "500ml", price: 800 },
  { nameEn: "Sesame Oil", nameZh: "麻油", category: "Beverages & Other", unit: "500ml", price: 900 },
  { nameEn: "Rice Vinegar", nameZh: "米醋", category: "Beverages & Other", unit: "500ml", price: 500 },
  { nameEn: "Chili Oil", nameZh: "辣椒油", category: "Beverages & Other", unit: "500ml", price: 700 },
  { nameEn: "Chinese Cooking Wine", nameZh: "料酒", category: "Beverages & Other", unit: "500ml", price: 600 },
  { nameEn: "Green Tea", nameZh: "绿茶", category: "Beverages & Other", unit: "100g", price: 1200 },
  { nameEn: "Jasmine Tea", nameZh: "茉莉花茶", category: "Beverages & Other", unit: "100g", price: 1000 },
  { nameEn: "Oolong Tea", nameZh: "乌龙茶", category: "Beverages & Other", unit: "100g", price: 1500 },
  { nameEn: "Herbal Tea", nameZh: "凉茶", category: "Beverages & Other", unit: "24x330ml", price: 2400 },
  { nameEn: "Coconut Water", nameZh: "椰子水", category: "Beverages & Other", unit: "12x500ml", price: 1800 },
  { nameEn: "Soy Milk", nameZh: "豆奶", category: "Beverages & Other", unit: "12x250ml", price: 1200 },
  { nameEn: "Rice Wine", nameZh: "米酒", category: "Beverages & Other", unit: "750ml", price: 1500 },
  { nameEn: "Plum Wine", nameZh: "梅酒", category: "Beverages & Other", unit: "750ml", price: 2000 },
  { nameEn: "Sake", nameZh: "清酒", category: "Beverages & Other", unit: "720ml", price: 2500 },
  { nameEn: "Soju", nameZh: "烧酒", category: "Beverages & Other", unit: "360ml", price: 800 },
  { nameEn: "Baijiu", nameZh: "白酒", category: "Beverages & Other", unit: "500ml", price: 3500 },
];

async function seed() {
  console.log("Seeding products...");
  
  // Clear existing products
  await db.delete(products);
  
  // Insert all products
  await db.insert(products).values(productData);
  
  console.log(`✅ Seeded ${productData.length} products`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
