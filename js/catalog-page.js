/**
 * ============================================================================
 * JAVASCRIPT ĐIỀU KHIỂN CHUYÊN TRANG SẢN PHẨM & BÁO GIÁ VẬT TƯ
 * THIẾT BỊ ĐIỆN CAO CẤP DUY PHONG (549 NGÔ GIA TỰ, BẮC NINH)
 * ============================================================================
 */

const STORAGE_KEYS = {
    PRODUCTS: 'duyphong_athanhbn_products_v20261108_420',
    CART_BOQ: 'duyphong_athanhbn_boq_v1'
};

let catalogState = {
    products: [],
    boqCart: [],
    category: 'all',
    brand: 'all',
    spec: 'all',
    priceRange: 'all',
    searchQuery: '',
    sort: 'default',
    viewMode: 'table', // Mặc định 'table' 
    currentPage: 1,
    pageSize: 20
};

// Hàm tạo ảnh SVG fallback thương hiệu sang trọng
function createSvgDataUri(title, brand, code, accent = '#D4AF37') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0B0F17"/>
                <stop offset="50%" stop-color="#161F30"/>
                <stop offset="100%" stop-color="#0F172A"/>
            </linearGradient>
        </defs>
        <rect width="480" height="320" fill="url(#bg)"/>
        <rect x="18" y="18" width="444" height="284" rx="12" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-width="1.5"/>
        <text x="35" y="55" fill="#F3E5AB" font-family="Arial, sans-serif" font-size="13" font-weight="bold">${brand.toUpperCase()} • DUY PHONG BẮC NINH</text>
        <text x="400" y="125" font-family="Segoe UI Emoji, Arial" font-size="60" text-anchor="middle">⚡</text>
        <text x="35" y="165" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="20" font-weight="bold">${title}</text>
        <rect x="35" y="195" width="160" height="30" rx="5" fill="rgba(212,175,55,0.15)" stroke="${accent}" stroke-width="1"/>
        <text x="115" y="215" fill="#F3E5AB" font-family="monospace" font-size="13" font-weight="bold" text-anchor="middle">SKU: ${code}</text>
        <text x="35" y="265" fill="#94A3B8" font-family="Arial, sans-serif" font-size="12">549 Ngô Gia Tự, TP. Bắc Ninh • 0904.511.227</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Định dạng tiền tệ VNĐ
function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount || 0)) + ' đ';
}

// Lấy đơn giá theo quy cách
function getVariantPrice(product, variantText) {
    if (typeof variantText === 'string') {
        const catMatch = variantText.match(/Catalog:\s*([\d\.,]+)\s*đ/i);
        if (catMatch) {
            const p = parseInt(catMatch[1].replace(/[,\.]/g, ''), 10);
            if (!isNaN(p) && p > 0) return p;
        }
        const m = variantText.match(/([\d\.,]+)\s*đ/);
        if (m) {
            const p = parseInt(m[1].replace(/[,\.]/g, ''), 10);
            if (!isNaN(p) && p > 0) return p;
        }
    }
    return Number(product.price) || 0;
}

// Toast thông báo
function showToast(message, icon = 'fa-check-circle') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icon}" style="color: var(--primary); font-size: 1.1rem;"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Khởi tạo dữ liệu
function initCatalogData() {
    // 1. Lấy sản phẩm từ file products.js hoặc local storage
    if (window.ALL_PRODUCTS_DATA && Array.isArray(window.ALL_PRODUCTS_DATA) && window.ALL_PRODUCTS_DATA.length > 0) {
        catalogState.products = window.ALL_PRODUCTS_DATA;
    } else {
        const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        if (saved) {
            try { catalogState.products = JSON.parse(saved); } catch(e){}
        }
    }

    // 2. Lấy giỏ hàng BOQ chung
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART_BOQ);
    if (savedCart) {
        try { catalogState.boqCart = JSON.parse(savedCart); } catch(e){ catalogState.boqCart = []; }
    }

    renderBrandFilterOptions();
    renderCatalog();
    updateStickyCartBar();
}

