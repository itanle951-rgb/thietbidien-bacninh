/**
 * TỰ ĐỘNG GỬI EMAIL TỚI itanle951@gmail.com & LƯU ĐƠN VÀO GOOGLE SHEET
 * Website: Thiết Bị Điện Cao Cấp Duy Phong (Mã KH: A Thành BN)
 */

const NOTIFY_EMAIL = "itanle951@gmail.com";

function doPost(e) {
  try {
    const postData = JSON.parse(e.postData.contents);
    const q = postData.quote || postData;

    // 1. Tự động ghi vào Google Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Mã Phiếu", "Thời Gian", "Tên Khách Hàng", "SĐT / Zalo", 
        "Phân Loại Khách", "Địa Chỉ Công Trình", "Ghi Chú", 
        "Số Mục", "Tổng Niêm Yết", "Chiết Khấu Dự Kiến", "Tổng Sau Chiết Khấu", 
        "Chi Tiết Danh Sách Vật Tư"
      ]);
      sheet.getRange(1, 1, 1, 12).setBackground("#1E293B").setFontColor("#D4AF37").setFontWeight("bold");
    }

    let itemsDetailText = "";
    let itemsTableRowsHtml = "";

    if (Array.isArray(q.items)) {
      q.items.forEach((item, idx) => {
        const lineTotal = (item.price || 0) * (item.qty || 1);
        const priceStr = Utilities.formatString("%,d đ", item.price || 0);
        const totalStr = item.isCustom ? "Báo giá riêng" : Utilities.formatString("%,d đ", lineTotal);
        
        itemsDetailText += (idx + 1) + ". " + item.name + " (" + (item.variant || "") + ") - SL: " + item.qty + " " + item.unit + " - ĐG: " + priceStr + " - TT: " + totalStr + "\n";
        const bg = (idx % 2 === 0) ? "#111827" : "#161F30";
        itemsTableRowsHtml += '<tr style="background: ' + bg + '; border-bottom: 1px solid rgba(212,175,55,0.2);">' +
          '<td style="padding: 10px; text-align: center; color: #D4AF37; font-weight: bold;">' + (idx + 1) + '</td>' +
          '<td style="padding: 10px; color: #FFFFFF;"><strong>' + item.name + '</strong><br><span style="font-size: 12px; color: #06B6D4;">Mã: ' + (item.sku || 'DP') + ' • ' + (item.brand || 'Chính hãng') + '</span></td>' +
          '<td style="padding: 10px; color: #F3E5AB;">' + (item.variant || 'Tiêu chuẩn') + '</td>' +
          '<td style="padding: 10px; text-align: center; color: #FFFFFF; font-weight: bold;">' + item.qty + ' ' + item.unit + '</td>' +
          '<td style="padding: 10px; text-align: right; color: #94A3B8;">' + priceStr + '</td>' +
          '<td style="padding: 10px; text-align: right; color: #10B981; font-weight: bold;">' + totalStr + '</td>' +
        '</tr>';
      });
    }

    const subtotalStr = Utilities.formatString("%,d đ", (q.summary && q.summary.subtotalListed) ? q.summary.subtotalListed : 0);
    const discountStr = Utilities.formatString("%,d đ", (q.summary && q.summary.estimatedDiscount) ? q.summary.estimatedDiscount : 0);
    const finalStr = Utilities.formatString("%,d đ", (q.summary && q.summary.finalEstimated) ? q.summary.finalEstimated : 0);

    sheet.appendRow([
      q.code, q.createdAt, q.customerName, q.customerPhone,
      q.customerTypeLabel, q.projectAddress, q.notes || "",
      (q.summary && q.summary.totalItems) ? q.summary.totalItems : 0,
      subtotalStr, discountStr, finalStr, itemsDetailText
    ]);

    // 2. Gửi Email thông báo tới itanle951@gmail.com
    const cleanPhone = (q.customerPhone || "").replace(/\D/g, "");
    const emailSubject = "⚡ [ĐƠN BÁO GIÁ " + q.code + "] KH: " + q.customerName + " (" + q.customerPhone + ") - Duy Phong BN";
    
    const emailHtml = '<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; background-color: #0B0F17; color: #F8FAFC; margin: 0; padding: 24px;">' +
      '<div style="max-width: 680px; margin: 0 auto; background: #161F30; border: 2px solid #D4AF37; border-radius: 14px; overflow: hidden;">' +
        '<div style="background: linear-gradient(135deg, #101726 0%, #1E293B 100%); padding: 20px 24px; border-bottom: 2px solid #D4AF37;">' +
          '<h2 style="margin: 0; color: #D4AF37; font-size: 20px;">⚡ ĐƠN YÊU CẦU BÁO GIÁ MỚI - DUY PHONG BẮC NINH</h2>' +
          '<p style="margin: 6px 0 0 0; color: #94A3B8; font-size: 13px;">Mã phiếu: <strong style="color: #F3E5AB;">' + q.code + '</strong> | Thời gian: ' + q.createdAt + '</p>' +
        '</div>' +
        '<div style="padding: 20px 24px; background: #0F172A; border-bottom: 1px solid rgba(212,175,55,0.25);">' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 14px;">' +
            '<tr><td style="padding: 4px 0; color: #94A3B8; width: 140px;">👤 Khách hàng:</td><td style="padding: 4px 0; color: #FFFFFF; font-weight: bold; font-size: 15px;">' + q.customerName + '</td></tr>' +
            '<tr><td style="padding: 4px 0; color: #94A3B8;">📞 SĐT / Zalo:</td><td style="padding: 4px 0; color: #06B6D4; font-weight: bold; font-size: 16px;">' + q.customerPhone + '</td></tr>' +
            '<tr><td style="padding: 4px 0; color: #94A3B8;">🏷️ Phân loại:</td><td style="padding: 4px 0; color: #F3E5AB;">' + q.customerTypeLabel + '</td></tr>' +
            '<tr><td style="padding: 4px 0; color: #94A3B8;">📍 Công trình:</td><td style="padding: 4px 0; color: #FFFFFF;">' + q.projectAddress + '</td></tr>' +
            '<tr><td style="padding: 4px 0; color: #94A3B8;">📝 Ghi chú:</td><td style="padding: 4px 0; color: #E2E8F0;">' + (q.notes || 'Không có ghi chú') + '</td></tr>' +
          '</table>' +
          '<div style="margin-top: 14px;">' +
            '<a href="https://zalo.me/' + cleanPhone + '" style="display: inline-block; background: #0068FF; color: #FFFFFF; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; font-size: 13px;">💬 Nhắn Zalo Cho Khách</a>' +
            '<a href="tel:' + cleanPhone + '" style="display: inline-block; background: #10B981; color: #FFFFFF; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; font-size: 13px; margin-left: 10px;">📞 Gọi Điện Trực Tiếp</a>' +
          '</div>' +
        '</div>' +
        '<div style="padding: 20px 24px;">' +
          '<h3 style="margin: 0 0 12px 0; color: #D4AF37; font-size: 16px;">📦 BẢNG KÊ VẬT TƯ ĐIỆN KHÁCH CẦN BÁO GIÁ:</h3>' +
          '<table style="width: 100%; border-collapse: collapse; font-size: 13px;">' +
            '<thead>' +
              '<tr style="background: #1E293B; color: #D4AF37; border-bottom: 2px solid #D4AF37;">' +
                '<th style="padding: 8px; text-align: center;">STT</th>' +
                '<th style="padding: 8px; text-align: left;">Tên Thiết Bị / Vật Tư</th>' +
                '<th style="padding: 8px; text-align: left;">Thông Số</th>' +
                '<th style="padding: 8px; text-align: center;">SL</th>' +
                '<th style="padding: 8px; text-align: right;">Đơn Giá</th>' +
                '<th style="padding: 8px; text-align: right;">Tạm Tính</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>' + itemsTableRowsHtml + '</tbody>' +
          '</table>' +
          '<div style="margin-top: 18px; padding-top: 14px; border-top: 2px dashed rgba(212,175,55,0.4); text-align: right; font-size: 14px;">' +
            '<p style="margin: 4px 0; color: #94A3B8;">Tổng niêm yết: <strong style="color: #FFFFFF;">' + subtotalStr + '</strong></p>' +
            '<p style="margin: 4px 0; color: #94A3B8;">Chiết khấu dự kiến: <strong style="color: #EF4444;">- ' + discountStr + '</strong></p>' +
            '<p style="margin: 8px 0 0 0; color: #10B981; font-size: 18px; font-weight: bold;">TỔNG SAU CHIẾT KHẤU: ' + finalStr + '</p>' +
          '</div>' +
        '</div>' +
        '<div style="background: #0B0F17; padding: 14px 24px; text-align: center; border-top: 1px solid rgba(212,175,55,0.2); font-size: 12px; color: #64748B;">' +
          'Thiết Bị Điện Cao Cấp Duy Phong (Mã KH: A Thành BN)<br>' +
          '549 Ngô Gia Tự, Phường Ninh Xá, TP. Bắc Ninh | Hotline: 0904.511.227' +
        '</div>' +
      '</div></body></html>';

    MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: emailSubject, htmlBody: emailHtml });

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Đã lưu vào Google Sheet & gửi email tới " + NOTIFY_EMAIL,
      quoteCode: q.code
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm test để bạn bấm nút "▷ Chạy" test gửi mail ngay trong Apps Script
function testGuiMail() {
  const e = {
    postData: {
      contents: JSON.stringify({
        quote: {
          code: "BG-TEST-01",
          createdAt: "07/11/2026, 22:50:00",
          customerName: "Anh Minh (Chủ nhà Bắc Ninh)",
          customerPhone: "0904.511.227",
          customerTypeLabel: "Chủ nhà đang xây mới",
          projectAddress: "549 Ngô Gia Tự, TP. Bắc Ninh",
          notes: "Test gửi mail tự động từ Google Apps Script",
          items: [
            { name: "Dây Điện Đơn Mềm Trần Phú 2.5mm", variant: "Cuộn 100m", qty: 6, unit: "Cuộn", price: 685000 },
            { name: "Bộ Công Tắc & Ổ Cắm BRETINA", variant: "Mặt Vàng Champagne", qty: 35, unit: "Bộ", price: 145000 }
          ],
          summary: { totalItems: 2, subtotalListed: 9185000, estimatedDiscount: 1500000, finalEstimated: 7685000 }
        }
      })
    }
  };
  doPost(e);
}
