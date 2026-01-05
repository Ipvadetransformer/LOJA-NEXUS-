
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ProductPage from './components/ProductPage';
import AIChat from './components/AIChat';
import { PRODUCTS, CATEGORIES, DENTAL_PRODUCT } from './constants';
import { Product, CartItem } from './types';
// Added Star to the imports from lucide-react
import { X, ShoppingBag, Trash2, Plus, Minus, Star } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [view, setView] = useState<'home' | 'product'>('home');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = selectedCategory === 'all' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleProductClick = (product: Product) => {
    if (product.id === DENTAL_PRODUCT.id) {
      setView('product');
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      {view === 'home' ? (
        <main className="max-w-[1440px] mx-auto">
          <Hero />

          {/* Categories Carousel */}
          <section className="py-20 px-6 md:px-12 lg:px-20">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-10">Explorar Categorías</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    const el = document.getElementById('products');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-sm"
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                  <button className="absolute bottom-8 left-8 bg-white text-nikeBlack px-8 py-3 rounded-full font-bold uppercase text-xs shadow-lg transform group-hover:-translate-y-1 transition-transform">
                    {cat.name}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Banner de Oferta */}
          <section className="bg-nikeYellow py-5 text-center overflow-hidden relative border-y border-nikeBlack/5">
            <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-nikeBlack font-black uppercase text-sm mx-8 flex items-center gap-2">
                    <Star size={14} fill="currentColor"/> ENVÍO GRATIS EN COMPRAS MAYORES A $150.000 COP
                  </span>
                ))}
            </div>
          </section>

          {/* Product Grid */}
          <section id="products" className="py-24 px-6 md:px-12 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Equipamiento Premium</h2>
                <p className="text-gray-500 font-medium uppercase text-sm tracking-widest mt-2">Lo mejor para el rendimiento diario</p>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto">
                {['all', 'mascotas', 'belleza', 'bienestar'].map(slug => (
                  <button 
                    key={slug}
                    onClick={() => setSelectedCategory(slug)}
                    className={`text-sm font-bold uppercase px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === slug ? 'bg-nikeBlack text-white' : 'bg-nikeGray hover:bg-gray-200'
                    }`}
                  >
                    {slug === 'all' ? 'Todos' : slug}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-16 gap-x-8">
              {filteredProducts.map(product => (
                <div key={product.id} onClick={() => handleProductClick(product)}>
                  <ProductCard product={product} onAddToCart={addToCart} />
                </div>
              ))}
            </div>
          </section>

          {/* Featured Product Promo */}
          <section className="px-6 md:px-12 lg:px-20 mb-24">
            <div className="relative h-[600px] rounded-sm overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover" alt="Promo" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-16 left-16 text-white max-w-xl">
                <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 leading-none">CUIDA SU SONRISA CON PROFESIONALISMO</h3>
                <button 
                  onClick={() => setView('product')}
                  className="bg-white text-nikeBlack px-12 py-4 rounded-full font-bold uppercase text-sm hover:scale-105 transition-all shadow-2xl"
                >
                  Ver Kit Dental
                </button>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <ProductPage onBack={() => setView('home')} onAddToCart={addToCart} />
      )}

      <footer className="bg-nikeBlack text-white pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 border-b border-gray-800 pb-20">
            <div className="space-y-6">
              <h3 className="font-black uppercase tracking-tighter text-2xl">NEXUS<span className="text-nikeRedOrange">TIENDA</span></h3>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">Elevando el estándar de cuidado integral en Colombia. Una experiencia de bienestar para todos los miembros de la familia.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-nikeRedOrange cursor-pointer transition-all">
                  <span className="text-xs font-bold">IG</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-nikeRedOrange cursor-pointer transition-all">
                  <span className="text-xs font-bold">FB</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-nikeRedOrange cursor-pointer transition-all">
                  <span className="text-xs font-bold">TK</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest mb-8">ASISTENCIA</h4>
              <ul className="text-xs text-gray-400 space-y-4 font-medium uppercase tracking-wider">
                <li className="hover:text-white cursor-pointer transition-colors">Estado del pedido</li>
                <li className="hover:text-white cursor-pointer transition-colors">Envíos y entregas</li>
                <li className="hover:text-white cursor-pointer transition-colors">Devoluciones</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contacto</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest mb-8">COMPAÑÍA</h4>
              <ul className="text-xs text-gray-400 space-y-4 font-medium uppercase tracking-wider">
                <li className="hover:text-white cursor-pointer transition-colors">Sobre Nexus</li>
                <li className="hover:text-white cursor-pointer transition-colors">Sostenibilidad</li>
                <li className="hover:text-white cursor-pointer transition-colors">Carreras</li>
                <li className="hover:text-white cursor-pointer transition-colors">Inversionistas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black uppercase text-sm tracking-widest mb-8">NEWSLETTER</h4>
              <p className="text-xs text-gray-400 mb-6 uppercase leading-relaxed font-bold">Sé el primero en enterarte de nuevos lanzamientos y ofertas.</p>
              <div className="flex items-center border-b border-gray-700 py-2">
                <input type="email" placeholder="Email" className="bg-transparent border-none outline-none text-xs w-full uppercase" />
                <button className="font-black text-xs uppercase text-nikeRedOrange">OK</button>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
            <div className="flex flex-wrap justify-center gap-8">
              <span>© 2024 NexusTienda Colombia</span>
              <span className="hover:text-white cursor-pointer">Guías</span>
              <span className="hover:text-white cursor-pointer">Términos de uso</span>
              <span className="hover:text-white cursor-pointer">Privacidad</span>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-nikeRedOrange">COLOMBIA</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-500">
            <div className="flex flex-col h-full">
              <div className="p-8 flex items-center justify-between border-b border-gray-100">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Cesta ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <ShoppingBag size={80} className="text-gray-100" />
                    <p className="font-black text-gray-400 uppercase tracking-tighter text-lg">Tu cesta está vacía</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-nikeBlack text-white px-10 py-4 rounded-full font-black uppercase text-xs hover:scale-105 transition-all"
                    >
                      Empezar a comprar
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-6 animate-in fade-in slide-in-from-bottom-2">
                      <img src={item.image} alt={item.name} className="w-28 h-28 object-cover bg-nikeGray rounded-sm flex-shrink-0" />
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-black text-xs uppercase tracking-tight leading-tight max-w-[140px]">{item.name}</h3>
                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-nikeRedOrange transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-gray-400 text-[10px] uppercase font-bold mt-1 tracking-wider">{item.category}</p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center bg-nikeGray rounded-full px-3 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-nikeRedOrange transition-colors"><Minus size={14}/></button>
                            <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-nikeRedOrange transition-colors"><Plus size={14}/></button>
                          </div>
                          <p className="font-black text-sm">
                             {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 border-t border-gray-100 bg-nikeGray/20 space-y-6">
                  <div className="flex justify-between items-center font-black uppercase tracking-tighter text-xl">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(cartTotal)}</span>
                  </div>
                  <button className="w-full bg-nikeBlack text-white py-5 rounded-full font-black uppercase tracking-tighter hover:bg-nikeRedOrange transition-all shadow-xl">
                    Tramitar Pedido
                  </button>
                  <p className="text-[9px] text-gray-400 text-center uppercase font-bold tracking-widest">Envíos rápidos a toda Colombia • Devoluciones gratuitas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* AI Chatbot Widget */}
      <AIChat />

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          animation: marquee 30s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;
