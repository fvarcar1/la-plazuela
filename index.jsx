import React, { useState, useMemo, useEffect } from 'react';
import { 
  Utensils, 
  Coffee, 
  Beer, 
  ShoppingBag, 
  Search, 
  PhoneCall, 
  MessageCircle, 
  Info, 
  Heart, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Calendar, 
  Clock, 
  MapPin, 
  Award, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  PartyPopper
} from 'lucide-react';

// Database of Menu Items with high-quality Unsplash photography
const MENU_DATA = [
  // 1. ESPECIALIDADES
  {
    id: 'paella',
    name: 'Paella Casera de los Domingos',
    category: 'Especialidades',
    price: 8.50,
    description: 'Plato estrella de los domingos. Arroz meloso cocinado a fuego lento con marisco y carne fresca.',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=600',
    badge: 'Solo Domingos',
    popular: true
  },

  // 2. TAPAS FRÍAS
  {
    id: 'ensaladilla',
    name: 'Ensaladilla de la Casa',
    category: 'Tapas Frías',
    price: 3.80,
    description: 'Patata suave, melva seleccionada, mayonesa casera y un toque tradicional de Moguer.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600',
    popular: true
  },
  {
    id: 'papas-alioli',
    name: 'Papas Alioli',
    category: 'Tapas Frías',
    price: 3.80,
    description: 'Patatas cocidas en su punto con suave alioli casero de ajo y perejil fresco.',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'culantrada',
    name: 'Culantrada',
    category: 'Tapas Frías',
    price: 3.80,
    description: 'Tapa fría especial de la casa con condimento tradicional al estilo marinero.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600',
  },

  // 3. TAPAS CALIENTES Y PATATAS
  {
    id: 'solomillo-roquefort',
    name: 'Solomillo al Roquefort',
    category: 'Tapas Calientes',
    price: 4.50,
    description: 'Tiernos medallones de solomillo bañados en cremosa y sabrosa salsa roquefort.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    popular: true
  },
  {
    id: 'albondigas-pollo',
    name: 'Albóndigas de Pollo',
    category: 'Tapas Calientes',
    price: 4.50,
    description: 'Jugosas albóndigas caseras de pollo guisadas en salsa tradicional de verduras.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'patatas-fritas',
    name: 'Patatas Fritas Ración',
    category: 'Tapas Calientes',
    price: 1.50,
    description: 'Patatas cortadas al estilo tradicional, doradas y crujientes.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'patatas-bravas',
    name: 'Patatas Bravas',
    category: 'Tapas Calientes',
    price: 4.50,
    description: 'Patatas fritas acompañadas de nuestra picante y secreta salsa brava casera.',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'patatas-gratinadas',
    name: 'Patatas Gratinadas',
    category: 'Tapas Calientes',
    price: 4.50,
    description: 'Patatas al horno gratinadas con abundante mezcla de quesos y bacon crujiente.',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&q=80&w=600',
  },

  // 4. MONTADITOS
  {
    id: 'montadito-lomo',
    name: 'Montadito de Lomo',
    category: 'Montaditos',
    price: 4.00,
    description: 'Lomo de cerdo a la plancha en pan crujiente. Incluye guarnición de patatas.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'montadito-batista',
    name: 'Montadito Batista',
    category: 'Montaditos',
    price: 4.30,
    description: 'Lomo, queso viejo curado y jamón ibérico. Servido con patatas fritas.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600',
    popular: true
  },
  {
    id: 'montadito-huevo-beicon',
    name: 'Montadito Huevo + Beicon',
    category: 'Montaditos',
    price: 4.00,
    description: 'Huevo a la plancha y tiras de bacon doradas. Incluye patatas fritas.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'montadito-cabra',
    name: 'Montadito El Cabra',
    category: 'Montaditos',
    price: 4.50,
    description: 'Lomo a la plancha, cebolla caramelizada y medalla de queso de cabra. Con patatas.',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600',
    badge: 'Recomendado'
  },
  {
    id: 'montadito-manolito',
    name: 'Montadito Manolito',
    category: 'Montaditos',
    price: 4.50,
    description: 'Lomo, jamón, pimiento frito, queso viejo y sabrosa salsa verde. Con patatas.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'montadito-choco-alioli',
    name: 'Montadito Choco + Alioli',
    category: 'Montaditos',
    price: 4.50,
    description: 'Tiras de choco tierno a la plancha con salsa alioli de la casa. Con patatas.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'montadito-la-plazuela',
    name: 'Montadito La Plazuela',
    category: 'Montaditos',
    price: 4.50,
    description: 'Especialidad de la casa con combinados de la abuela. Servido con patatas.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600',
    badge: 'Casa'
  },

  // 5. BOCADILLOS ESPECIALES
  {
    id: 'serranito-lomo',
    name: 'Serranito de Lomo',
    category: 'Bocadillos Especiales',
    price: 5.80,
    description: 'Lomo fresco, tortilla, pimiento frito, tomate natural y lonchas de jamón.',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&q=80&w=600',
    popular: true
  },
  {
    id: 'serranito-pollo',
    name: 'Serranito de Pollo',
    category: 'Bocadillos Especiales',
    price: 5.80,
    description: 'Pechuga de pollo jugosa, tortilla, pimiento, tomate frito/natural y jamón.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'lomo-especial',
    name: 'Lomo Especial',
    category: 'Bocadillos Especiales',
    price: 5.80,
    description: 'Lomo a la plancha, queso fundido, tortilla francesa y bacon frito.',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'pollo-especial',
    name: 'Pollo Especial',
    category: 'Bocadillos Especiales',
    price: 5.80,
    description: 'Pechuga de pollo, queso derritiéndose, tortilla francesa y bacon crujiente.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bocadillo-choco',
    name: 'Bocadillo de Choco',
    category: 'Bocadillos Especiales',
    price: 6.00,
    description: 'Choco frito de la costa onubense con nuestra salsa especial de la casa.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=600',
    badge: 'Marisco'
  },
  {
    id: 'pavon',
    name: 'Bocadillo Pavón',
    category: 'Bocadillos Especiales',
    price: 6.00,
    description: 'Lomo, huevo frito, pimiento, queso de cabra, lechuga fresca y alioli suave.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
    popular: true
  },

  // 6. BOCADILLOS TRADICIONALES
  {
    id: 'bocadillo-pollo',
    name: 'Bocadillo de Pollo',
    category: 'Bocadillos',
    price: 4.00,
    description: 'Pechuga de pollo a la plancha en pan de barra recién horneado.',
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bocadillo-vicky',
    name: 'Bocadillo Vicky',
    category: 'Bocadillos',
    price: 4.50,
    description: 'Lomo, huevo frito, bacon crujiente y salsa alioli.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bocadillo-macmurri',
    name: 'Bocadillo Macmurri',
    category: 'Bocadillos',
    price: 4.30,
    description: 'Combinado especial de lomo sazonado y queso derretido.',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bocadillo-farruquito',
    name: 'Bocadillo Farruquito',
    category: 'Bocadillos',
    price: 4.50,
    description: 'Lomo, bacon crujiente, rodajas de tomate natural y huevo frito.',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bocadillo-pez-espada',
    name: 'Bocadillo de Pez Espada',
    category: 'Bocadillos',
    price: 4.50,
    description: 'Fillete de pez espada a la plancha con un toque de ajo y perejil.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bocadillo-lomo-completo',
    name: 'Bocadillo Lomo + Queso + Huevo + Bacon',
    category: 'Bocadillos',
    price: 4.80,
    description: 'El clásico bien cargado: lomo, queso fundido, huevo frito y tiras de bacon.',
    image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bocadillo-pollo-completo',
    name: 'Bocadillo Pollo + Queso + Huevo + Bacon',
    category: 'Bocadillos',
    price: 4.80,
    description: 'Pechuga a la plancha, queso, huevo frito y bacon frito.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=600',
  },

  // 7. HAMBURGUESAS
  {
    id: 'burguer-simple',
    name: 'Hamburguesa Simple + Papas',
    category: 'Hamburguesas',
    price: 2.50,
    description: 'Jugosa carne de hamburguesa a la plancha servida con patatas fritas.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'burguer-queso',
    name: 'Hamburguesa con Queso + Papas',
    category: 'Hamburguesas',
    price: 2.80,
    description: 'Carne a la parrilla con loncha de queso lonchero. Con patatas fritas.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'burguer-completa',
    name: 'Hamburguesa Completa + Papas',
    category: 'Hamburguesas',
    price: 3.80,
    description: 'Carne, lechuga fresca, tomate en rodajas, cebolla crujiente y queso. Con patatas.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'burguer-especial',
    name: 'Hamburguesa Especial + Papas',
    category: 'Hamburguesas',
    price: 4.80,
    description: 'Carne, huevo frito, jamón york, bacon, queso, lechuga, tomate y cebolla. Con patatas.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f6?auto=format&fit=crop&q=80&w=600',
    popular: true
  },
  {
    id: 'burguer-bomba',
    name: 'Hamburguesa La Bomba + Papas',
    category: 'Hamburguesas',
    price: 5.80,
    description: 'Doble de carne, queso fundido, huevo, bacon, jamón york, lechuga, tomate y cebolla. Con patatas.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600',
    badge: '🔥 Gigante',
    popular: true
  },

  // 8. PLATOS COMBINADOS Y PESCADOS
  {
    id: 'san-jacobo',
    name: 'San Jacobo Casero Completo',
    category: 'Platos Combinados',
    price: 8.00,
    description: 'San Jacobo empanado casero, acompañado de huevo frito, pimiento frito y patatas.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    popular: true
  },
  {
    id: 'pescada-ensalada',
    name: 'Pescada + Ensalada',
    category: 'Platos Combinados',
    price: 8.00,
    description: 'Lomos de pescada fresca frita o a la plancha con ensalada de la huerta.',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'pez-espada-plato',
    name: 'Pez Espada + Ensalada o Papas',
    category: 'Platos Combinados',
    price: 8.50,
    description: 'Pez espada jugoso a la plancha servido con tu elección de guarnición.',
    image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'choco-frito',
    name: 'Choco Frito (200g)',
    category: 'Platos Combinados',
    price: 7.50,
    description: 'Auténtico choco de Huelva cortado en tiras y frito a la perfección.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&q=80&w=600',
    badge: 'Típico Huelva',
    popular: true
  },
  {
    id: 'adobo-frito',
    name: 'Pescado en Adobo',
    category: 'Platos Combinados',
    price: 7.50,
    description: 'Pescado adobado con especias tradicionales y vinagre de Huelva, crujiente por fuera.',
    image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&q=80&w=600',
  },

  // 9. MENÚ INFANTIL
  {
    id: 'nuggets',
    name: 'Nuggets de Pollo + Papas',
    category: 'Menú Infantil',
    price: 3.80,
    description: 'Crujientes bocaditos de pollo frito con patatas fritas doradas.',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'croquetas-pollo',
    name: 'Croquetas de Pollo + Papas',
    category: 'Menú Infantil',
    price: 3.80,
    description: 'Croquetas caseras cremosas de pollo frito con patatas.',
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'lagrimitas-pollo',
    name: 'Lagrimitas de Pollo + Papas',
    category: 'Menú Infantil',
    price: 3.80,
    description: 'Tiras empanadas de pechuga de pollo muy jugosas con patatas.',
    image: 'https://images.unsplash.com/photo-1585325701165-351af916e581?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'perrito-caliente',
    name: 'Perrito Caliente + Papas',
    category: 'Menú Infantil',
    price: 3.00,
    description: 'Salchicha sabrosa en pan tierno con patatas fritas de acompañamiento.',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&q=80&w=600',
  },

  // 10. BEBIDAS
  {
    id: 'cana',
    name: 'Caña de Cerveza',
    category: 'Bebidas',
    price: 1.60,
    description: 'Cerveza muy fría tirada al momento con su crema perfecta.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'jarra-grande',
    name: 'Jarra Grande de Cerveza',
    category: 'Bebidas',
    price: 3.20,
    description: 'Jarra helada de cerveza bien fría.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'estrella-galicia',
    name: '1/3 Estrella Galicia',
    category: 'Bebidas',
    price: 2.30,
    description: 'Botellín tercio de Estrella Galicia.',
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'cruzcampo',
    name: '1/3 Cruzcampo',
    category: 'Bebidas',
    price: 2.30,
    description: 'El clásico tercio de Cruzcampo de Andalucía.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'heineken',
    name: 'Heineken / Heineken 00',
    category: 'Bebidas',
    price: 2.50,
    description: 'Cerveza Heineken tradicional o sin alcohol 0.0.',
    image: 'https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'radler',
    name: 'Cerveza Radler / Tostada 00',
    category: 'Bebidas',
    price: 2.50,
    description: 'Cerveza con limón o tostada 0.0 refrescante.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'cruzcampo-sin-gluten',
    name: 'Cruzcampo Sin Gluten',
    category: 'Bebidas',
    price: 2.50,
    description: 'Apta para celíacos con todo el sabor tradicional.',
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'refrescos',
    name: 'Refrescos (Coca-Cola, Fanta, Locura)',
    category: 'Bebidas',
    price: 1.60,
    description: 'Coca-Cola (Normal, Zero, 0.0), Fanta Naranja o Limón, Locura.',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'nestea-aquarius',
    name: 'Nestea / Aquarius / Tinto de Verano',
    category: 'Bebidas',
    price: 1.70,
    description: 'Nestea al limón, Aquarius refrescante o Tinto de verano con gas.',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'zumos-tonica',
    name: 'Bio / Zumo / Tónica',
    category: 'Bebidas',
    price: 1.80,
    description: 'Bio Tropical, Bio Pacífico, Zumo de piña o melocotón, Tónica.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'agua',
    name: 'Agua Mineral (Chica 1,00€ / Grande 1,80€)',
    category: 'Bebidas',
    price: 1.00,
    description: 'Agua mineral embotellada muy fría.',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=600',
  }
];