// Sinh danh sách hãng trên thanh Brand Chips và Sidebar
function renderBrandFilterOptions() {
    const brands = Array.from(new Set(catalogState.products.map(p => p.brand))).filter(Boolean).sort();
    
    // 1. Top Brand Chips
    const chipsContainer = document.getElementById('topBrandChips');
    if (chipsContainer) {
        chipsContainer.innerHTML = `
            <button type="button" class="brand-chip-btn ${catalogState.brand === 'all' ? 'active' : ''}" onclick="setBrandFilter('all')">
                <i class="fas fa-bolt"></i> Tất cả hãng <span class="chip-count">${catalogState.products.length}</span>
            </button>
            ${brands.map(b => {
                const count = catalogState.products.filter(p => p.brand === b).length;
                return `
                    <button type="button" class="brand-chip-btn ${catalogState.brand === b ? 'active' : ''}" onclick="setBrandFilter('${b}')">
                        ${b} <span class="chip-count">${count}</span>
                    </button>
                `;
            }).join('')}
        `;
    }

    // 2. Sidebar Checkboxes
    const sidebarList = document.getElementById('sidebarBrandList');
    if (sidebarList) {
        sidebarList.innerHTML = brands.map(b => {
            const count = catalogState.products.filter(p => p.brand === b).length;
            const checked = catalogState.brand === b ? 'checked' : '';
            return `
                <label class="side-check-label">
                    <span>
                        <input type="radio" name="sideBrand" value="${b}" ${checked} onchange="setBrandFilter(this.value)">
                        ${b}
                    </span>
                    <span class="side-check-count">${count}</span>
                </label>
            `;
        }).join('');
    }
}

