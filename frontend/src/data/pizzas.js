export const PIZZAS = [
  {
    id: "muzzarella-tradicional",
    name: "Muzzarella Tradicional",
    description: "Salsa de tomate casera, abundante muzzarella, aceitunas verdes y orégano silvestre.",
    price: 9500,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    category: "Clásicas",
    ingredients: [
      "Masa madre leudada en frío",
      "Salsa de tomate natural",
      "Queso Muzzarella de primera calidad",
      "Aceitunas verdes",
      "Orégano y aceite de oliva"
    ],
    preparation: {
      doughFermentation: "48 horas de leudado controlado",
      baking: "Horno a la piedra a 400°C",
      details: "Salsa elaborada artesanalmente con tomates seleccionados sin conservantes."
    },
    availableToppings: [
      { id: "top-1", name: "Extra Muzzarella", price: 1500 },
      { id: "top-2", name: "Jamón cocido", price: 1800 },
      { id: "top-3", name: "Morrones asados", price: 1200 }
    ]
  },
  {
    id: "fugazzeta-stuffed",
    name: "Fugazzeta Rellena",
    description: "Doble masa rellena de abundante muzzarella, cubierta con cebolla caramelizada al orégano.",
    price: 12500,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    category: "Especiales",
    ingredients: [
      "Masa madre de alta hidratación",
      "Relleno de 500g de Muzzarella",
      "Cebolla dulce troceada",
      "Queso Parmesano gratinado"
    ],
    preparation: {
      doughFermentation: "24 horas de reposo",
      baking: "Horno continuo a fuego medio-alto para gratinar cebolla"
    },
    availableToppings: [
      { id: "top-1", name: "Panceta ahumada", price: 2000 },
      { id: "top-2", name: "Provolone", price: 1800 }
    ]
  },
  {
    id: "calabresa-artesanal",
    name: "Calabresa a la Leña",
    description: "Base de muzzarella, generosas rodajas de longaniza calabresa artesanal y ají molido picante.",
    price: 11800,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    category: "Especiales",
    ingredients: [
      "Salsa de tomate",
      "Muzzarella",
      "Longaniza calabresa estacionada",
      "Aceitunas negras",
      "Lluvia de orégano"
    ],
    preparation: {
      doughFermentation: "48 horas",
      baking: "Horno a la piedra a 420°C"
    },
    availableToppings: [
      { id: "top-1", name: "Extra Calabresa", price: 2100 },
      { id: "top-2", name: "Aceitunas negras extra", price: 900 }
    ]
  },
  {
    id: "napolitana-premium",
    name: "Napolitana con Ajo",
    description: "Rodajas de tomate fresco, provolone rallado, ajo dorado en aceite de oliva y orégano.",
    price: 11200,
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80",
    category: "Clásicas",
    ingredients: [
      "Salsa de tomate casera",
      "Muzzarella",
      "Tomate perita en rodajas",
      "Ajo frito crocante",
      "Hoja de albahaca fresca"
    ],
    preparation: {
      doughFermentation: "48 horas",
      baking: "Piedra volcánica"
    },
    availableToppings: [
      { id: "top-1", name: "Jamón cocido", price: 1800 },
      { id: "top-2", name: "Huevo duro", price: 1000 }
    ]
  },
  {
    id: "panceta-y-huevos",
    name: "Bacon & Eggs",
    description: "Crocante panceta ahumada, muzzarella derretida y cuatro huevos al plato suavemente horneados.",
    price: 13500,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    category: "Gourmet",
    ingredients: [
      "Muzzarella",
      "Panceta ahumada de campo",
      "Huevos frescos",
      "Pimienta negra molida",
      "Cebollín fresco"
    ],
    preparation: {
      doughFermentation: "48 horas de fermentación",
      baking: "Horno a leña"
    },
    availableToppings: [
      { id: "top-1", name: "Cebolla caramelizada", price: 1300 },
      { id: "top-2", name: "Salsa BBQ casera", price: 900 }
    ]
  },
  {
    id: "cuatro-quesos",
    name: "Cuatro Quesos Intenso",
    description: "Mezcla perfecta de Muzzarella, Provolone estacionado, Roquefort cremosa y Parmesano.",
    price: 12900,
    image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=800&q=80",
    category: "Gourmet",
    ingredients: [
      "Muzzarella",
      "Queso Azul / Roquefort",
      "Provolone ahumado",
      "Parmesano reggiano",
      "Nueces picadas (opcional)"
    ],
    preparation: {
      doughFermentation: "48 horas",
      baking: "Fuego fuerte a la piedra"
    },
    availableToppings: [
      { id: "top-1", name: "Hilo de Miel fina", price: 1000 },
      { id: "top-2", name: "Nueces crocantes", price: 1200 }
    ]
  },
  {
    id: "palmitos-salsa-golf",
    name: "Palmitos & Salsa Golf",
    description: "Cubierta con abundante muzzarella, palmitos seleccionados y lluvia de salsa golf de la casa.",
    price: 13800,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=800&q=80",
    category: "Especiales",
    ingredients: [
      "Muzzarella",
      "Jamón cocido",
      "Palmitos en rodajas",
      "Salsa golf artesanal",
      "Aceitunas negras"
    ],
    preparation: {
      doughFermentation: "24 horas",
      baking: "Horno a la piedra"
    },
    availableToppings: [
      { id: "top-1", name: "Extra Palmitos", price: 2200 },
      { id: "top-2", name: "Huevo picado", price: 1000 }
    ]
  },
  {
    id: "rucula-y-crudo",
    name: "Rúcula & Jamón Crudo",
    description: "Jamón crudo estacionado, rúcula fresca de huerta, lascas de parmesano y aceto glaseado.",
    price: 14200,
    image: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&w=800&q=80",
    category: "Gourmet",
    ingredients: [
      "Muzzarella",
      "Jamón crudo serrano",
      "Rúcula fresca",
      "Queso Parmesano en hebras",
      "Reducción de aceto balsámico"
    ],
    preparation: {
      doughFermentation: "72 horas de maduración",
      baking: "Horno a leña a alta temperatura"
    },
    availableToppings: [
      { id: "top-1", name: "Tomates secos", price: 1900 },
      { id: "top-2", name: "Extra Jamón Crudo", price: 2500 }
    ]
  },
  {
    id: "veggie-suprema",
    name: "Veggie a las Brasas",
    description: "Vegetales asados (berenjenas, zuchinis, morrones), muzzarella vegetal y queso de girasol.",
    price: 10800,
    image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=800&q=80",
    category: "Vegetariana",
    ingredients: [
      "Salsa de tomate casera",
      "Vegetales grillados a la leña",
      "Muzzarella",
      "Semillas de sésamo tostado",
      "Pesto de albahaca"
    ],
    preparation: {
      doughFermentation: "48 horas",
      baking: "Piedra volcánica"
    },
    availableToppings: [
      { id: "top-1", name: "Champignones frescos", price: 1800 },
      { id: "top-2", name: "Pesto extra", price: 900 }
    ]
  }
];