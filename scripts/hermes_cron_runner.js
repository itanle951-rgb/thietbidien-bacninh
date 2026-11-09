/**
 * HERMES CRON RUNNER
 * Kích hoạt tự động vào 8h00 Sáng Thứ 2 - Thứ 4 - Thứ 6 hàng tuần
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const { generateScheduledArticle } = require('./hermes_telegram_bot.js');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function sendTelegramNotification(article) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.log('[Hermes Cron] Không có Telegram Token, bỏ qua gửi tin nhắn.');
        return Promise.resolve();
    }

    const text = `
🎉 <b>[HERMES BOT] ĐÃ TỰ ĐỘNG XUẤT BẢN BÀI VIẾT MỚI (8h00 Thứ 2 - 4 - 6)</b>
━━━━━━━━━━━━━━━━━━
📌 <b>Tiêu đề:</b> ${article.title}
📂 <b>Chuyên mục:</b> ${article.category}
🗓 <b>Ngày đăng:</b> ${article.createdAt}

📝 <b>Tóm tắt:</b>
<i>${article.summary}</i>

🌐 <b>Xem bài viết ngay tại:</b>
http://thietbidien-bacninh.com/
━━━━━━━━━━━━━━━━━━
<i>Hệ thống tự động đồng bộ & kích hoạt bởi Hermes Bot!</i>
    `.trim();

    const postData = JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML'
    });

    return new Promise(resolve => {
        const req = https.request({
            hostname: 'api.telegram.org',
            path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, res => {
            resolve();
        });
        req.on('error', () => resolve());
        req.write(postData);
        req.end();
    });
}

async function main() {
    console.log('[Hermes Cron] Bắt đầu tiến trình tạo bài viết tự động...');
    const article = generateScheduledArticle();
    console.log('[Hermes Cron] Chủ đề được chọn:', article.title);

    // Cập nhật vào file js/app.js cục bộ
    const appJsPath = path.resolve(__dirname, '../js/app.js');
    let appJs = fs.readFileSync(appJsPath, 'utf8');

    const artStr = JSON.stringify(article, null, 4);
    appJs = appJs.replace(
        /const ALL_SEO_ARTICLES = \[/,
        `const ALL_SEO_ARTICLES = [\n${artStr},`
    );
    fs.writeFileSync(appJsPath, appJs, 'utf8');
    console.log('[Hermes Cron] Đã thêm bài viết mới vào js/app.js');

    // Gửi thông báo đến Telegram
    await sendTelegramNotification(article);
    console.log('[Hermes Cron] Hoàn tất phiên chạy tự động!');
}

main().catch(err => {
    console.error('[Hermes Cron] Lỗi:', err);
    process.exit(1);
});
