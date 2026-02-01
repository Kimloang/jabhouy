import { Product, Category } from './types.ts';

export const CATEGORIES: Category[] = [
  { id: 'chips', name: 'Chips', icon: 'lunch_dining', color: 'bg-orange-100 text-primary dark:bg-orange-900/30' },
  { id: 'sweets', name: 'Sweets', icon: 'cookie', color: 'bg-pink-100 text-pink-500 dark:bg-pink-900/30' },
  { id: 'healthy', name: 'Healthy', icon: 'nutrition', color: 'bg-green-100 text-green-500 dark:bg-green-900/30' },
  { id: 'drinks', name: 'Drinks', icon: 'local_drink', color: 'bg-blue-100 text-blue-500 dark:bg-blue-900/30' },
];

export const PRODUCTS: Product[] = [
    {
        "id": "1",
        "name": "Salted Caramel Popcorn",
        "price": 3.50,
        "weight": "150g",
        "imageUrl": "https://lh3.googleusercontent.com/aida-public/AB6AXuARRhyBMpjrwDBFeISqGutlAFkoqjm-xXjkt9zakOPcI13LI_rQDfZQCpFyC8Z1MuwHMt844S2JKmWz8zzNFfgaNYFH8UZRA7HRh0JXBa-fLbzBE5HuMYlWGY3Uk-0zz2rj6dHsOO5ySkA-9whHF95lBQTWRzWBxLqu_-Iim9KhfOCOmpXgvK44FrkTvZHOMH_n-_Woe__mVG5gv8-10B-WF5218w12fp885s3fIKtl7wCJiSP2w97kQG5CgSo-L2Xee_NEz_he798",
        "category": "sweets",
        "isNew": true,
        "isLimited": false,
        "description": "Our signature kernels are air-popped to perfection and coated in a rich, buttery salted caramel glaze.",
        "highlights": [
            "Gluten Free",
            "Hand-Crafted"
        ]
    },
    {
        "id": "2",
        "name": "Truffle Oil Potato Chips",
        "price": 4.20,
        "weight": "120g",
        "imageUrl": "https://images.pexels.com/photos/1582482/pexels-photo-1582482.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": true,
        "isLimited": true,
        "description": "Premium potato chips fried in sunflower oil and seasoned with authentic black truffle.",
        "highlights": [
            "Vegan",
            "Premium"
        ]
    },
    {
        "id": "3",
        "name": "Dark Chocolate Almonds",
        "price": 5.99,
        "weight": "200g",
        "imageUrl": "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "sweets",
        "isNew": false,
        "isLimited": false,
        "description": "Roasted almonds covered in 70% dark chocolate. A healthy and indulgent treat.",
        "highlights": [
            "Antioxidants",
            "Low Sugar"
        ]
    },
    {
        "id": "4",
        "name": "Honey Roasted Cashews",
        "price": 6.50,
        "weight": "180g",
        "imageUrl": "https://images.pexels.com/photos/3735190/pexels-photo-3735190.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "Crunchy cashews roasted with honey and a pinch of sea salt.",
        "highlights": [
            "Protein Rich",
            "Sweet & Salty"
        ]
    },
    {
        "id": "5",
        "name": "Gummy Bears Assortment",
        "price": 2.50,
        "weight": "100g",
        "imageUrl": "https://cdn11.bigcommerce.com/s-riqk6cih6h/images/stencil/640w/products/470/2076/50117_albanese-sour-assorted-fruit-gummi-bears__61056.1670859014.png",
        "category": "sweets",
        "isNew": false,
        "isLimited": false,
        "description": "Classic fruit-flavored gummy bears. Chewy, colorful, and delicious.",
        "highlights": [
            "Fat Free",
            "Kids Favorite"
        ]
    },
    {
        "id": "6",
        "name": "Sea Salt Pretzels",
        "price": 3.00,
        "weight": "150g",
        "imageUrl": "https://images.pexels.com/photos/5702956/pexels-photo-5702956.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "Traditional twisted pretzels sprinkled with coarse sea salt.",
        "highlights": [
            "Baked",
            "Low Fat"
        ]
    },
    {
        "id": "7",
        "name": "Beef Jerky Original",
        "price": 7.99,
        "weight": "80g",
        "imageUrl": "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": true,
        "description": "High-protein beef jerky marinated in a savory blend of spices and smoked to perfection.",
        "highlights": [
            "High Protein",
            "Keto Friendly"
        ]
    },
    {
        "id": "8",
        "name": "Dried Mango Slices",
        "price": 4.99,
        "weight": "120g",
        "imageUrl": "https://images.pexels.com/photos/1300975/pexels-photo-1300975.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": true,
        "isLimited": false,
        "description": "Naturally sweet dried mango slices with no added sugar.",
        "highlights": [
            "No Added Sugar",
            "Natural"
        ]
    },
    {
        "id": "9",
        "name": "Wasabi Peas",
        "price": 3.25,
        "weight": "140g",
        "imageUrl": "https://images.pexels.com/photos/3735190/pexels-photo-3735190.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "Crunchy green peas coated in spicy wasabi. A snack with a kick!",
        "highlights": [
            "Spicy",
            "Fiber Rich"
        ]
    },
    {
        "id": "10",
        "name": "Double Chocolate Cookies",
        "price": 4.50,
        "weight": "200g",
        "imageUrl": "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "sweets",
        "isNew": false,
        "isLimited": false,
        "description": "Soft-baked cookies loaded with chocolate chunks and cocoa.",
        "highlights": [
            "Indulgent",
            "Freshly Baked"
        ]
    },
    {
        "id": "11",
        "name": "Granola Bar Variety Pack",
        "price": 5.50,
        "weight": "250g",
        "imageUrl": "https://images.pexels.com/photos/86649/pexels-photo-86649.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "A mix of oats, nuts, and honey. Perfect for on-the-go energy.",
        "highlights": [
            "Whole Grain",
            "Energy Boost"
        ]
    },
    {
        "id": "12",
        "name": "Fruit Chews",
        "price": 2.00,
        "weight": "100g",
        "imageUrl": "https://images.pexels.com/photos/1906435/pexels-photo-1906435.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "sweets",
        "isNew": false,
        "isLimited": false,
        "description": "Soft and chewy fruit candies in strawberry, orange, and lemon flavors.",
        "highlights": [
            "Natural Flavors",
            "Gluten Free"
        ]
    },
    {
        "id": "13",
        "name": "Cheese Puffs",
        "price": 2.99,
        "weight": "130g",
        "imageUrl": "https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "Airy and crunchy corn puffs coated in real cheddar cheese.",
        "highlights": [
            "Real Cheese",
            "Baked"
        ]
    },
    {
        "id": "14",
        "name": "Tortilla Chips",
        "price": 3.50,
        "weight": "300g",
        "imageUrl": "https://images.pexels.com/photos/2092906/pexels-photo-2092906.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "Authentic corn tortilla chips, perfect for dipping.",
        "highlights": [
            "Non-GMO",
            "Corn"
        ]
    },
    {
        "id": "15",
        "name": "Mild Salsa Dip",
        "price": 3.99,
        "weight": "400g",
        "imageUrl": "https://images.pexels.com/photos/5737254/pexels-photo-5737254.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "Tomato-based salsa with onions, peppers, and mild spices.",
        "highlights": [
            "Low Calorie",
            "Vegetarian"
        ]
    },
    {
        "id": "16",
        "name": "Hummus Chips",
        "price": 3.75,
        "weight": "110g",
        "imageUrl": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": true,
        "isLimited": false,
        "description": "Crispy chips made from chickpea flour and seasoned with sea salt.",
        "highlights": [
            "Gluten Free",
            "Plant Based"
        ]
    },
    {
        "id": "17",
        "name": "Trail Mix Energy",
        "price": 6.99,
        "weight": "250g",
        "imageUrl": "https://images.pexels.com/photos/3992134/pexels-photo-3992134.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "A power-packed mix of nuts, seeds, dried fruit, and chocolate drops.",
        "highlights": [
            "High Energy",
            "Hiking Essential"
        ]
    },
    {
        "id": "18",
        "name": "Shortbread Cookies",
        "price": 5.25,
        "weight": "180g",
        "imageUrl": "https://images.pexels.com/photos/298217/pexels-photo-298217.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "sweets",
        "isNew": false,
        "isLimited": true,
        "description": "Buttery, melt-in-your-mouth Scottish style shortbread.",
        "highlights": [
            "Traditional Recipe",
            "Butter"
        ]
    },
    {
        "id": "19",
        "name": "Rice Crackers",
        "price": 2.75,
        "weight": "100g",
        "imageUrl": "https://images.pexels.com/photos/6210747/pexels-photo-6210747.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "chips",
        "isNew": false,
        "isLimited": false,
        "description": "Light and crispy rice crackers with a soy sauce glaze.",
        "highlights": [
            "Low Fat",
            "Asian Style"
        ]
    },
    {
        "id": "20",
        "name": "Matcha Green Tea KitKat",
        "price": 1.50,
        "weight": "45g",
        "imageUrl": "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=600",
        "category": "sweets",
        "isNew": true,
        "isLimited": true,
        "description": "Crispy wafer fingers covered in green tea flavored white chocolate.",
        "highlights": [
            "Imported",
            "Unique Flavor"
        ]
    }
];

export const HIGHLIGHTS = [
  {
    id: 'h1',
    name: 'Truffle Potato Chips',
    info: 'Artisanal flavor from $3.99',
    badge: 'Trending',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1F0hNvnERTC-UJpAOYvWgZIJmUH6tvXOUYPnG6L8sr-2duatbaDiMpzYJ_TjGBs4VHTHtx2Zk9rBodi8SFD-8E3qsUvxXgjCIeTv_r66v2OVmOvKU7Q1wjgiXeXQgm_HEenIFYvpgwH4iEm2W55D1w-Wtz7JuVm5jdvyt8r2U4_wyRBT9v97AdIRPiRPo4Q8keBxWrPLtnzfAGoFGRFm7Hj6yn5ruquTgmmLQfuyHC0f0DkxgMginBImFhtnylBNMQWbBFcXnyxA'
  }
];