
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Mascotas', image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800', slug: 'mascotas' },
  { id: '2', name: 'Cuidado Facial', image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800', slug: 'belleza' },
  { id: '3', name: 'Suplementos', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800', slug: 'bienestar' },
  { id: '4', name: 'Accesorios', image: 'https://images.unsplash.com/photo-1525286103776-95f07bf894a0?auto=format&fit=crop&q=80&w=800', slug: 'accesorios' },
];

export const DENTAL_PRODUCT: Product = {
  id: 'p7',
  name: 'Kit Dental Pro Tutti-Frutti',
  category: 'mascotas',
  price: 65000,
  description: 'Higiene bucal completa 3-en-1. Incluye gel sabor tutti-frutti, cepillo largo de doble cabezal y dos dedales de silicona para una limpieza sin estrés.',
  image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800',
  isNew: true,
  rating: 4.9
};

export const PRODUCTS: Product[] = [
  DENTAL_PRODUCT,
  {
    id: 'p1',
    name: 'Cama Ortopédica para Perros',
    category: 'mascotas',
    price: 185000,
    description: 'Comodidad máxima para tu mejor amigo.',
    image: 'https://images.unsplash.com/photo-1591946614421-1dbf52d3db11?auto=format&fit=crop&q=80&w=800',
    isNew: true,
    rating: 4.8
  },
  {
    id: 'p2',
    name: 'Sérum Ácido Hialurónico',
    category: 'belleza',
    price: 75000,
    description: 'Hidratación profunda para un rostro radiante.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    isNew: false,
    rating: 4.9
  },
  {
    id: 'p3',
    name: 'Proteína Vegetal Orgánica',
    category: 'bienestar',
    price: 120000,
    description: 'Energía natural para tu día a día.',
    image: 'https://images.unsplash.com/photo-1593094439170-a39b7a7ea5bf?auto=format&fit=crop&q=80&w=800',
    isNew: true,
    rating: 4.5
  },
  {
    id: 'p4',
    name: 'Kit de Limpieza para Gatos',
    category: 'mascotas',
    price: 45000,
    description: 'Todo lo necesario para el brillo de su pelaje.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    isNew: false,
    rating: 4.7
  },
  {
    id: 'p5',
    name: 'Rodillo de Cuarzo Rosa',
    category: 'belleza',
    price: 55000,
    description: 'Masaje facial relajante y anti-inflamatorio.',
    image: 'https://images.unsplash.com/photo-1617897903246-7392ce73ec24?auto=format&fit=crop&q=80&w=800',
    isNew: false,
    rating: 4.6
  },
  {
    id: 'p6',
    name: 'Colágeno Hidrolizado Premium',
    category: 'bienestar',
    price: 98000,
    description: 'Fortalece piel, cabello y uñas.',
    image: 'https://images.unsplash.com/photo-1512152272829-e3139592d56f?auto=format&fit=crop&q=80&w=800',
    isNew: true,
    rating: 4.9
  },
];