const CATEGORIES = [
  'Todos',
  'Especialidades',
  'Tapas Frías',
  'Tapas Calientes',
  'Montaditos',
  'Bocadillos Especiales',
  'Bocadillos',
  'Hamburguesas',
  'Platos Combinados',
  'Menú Infantil',
  'Bebidas'
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('carta'); // 'carta' | 'cumples' | 'alergenos'
  const [favorites, setFavorites] = useState([]);
  const [tableNumber, setTableNumber] = useState('');
  const [orderType, setOrderType] = useState('mesa'); // 'mesa' | 'llevar'

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('plazuela_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch(e){}
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem('plazuela_cart', JSON.stringify(cart));
  }, [cart]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Cart operations
  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[productId] > 1) {
        updated[productId] -= 1;
      } else {
        delete updated[productId];
      }
      return updated;
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  // Calculations
  const cartItemCount = useMemo(() => {
    return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const item = MENU_DATA.find(p => p.id === id);
      return total + (item ? item.price * qty : 0);
    }, 0);
  }, [cart]);

  // Build WhatsApp Message
  const handleWhatsAppOrder = () => {
    if (Object.keys(cart).length === 0) return;

    let message = `¡Hola! 👋 Quisiera realizar el siguiente pedido para *La Plazuela*:\n\n`;
    message += `📋 *TIPO:* ${orderType === 'mesa' ? `Para servir en Mesa ${tableNumber || 'Sin definir'}` : 'Para Recoger / Para Llevar'}\n\n`;
    message += `🛒 *DETALLE DEL PEDIDO:*\n`;

    Object.entries(cart).forEach(([id, qty]) => {
      const item = MENU_DATA.find(p => p.id === id);
      if (item) {
        message += `• ${qty}x ${item.name} - ${(item.price * qty).toFixed(2)}€\n`;
      }
    });

    message += `\n💰 *TOTAL ESTIMADO:* ${cartTotal.toFixed(2)}€\n\n`;
    message += `¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/34653423859?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-amber-50/40 text-stone-800 font-sans pb-24">
      {/* TOP PROMO BANNER */}
      <div className="bg-amber-900 text-amber-100 text-xs sm:text-sm py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
        <span>¡Todos los domingos tenemos <strong>Paella Casera</strong>! Haz tu reserva con antelación.</span>
      </div>

      {/* HEADER & HERO */}
      <header className="relative bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-6xl mx-auto px-4 py-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" /> Moguer, Huelva
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-amber-100 font-serif">
              LA PLAZUELA
            </h1>
            <p className="text-amber-200/80 text-sm sm:text-base font-light max-w-md">
              Tapas caseras, bocadillos especiales, raciones y buenos momentos en Moguer.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-amber-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Abierto para Almuerzos y Cenas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <a href="tel:653423859" className="hover:underline font-bold text-amber-300">653 423 859</a>
              </div>
            </div>
          </div>

          {/* Quick Actions Header Buttons */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:653423859"
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-amber-600/30 active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Llamar</span>
            </a>
            <a 
              href="https://wa.me/34653423859"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-emerald-600/30 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="border-t border-amber-900/50 bg-stone-950/40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 flex justify-center md:justify-start gap-2">
            <button
              onClick={() => setActiveTab('carta')}
              className={`py-3 px-5 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'carta'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-amber-200'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Nuestra Carta
            </button>
            <button
              onClick={() => setActiveTab('cumples')}
              className={`py-3 px-5 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'cumples'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-amber-200'
              }`}
            >
              <PartyPopper className="w-4 h-4" />
              Cumpleaños y Menús
            </button>
            <button
              onClick={() => setActiveTab('alergenos')}
              className={`py-3 px-5 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === 'alergenos'
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-stone-400 hover:text-amber-200'
              }`}
            >
              <Info className="w-4 h-4" />
              Alérgenos e Info
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'carta' && (
          <>
            {/* SEARCH & CATEGORY SELECTOR */}
            <div className="sticky top-0 z-30 bg-amber-50/90 backdrop-blur-md py-3 space-y-3 -mx-4 px-4 shadow-sm border-b border-amber-200/60">
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Buscar churros, bocadillos, serranitos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-amber-200 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30 scale-105'
                        : 'bg-white text-stone-600 hover:bg-amber-100/80 border border-amber-200/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Utensils className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="text-lg font-bold text-stone-600">No se encontraron productos</h3>
                <p className="text-sm text-stone-400">Intenta buscar con otra palabra o selecciona otra categoría.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {filteredProducts.map((product) => {
                  const qtyInCart = cart[product.id] || 0;
                  const isFav = favorites.includes(product.id);

                  return (
                    <div 
                      key={product.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Container */}
                        <div className="relative h-48 overflow-hidden bg-stone-100">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          
                          {/* Badges */}
                          {product.badge && (
                            <span className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                              {product.badge}
                            </span>
                          )}

                          {/* Favorite Button */}
                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-stone-700 transition-colors shadow-sm"
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : ''}`} />
                          </button>

                          {/* Price Tag on Image */}
                          <div className="absolute bottom-3 right-3 bg-stone-900/90 text-amber-300 font-extrabold text-base px-3 py-1 rounded-xl backdrop-blur-md border border-amber-500/30 shadow-lg">
                            {product.price.toFixed(2)} €
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-stone-800 text-base group-hover:text-amber-700 transition-colors">
                              {product.name}
                            </h3>
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Footer / Add to Cart */}
                      <div className="p-4 pt-0">
                        {qtyInCart === 0 ? (
                          <button
                            onClick={() => addToCart(product.id)}
                            className="w-full py-2.5 px-4 bg-amber-100 hover:bg-amber-600 text-amber-900 hover:text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Añadir a mi selección</span>
                          </button>
                        ) : (
                          <div className="flex items-center justify-between bg-amber-50 p-1.5 rounded-xl border border-amber-200">
                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="w-8 h-8 rounded-lg bg-white shadow text-amber-800 flex items-center justify-center font-bold hover:bg-amber-200 transition-colors active:scale-90"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-extrabold text-amber-900 text-sm">
                              {qtyInCart} en la lista
                            </span>
                            <button
                              onClick={() => addToCart(product.id)}
                              className="w-8 h-8 rounded-lg bg-amber-600 shadow text-white flex items-center justify-center font-bold hover:bg-amber-700 transition-colors active:scale-90"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* TAB 2: CUMPLEAÑOS Y EVENTOS */}
        {activeTab === 'cumples' && (
          <div className="max-w-3xl mx-auto space-y-6 py-4">
            <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 bg-amber-400/20 px-3 py-1 rounded-full text-amber-200 text-xs font-semibold">
                  <PartyPopper className="w-4 h-4" /> ¡Celebraciones inolvidables!
                </div>
                <h2 className="text-3xl font-extrabold font-serif">Celebra tu Cumpleaños en La Plazuela</h2>
                <p className="text-amber-100 text-sm leading-relaxed">
                  Disponemos de menús especiales ajustados para niños y adultos. Pregúntanos sin compromiso y reservamos el mejor espacio para ti y tus invitados.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <a 
                    href="tel:653423859"
                    className="bg-white text-amber-900 px-6 py-3 rounded-2xl font-bold text-sm shadow-md hover:bg-amber-100 transition-colors"
                  >
                    Llamar para Reservar (653 423 859)
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-3">
                <h3 className="font-bold text-stone-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" /> Menús Infantiles
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Platos adaptados con nuggets, croquetas caseras, hamburguesitas o perritos calientes con patatas, refrescos y postres.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-amber-100 shadow-sm space-y-3">
                <h3 className="font-bold text-stone-800 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" /> Tapas y Raciones
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Organizamos menús de picoteo y raciones para grupos grandes con reserva previa.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ALÉRGENOS E INFORMACIÓN */}
        {activeTab === 'alergenos' && (
          <div className="max-w-3xl mx-auto space-y-6 py-4">
            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-amber-800">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <h2 className="text-xl font-bold">Información de Alérgenos</h2>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">
                En cumplimiento del Reglamento (UE) nº 1169/2011, disponemos de información detallada sobre los ingredientes y alérgenos de cada una de nuestras elaboraciones.
              </p>
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-bold">⚠️ Nota importante sobre celíacos e intolerancias:</p>
                <p>
                  Si usted padece alguna alergia o intolerancia alimentaria, por favor infórmelo a nuestro personal antes de realizar su pedido. Contamos con <strong>Cruzcampo Sin Gluten</strong> y opciones adaptadas.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-4">
              <h3 className="font-bold text-stone-800 text-base">Ubicación y Contacto</h3>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>Moguer, Huelva (España)</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>Teléfono de Encargos: <strong>653 423 859</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Especialidad Domingo: Paella Casera</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FLOATING CART BUTTON */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-amber-600 hover:bg-amber-500 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 border-2 border-amber-300"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-stone-900 text-amber-300 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center border border-amber-400">
                {cartItemCount}
              </span>
            </div>
            <span className="font-bold text-sm hidden sm:inline pr-1">
              Ver Selección ({cartTotal.toFixed(2)} €)
            </span>
          </button>
        </div>
      )}

      {/* CART / ACCOUNT MODAL */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                <h2 className="font-bold text-base">Tu Cuenta / Pedido Estimado</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {/* Order Options */}
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 space-y-3">
                <span className="text-xs font-bold text-amber-900 block">¿Dónde estás comiendo?</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOrderType('mesa')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                      orderType === 'mesa'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-stone-600 border-stone-200'
                    }`}
                  >
                    En Mesa
                  </button>
                  <button
                    onClick={() => setOrderType('llevar')}
                    className={`py-2 text-xs font-bold rounded-xl border transition-colors ${
                      orderType === 'llevar'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white text-stone-600 border-stone-200'
                    }`}
                  >
                    Para Llevar
                  </button>
                </div>

                {orderType === 'mesa' && (
                  <input
                    type="text"
                    placeholder="Escribe tu número de Mesa (ej: Mesa 4)"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                )}
              </div>

              {Object.entries(cart).length === 0 ? (
                <div className="text-center py-12 text-stone-400 space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto opacity-40" />
                  <p className="text-sm">No has añadido productos a la lista todavía.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {Object.entries(cart).map(([id, qty]) => {
                    const item = MENU_DATA.find(p => p.id === id);
                    if (!item) return null;

                    return (
                      <div key={id} className="flex items-center justify-between p-3 bg-stone-50 rounded-2xl border border-stone-100">
                        <div className="flex-1 pr-2">
                          <h4 className="font-bold text-stone-800 text-xs sm:text-sm">{item.name}</h4>
                          <span className="text-xs text-amber-700 font-semibold">{item.price.toFixed(2)} € / unid</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(id)}
                            className="w-7 h-7 rounded-lg bg-white border border-stone-200 text-stone-600 flex items-center justify-center font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-extrabold w-4 text-center">{qty}</span>
                          <button
                            onClick={() => addToCart(id)}
                            className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer / Total & WhatsApp Action */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between text-base font-black text-stone-900">
                <span>Total Estimado:</span>
                <span className="text-xl text-amber-600">{cartTotal.toFixed(2)} €</span>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                disabled={Object.keys(cart).length === 0}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Encargo por WhatsApp</span>
              </button>

              <p className="text-[10px] text-center text-stone-400">
                La Plazuela Moguer • Teléfono directos: 653 423 859
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}