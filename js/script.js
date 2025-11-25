// --- 1. Configuração da API do Unsplash ---
const ACCESS_KEY = 'SUA_UNPLASH_ACCESS_KEY';
const API_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=12&orientation=squarish`;

// --- 2. Referências aos Elementos DOM ---
const galleryContainer = document.querySelector('.gallery-container');
