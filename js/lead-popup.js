/**
 * ============================================================================
 * POPUP THU THẬP SĐT NHẬN BÁO GIÁ VẬT TƯ XÂY NHÀ 2026
 * THIẾT BỊ ĐIỆN CAO CẤP DUY PHONG (549 NGÔ GIA TỰ, BẮC NINH)
 * ============================================================================
 */

(function() {
    function injectLeadPopupHtml() {
        if (document.getElementById('floatingLeadCard')) return;

        const html = `
            <!-- Mini Trigger Button khi Popup đang đóng -->
            <div class="floating-lead-trigger" id="floatingLeadTrigger" style="display: none;" onclick="openLeadPopup()" title="Bấm để nhận bảng giá chiết khấu trọn gói xây nhà">
                <i class="fas fa-gift" style="color: var(--primary); font-size: 1.05rem;"></i>
                <span>Nhận Báo Giá Xây Nhà (Zalo)</span>
            </div>

            <!-- Popup Góc Dưới Bên Phải -->
            <div class="floating-lead-card" id="floatingLeadCard">
                <button type="button" class="floating-lead-close" onclick="closeLeadPopup()" aria-label="Đóng popup">&times;</button>
                
                <div class="lead-badge">
                    <i class="fas fa-house-chimney"></i> DỰ TOÁN VẬT TƯ ĐIỆN XÂY NHÀ 2026
                </div>

                <h4 class="lead-title">Trọn Gói Vật Tư Điện Cho Ngôi Nhà Mới</h4>
                
                <p class="lead-desc">
                    Chiết khấu trực tiếp <strong style="color: #F3E5AB;">5% – 15% theo khối lượng công trình</strong>! Nhận ngay file dự toán chi tiết toàn bộ vật tư điện từ móng đến mái:
                </p>

                <div class="lead-features">
                    <span><i class="fas fa-bolt"></i> Dây cáp âm tường: Trần Phú, Cadisun, Cadivi (100% đồng)</span>
                    <span><i class="fas fa-toggle-on"></i> Công tắc & ổ cắm: Panasonic, Bretina viền kim loại sang trọng</span>
                    <span><i class="fas fa-lightbulb"></i> Đèn LED âm trần đổi 3 màu & Aptomat Schneider chống giật</span>
                </div>

                <form onsubmit="handleLeadSubmit(event)" style="margin: 0;">
                    <div style="margin-bottom: 8px;">
                        <input type="tel" id="leadCustomerPhone" class="lead-input" style="width: 100%;" placeholder="Nhập số điện thoại / Zalo của bạn..." required pattern="[0-9]{9,11}">
                    </div>
                    <button type="submit" class="lead-submit-btn" style="width: 100%; justify-content: center; padding: 11px;">
                        <i class="fas fa-paper-plane"></i> Nhận Báo Giá Chiết Khấu Qua Zalo
                    </button>
                </form>

                <div style="font-size: 0.72rem; color: #94A3B8; text-align: center; margin-top: 8px;">
                    <i class="fas fa-shield-halved" style="color: var(--accent-green);"></i> Cam kết bảo mật • Bóc tách khối lượng miễn phí trong 15 phút
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
    }

    window.openLeadPopup = function() {
        const card = document.getElementById('floatingLeadCard');
        const trigger = document.getElementById('floatingLeadTrigger');
        if (card) card.classList.add('active');
        if (trigger) trigger.style.display = 'none';
    };

    window.closeLeadPopup = function() {
        const card = document.getElementById('floatingLeadCard');
        const trigger = document.getElementById('floatingLeadTrigger');
        if (card) card.classList.remove('active');
        if (trigger) trigger.style.display = 'inline-flex';
        sessionStorage.setItem('duyphong_lead_dismissed', 'true');
    };

    window.handleLeadSubmit = function(e) {
        e.preventDefault();
        const phoneInput = document.getElementById('leadCustomerPhone');
        if (!phoneInput) return;
        const phone = phoneInput.value.trim();

        if (!phone || phone.length < 9) {
            alert('Vui lòng nhập số điện thoại hoặc Zalo chính xác!');
            phoneInput.focus();
            return;
        }

        try {
            const QUOTES_KEY = 'duyphong_athanhbn_quotes_v1';
            let quotes = JSON.parse(localStorage.getItem(QUOTES_KEY) || '[]');
            const now = new Date();
            const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' ' + now.toLocaleDateString('vi-VN');
            
            quotes.unshift({
                id: 'lead_' + Date.now(),
                code: 'LEAD-' + Math.floor(1000 + Math.random() * 9000),
                createdAt: timeStr,
                customerName: 'Khách hàng để lại SĐT qua Popup',
                customerPhone: phone,
                customerType: 'Chu-nha-xay-moi',
                customerTypeLabel: 'Chủ nhà xây mới / Hoàn thiện công trình',
                projectAddress: 'Bắc Ninh & lân cận',
                notes: 'Khách đăng ký nhận trọn bộ Bảng báo giá dự toán vật tư điện xây nhà 2026 (Dây cáp, công tắc, bóng đèn, aptomat)',
                status: 'Mới nhận - Chờ báo giá',
                items: [
                    { name: 'Trọn gói vật tư điện xây nhà 2026 (Dây cáp, công tắc, đèn LED, Aptomat)', variant: 'Dự toán công trình', unit: 'Bộ hồ sơ', qty: 1, price: 0, isCustom: true }
                ],
                summary: { totalItems: 1, totalUnits: 1, subtotalListed: 0, estimatedDiscount: 0, finalEstimated: 0 }
            });

            localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
        } catch(err){}

        alert('Cảm ơn bạn! Tổng kho Thiết Bị Điện Duy Phong (Hotline/Zalo: 0904.511.227) đã nhận được thông tin và sẽ gửi trọn bộ file dự toán qua Zalo cho bạn ngay.');

        const zaloMsg = encodeURIComponent('Chào anh Thành Duy Phong, tôi đang hoàn thiện nhà và muốn nhận trọn bộ Báo giá chiết khấu vật tư điện xây nhà 2026 cho SĐT: ' + phone);
        window.open('https://zalo.me/0904511227?text=' + zaloMsg, '_blank');

        closeLeadPopup();
    };

    document.addEventListener('DOMContentLoaded', () => {
        injectLeadPopupHtml();

        const dismissed = sessionStorage.getItem('duyphong_lead_dismissed');
        if (dismissed === 'true') {
            const trigger = document.getElementById('floatingLeadTrigger');
            if (trigger) trigger.style.display = 'inline-flex';
        } else {
            setTimeout(() => {
                openLeadPopup();
            }, 6000);
        }
    });
})();
