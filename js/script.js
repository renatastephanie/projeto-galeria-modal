// --- 1. Configuração da API do Unsplash ---
const ACCESS_KEY = 'vkYuzsAFA9-TMTyWeyxoVeTjcKEQM5shuJQg1jLmOBE';
const API_URL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=12&orientation=squarish`;

// --- 2. Referências aos Elementos DOM ---
const galleryContainer = document.querySelector('.gallery-container');
const loadingMessage = document.querySelector('.loading-message');
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeBtn = document.querySelector('.close-btn');

// 3. Função para buscar imagens na API do Unsplash
async function fetchImages() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }
        const data = await response.json();

        // Remove a mensagem de carregamento e renderiza as imagens
        loadingMessage.remove();
        renderImages(data);

    } catch (error) {
        console.error('Falha ao buscar imagens:', error);
        // Exibe mensagem de erro
        loadingMessage.textContent = 'Erro ao carregar imagens. Verifique sua chave API e conexão.';
    }
}

/**
     * 4. Função para renderizar as imagens no grid
     * @param {Array} images - Array de objetos de imagem retornados pela API.
 */
function renderImages(images) {
    images.forEach(image => {
        // Cria o item da galeria (o elemento que usa a classe .gallery-item)
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        // Cria a imagem
        const img = document.createElement('img');
        img.classList.add('gallery-image');

        // Atribui as URLs e metadados para uso no modal
        img.src = image.urls.small; // Imagem pequena para o grid
        img.alt = image.alt_description || `Imagem por ${image.user.name}`;

        // Guarda a URL da imagem em alta resolução e o nome do autor em data-attributes
        img.dataset.fullUrl = image.urls.regular;
        img.dataset.caption = `Foto por ${image.user.name} (Unsplash)`;

        // Adiciona a imagem ao item e o item ao container
        galleryItem.appendChild(img);
        galleryContainer.appendChild(galleryItem);
    });

    // Depois de renderizar as imagens, configura os eventos de clique para o modal
    setupModalEvents();
}

/**
 * 5. Função para configurar os eventos de clique (Abrir/Fechar Modal)
 */
function setupModalEvents() {
    // ABRIR MODAL: Adiciona evento de clique a todos os itens da galeria
    document.querySelectorAll('.gallery-image').forEach(item => {
        item.addEventListener('click', (e) => {
            const imageElement = e.target;

            // Define o conteúdo do modal com base nos data-attributes
            modalImage.src = imageElement.dataset.fullUrl;
            modalCaption.textContent = imageElement.dataset.caption;

            // Adiciona a classe is-open para exibir o modal (veja o CSS)
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false'); // Acessibilidade
        });
    });

    // FECHAR MODAL
    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
    };

    // 1. Fechar pelo botão 'X'
    closeBtn.addEventListener('click', closeModal);

    // 2. Fechar clicando no backdrop (fundo escuro)
    modal.addEventListener('click', (e) => {
        // Se o clique foi no próprio backdrop (.modal) e não no seu conteúdo (.modal-content)
        if (e.target === modal) {
            closeModal();
        }
    });

    // 3. Fechar pressionando a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });
}

// --- 6. Inicialização ---
document.addEventListener('DOMContentLoaded', fetchImages);