// Lọc sản phẩm
function getFilteredCatalog() {
    let list = [...catalogState.products];

    // Lọc theo danh mục
    if (catalogState.category !== 'all') {
        list = list.filter(p => p.category === catalogState.category);
    }

    // Lọc theo hãng
    if (catalogState.brand !== 'all') {
        list = list.filter(p => p.brand === catalogState.brand);
    }

    // Lọc theo tiết diện dây
    if (catalogState.spec !== 'all') {
        const specRegex = new RegExp(catalogState.spec.replace('mm²', '.*mm²').replace('3-pha', '3 pha|3x'), 'i');
        list = list.filter(p => {
            const matchName = specRegex.test(p.name);
            const matchVariants = Array.isArray(p.variants) && p.variants.some(v => specRegex.test(v));
            return matchName || matchVariants;
        });
    }

    // Lọc theo mức giá
    if (catalogState.priceRange !== 'all') {
        list = list.filter(p => {
            const price = Number(p.price) || 0;
            switch(catalogState.priceRange) {
                case 'under-50k': return price < 50000;
                case '50k-200k': return price >= 50000 && price <= 200000;
                case '200k-500k': return price >= 200000 && price <= 500000;
                case '500k-2m': return price >= 500000 && price <= 2000000;
                case 'over-2m': return price > 2000000;
                default: return true;
            }
        });
    }

    // Lọc theo từ khóa tìm kiếm
    if (catalogState.searchQuery.trim()) {
        const q = catalogState.searchQuery.trim().toLowerCase();
        list = list.filter(p => 
            (p.name && p.name.toLowerCase().includes(q)) ||
            (p.brand && p.brand.toLowerCase().includes(q)) ||
            (p.sku && p.sku.toLowerCase().includes(q)) ||
            (p.desc && p.desc.toLowerCase().includes(q))
        );
    }

    // Sắp xếp
    if (catalogState.sort === 'price-asc') {
        list.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
    } else if (catalogState.sort === 'price-desc') {
        list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (catalogState.sort === 'name-asc') {
        list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    } else if (catalogState.sort === 'name-desc') {
        list.sort((a, b) => b.name.localeCompare(a.name, 'vi'));
    }

    return list;
}

// Render toàn bộ giao diện sản phẩm
function renderCatalog() {
    const filtered = getFilteredCatalog();
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / catalogState.pageSize));
    if (catalogState.currentPage > totalPages) catalogState.currentPage = totalPages;
    if (catalogState.currentPage < 1) catalogState.currentPage = 1;

    const startIdx = (catalogState.currentPage - 1) * catalogState.pageSize;
    const endIdx = Math.min(startIdx + catalogState.pageSize, totalItems);
    const pagedProducts = filtered.slice(startIdx, endIdx);

    // Cập nhật nhãn đếm
    const countEl = document.getElementById('catalogCountSummary');
    if (countEl) {
        countEl.innerHTML = totalItems > 0
            ? `Tìm thấy <strong>${totalItems}</strong> mặt hàng chính hãng (Đang xem dòng <strong>${startIdx + 1} - ${endIdx}</strong>)`
            : `Không tìm thấy sản phẩm nào khớp bộ lọc`;
    }

    const tableBody = document.getElementById('catalogTableBody');
    const gridContainer = document.getElementById('catalogGridContainer');
    const tableWrapper = document.getElementById('catalogTableWrapper');

    if (totalItems === 0) {
        if (tableBody) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 48px 16px; color: var(--text-secondary);">
                        <i class="fas fa-filter-circle-xmark" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 12px; display: block;"></i>
                        <h4 style="color: #fff; margin-bottom: 6px;">Không tìm thấy sản phẩm phù hợp</h4>
                        <p style="font-size: 0.88rem;">Hãy thử xóa bớt điều kiện lọc hoặc tìm kiếm bằng từ khóa ngắn gọn hơn.</p>
                        <button type="button" class="btn btn-outline-gold" style="margin-top: 14px;" onclick="resetAllFilters()">
                            <i class="fas fa-rotate-left"></i> Xóa toàn bộ bộ lọc
                        </button>
                    </td>
                </tr>
            `;
        }
        if (gridContainer) gridContainer.innerHTML = '';
        renderPagination(totalItems, totalPages);
        return;
    }

    // 1. RENDER BẢNG KÊ NHANH (TABLE VIEW)
    if (tableBody) {
        tableBody.innerHTML = pagedProducts.map((p, idx) => {
            const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : ['Tiêu chuẩn chính hãng'];
            const inCartItems = catalogState.boqCart.filter(item => item.productId === p.id);
            const currentQty = inCartItems.reduce((s, i) => s + i.qty, 0);

            return `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <img src="${p.image}" class="table-thumb" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='${createSvgDataUri(p.name.slice(0,18), p.brand, p.sku)}';"/>
                            <div>
                                <div style="font-weight: 700; color: #fff; line-height: 1.35; font-size: 0.92rem;">${p.name}</div>
                                <div style="font-size: 0.76rem; color: var(--accent-cyan); margin-top: 2px;">
                                    Mã: <strong>${p.sku}</strong> • Hãng: <strong style="color: var(--primary);">${p.brand}</strong>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <select class="variant-select" id="tbl-var-${p.id}" style="min-width: 220px;" onchange="updateRowPrice('${p.id}', this.value)">
                            ${variants.map(v => `<option value="${v}">${v}</option>`).join('')}
                        </select>
                    </td>
                    <td style="text-align: center;"><strong>${p.unit}</strong></td>
                    <td>
                        <div style="color: var(--primary-light); font-weight: 700; font-size: 0.95rem;" id="tbl-prc-${p.id}">
                            ${formatVND(getVariantPrice(p, variants[0]))}
                        </div>
                        <div style="font-size: 0.72rem; color: var(--text-muted);">Giá Catalog niêm yết</div>
                    </td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <input type="number" min="0" value="${currentQty > 0 ? currentQty : 0}" id="tbl-qty-${p.id}" class="form-control" style="width: 85px; text-align: center; font-weight: 700; border-color: var(--border-gold);"/>
                            <button class="chip-qty" onclick="stepTableQty('${p.id}', 10)">+10</button>
                        </div>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-gold" style="padding: 7px 12px; font-size: 0.82rem; white-space: nowrap;" onclick="addSingleRow('${p.id}')">
                            <i class="fas fa-cart-plus"></i> Đưa vào DS
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // 2. RENDER THẺ LƯỚI CHI TIẾT (GRID VIEW)
    if (gridContainer) {
        gridContainer.innerHTML = pagedProducts.map(p => {
            const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : ['Tiêu chuẩn chính hãng'];
            const inCartItems = catalogState.boqCart.filter(item => item.productId === p.id);
            const totalQty = inCartItems.reduce((s, i) => s + i.qty, 0);

            return `
                <div class="product-card ${totalQty > 0 ? 'in-quote' : ''}">
                    <div class="product-thumb-wrap">
                        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='${createSvgDataUri(p.name.slice(0,20), p.brand, p.sku)}';"/>
                        <span class="product-brand-tag">${p.brand}</span>
                        ${totalQty > 0 ? `<div class="in-quote-ribbon"><i class="fas fa-check-circle"></i> Đã chọn: ${totalQty} ${p.unit}</div>` : ''}
                    </div>
                    <div class="product-body">
                        <div class="product-sku">MÃ: ${p.sku}</div>
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-desc">${p.desc || ''}</p>
                        
                        <div class="product-variant-box">
                            <label><i class="fas fa-sliders"></i> Quy cách:</label>
                            <select class="variant-select" id="grid-var-${p.id}" onchange="updateCardPrice('${p.id}', this.value)">
                                ${variants.map(v => `<option value="${v}">${v}</option>`).join('')}
                            </select>
                        </div>

                        <div class="product-price-row">
                            <div>
                                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Giá Catalog:</div>
                                <span class="price-main" id="grid-prc-${p.id}">${formatVND(getVariantPrice(p, variants[0]))}</span>
                                <span class="price-unit">/ ${p.unit}</span>
                            </div>
                            <span style="font-size: 0.75rem; color: var(--accent-green); font-weight: 600;">Sẵn hàng kho BN</span>
                        </div>

                        <div class="product-order-controls">
                            <div class="qty-row">
                                <div class="qty-stepper">
                                    <button type="button" class="qty-btn" onclick="stepCardQty('${p.id}', -1)">−</button>
                                    <input type="number" min="1" value="1" class="qty-input" id="grid-qty-${p.id}"/>
                                    <button type="button" class="qty-btn" onclick="stepCardQty('${p.id}', 1)">+</button>
                                </div>
                                <div class="quick-qty-chips">
                                    <button type="button" class="chip-qty" onclick="stepCardQty('${p.id}', 10)">+10</button>
                                    <button type="button" class="chip-qty" onclick="stepCardQty('${p.id}', 50)">+50</button>
                                </div>
                            </div>
                            <button type="button" class="btn btn-gold" style="width: 100%;" onclick="addFromCard('${p.id}')">
                                <i class="fas fa-cart-plus"></i> Thêm Vào Danh Sách
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Chuyển đổi hiển thị
    if (catalogState.viewMode === 'table') {
        if (tableWrapper) tableWrapper.classList.add('active');
        if (gridContainer) gridContainer.style.display = 'none';
    } else {
        if (tableWrapper) tableWrapper.classList.remove('active');
        if (gridContainer) gridContainer.style.display = 'grid';
    }

    renderPagination(totalItems, totalPages);
}

// Cập nhật giá động khi đổi phân loại trong bảng
function updateRowPrice(productId, variantValue) {
    const product = catalogState.products.find(p => p.id === productId);
    if (!product) return;
    const priceEl = document.getElementById('tbl-prc-' + productId);
    if (priceEl) priceEl.textContent = formatVND(getVariantPrice(product, variantValue));
}

// Cập nhật giá động trong thẻ
function updateCardPrice(productId, variantValue) {
    const product = catalogState.products.find(p => p.id === productId);
    if (!product) return;
    const priceEl = document.getElementById('grid-prc-' + productId);
    if (priceEl) priceEl.textContent = formatVND(getVariantPrice(product, variantValue));
}

// Tăng giảm số lượng trong bảng
function stepTableQty(productId, delta) {
    const input = document.getElementById('tbl-qty-' + productId);
    if (!input) return;
    let cur = parseInt(input.value, 10) || 0;
    input.value = Math.max(0, cur + delta);
}

// Tăng giảm số lượng trong thẻ
function stepCardQty(productId, delta) {
    const input = document.getElementById('grid-qty-' + productId);
    if (!input) return;
    let cur = parseInt(input.value, 10) || 1;
    input.value = Math.max(1, cur + delta);
}

// Thêm 1 dòng từ Bảng Kê Nhanh
function addSingleRow(productId) {
    const product = catalogState.products.find(p => p.id === productId);
    if (!product) return;
    const variantEl = document.getElementById('tbl-var-' + productId);
    const qtyEl = document.getElementById('tbl-qty-' + productId);
    const variant = variantEl ? variantEl.value : 'Tiêu chuẩn';
    let qty = parseInt(qtyEl ? qtyEl.value : 1, 10) || 0;
    if (qty <= 0) qty = 1;
    if (qtyEl) qtyEl.value = qty;

    upsertCart(product, variant, qty, false);
    renderCatalog();
    updateStickyCartBar();
    showToast(`Đã thêm <strong>${qty} ${product.unit}</strong> "${product.name}" vào danh sách!`);
}

// Thêm từ thẻ sản phẩm
function addFromCard(productId) {
    const product = catalogState.products.find(p => p.id === productId);
    if (!product) return;
    const variantEl = document.getElementById('grid-var-' + productId);
    const qtyEl = document.getElementById('grid-qty-' + productId);
    const variant = variantEl ? variantEl.value : 'Tiêu chuẩn';
    const qty = Math.max(1, parseInt(qtyEl ? qtyEl.value : 1, 10) || 1);

    upsertCart(product, variant, qty, true);
    if (qtyEl) qtyEl.value = 1;
    renderCatalog();
    updateStickyCartBar();
    showToast(`Đã thêm <strong>${qty} ${product.unit}</strong> "${product.name}" vào danh sách!`);
}

// Gom tất cả các dòng có số lượng > 0 trong bảng hiện tại
function applyBulkTableSelection() {
    const filtered = getFilteredCatalog();
    let countAdded = 0;

    filtered.forEach(p => {
        const qtyEl = document.getElementById('tbl-qty-' + p.id);
        const varEl = document.getElementById('tbl-var-' + p.id);
        if (!qtyEl) return;
        const qty = parseInt(qtyEl.value, 10) || 0;
        const variant = varEl ? varEl.value : 'Tiêu chuẩn';

        if (qty > 0) {
            upsertCart(p, variant, qty, false);
            countAdded++;
        }
    });

    if (countAdded === 0) {
        showToast('Vui lòng nhập số lượng (>0) cho ít nhất 1 mặt hàng!', 'fa-exclamation-circle');
        return;
    }

    renderCatalog();
    updateStickyCartBar();
    showToast(`Đã gom thành công <strong>${countAdded} mặt hàng</strong> vào danh sách báo giá!`);
}

// Lưu vào giỏ chung boqCart và localStorage
function upsertCart(product, variant, qty, accumulate = true) {
    const cartId = `${product.id}__${variant}`;
    const existing = catalogState.boqCart.find(item => item.cartId === cartId);
    const actualPrice = getVariantPrice(product, variant);

    if (existing) {
        existing.qty = accumulate ? (existing.qty + qty) : qty;
        existing.price = actualPrice;
    } else {
        catalogState.boqCart.push({
            cartId,
            productId: product.id,
            sku: product.sku,
            name: product.name,
            brand: product.brand,
            variant: variant,
            unit: product.unit,
            price: actualPrice,
            discount: product.discount || 30,
            qty: qty
        });
    }

    localStorage.setItem(STORAGE_KEYS.CART_BOQ, JSON.stringify(catalogState.boqCart));
}

// Cập nhật thanh giỏ hàng nổi và header badge
function updateStickyCartBar() {
    const totalItems = catalogState.boqCart.length;
    const totalQty = catalogState.boqCart.reduce((s, i) => s + i.qty, 0);
    const totalPrice = catalogState.boqCart.reduce((s, i) => s + (i.price || 0) * i.qty, 0);

    const stickyBar = document.getElementById('stickyQuoteBar');
    const badgeEl = document.getElementById('headerBoqCount');
    const stickyCount = document.getElementById('stickyCartCount');
    const stickyPrice = document.getElementById('stickyTotalPrice');

    if (badgeEl) badgeEl.textContent = totalItems;
    if (stickyCount) stickyCount.textContent = totalItems;
    if (stickyPrice) stickyPrice.textContent = formatVND(totalPrice);

    if (stickyBar) {
        if (totalItems > 0) {
            stickyBar.classList.add('show');
        } else {
            stickyBar.classList.remove('show');
        }
    }
}

// Phân trang
function renderPagination(totalItems, totalPages) {
    const paginationEl = document.getElementById('catalogPagination');
    if (!paginationEl) return;

    if (totalItems <= catalogState.pageSize) {
        paginationEl.innerHTML = `
            <div class="page-info-summary">
                Hiển thị tất cả <strong>${totalItems}</strong> mặt hàng
            </div>
            <div></div>
        `;
        return;
    }

    const startItem = (catalogState.currentPage - 1) * catalogState.pageSize + 1;
    const endItem = Math.min(catalogState.currentPage * catalogState.pageSize, totalItems);

    let pages = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (catalogState.currentPage > 3) pages.push('...');
        const start = Math.max(2, catalogState.currentPage - 1);
        const end = Math.min(totalPages - 1, catalogState.currentPage + 1);
        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }
        if (catalogState.currentPage < totalPages - 2) pages.push('...');
        if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    const pagesHtml = pages.map(p => {
        if (p === '...') return `<span class="page-btn dots">…</span>`;
        return `<button type="button" class="page-btn ${p === catalogState.currentPage ? 'active' : ''}" onclick="changeCatalogPage(${p})">${p}</button>`;
    }).join('');

    paginationEl.innerHTML = `
        <div class="page-info-summary">
            Hiển thị dòng <strong>${startItem} - ${endItem}</strong> / <strong>${totalItems}</strong> sản phẩm (Trang <strong>${catalogState.currentPage}</strong> / ${totalPages})
        </div>
        <div class="pagination-pages">
            <button type="button" class="page-btn" ${catalogState.currentPage <= 1 ? 'disabled' : ''} onclick="changeCatalogPage(${catalogState.currentPage - 1})">
                <i class="fas fa-chevron-left"></i> Trước
            </button>
            ${pagesHtml}
            <button type="button" class="page-btn" ${catalogState.currentPage >= totalPages ? 'disabled' : ''} onclick="changeCatalogPage(${catalogState.currentPage + 1})">
                Sau <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
}

function changeCatalogPage(page) {
    catalogState.currentPage = page;
    renderCatalog();
    const target = document.getElementById('catalogContentTop');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// BỘ LỌC EVENT HANDLERS
function setCategoryFilter(cat, btnEl) {
    catalogState.category = cat;
    catalogState.currentPage = 1;
    document.querySelectorAll('.side-cat-item').forEach(el => el.classList.remove('active'));
    if (btnEl) btnEl.closest('.side-cat-item').classList.add('active');
    renderCatalog();
}

function setBrandFilter(brand) {
    catalogState.brand = brand;
    catalogState.currentPage = 1;
    renderBrandFilterOptions();
    renderCatalog();
}

function setSpecFilter(spec, btnEl) {
    catalogState.spec = spec;
    catalogState.currentPage = 1;
    document.querySelectorAll('.spec-chip-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderCatalog();
}

function setPriceFilter(range) {
    catalogState.priceRange = range;
    catalogState.currentPage = 1;
    renderCatalog();
}

function setSortOrder(sort) {
    catalogState.sort = sort;
    renderCatalog();
}

function setViewMode(mode) {
    catalogState.viewMode = mode;
    const btnTable = document.getElementById('viewModeTableBtn');
    const btnGrid = document.getElementById('viewModeGridBtn');
    if (btnTable) btnTable.classList.toggle('active', mode === 'table');
    if (btnGrid) btnGrid.classList.toggle('active', mode === 'grid');
    renderCatalog();
}

function resetAllFilters() {
    catalogState.category = 'all';
    catalogState.brand = 'all';
    catalogState.spec = 'all';
    catalogState.priceRange = 'all';
    catalogState.searchQuery = '';
    catalogState.sort = 'default';
    catalogState.currentPage = 1;

    const sInput = document.getElementById('catalogSearchInput');
    if (sInput) sInput.value = '';
    const topSearch = document.getElementById('globalSearchInput');
    if (topSearch) topSearch.value = '';
    const sortSelect = document.getElementById('catalogSortSelect');
    if (sortSelect) sortSelect.value = 'default';
    const priceSelect = document.getElementById('catalogPriceFilter');
    if (priceSelect) priceSelect.value = 'all';

    document.querySelectorAll('.side-cat-item').forEach((el, idx) => el.classList.toggle('active', idx === 0));
    document.querySelectorAll('.spec-chip-btn').forEach((b, idx) => b.classList.toggle('active', idx === 0));
    
    renderBrandFilterOptions();
    renderCatalog();
    showToast('Đã xóa tất cả bộ lọc, hiển thị toàn bộ 420 sản phẩm!');
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    initCatalogData();

    // Lắng nghe ô tìm kiếm
    const searchInput = document.getElementById('catalogSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            catalogState.searchQuery = e.target.value;
            catalogState.currentPage = 1;
            renderCatalog();
        });
    }

    const topSearch = document.getElementById('globalSearchInput');
    if (topSearch) {
        topSearch.addEventListener('input', (e) => {
            catalogState.searchQuery = e.target.value;
            catalogState.currentPage = 1;
            renderCatalog();
        });
    }
});
