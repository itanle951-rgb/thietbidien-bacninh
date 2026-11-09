/**
 * ============================================================================
 * HERMES BOT - TỰ ĐỘNG LÊN LỊCH & ĐĂNG BÀI CHUẨN SEO CHO WEBSITE THIẾT BỊ ĐIỆN
 * Bot Telegram: @Dp12895bot
 * Lịch hẹn: 8h00 Sáng Thứ 2 - Thứ 4 - Thứ 6 hàng tuần
 * Kênh duyệt bài: Telegram Bot với nút bấm [Duyệt Đăng] 1-chạm
 * Đích xuất bản: GitHub Pages (thietbidien-bacninh.com)
 * ============================================================================
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. TỰ ĐỘNG ĐỌC TOKEN GITHUB & CONFIG
let GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
try {
    const mcpConfigPath = path.resolve(__dirname, '../../.claude/mcp/mcp_config.json');
    if (fs.existsSync(mcpConfigPath)) {
        const mcp = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
        GITHUB_TOKEN = mcp.mcpServers.github.env.GITHUB_PERSONAL_ACCESS_TOKEN || GITHUB_TOKEN;
    }
} catch (e) {}

const CONFIG_FILE = path.resolve(__dirname, 'hermes_config.json');
let configData = {
    telegram_bot_token: '9246445676:AAElWKqjX-nrvq02INGVfchWMwEE0aWojQ0',
    telegram_bot_username: 'Dp12895bot',
    telegram_chat_id: null,
    github_owner: 'itanle951-rgb',
    github_repo: 'thietbidien-bacninh'
};

if (fs.existsSync(CONFIG_FILE)) {
    try {
        configData = { ...configData, ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) };
    } catch(e) {}
}

const CONFIG = {
    TELEGRAM_BOT_TOKEN: configData.telegram_bot_token,
    TELEGRAM_CHAT_ID: configData.telegram_chat_id,
    GITHUB_OWNER: configData.github_owner,
    GITHUB_REPO: configData.github_repo,
    GITHUB_TOKEN: GITHUB_TOKEN,
    HOTLINE: '0904.511.227 - 0968.599.951',
    STORE_ADDRESS: '549 Ngô Gia Tự, P. Ninh Xá, TP. Bắc Ninh'
};

// 2. KHO CHỦ ĐỀ SEO XOAY VÒNG CHUYÊN SÂU
const SEO_TOPICS_POOL = [
    {
        title: 'Mẹo chọn aptomat chống giật RCBO cho bình nóng lạnh và bếp từ an toàn tuyệt đối',
        category: 'An Toàn Điện Dân Dụng',
        image: 'assets/images/tu-dien-chong-giat-gia-dinh.jpg',
        summary: 'Hướng dẫn cách phân biệt MCB và RCBO, chọn độ nhạy dòng rò 30mA bảo vệ gia đình khi dùng bình nóng lạnh và thiết bị công suất cao trong mùa nồm ẩm.'
    },
    {
        title: 'Bí quyết bóc tách khối lượng dây điện xây nhà phố 4 tầng tiết kiệm chi phí',
        category: 'Kinh Nghiệm Xây Nhà',
        image: 'assets/images/du-toan-vat-tu-dien-nha-pho.jpg',
        summary: 'Chia sẻ công thức tính định mức cuộn dây điện 1.5, 2.5, 4.0 và 6.0mm² chính xác từ kho Duy Phong giúp chủ nhà không bị mua dư thừa hay thiếu hụt.'
    },
    {
        title: 'Top các mẫu công tắc ổ cắm viền kim loại sang trọng cho nhà phố hiện đại 2026',
        category: 'Thiết Bị Cao Cấp',
        image: 'assets/images/products/cong-tac-bretina-vang.jpg',
        summary: 'Đánh giá độ bền tiếp điểm hợp kim bạc, khả năng chịu tải 16A và cảm giác bấm êm ái của các dòng công tắc mặt vàng Champagne và xám Titan.'
    },
    {
        title: 'Quy trình đi dây điện âm tường luồn ống gen chống cháy chuẩn kỹ thuật xây dựng',
        category: 'Tư Vấn Thợ Điện',
        image: 'assets/images/thi-cong-dien-am-tuong-nha-pho.jpg',
        summary: '5 nguyên tắc sống còn khi chôn ống âm tường: Không cắt chéo tường, dùng góc cua lượn tránh gãy gập dây và chụp ảnh hoàn công trước khi trát vữa.'
    },
    {
        title: 'Cách bố trí đèn LED âm trần phòng khách trần thạch cao vừa sang vừa dịu mắt',
        category: 'Chiếu Sáng & Thẩm Mỹ',
        image: 'assets/images/products/den-led-ban-nguyet-rang-dong.jpg',
        summary: 'Tư vấn khoảng cách khoét lỗ đèn phi 90/110, kết hợp ánh sáng trung tính 4000K và ánh sáng ấm 3000K tạo chiều sâu sang trọng cho không gian.'
    }
];

let pendingDraft = null;

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

// 3. TẠO BÀI VIẾT TỰ ĐỘNG
function generateScheduledArticle() {
    const randomTopic = SEO_TOPICS_POOL[Math.floor(Math.random() * SEO_TOPICS_POOL.length)];
    const now = new Date();
    const dateStr = now.toLocaleDateString('vi-VN');

    return {
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
}

// 4. GỬI BẢN NHÁP VỀ TELEGRAM
async function sendDraftToTelegram(article, chatId = CONFIG.TELEGRAM_CHAT_ID) {
    if (!chatId) {
        console.log('[Hermes Bot] Chưa có Chat ID Telegram để gửi bản nháp.');
        return;
    }
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

📍 <b>Địa chỉ:</b> ${CONFIG.STORE_ADDRESS}
📞 <b>Hotline:</b> ${CONFIG.HOTLINE}
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
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        reply_markup: inlineKeyboard
    });

    await request({
        hostname: 'api.telegram.org',
        path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    }, postData);

    console.log('[Hermes Bot] Đã gửi bản nháp bài viết về Telegram Chat ID:', chatId);
}

// 5. ĐẨY BÀI VIẾT LÊN WEBSITE QUA GITHUB API
async function publishArticleToWebsite(article) {
    console.log('[Hermes Bot] Bắt đầu đẩy bài viết lên website qua GitHub API...');
    
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

    const articleObjectCode = JSON.stringify(article, null, 4);
    const updatedContent = currentContent.replace(
        /const ALL_SEO_ARTICLES = \[/,
        `const ALL_SEO_ARTICLES = [\n${articleObjectCode},`
    );

    const putPayload = JSON.stringify({
        message: `feat(seo-blog): Hermes Bot dang bai viet moi qua Telegram: "${article.title}"`,
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

// 6. LẮNG NGHE TIN NHẮN TỪ TELEGRAM & TỰ ĐỘNG BẮT CHAT_ID
let lastUpdateId = 0;
async function pollTelegramUpdates() {
    try {
        const res = await request({
            hostname: 'api.telegram.org',
            path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/getUpdates?offset=${lastUpdateId + 1}&timeout=25`,
            method: 'GET'
        });

        if (res.status === 200 && res.data.ok && Array.isArray(res.data.result)) {
            for (const update of res.data.result) {
                lastUpdateId = update.update_id;

                // Khi người dùng gửi tin nhắn (hoặc bấm /start)
                if (update.message) {
                    const from = update.message.from;
                    const chatId = update.message.chat.id;
                    const text = update.message.text || '';

                    console.log(`[Hermes Bot] Nhận tin nhắn từ @${from.username || from.first_name} (Chat ID: ${chatId}): "${text}"`);

                    // Tự động lưu Chat ID nếu chưa có
                    if (!CONFIG.TELEGRAM_CHAT_ID || CONFIG.TELEGRAM_CHAT_ID !== chatId) {
                        CONFIG.TELEGRAM_CHAT_ID = chatId;
                        configData.telegram_chat_id = chatId;
                        fs.writeFileSync(CONFIG_FILE, JSON.stringify(configData, null, 2), 'utf8');
                        console.log(`[Hermes Bot] ĐÃ TỰ ĐỘNG LƯU CHAT ID: ${chatId}!`);
                    }

                    // Gửi tin nhắn chào mừng và gửi ngay 1 bản nháp đầu tiên
                    await sendTelegramMessage(
                        chatId,
                        `👋 <b>Chào anh Thành!</b>\n\n` +
                        `Bot <b>DP (@Dp12895bot)</b> đã kết nối thành công với website <b>thietbidien-bacninh.com</b>!\n` +
                        `✅ Chat ID của anh: <code>${chatId}</code> đã được lưu tự động.\n\n` +
                        `📅 <b>Lịch đăng bài tự động:</b> 8h00 Sáng Thứ 2 - Thứ 4 - Thứ 6 hàng tuần.\n` +
                        `Dưới đây là bản nháp bài viết mẫu đầu tiên để anh trải nghiệm duyệt bài:`
                    );

                    // Tạo bài viết và gửi bản nháp ngay lập tức
                    const sampleArticle = generateScheduledArticle();
                    await sendDraftToTelegram(sampleArticle, chatId);
                }

                // Khi người dùng bấm nút Callback (Inline Keyboard)
                if (update.callback_query) {
                    const cb = update.callback_query;
                    const action = cb.data;
                    const chatId = cb.message.chat.id;

                    if (action === 'approve_publish' && pendingDraft) {
                        await answerCallback(cb.id, '⏳ Đang đẩy bài lên website...');
                        const success = await publishArticleToWebsite(pendingDraft);
                        if (success) {
                            await sendTelegramMessage(
                                chatId,
                                `🎉 <b>ĐÃ XUẤT BẢN THÀNH CÔNG!</b>\n\n` +
                                `Bài viết: <b>"${pendingDraft.title}"</b>\n` +
                                `Đã được đẩy lên hệ thống GitHub Pages!\n\n` +
                                `🌐 Xem bài viết tại: <a href="http://thietbidien-bacninh.com/">thietbidien-bacninh.com</a>`
                            );
                            pendingDraft = null;
                        } else {
                            await sendTelegramMessage(chatId, '❌ Đăng bài thất bại, vui lòng kiểm tra lại GitHub Token!');
                        }
                    } else if (action === 'regenerate_topic') {
                        await answerCallback(cb.id, '🔄 Đang tạo bài viết khác...');
                        const newArt = generateScheduledArticle();
                        await sendDraftToTelegram(newArt, chatId);
                    } else if (action === 'cancel_draft') {
                        await answerCallback(cb.id, 'Đã hủy bản nháp.');
                        pendingDraft = null;
                        await sendTelegramMessage(chatId, '🚫 Đã hủy bản nháp bài viết này.');
                    }
                }
            }
        }
    } catch (e) {
        // Tiếp tục lắng nghe
    }
    setTimeout(pollTelegramUpdates, 1200);
}

function answerCallback(queryId, text) {
    return request({
        hostname: 'api.telegram.org',
        path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/answerCallbackQuery`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ callback_query_id: queryId, text: text }));
}

function sendTelegramMessage(chatId, text) {
    return request({
        hostname: 'api.telegram.org',
        path: `/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' }));
}

// 7. BẮT ĐẦU CHẠY BOT
console.log('=== HERMES BOT DP (@Dp12895bot) ĐÃ SẴN SÀNG ===');
console.log('Token:', CONFIG.TELEGRAM_BOT_TOKEN.slice(0, 15) + '...');
console.log('Đang chờ anh Thành bấm /start trên Telegram @Dp12895bot...');

pollTelegramUpdates();
