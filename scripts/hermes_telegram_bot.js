/**
 * ============================================================================
 * HERMES BOT - TỰ ĐỘNG LÊN LỊCH & ĐĂNG BÀI CHUẨN SEO CHO WEBSITE THIẾT BỊ ĐIỆN
 * Lịch hẹn: 8h00 Sáng Thứ 2 - Thứ 4 - Thứ 6 hàng tuần
 * Kênh duyệt bài: Telegram Bot với nút bấm [Duyệt Đăng] 1-chạm
 * Đích xuất bản: GitHub Pages (thietbidien-bacninh.com)
 * ============================================================================
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. CẤU HÌNH HỆ THỐNG
const CONFIG = {
    // Token Telegram Bot (Lấy từ @BotFather)
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || 'DIEN_TOKEN_TELEGRAM_VAO_DAY',
    // ID Telegram của bạn (Lấy từ @userinfobot)
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || 'DIEN_CHAT_ID_VAO_DAY',
    
    // GitHub Repository cấu hình
    GITHUB_OWNER: 'itanle951-rgb',
    GITHUB_REPO: 'thietbidien-bacninh',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
    
    // Hotline hiển thị
    HOTLINE: '0904.511.227 - 0968.599.951',
    STORE_ADDRESS: '549 Ngô Gia Tự, P. Ninh Xá, TP. Bắc Ninh'
};

// 2. KHO CHỦ ĐỀ SEO XOAY VÒNG CHO THỢ & CHỦ NHÀ XÂY MỚI BẮC NINH
const SEO_TOPICS_POOL = [
    {
        title: 'Mẹo chọn aptomat chống giật RCBO cho bình nóng lạnh và bếp từ an toàn tuyệt đối',
        category: 'An Toàn Điện Dân Dụng',
        keywords: ['aptomat chống giật bắc ninh', 'rcbo schneider', 'an toàn điện gia đình'],
        image: 'assets/images/tu-dien-chong-giat-gia-dinh.jpg',
        summary: 'Hướng dẫn cách phân biệt MCB và RCBO, chọn độ nhạy dòng rò 30mA bảo vệ gia đình khi dùng bình nóng lạnh và thiết bị công suất cao trong mùa nồm ẩm.'
    },
    {
        title: 'Bí quyết bóc tách khối lượng dây điện xây nhà phố 4 tầng tiết kiệm 15% chi phí',
        category: 'Kinh Nghiệm Xây Nhà',
        keywords: ['bóc tách dây điện', 'dây trần phú bắc ninh', 'dự toán vật tư điện'],
        image: 'assets/images/du-toan-vat-tu-dien-nha-pho.jpg',
        summary: 'Chia sẻ công thức tính định mức cuộn dây điện 1.5, 2.5, 4.0 và 6.0mm² chính xác từ kho Duy Phong giúp chủ nhà không bị mua dư thừa hay thiếu hụt.'
    },
    {
        title: 'Top các mẫu công tắc ổ cắm viền kim loại sang trọng cho nhà phố hiện đại 2026',
        category: 'Thiết Bị Cao Cấp',
        keywords: ['công tắc bretina bắc ninh', 'ổ cắm panasonic wide', 'thiết bị điện cao cấp'],
        image: 'assets/images/products/cong-tac-bretina-vang.jpg',
        summary: 'Đánh giá độ bền tiếp điểm hợp kim bạc, khả năng chịu tải 16A và cảm giác bấm êm ái của các dòng công tắc mặt vàng Champagne và xám Titan.'
    },
    {
        title: 'Quy trình đi dây điện âm tường luồn ống gen chống cháy chuẩn kỹ thuật xây dựng',
        category: 'Tư Vấn Thợ Điện',
        keywords: ['thi công điện âm tường', 'ống luồn chống cháy nanoco sino', 'thợ điện bắc ninh'],
        image: 'assets/images/thi-cong-dien-am-tuong-nha-pho.jpg',
        summary: '5 nguyên tắc sống còn khi chôn ống âm tường: Không cắt chéo tường, dùng góc cua lượn tránh gãy gập dây và chụp ảnh hoàn công trước khi trát vữa.'
    },
    {
        title: 'Cách bố trí đèn LED âm trần phòng khách trần thạch cao vừa sang vừa dịu mắt',
        category: 'Chiếu Sáng & Thẩm Mỹ',
        keywords: ['đèn led âm trần bắc ninh', 'đèn downlight 3 màu', 'bố trí ánh sáng phòng khách'],
        image: 'assets/images/products/den-led-ban-nguyet-rang-dong.jpg',
        summary: 'Tư vấn khoảng cách khoét lỗ đèn phi 90/110, kết hợp ánh sáng trung tính 4000K và ánh sáng ấm 3000K tạo chiều sâu sang trọng cho không gian.'
    }
];

// Biến lưu trữ bản nháp đang chờ duyệt
let pendingDraft = null;

// Hàm gửi request HTTP
function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch (e) {
                    resolve({ status: res.statusCode, raw: body });
                }
            });
        });
        req.on('error', reject);
        if (data) req.write(data);
        req.end();
    });
}

// 3. GỬI TIN NHẮN BẢN NHÁP VỀ TELEGRAM VỚI NÚT DUYỆT 1-CHẠM
async function sendDraftToTelegram(article) {
    pendingDraft = article;

    const messageText = `
📢 <b>[HERMES BOT] BẢN NHÁP BÀI VIẾT MỚI (LỊCH THỨ 2 - 4 - 6)</b>
━━━━━━━━━━━━━━━━━━
📌 <b>Tiêu đề:</b> ${article.title}
📂 <b>Chuyên mục:</b> ${article.category}
👤 <b>Tác giả:</b> A Thành BN (Tổng Kho Duy Phong)
🗓 <b>Ngày dự kiến:</b> ${article.createdAt}

📝 <b>Tóm tắt SEO:</b>
<i>${article.summary}</i>

📍 <b>Địa chỉ & Hotline:</b> 549 Ngô Gia Tự, TP. Bắc Ninh | ${CONFIG.HOTLINE}
━━━━━━━━━━━━━━━━━━
👉 <i>Anh Thành bấm nút bên dưới để duyệt đăng lên website ngay:</i>
    `.trim();

    const inlineKeyboard = {
        inline_keyboard: [
            [
                { text: '✅ Duyệt Đăng Lên Website', callback_data: 'approve_publish' },
                { text: '🔄 Đổi Bài Khác', callback_data: 'regenerate_topic' }
            ],
            [
                { text: '❌ Hủy Bỏ', callback_data: 'cancel_draft' }
            ]
        ]
    };

    const postData = JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard
    });

    const res = await request({
        hostname: 'api.telegram.org',
        path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, postData);

    console.log('[Hermes Bot] Đã gửi bản nháp về Telegram của bạn để duyệt!');
}

// 4. ĐẨY BÀI VIẾT LÊN GITHUB API ĐỂ XUẤT BẢN RA WEBSITE
async function publishArticleToWebsite(article) {
    console.log('[Hermes Bot] Bắt đầu đẩy bài viết lên website qua GitHub API...');
    
    // Đọc SHA hiện tại của js/app.js
    const getRes = await request({
        hostname: 'api.github.com',
        path: `/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/contents/js/app.js`,
        method: 'GET',
        headers: {
            'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
            'User-Agent': 'Hermes-Article-Bot',
            'Accept': 'application/vnd.github.v3+json'
        }
    });

    if (getRes.status !== 200 || !getRes.data.content) {
        throw new Error('Không đọc được file js/app.js từ GitHub');
    }

    const currentContent = Buffer.from(getRes.data.content, 'base64').toString('utf8');
    const sha = getRes.data.sha;

    // Chèn bài viết mới vào đầu mảng ALL_SEO_ARTICLES
    const articleObjectCode = JSON.stringify(article, null, 4);
    const updatedContent = currentContent.replace(
        /const ALL_SEO_ARTICLES = \[/,
        `const ALL_SEO_ARTICLES = [\n${articleObjectCode},`
    );

    // Commit lên GitHub
    const putPayload = JSON.stringify({
        message: `feat(seo-blog): Hermes Bot tu dong dang bai viet moi: "${article.title}"`,
        content: Buffer.from(updatedContent, 'utf8').toString('base64'),
        sha: sha
    });

    const putRes = await request({
        hostname: 'api.github.com',
        path: `/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/contents/js/app.js`,
        method: 'PUT',
        headers: {
            'Authorization': `token ${CONFIG.GITHUB_TOKEN}`,
            'User-Agent': 'Hermes-Article-Bot',
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(putPayload)
        }
    }, putPayload);

    if (putRes.status === 200 || putRes.status === 201) {
        console.log('[Hermes Bot] [THÀNH CÔNG] Bài viết đã được đẩy lên GitHub! Website sẽ build xong sau 30s.');
        return true;
    } else {
        console.error('[Hermes Bot] [LỖI] Đẩy bài thất bại:', putRes.data);
        return false;
    }
}

// 5. TẠO BÀI VIẾT TỰ ĐỘNG THEO LỊCH
function generateScheduledArticle() {
    const randomTopic = SEO_TOPICS_POOL[Math.floor(Math.random() * SEO_TOPICS_POOL.length)];
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN');

    const article = {
        id: 'art-' + Date.now(),
        title: randomTopic.title,
        category: randomTopic.category,
        author: 'A Thành BN',
        createdAt: dateStr,
        summary: randomTopic.summary,
        image: randomTopic.image,
        content: `
            <h3>1. Đặt vấn đề & Lưu ý kỹ thuật từ thực tế công trình</h3>
            <p>${randomTopic.summary}</p>
            <h3>2. Lời khuyên vàng khi chọn vật tư tại Bắc Ninh</h3>
            <p>Hệ thống điện là huyết mạch của ngôi nhà. Để đảm bảo vận hành êm ái, an toàn phòng chống cháy nổ, gia chủ nên chọn vật tư chính hãng có đầy đủ giấy tờ xuất xưởng.</p>
            <h3>3. Tư vấn trực tiếp tại Tổng Kho Duy Phong</h3>
            <p>Mời quý khách ghé qua <strong>${CONFIG.STORE_ADDRESS}</strong> hoặc liên hệ Hotline/Zalo: <strong>${CONFIG.HOTLINE}</strong> để được hỗ trợ bóc tách khối lượng và nhận chiết khấu đại lý tốt nhất.</p>
        `
    };

    return article;
}

// 6. LẮNG NGHE SỰ KIỆN DUYỆT TỪ TELEGRAM (LONG POLLING)
let lastUpdateId = 0;
async function pollTelegramUpdates() {
    try {
        const res = await request({
            hostname: 'api.telegram.org',
            path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`,
            method: 'GET'
        });

        if (res.status === 200 && res.data.ok && Array.isArray(res.data.result)) {
            for (const update of res.data.result) {
                lastUpdateId = update.update_id;

                // Xử lý khi bấm nút Callback
                if (update.callback_query) {
                    const cb = update.callback_query;
                    const action = cb.data;

                    if (action === 'approve_publish' && pendingDraft) {
                        await answerCallback(cb.id, 'Đang tiến hành xuất bản lên website...');
                        const success = await publishArticleToWebsite(pendingDraft);
                        if (success) {
                            await sendTelegramMessage(
                                `🎉 <b>ĐÃ XUẤT BẢN THÀNH CÔNG!</b>\n\n` +
                                `Bài viết <i>"${pendingDraft.title}"</i> đã được đăng lên website!\n` +
                                `🌐 Xem trực tiếp tại: http://thietbidien-bacninh.com/`
                            );
                            pendingDraft = null;
                        } else {
                            await sendTelegramMessage('❌ Đăng bài thất bại, vui lòng kiểm tra lại GitHub Token!');
                        }
                    } else if (action === 'regenerate_topic') {
                        await answerCallback(cb.id, 'Đang chọn chủ đề khác...');
                        const newArt = generateScheduledArticle();
                        await sendDraftToTelegram(newArt);
                    } else if (action === 'cancel_draft') {
                        await answerCallback(cb.id, 'Đã hủy bản nháp này.');
                        pendingDraft = null;
                        await sendTelegramMessage('🚫 Đã hủy bản nháp bài viết.');
                    }
                }
            }
        }
    } catch (e) {
        // Tiếp tục poll
    }
    setTimeout(pollTelegramUpdates, 1500);
}

function answerCallback(queryId, text) {
    return request({
        hostname: 'api.telegram.org',
        path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ callback_query_id: queryId, text: text }));
}

function sendTelegramMessage(text) {
    return request({
        hostname: 'api.telegram.org',
        path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ chat_id: CONFIG.TELEGRAM_CHAT_ID, text: text, parse_mode: 'HTML' }));
}

// 7. HÀM CHÍNH KHỞI CHẠY HERMES BOT
async function runHermes() {
    console.log('=== HERMES BOT ĐÃ KHỞI ĐỘNG ===');
    console.log('Lịch: 8h00 Sáng Thứ 2 - Thứ 4 - Thứ 6');
    console.log('Kênh duyệt: Telegram Chat ID =', CONFIG.TELEGRAM_CHAT_ID);
    
    // Bắt đầu lắng nghe Telegram
    if (CONFIG.TELEGRAM_BOT_TOKEN !== 'DIEN_TOKEN_TELEGRAM_VAO_DAY') {
        pollTelegramUpdates();
    } else {
        console.log('[GHI CHÚ] Hãy cấu hình TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID để bot kích hoạt.');
    }
}

// Xuất các hàm để sử dụng
module.exports = {
    generateScheduledArticle,
    sendDraftToTelegram,
    publishArticleToWebsite,
    runHermes
};

if (require.main === module) {
    runHermes();
}
