import React, { useState, useMemo, useEffect } from 'react';
import {
  ShoppingBag,
  Store,
  LayoutDashboard,
  Package,
  Receipt,
  Search,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Printer,
  TrendingUp,
  CreditCard,
  Phone,
  MapPin,
  Globe,
  Settings,
  X,
  Filter,
  BarChart3,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Heart,
  Eye,
  Check,
  Building,
  Truck,
  Download,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_PRODUCTS = [
  {
    id: 'PQ-101',
    sku: 'NK-PRL-01',
    name: 'Royal Kundan & Pearl Haar Set',
    category: 'Necklace Sets',
    price: 4850,
    cost: 2200,
    storeStock: 12,
    warehouseStock: 35,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600',
    description: '22K gold-plated antique Kundan necklace encrusted with high-grade freshwater cultured pearls and drop emerald stones.',
    isFeatured: true
  },
  {
    id: 'PQ-102',
    sku: 'ER-JHM-08',
    name: 'Meenakari Chandbali Earrings',
    category: 'Earrings',
    price: 1850,
    cost: 750,
    storeStock: 8,
    warehouseStock: 20,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600',
    description: 'Exquisite hand-painted red Meenakari chandbalis topped with pearl clusters and cubic zirconia accents.',
    isFeatured: true
  },
  {
    id: 'PQ-103',
    sku: 'BN-GLD-12',
    name: 'Rajwadi Gold-Plated Kadas (Set of 2)',
    category: 'Bangles',
    price: 3200,
    cost: 1400,
    storeStock: 4,
    warehouseStock: 15,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1611591475140-be38b738edd1?auto=format&fit=crop&q=80&w=600',
    description: 'Traditional openable brass bangles plated in 24K gold foil with intricate floral filigree engraving.',
    isFeatured: true
  },
  {
    id: 'PQ-104',
    sku: 'BD-SET-04',
    name: 'Imperial Pearl Bridal Choker Set',
    category: 'Bridal Sets',
    price: 12500,
    cost: 6000,
    storeStock: 2,
    warehouseStock: 5,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600',
    description: 'Complete heavy bridal set with multi-strand pearl choker, earrings, maang tikka, and nath (nose ring).',
    isFeatured: true
  },
  {
    id: 'PQ-105',
    sku: 'RG-SOL-02',
    name: 'Polki Diamond Solitaire Ring',
    category: 'Rings',
    price: 1450,
    cost: 500,
    storeStock: 18,
    warehouseStock: 40,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600',
    description: 'Adjustable size ring featuring an uncut Polki CZ stone set in rhodium-plated brass.',
    isFeatured: false
  },
  {
    id: 'PQ-106',
    sku: 'NK-PRL-09',
    name: 'Baroque Pearl Single Strand Chain',
    category: 'Pearl Collections',
    price: 2600,
    cost: 1100,
    storeStock: 15,
    warehouseStock: 22,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&q=80&w=600',
    description: 'Lustrous natural baroque freshwater pearls on an 18K gold toggle chain.',
    isFeatured: true
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-9841',
    type: 'Online',
    customer: 'Nusrat Jahan',
    phone: '01711223344',
    items: [{ name: 'Royal Kundan & Pearl Haar Set', qty: 1, price: 4850 }],
    total: 4930, // +80 shipping
    paymentMethod: 'bKash',
    status: 'Shipped',
    date: '2026-10-28 14:32',
    deliveryAddress: 'Gulshan 2, Dhaka'
  },
  {
    id: 'POS-1092',
    type: 'POS Store',
    customer: 'Walk-in Customer',
    phone: 'N/A',
    items: [{ name: 'Meenakari Chandbali Earrings', qty: 2, price: 1850 }],
    total: 3700,
    paymentMethod: 'Cash',
    status: 'Completed',
    date: '2026-10-28 16:15',
    deliveryAddress: 'Banani Outlet Counter'
  }
];

const INITIAL_EXPENSES = [
  { id: 'EXP-101', category: 'Banani Rent', amount: 45000, date: '2026-10-01' },
  { id: 'EXP-102', category: 'Packaging & Boxes', amount: 12000, date: '2026-10-10' },
  { id: 'EXP-103', category: 'FB & Insta Ads', amount: 18500, date: '2026-10-18' }
];

export default function App() {
  // Navigation Tabs: 'storefront' | 'pos' | 'dashboard' | 'inventory' | 'orders' | 'accounts'
  const [activeTab, setActiveTab] = useState('storefront');

  // Application Shared State
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);

  // E-Commerce Storefront Cart & State
  const [onlineCart, setOnlineCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // modal quick view
  const [wishlist, setWishlist] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [foundOrder, setFoundOrder] = useState(null);

  // Online Checkout Form State
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    address: '',
    cityRegion: 'inside_dhaka',
    paymentMethod: 'cod',
    mfsNumber: '',
    mfsTrxId: ''
  });

  // POS State
  const [posCart, setPosCart] = useState([]);
  const [posSearch, setPosSearch] = useState('');
  const [posCustomer, setPosCustomer] = useState({ name: 'Walk-in Customer', phone: '' });
  const [posDiscount, setPosDiscount] = useState(0); // flat BDT discount
  const [posPaymentMethod, setPosPaymentMethod] = useState('Cash');
  const [activeReceipt, setActiveReceipt] = useState(null);

  // Modal / Form Management
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);

  // New Product Form
  const [newProduct, setNewProduct] = useState({
    sku: '',
    name: '',
    category: 'Necklace Sets',
    price: '',
    cost: '',
    storeStock: '',
    warehouseStock: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600'
  });

  // New Expense Form
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: ''
  });

  // --- CALCULATED VALUES ---
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const onlineSubtotal = useMemo(() => {
    return onlineCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [onlineCart]);

  const deliveryCharge = checkoutForm.cityRegion === 'inside_dhaka' ? 80 : 150;
  const onlineTotal = onlineSubtotal > 0 ? onlineSubtotal + deliveryCharge : 0;

  const posSubtotal = useMemo(() => {
    return posCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [posCart]);

  const posTotal = Math.max(0, posSubtotal - posDiscount);

  // Total Business Metrics
  const totalRevenue = useMemo(() => orders.reduce((sum, o) => sum + o.total, 0), [orders]);
  const totalExpenseSum = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
  const totalCostOfGoods = useMemo(() => {
    return orders.reduce((sum, o) => {
      // rough COGS based on catalog cost matching
      const itemsCost = o.items.reduce((iSum, i) => {
        const prod = products.find((p) => p.name === i.name);
        return iSum + (prod ? prod.cost * i.qty : i.price * 0.4 * i.qty);
      }, 0);
      return sum + itemsCost;
    }, 0);
  }, [orders, products]);

  const netProfit = totalRevenue - totalCostOfGoods - totalExpenseSum;

  // --- ACTIONS ---
  const handleAddToCartOnline = (prod) => {
    setOnlineCart((prev) => {
      const existing = prev.find((p) => p.id === prod.id);
      if (existing) {
        return prev.map((p) => (p.id === prod.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const handleAddToCartPos = (prod) => {
    if (prod.storeStock <= 0) {
      alert('Warning: This item has 0 local store stock!');
    }
    setPosCart((prev) => {
      const existing = prev.find((p) => p.id === prod.id);
      if (existing) {
        return prev.map((p) => (p.id === prod.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...prod, qty: 1 }];
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  // Process Online Order
  const handlePlaceOnlineOrder = (e) => {
    e.preventDefault();
    if (onlineCart.length === 0) return;

    const newOrd = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'Online',
      customer: checkoutForm.name,
      phone: checkoutForm.phone,
      items: onlineCart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total: onlineTotal,
      paymentMethod: checkoutForm.paymentMethod.toUpperCase(),
      status: 'Pending',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      deliveryAddress: `${checkoutForm.address} (${checkoutForm.cityRegion === 'inside_dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})`
    };

    // Deduct stock from warehouse
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = onlineCart.find((ci) => ci.id === p.id);
        if (cartItem) {
          return { ...p, warehouseStock: Math.max(0, p.warehouseStock - cartItem.qty) };
        }
        return p;
      })
    );

    setOrders([newOrd, ...orders]);
    setOnlineCart([]);
    setIsCheckoutOpen(false);
    alert(`Order Placed Successfully! Your Order Tracking ID is: ${newOrd.id}`);
  };

  // Process POS Order
  const handleCompletePosSale = () => {
    if (posCart.length === 0) return;

    const newOrd = {
      id: `POS-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'POS Store',
      customer: posCustomer.name || 'Walk-in Customer',
      phone: posCustomer.phone || 'N/A',
      items: posCart.map((i) => ({ name: i.name, qty: i.qty, price: i.price })),
      total: posTotal,
      paymentMethod: posPaymentMethod,
      status: 'Completed',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      deliveryAddress: 'Banani Flagship Counter'
    };

    // Deduct stock from physical store
    setProducts((prev) =>
      prev.map((p) => {
        const cartItem = posCart.find((ci) => ci.id === p.id);
        if (cartItem) {
          return { ...p, storeStock: Math.max(0, p.storeStock - cartItem.qty) };
        }
        return p;
      })
    );

    setOrders([newOrd, ...orders]);
    setActiveReceipt({ ...newOrd, discount: posDiscount, subtotal: posSubtotal });
    setPosCart([]);
    setPosDiscount(0);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const prod = {
      ...newProduct,
      id: `PQ-${Math.floor(100 + Math.random() * 900)}`,
      price: parseFloat(newProduct.price) || 0,
      cost: parseFloat(newProduct.cost) || 0,
      storeStock: parseInt(newProduct.storeStock) || 0,
      warehouseStock: parseInt(newProduct.warehouseStock) || 0,
      rating: 5.0,
      isFeatured: false
    };
    setProducts([...products, prod]);
    setIsAddProductOpen(false);
    setNewProduct({
      sku: '',
      name: '',
      category: 'Necklace Sets',
      price: '',
      cost: '',
      storeStock: '',
      warehouseStock: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600'
    });
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    const exp = {
      id: `EXP-${Math.floor(100 + Math.random() * 900)}`,
      category: newExpense.category,
      amount: parseFloat(newExpense.amount) || 0,
      date: new Date().toISOString().split('T')[0]
    };
    setExpenses([exp, ...expenses]);
    setIsAddExpenseOpen(false);
    setNewExpense({ category: '', amount: '' });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleTrackOrder = () => {
    const found = orders.find((o) => o.id.toLowerCase() === trackingId.trim().toLowerCase());
    setFoundOrder(found || 'not_found');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-slate-100 font-sans flex flex-col antialiased selection:bg-amber-500 selection:text-black">
      {/* TOP APPLICATION CONTROL BAR */}
      <header className="bg-neutral-900 border-b border-amber-500/20 sticky top-0 z-40 px-4 lg:px-8 py-3 flex items-center justify-between shadow-xl backdrop-blur-md bg-opacity-95">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-amber-600 to-yellow-400 p-2 rounded-xl text-neutral-950 shadow-lg shadow-amber-500/10">
            <Sparkles className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent uppercase">
              PEARL QUEENDOM
            </span>
            <p className="text-[10px] text-amber-300/60 font-mono tracking-widest uppercase">
              Imitation Fine Jewelry • Enterprise Suite
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="hidden md:flex items-center space-x-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setActiveTab('storefront')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'storefront'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900'
            }`}
          >
            <Globe className="w-4 h-4" /> E-Commerce Shop
          </button>
          <button
            onClick={() => setActiveTab('pos')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'pos'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900'
            }`}
          >
            <Store className="w-4 h-4" /> Smart POS
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Analytics
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'inventory'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900'
            }`}
          >
            <Package className="w-4 h-4" /> Inventory & Stores
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900'
            }`}
          >
            <Receipt className="w-4 h-4" /> All Orders
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'accounts'
                ? 'bg-amber-500 text-neutral-950 shadow-md font-bold'
                : 'text-neutral-400 hover:text-amber-200 hover:bg-neutral-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Accounts & P&L
          </button>
        </nav>

        {/* TOP UTILITIES */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsDomainModalOpen(true)}
            className="hidden lg:flex items-center gap-2 text-xs bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg transition"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" /> Domain: pearlqueendom.com
          </button>
        </div>
      </header>

      {/* MOBILE NAVIGATION BAR */}
      <div className="md:hidden flex overflow-x-auto bg-neutral-900 border-b border-neutral-800 p-2 gap-2 text-xs">
        {['storefront', 'pos', 'dashboard', 'inventory', 'orders', 'accounts'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md capitalize whitespace-nowrap ${
              activeTab === tab ? 'bg-amber-500 text-neutral-950 font-bold' : 'bg-neutral-800 text-neutral-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">
        {/* ========================================================= */}
        {/* TAB 1: E-COMMERCE ONLINE STOREFRONT                       */}
        {/* ========================================================= */}
        {activeTab === 'storefront' && (
          <div className="min-h-full pb-16">
            {/* HERO BANNER */}
            <section className="relative bg-gradient-to-r from-neutral-950 via-neutral-900 to-amber-950/40 border-b border-amber-500/20 py-16 px-6 lg:px-12 overflow-hidden">
              <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="max-w-xl space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Sparkles className="w-3.5 h-3.5" /> Premium Royal Collection 2026
                  </span>
                  <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-100 leading-tight">
                    Timeless Elegance in Every Craft.
                  </h1>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    Explore luxury Kundan, Baroque Pearls, Meenakari, and Antique Gold-Plated imitation jewelry designed for royalty. Instant express delivery all across Bangladesh.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <a
                      href="#catalog"
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                    >
                      Shop Collection <ChevronRight className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setIsTrackingOpen(true)}
                      className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 rounded-xl text-sm font-semibold transition flex items-center gap-2"
                    >
                      <Truck className="w-4 h-4 text-amber-400" /> Track My Order
                    </button>
                  </div>
                </div>

                {/* HERO STAT CARD */}
                <div className="w-full md:w-80 bg-neutral-900/80 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="text-xs text-neutral-400">Cart Total</span>
                    <span className="text-xl font-bold text-amber-400">৳{onlineTotal.toLocaleString()}</span>
                  </div>
                  <div className="space-y-2 text-xs text-neutral-300">
                    <p className="flex justify-between">
                      <span>Items in Cart:</span>
                      <span className="font-bold text-white">{onlineCart.reduce((s, i) => s + i.qty, 0)}</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Delivery (BD):</span>
                      <span className="text-neutral-400">Inside ৳80 | Outside ৳150</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (onlineCart.length > 0) setIsCheckoutOpen(true);
                      else alert('Your cart is empty! Add items from below.');
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-neutral-950 font-bold rounded-lg text-xs uppercase tracking-wider transition shadow"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </section>

            {/* CATALOG FILTER & SEARCH */}
            <div id="catalog" className="max-w-7xl mx-auto px-4 lg:px-8 pt-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                  {['All', 'Necklace Sets', 'Earrings', 'Bangles', 'Bridal Sets', 'Rings', 'Pearl Collections'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                          selectedCategory === cat
                            ? 'bg-amber-500 text-neutral-950 font-bold shadow'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:border-amber-500/40 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    )
                  )}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search Jewelry..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 outline-none transition"
                  />
                </div>
              </div>

              {/* PRODUCT GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-neutral-900/90 border border-neutral-800 hover:border-amber-500/40 rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-56 overflow-hidden bg-neutral-950">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition ${
                            wishlist.includes(prod.id)
                              ? 'bg-rose-500 text-white'
                              : 'bg-neutral-900/70 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        <div className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded-md text-[10px] font-mono border border-amber-500/30">
                          SKU: {prod.sku}
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-semibold text-amber-400/80 tracking-wider">
                            {prod.category}
                          </span>
                          <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                            ★ {prod.rating}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-neutral-100 line-clamp-1">{prod.name}</h3>
                        <p className="text-xs text-neutral-400 line-clamp-2">{prod.description}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 space-y-3">
                      <div className="flex items-baseline justify-between border-t border-neutral-800 pt-3">
                        <div>
                          <span className="text-xs text-neutral-500 font-mono">Price:</span>
                          <p className="text-lg font-bold text-amber-300">৳{prod.price.toLocaleString()}</p>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            prod.warehouseStock > 0
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          }`}
                        >
                          {prod.warehouseStock > 0 ? 'In Stock' : 'Stock Out'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        <button
                          onClick={() => handleAddToCartOnline(prod)}
                          className="py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shadow"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: IN-STORE SMART POS SYSTEM                         */}
        {/* ========================================================= */}
        {activeTab === 'pos' && (
          <div className="p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-80px)]">
            {/* POS Left: Product Catalog Selection (8 Cols) */}
            <div className="lg:col-span-7 flex flex-col bg-neutral-900 border border-neutral-800 rounded-2xl p-4 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-neutral-800 pb-4">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Scan Barcode / Search Name..."
                    value={posSearch}
                    onChange={(e) => setPosSearch(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                  {['All', 'Necklace Sets', 'Earrings', 'Bangles', 'Bridal Sets'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-neutral-950'
                          : 'bg-neutral-950 text-neutral-400 border border-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* POS Product Grid */}
              <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                {products
                  .filter(
                    (p) =>
                      (selectedCategory === 'All' || p.category === selectedCategory) &&
                      (p.name.toLowerCase().includes(posSearch.toLowerCase()) ||
                        p.sku.toLowerCase().includes(posSearch.toLowerCase()))
                  )
                  .map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => handleAddToCartPos(prod)}
                      className="bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 p-3 rounded-xl text-left transition flex flex-col justify-between group relative overflow-hidden"
                    >
                      <div>
                        <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          {prod.sku}
                        </span>
                        <h4 className="text-xs font-semibold text-neutral-200 mt-1 line-clamp-1 group-hover:text-amber-300">
                          {prod.name}
                        </h4>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-neutral-900 pt-2">
                        <span className="text-xs font-bold text-amber-300">৳{prod.price}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            prod.storeStock > 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          Stock: {prod.storeStock}
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* POS Right: Checkout Cart & Billing Counter (5 Cols) */}
            <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Store className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white">Banani Counter Billing</h3>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Terminal #01</span>
                </div>

                {/* Customer Registry */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={posCustomer.name}
                    onChange={(e) => setPosCustomer({ ...posCustomer, name: e.target.value })}
                    className="bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Phone (017...)"
                    value={posCustomer.phone}
                    onChange={(e) => setPosCustomer({ ...posCustomer, phone: e.target.value })}
                    className="bg-neutral-950 border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                </div>

                {/* Cart Items Table */}
                <div className="max-h-60 overflow-y-auto space-y-2 border-t border-b border-neutral-800 py-3">
                  {posCart.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500 text-xs">
                      No items in counter cart. Click products to add.
                    </div>
                  ) : (
                    posCart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-neutral-950 p-2 rounded-lg">
                        <div className="flex-1 pr-2">
                          <p className="text-xs font-semibold text-neutral-200 line-clamp-1">{item.name}</p>
                          <span className="text-[10px] text-amber-400 font-mono">৳{item.price} each</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-neutral-800 rounded">
                            <button
                              onClick={() =>
                                setPosCart((prev) =>
                                  prev.map((p) => (p.id === item.id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
                                )
                              }
                              className="px-2 text-xs text-neutral-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-white">{item.qty}</span>
                            <button
                              onClick={() =>
                                setPosCart((prev) =>
                                  prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p))
                                )
                              }
                              className="px-2 text-xs text-neutral-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-white w-16 text-right">
                            ৳{(item.price * item.qty).toLocaleString()}
                          </span>
                          <button
                            onClick={() => setPosCart((prev) => prev.filter((p) => p.id !== item.id))}
                            className="text-neutral-500 hover:text-rose-400"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* POS Payment Calculation */}
              <div className="space-y-3 pt-3 border-t border-neutral-800">
                <div className="space-y-1.5 text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-white">৳{posSubtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Flat Discount (৳):</span>
                    <input
                      type="number"
                      value={posDiscount}
                      onChange={(e) => setPosDiscount(parseFloat(e.target.value) || 0)}
                      className="w-24 bg-neutral-950 border border-neutral-800 rounded px-2 py-1 text-right text-xs text-amber-400 font-bold"
                    />
                  </div>
                  <div className="flex justify-between text-base font-bold text-amber-300 border-t border-neutral-800 pt-2">
                    <span>Grand Total:</span>
                    <span>৳{posTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  {['Cash', 'bKash / MFS', 'Card'].map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setPosPaymentMethod(pm)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition ${
                        posPaymentMethod === pm
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleCompletePosSale}
                  disabled={posCart.length === 0}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-50 text-neutral-950 font-extrabold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4" /> Settle & Print Receipt
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: BACK-OFFICE ANALYTICS DASHBOARD                    */}
        {/* ========================================================= */}
        {activeTab === 'dashboard' && (
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Business Intelligence Dashboard</h2>
                <p className="text-xs text-neutral-400">Live operational overview across physical retail and digital storefront</p>
              </div>
              <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-mono">
                Live Sync Active
              </span>
            </div>

            {/* METRIC CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Total Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-2xl font-extrabold text-white">৳{totalRevenue.toLocaleString()}</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" /> +14.2% this month
                </p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Total Sales Count</span>
                  <Receipt className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-extrabold text-white">{orders.length} Orders</p>
                <p className="text-[10px] text-neutral-400">POS & Online orders</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Net Profit (Est.)</span>
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-2xl font-extrabold text-amber-400">৳{netProfit.toLocaleString()}</p>
                <p className="text-[10px] text-neutral-400">After COGS & Operational Expenses</p>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between text-neutral-400">
                  <span className="text-xs font-semibold">Low Stock Warnings</span>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                </div>
                <p className="text-2xl font-extrabold text-rose-400">
                  {products.filter((p) => p.storeStock < 5 || p.warehouseStock < 10).length} Items
                </p>
                <p className="text-[10px] text-neutral-400">Requires restocking</p>
              </div>
            </div>

            {/* CHANNEL BREAKDOWN & RECENT ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales by Channel */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" /> Channel Sales Distribution
                </h3>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-300">Banani Physical Store (POS)</span>
                      <span className="text-amber-400 font-mono">
                        ৳{orders.filter((o) => o.type === 'POS Store').reduce((s, o) => s + o.total, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-2/3"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-neutral-300">Online E-Commerce Website</span>
                      <span className="text-amber-400 font-mono">
                        ৳{orders.filter((o) => o.type === 'Online').reduce((s, o) => s + o.total, 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-yellow-400 h-full w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold text-white">Management Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="p-4 bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 rounded-xl text-left transition space-y-1 group"
                  >
                    <Plus className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
                    <p className="text-xs font-bold text-white">Add New Jewelry</p>
                    <p className="text-[10px] text-neutral-400">Create SKU and set pricing</p>
                  </button>

                  <button
                    onClick={() => setIsAddExpenseOpen(true)}
                    className="p-4 bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 rounded-xl text-left transition space-y-1 group"
                  >
                    <DollarSign className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
                    <p className="text-xs font-bold text-white">Record Expense</p>
                    <p className="text-[10px] text-neutral-400">Rent, Ads, Packaging</p>
                  </button>

                  <button
                    onClick={() => setIsDomainModalOpen(true)}
                    className="p-4 bg-neutral-950 border border-neutral-800 hover:border-amber-500/50 rounded-xl text-left transition space-y-1 group col-span-2"
                  >
                    <Globe className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
                    <p className="text-xs font-bold text-white">Domain Mapping Settings</p>
                    <p className="text-[10px] text-neutral-400">www.pearlqueendom.com DNS Instructions</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: MULTI-STORE INVENTORY MANAGEMENT                    */}
        {/* ========================================================= */}
        {activeTab === 'inventory' && (
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Multi-Store & Warehouse Stock</h2>
                <p className="text-xs text-neutral-400">Track and allocate inventory across physical outlet and central warehouse</p>
              </div>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition flex items-center gap-2 self-start"
              >
                <Plus className="w-4 h-4" /> Add New SKU
              </button>
            </div>

            {/* Inventory Table */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-950 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                      <th className="p-4">SKU / Product</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Retail Price</th>
                      <th className="p-4">Unit Cost</th>
                      <th className="p-4">Banani Store Stock</th>
                      <th className="p-4">Warehouse Stock</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-xs">
                    {products.map((item) => (
                      <tr key={item.id} className="hover:bg-neutral-950/50 transition">
                        <td className="p-4 flex items-center gap-3">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg bg-neutral-950" />
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <span className="text-[10px] text-amber-400 font-mono">{item.sku}</span>
                          </div>
                        </td>
                        <td className="p-4 text-neutral-300">{item.category}</td>
                        <td className="p-4 font-bold text-amber-300">৳{item.price.toLocaleString()}</td>
                        <td className="p-4 font-mono text-neutral-400">৳{item.cost.toLocaleString()}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded font-mono font-bold ${
                              item.storeStock < 5 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'text-emerald-400'
                            }`}
                          >
                            {item.storeStock} pcs
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded font-mono font-bold ${
                              item.warehouseStock < 10 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-neutral-200'
                            }`}
                          >
                            {item.warehouseStock} pcs
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => {
                              const addAmount = prompt(`Add store stock for ${item.name}:`, '5');
                              if (addAmount && !isNaN(parseInt(addAmount))) {
                                setProducts((prev) =>
                                  prev.map((p) =>
                                    p.id === item.id ? { ...p, storeStock: p.storeStock + parseInt(addAmount) } : p
                                  )
                                );
                              }
                            }}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-amber-300 rounded text-[11px] transition"
                          >
                            Restock
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: CENTRAL ORDER MANAGEMENT QUEUE                      */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Central Order Queue</h2>
                <p className="text-xs text-neutral-400">Manage both online web orders and physical store receipts</p>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-neutral-950 text-[11px] uppercase tracking-wider text-neutral-400 border-b border-neutral-800">
                      <th className="p-4">Order ID & Date</th>
                      <th className="p-4">Channel</th>
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Items</th>
                      <th className="p-4">Total Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Update Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-xs">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-neutral-950/50 transition">
                        <td className="p-4">
                          <p className="font-bold text-amber-400 font-mono">{ord.id}</p>
                          <span className="text-[10px] text-neutral-500">{ord.date}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.type === 'Online'
                                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            }`}
                          >
                            {ord.type}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-white">{ord.customer}</p>
                          <p className="text-[10px] text-neutral-400">{ord.phone}</p>
                          <p className="text-[10px] text-neutral-500 truncate max-w-xs">{ord.deliveryAddress}</p>
                        </td>
                        <td className="p-4 text-neutral-300">
                          {ord.items.map((i, idx) => (
                            <div key={idx} className="text-[11px]">
                              • {i.name} x{i.qty}
                            </div>
                          ))}
                        </td>
                        <td className="p-4 font-bold text-amber-300">
                          ৳{ord.total.toLocaleString()}
                          <span className="block text-[9px] font-mono text-neutral-500">{ord.paymentMethod}</span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold ${
                              ord.status === 'Completed'
                                ? 'bg-emerald-500/10 text-emerald-400'
                                : ord.status === 'Shipped'
                                ? 'bg-blue-500/10 text-blue-400'
                                : 'bg-amber-500/10 text-amber-400'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                            className="bg-neutral-950 border border-neutral-800 text-xs text-amber-300 rounded px-2 py-1 outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: ACCOUNTS & EXPENSE LEDGER                          */}
        {/* ========================================================= */}
        {activeTab === 'accounts' && (
          <div className="p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Financial & Expense Ledger</h2>
                <p className="text-xs text-neutral-400">Track operating expenses, profits, and outlet cashflow</p>
              </div>
              <button
                onClick={() => setIsAddExpenseOpen(true)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Record Operational Expense
              </button>
            </div>

            {/* P&L Breakdown Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                <span className="text-xs text-neutral-400">Total Gross Income</span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">৳{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                <span className="text-xs text-neutral-400">Total Expenses Logged</span>
                <p className="text-2xl font-bold text-rose-400 mt-1">৳{totalExpenseSum.toLocaleString()}</p>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                <span className="text-xs text-neutral-400">Est. COGS (Jewelry Cost)</span>
                <p className="text-2xl font-bold text-amber-400 mt-1">৳{totalCostOfGoods.toLocaleString()}</p>
              </div>
            </div>

            {/* Expenses List */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Expense History</h3>
              <div className="divide-y divide-neutral-800">
                {expenses.map((exp) => (
                  <div key={exp.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{exp.category}</p>
                      <span className="text-[10px] text-neutral-500">{exp.date}</span>
                    </div>
                    <span className="font-bold text-rose-400 font-mono">৳{exp.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* MODAL 1: ONLINE CHECKOUT MODAL                            */}
      {/* ========================================================= */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-amber-300">Complete Jewelry Order</h3>
              <button onClick={() => setIsCheckoutOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePlaceOnlineOrder} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="text-neutral-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nusrat Jahan"
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-neutral-300">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 01712345678"
                  value={checkoutForm.phone}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-neutral-300">Delivery Address in Bangladesh</label>
                <textarea
                  required
                  rows="2"
                  placeholder="House #, Road #, Area, Thana..."
                  value={checkoutForm.address}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-neutral-300">Delivery Zone</label>
                <select
                  value={checkoutForm.cityRegion}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, cityRegion: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-white"
                >
                  <option value="inside_dhaka">Inside Dhaka (৳80 Delivery)</option>
                  <option value="outside_dhaka">Outside Dhaka (৳150 Delivery)</option>
                </select>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-800">
                <label className="text-neutral-300 font-bold block">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'cod', label: 'Cash on Delivery' },
                    { id: 'bkash', label: 'bKash / Nagad / Rocket' }
                  ].map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: m.id })}
                      className={`p-2.5 rounded-lg border text-left transition ${
                        checkoutForm.paymentMethod === m.id
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {checkoutForm.paymentMethod === 'bkash' && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-2">
                  <p className="text-[11px] text-amber-300">
                    Send Money to Merchant bKash: <span className="font-mono font-bold">01700-000000</span>
                  </p>
                  <input
                    type="text"
                    placeholder="bKash/Nagad Sender Number"
                    value={checkoutForm.mfsNumber}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, mfsNumber: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Transaction ID (TrxID)"
                    value={checkoutForm.mfsTrxId}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, mfsTrxId: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
              )}

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-neutral-400 block text-[10px]">Grand Total</span>
                  <span className="text-lg font-bold text-amber-400">৳{onlineTotal.toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs shadow"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ORDER TRACKING MODAL                             */}
      {/* ========================================================= */}
      {isTrackingOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-amber-300">Track Customer Order</h3>
              <button
                onClick={() => {
                  setIsTrackingOpen(false);
                  setFoundOrder(null);
                  setTrackingId('');
                }}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ORD-9841)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white uppercase"
              />
              <button
                onClick={handleTrackOrder}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs"
              >
                Search
              </button>
            </div>

            {foundOrder === 'not_found' && (
              <p className="text-xs text-rose-400 text-center py-4">No order found with ID: {trackingId}</p>
            )}

            {foundOrder && typeof foundOrder === 'object' && (
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-neutral-900 pb-2">
                  <span className="font-bold text-amber-400">{foundOrder.id}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                    {foundOrder.status}
                  </span>
                </div>
                <p className="text-neutral-300">Customer: {foundOrder.customer}</p>
                <p className="text-neutral-400">Delivery Address: {foundOrder.deliveryAddress}</p>
                <div className="border-t border-neutral-900 pt-2">
                  <p className="text-neutral-400 font-bold mb-1">Ordered Items:</p>
                  {foundOrder.items.map((i, idx) => (
                    <p key={idx} className="text-neutral-300">
                      • {i.name} x{i.qty}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: PRODUCT QUICK VIEW MODAL                          */}
      {/* ========================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-2xl w-full p-6 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 md:h-full object-cover rounded-xl bg-neutral-950"
            />

            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                  {selectedProduct.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedProduct.name}</h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="space-y-3 border-t border-neutral-800 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-neutral-500">Price:</span>
                  <span className="text-2xl font-bold text-amber-300">৳{selectedProduct.price.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    handleAddToCartOnline(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Online Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: ADD NEW JEWELRY SKU                               */}
      {/* ========================================================= */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-amber-300">Add New Jewelry Item</h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400">SKU Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NK-PRL-12"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  >
                    <option value="Necklace Sets">Necklace Sets</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bangles">Bangles</option>
                    <option value="Bridal Sets">Bridal Sets</option>
                    <option value="Rings">Rings</option>
                    <option value="Pearl Collections">Pearl Collections</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-neutral-400">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vintage Kundan Choker Set"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400">Retail Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400">Cost Price (৳)</label>
                  <input
                    type="number"
                    required
                    value={newProduct.cost}
                    onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400">Banani Store Stock</label>
                  <input
                    type="number"
                    required
                    value={newProduct.storeStock}
                    onChange={(e) => setNewProduct({ ...newProduct, storeStock: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-neutral-400">Warehouse Stock</label>
                  <input
                    type="number"
                    required
                    value={newProduct.warehouseStock}
                    onChange={(e) => setNewProduct({ ...newProduct, warehouseStock: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition"
              >
                Save & Add to Catalog
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: EXPENSE RECORD MODAL                             */}
      {/* ========================================================= */}
      {isAddExpenseOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-sm w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-base font-bold text-amber-300">Record Operational Expense</h3>
              <button onClick={() => setIsAddExpenseOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400">Category / Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FB Ad Spend / Box Packaging"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="text-neutral-400">Amount (৳)</label>
                <input
                  type="number"
                  required
                  placeholder="5000"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition"
              >
                Log Expense Entry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 6: DOMAIN INTEGRATION INSTRUCTIONS                  */}
      {/* ========================================================= */}
      {isDomainModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-amber-300">www.pearlqueendom.com Integration</h3>
              </div>
              <button onClick={() => setIsDomainModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 leading-relaxed">
              <p className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300">
                Your domain <strong>www.pearlqueendom.com</strong> can be mapped directly to this web application software. Follow the DNS DNS configuration steps below in your domain registrar panel (Namecheap, GoDaddy, or local registrar).
              </p>

              <h4 className="font-bold text-white pt-2">Step 1: Configure DNS Records</h4>
              <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono space-y-2 text-[11px]">
                <p>
                  <span className="text-amber-400 font-bold">Type:</span> A Record |{' '}
                  <span className="text-amber-400 font-bold">Host:</span> @ |{' '}
                  <span className="text-amber-400 font-bold">Value:</span> 185.199.108.153
                </p>
                <p>
                  <span className="text-amber-400 font-bold">Type:</span> CNAME Record |{' '}
                  <span className="text-amber-400 font-bold">Host:</span> www |{' '}
                  <span className="text-amber-400 font-bold">Value:</span> pearlqueendom.github.io
                </p>
              </div>

              <h4 className="font-bold text-white pt-2">Step 2: Free Hosting & SSL Deployment</h4>
              <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                <li>Deploy this application code to Vercel, Netlify, or GitHub Pages.</li>
                <li>Add <code className="text-amber-300">pearlqueendom.com</code> in your project settings under 'Domains'.</li>
                <li>Free SSL Certificate (HTTPS) will automatically generate within 10 minutes.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 7: PRINTABLE POS RECEIPT MODAL                      */}
      {/* ========================================================= */}
      {activeReceipt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl max-w-sm w-full p-6 space-y-4 text-white">
            <div className="text-center border-b border-neutral-800 pb-3">
              <h2 className="text-lg font-bold text-amber-400">PEARL QUEENDOM</h2>
              <p className="text-[10px] text-neutral-400">Banani Outlet • Dhaka, Bangladesh</p>
              <p className="text-[10px] text-neutral-500 font-mono">Receipt: {activeReceipt.id}</p>
            </div>

            <div className="text-xs space-y-2">
              <p>
                <span className="text-neutral-400">Customer:</span> {activeReceipt.customer}
              </p>
              <p>
                <span className="text-neutral-400">Date:</span> {activeReceipt.date}
              </p>

              <div className="border-t border-b border-neutral-800 py-2 space-y-1">
                {activeReceipt.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {i.name} x{i.qty}
                    </span>
                    <span className="font-mono">৳{(i.price * i.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 pt-1 font-mono text-xs">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>৳{activeReceipt.subtotal.toLocaleString()}</span>
                </div>
                {activeReceipt.discount > 0 && (
                  <div className="flex justify-between text-rose-400">
                    <span>Discount:</span>
                    <span>-৳{activeReceipt.discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-amber-300 text-sm border-t border-neutral-800 pt-1">
                  <span>Paid ({activeReceipt.paymentMethod}):</span>
                  <span>৳{activeReceipt.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg text-xs transition flex items-center justify-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}