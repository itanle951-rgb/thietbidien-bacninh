/**
 * ============================================================================
 * HỆ THỐNG WEBSITE & BÁO GIÁ VẬT TƯ ĐIỆN - THIẾT BỊ ĐIỆN CAO CẤP DUY PHONG
 * Mã Khách Hàng: A Thành BN
 * Địa chỉ: 549 Ngô Gia Tự, Ninh Xá, TP. Bắc Ninh | Hotline/Zalo: 0904.511.227
 * ============================================================================
 */

const STORAGE_KEYS = {
    PRODUCTS: 'duyphong_athanhbn_products_v1',
    CART_BOQ: 'duyphong_athanhbn_boq_v1',
    QUOTES:   'duyphong_athanhbn_quotes_v1'
};

// Hàm tạo ảnh minh họa SVG sắc nét chuẩn Luxury Black & Gold cho sản phẩm (Đảm bảo 100% không bao giờ lỗi ảnh kể cả khi offline)
function createProductSvgDataUri(title, brand, code, accentColor = '#D4AF37', iconText = '⚡') {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
        <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0B0F17"/>
                <stop offset="55%" stop-color="#161F30"/>
                <stop offset="100%" stop-color="#0F172A"/>
            </linearGradient>
            <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="${accentColor}"/>
                <stop offset="100%" stop-color="#F3E5AB"/>
            </linearGradient>
        </defs>
        <rect width="480" height="320" fill="url(#bg)"/>
        <circle cx="400" cy="60" r="110" fill="${accentColor}" opacity="0.08"/>
        <circle cx="70" cy="260" r="90" fill="#06B6D4" opacity="0.07"/>
        <rect x="20" y="20" width="440" height="280" rx="14" fill="none" stroke="${accentColor}" stroke-opacity="0.35" stroke-width="1.5"/>
        <text x="45" y="65" fill="#F3E5AB" font-family="Arial, sans-serif" font-size="15" font-weight="bold" letter-spacing="1">${brand.toUpperCase()} • DUY PHONG BN</text>
        <text x="405" y="135" font-family="Segoe UI Emoji, Arial" font-size="68" text-anchor="middle">${iconText}</text>
        <text x="45" y="175" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="22" font-weight="bold">${title}</text>
        <rect x="45" y="205" width="170" height="32" rx="6" fill="rgba(212,175,55,0.16)" stroke="${accentColor}" stroke-width="1"/>
        <text x="130" y="226" fill="#F3E5AB" font-family="monospace" font-size="14" font-weight="bold" text-anchor="middle">SKU: ${code}</text>
        <text x="45" y="272" fill="#94A3B8" font-family="Arial, sans-serif" font-size="13">549 Ngô Gia Tự, Ninh Xá, Bắc Ninh • 0904.511.227</text>
    </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Danh mục sản phẩm khởi tạo sát thực tế cửa hàng Duy Phong (549 Ngô Gia Tự, Bắc Ninh) & Top 3 Website ngành điện
const INITIAL_PRODUCTS = [
    {
        "id": "tp-01",
        "sku": "TP-DON-1X",
        "name": "Dây Điện Đơn Tròn Trần Phú 1 Lõi (450/750V)",
        "category": "day-cap",
        "brand": "Trần Phú",
        "price": 11000,
        "unit": "Mét",
        "discount": 30.5,
        "variants": [
            "1x0.75 mm² (5,900 đ/m)",
            "1x1.0 mm² (7,500 đ/m)",
            "1x1.5 mm² (11,000 đ/m)",
            "1x2.5 mm² (17,900 đ/m)",
            "1x4.0 mm² (27,700 đ/m)",
            "1x6.0 mm² (40,800 đ/m)",
            "1x10.0 mm² tròn (72,500 đ/m)"
        ],
        "desc": "Dây đơn tròn 1 ruột đồng tinh khiết 99.99% Trần Phú, vỏ PVC chống cháy. Đầy đủ màu Đỏ, Vàng, Xanh dương, Đen.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsh4opqooujd9d"
    },
    {
        "id": "tp-02",
        "sku": "TP-PE-TIEPDIA",
        "name": "Dây Điện Tiếp Địa Vàng/Xanh Trần Phú (Dây PE Thoát Sét)",
        "category": "day-cap",
        "brand": "Trần Phú",
        "price": 11000,
        "unit": "Mét",
        "discount": 30.5,
        "variants": [
            "1x1.5 mm² Tiếp địa (11,000 đ/m)",
            "1x2.5 mm² Tiếp địa (17,900 đ/m)",
            "1x4.0 mm² Tiếp địa (27,700 đ/m)",
            "1x6.0 mm² Tiếp địa (40,800 đ/m)"
        ],
        "desc": "Dây tiếp địa Trần Phú sọc vàng/xanh tiêu chuẩn kỹ thuật an toàn điện lực, triệt tiêu dòng rò và chống sét lan truyền.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsh4opqooujd9d"
    },
    {
        "id": "tp-03",
        "sku": "TP-DOI-2X",
        "name": "Dây Điện Đôi Tròn & Dây Súp Trần Phú (2 Ruột Đồng)",
        "category": "day-cap",
        "brand": "Trần Phú",
        "price": 23600,
        "unit": "Mét",
        "discount": 30.5,
        "variants": [
            "Dây đôi tròn 2x0.75 mm² (13,500 đ/m)",
            "Dây đôi tròn 2x1.0 mm² (17,100 đ/m)",
            "Dây đôi tròn 2x1.5 mm² (23,600 đ/m)",
            "Dây đôi tròn 2x2.5 mm² (38,600 đ/m)",
            "Dây đôi tròn 2x4.0 mm² (58,200 đ/m)",
            "Dây đôi tròn 2x6.0 mm² (86,000 đ/m)",
            "Dây tròn 3x0.75 mm² (19,800 đ/m)",
            "Dây súp dẹt 2x0.75 mm² (11,700 đ/m)"
        ],
        "desc": "Dây điện đôi 2 ruột đồng Trần Phú bọc PVC cách điện kép, thích hợp chạy dây bóng điện, quạt, ổ cắm gia đình.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsh4opqooujd9d"
    },
    {
        "id": "tp-04",
        "sku": "TP-CAP-MEM",
        "name": "Cáp Điện Mềm Nhiều Lõi Trần Phú (2 Ruột, 3 Ruột, 4 Ruột)",
        "category": "day-cap",
        "brand": "Trần Phú",
        "price": 25800,
        "unit": "Mét",
        "discount": 29.2,
        "variants": [
            "Cáp mềm 2x0.75 mm² (15,200 đ/m)",
            "Cáp mềm 2x1.0 mm² (18,500 đ/m)",
            "Cáp mềm 2x1.5 mm² (25,800 đ/m)",
            "Cáp mềm 2x2.5 mm² (41,600 đ/m)",
            "Cáp mềm 2x4.0 mm² (63,200 đ/m)",
            "Cáp mềm 2x6.0 mm² (93,700 đ/m)",
            "Cáp mềm 3x1.5 mm² (36,700 đ/m)",
            "Cáp mềm 3x2.5 mm² (59,800 đ/m)",
            "Cáp mềm 3x4.0 mm² (90,300 đ/m)",
            "Cáp mềm 3x6.0 mm² (135,000 đ/m)",
            "Cáp mềm 4x1.5 mm² (48,200 đ/m)",
            "Cáp mềm 4x2.5 mm² (77,700 đ/m)",
            "Cáp mềm 4x4.0 mm² (118,400 đ/m)",
            "Cáp mềm 4x6.0 mm² (175,400 đ/m)"
        ],
        "desc": "Cáp điện tròn nhiều ruột đồng mềm bện xoắn Trần Phú, mềm dẻo chịu lực cơ học, chuyên dùng cấp nguồn điều hòa, động cơ.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3ysa8xic0hcb2"
    },
    {
        "id": "tp-05",
        "sku": "TP-NET-LAN",
        "name": "Dây Cáp Mạng Internet U/UTP Trần Phú (Cat5e & Cat6)",
        "category": "day-cap",
        "brand": "Trần Phú",
        "price": 15500,
        "unit": "Mét",
        "discount": 19.8,
        "variants": [
            "Dây mạng Cat5e U/UTP (12,000 đ/m)",
            "Dây mạng Cat6 U/UTP (15,500 đ/m)"
        ],
        "desc": "Cáp mạng xoắn đôi 4 đôi 8 lõi đồng nguyên chất Trần Phú, băng thông truyền dữ liệu Gigabit tốc độ cao, không suy hao.",
        "image": "https://cf.shopee.vn/file/f96bd59bbac1398c97d9aaeb7e8e22c5"
    },
    {
        "id": "tp-06",
        "sku": "TP-OCAM-DAY",
        "name": "Ổ Cắm Kéo Dài Đa Năng Chống Giật Trần Phú (Có USB & Type-C)",
        "category": "cong-tac-o-cam",
        "brand": "Trần Phú",
        "price": 205000,
        "unit": "Chiếc",
        "discount": 63,
        "variants": [
            "A40-4D (Dây 1.8m, 4 ổ cắm) - 205,000 đ",
            "A40-4D (Dây 3.0m, 4 ổ cắm) - 255,000 đ",
            "A33-3D3U (Dây 1.8m, 3 ổ + 3 USB) - 365,000 đ",
            "A33-3D3U (Dây 3.0m, 3 ổ + 3 USB) - 415,000 đ",
            "A63-3D3T3U (Dây 1.8m, 6 ổ + 3 Type-C/USB) - 465,000 đ",
            "A63-3D3T3U (Dây 3.0m, 6 ổ + 3 Type-C/USB) - 515,000 đ",
            "A23-1D1T3U (Dây 1.5m, ổ cắm để bàn) - 315,000 đ"
        ],
        "desc": "Ổ cắm kéo dài thế hệ mới Trần Phú, rơ-le chống quá tải tự ngắt, cổng sạc nhanh USB/Type-C, vỏ nhựa chống cháy chịu nhiệt 750°C.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lsh4opqooujd9d"
    },
    {
        "id": "cds-01",
        "sku": "CDS-DON-1X",
        "name": "Dây Điện Đơn 1 Lõi Cadisun VCm / VSF (Đỏ, Đen, Vàng, Xanh)",
        "category": "day-cap",
        "brand": "Cadisun",
        "price": 9079,
        "unit": "Mét",
        "discount": 29.5,
        "variants": [
            "1x0.5 mm² (3,521 đ/m)",
            "1x0.75 mm² (5,107 đ/m)",
            "1x1.0 mm² (6,355 đ/m)",
            "1x1.5 mm² (9,079 đ/m)",
            "1x2.5 mm² (14,868 đ/m)",
            "1x4.0 mm² (23,746 đ/m)",
            "1x6.0 mm² (36,342 đ/m)",
            "1x10.0 mm² (64,161 đ/m)",
            "1x1.5 mm² VCSH Chống sét (9,475 đ/m)",
            "1x2.5 mm² VCSH Chống sét (15,116 đ/m)",
            "1x4.0 mm² VCSH Chống sét (24,669 đ/m)",
            "1x6.0 mm² VCSH Chống sét (37,074 đ/m)"
        ],
        "desc": "Dây điện đơn 1 ruột đồng mềm Cadisun chính hãng bọc nhựa PVC cách điện cao cấp, đủ kích cỡ và màu sắc thi công nhà ở gia đình.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lm0mlxq284bjc7"
    },
    {
        "id": "cds-02",
        "sku": "CDS-DOI-2X",
        "name": "Dây Điện Đôi Dẹt VCmd & Dây Tròn 2 Lõi Cadisun",
        "category": "day-cap",
        "brand": "Cadisun",
        "price": 19480,
        "unit": "Mét",
        "discount": 29.5,
        "variants": [
            "Dây đôi 2x0.5 mm² (7,884 đ/m)",
            "Dây đôi 2x0.75 mm² (11,256 đ/m)",
            "Dây đôi 2x1.0 mm² (13,978 đ/m)",
            "Dây đôi 2x1.5 mm² (19,480 đ/m)",
            "Dây đôi 2x2.5 mm² (31,746 đ/m)",
            "Dây đôi 2x4.0 mm² (50,481 đ/m)",
            "Dây đôi 2x6.0 mm² (76,339 đ/m)"
        ],
        "desc": "Dây điện đôi 2 ruột đồng Cadisun vỏ bọc dẻo dai, dễ bóc tách đấu nối cho các thiết bị đèn chiếu sáng, quạt trần, ổ cắm.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lm0mlxq284bjc7"
    },
    {
        "id": "cds-03",
        "sku": "CDS-VCTF-MEM",
        "name": "Cáp Điện Mềm Tròn VCTF Cadisun (2 Ruột, 3 Ruột, 4 Ruột)",
        "category": "day-cap",
        "brand": "Cadisun",
        "price": 20941,
        "unit": "Mét",
        "discount": 29.5,
        "variants": [
            "Cáp mềm 2x0.75 mm² VCTF (12,247 đ/m)",
            "Cáp mềm 2x1.0 mm² VCTF (15,053 đ/m)",
            "Cáp mềm 2x1.5 mm² VCTF (20,941 đ/m)",
            "Cáp mềm 2x2.5 mm² VCTF (33,902 đ/m)",
            "Cáp mềm 2x4.0 mm² VCTF (53,466 đ/m)",
            "Cáp mềm 2x6.0 mm² VCTF (80,257 đ/m)",
            "Cáp mềm 3x1.5 mm² VCTF (30,098 đ/m)",
            "Cáp mềm 3x2.5 mm² VCTF (49,334 đ/m)",
            "Cáp mềm 3x4.0 mm² VCTF (77,136 đ/m)",
            "Cáp mềm 3x6.0 mm² VCTF (117,212 đ/m)",
            "Cáp mềm 4x1.5 mm² VCTF (39,586 đ/m)",
            "Cáp mềm 4x2.5 mm² VCTF (64,561 đ/m)",
            "Cáp mềm 4x4.0 mm² VCTF (101,619 đ/m)",
            "Cáp mềm 4x6.0 mm² VCTF (154,312 đ/m)"
        ],
        "desc": "Cáp tròn mềm VCTF Cadisun chịu uốn gập di động cao, dùng đấu nối máy móc cơ khí, thiết bị xưởng sản xuất, quạt hút.",
        "image": "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3ysa8xic0hcb2"
    },
    {
        "id": "cds-04",
        "sku": "CDS-CV-CXV-1X",
        "name": "Cáp Đồng Hạ Thế CV & CXV 1 Lõi Cadisun (0.6/1kV)",
        "category": "day-cap",
        "brand": "Cadisun",
        "price": 27962,
        "unit": "Mét",
        "discount": 29.5,
        "variants": [
            "Cáp CV 1x1.5 mm² (9,700 đ/m)",
            "Cáp CV 1x2.5 mm² (15,750 đ/m)",
            "Cáp CV 1x4.0 mm² (25,741 đ/m)",
            "Cáp CV 1x6.0 mm² (37,523 đ/m)",
            "Cáp CV 1x10.0 mm² (60,903 đ/m)",
            "Cáp CV 1x16.0 mm² (95,024 đ/m)",
            "Cáp CV 1x25.0 mm² (147,470 đ/m)",
            "Cáp CV 1x35.0 mm² (203,684 đ/m)",
            "Cáp CV 1x50.0 mm² (278,381 đ/m)",
            "Cáp CXV 1x16 mm² (97,363 đ/m)",
            "Cáp CXV 1x25 mm² (150,138 đ/m)",
            "Cáp CXV 1x35 mm² (206,790 đ/m)",
            "Cáp CXV 1x50 mm² (281,650 đ/m)",
            "Cáp CXV 1x70 mm² (401,644 đ/m)",
            "Cáp CXV 1x95 mm² (556,260 đ/m)",
            "Cáp CXV 1x120 mm² (699,309 đ/m)",
            "Cáp CXV 1x150 mm² (868,376 đ/m)",
            "Cáp CXV 1x185 mm² (1,080,746 đ/m)",
            "Cáp CXV 1x240 mm² (1,422,257 đ/m)"
        ],
        "desc": "Cáp lực hạ thế 1 ruột đồng Cadisun cách điện XLPE/PVC 0.6/1kV, tải dòng lớn kéo trục chính từ trạm biến áp vào tủ điện tổng.",
        "image": "https://sudospaces.com/super-mro/2022/10/day-dien-cadisun-cxv-3x16-600v1kv.jpg"
    },
    {
        "id": "cds-05",
        "sku": "CDS-CAP-3P4W",
        "name": "Cáp Điện Lực Treo 3 Pha 4 Lõi (3 Pha + 1 Trung Tính) Cadisun",
        "category": "day-cap",
        "brand": "Cadisun",
        "price": 148064,
        "unit": "Mét",
        "discount": 29.5,
        "variants": [
            "3x2.5 + 1x1.5 mm² (66,682 đ/m)",
            "3x4 + 1x2.5 mm² (103,818 đ/m)",
            "3x6 + 1x4 mm² (148,064 đ/m)",
            "3x10 + 1x6 mm² (231,457 đ/m)",
            "3x16 + 1x10 mm² (359,346 đ/m)",
            "3x25 + 1x16 mm² (559,817 đ/m)",
            "3x35 + 1x16 mm² (731,719 đ/m)",
            "3x50 + 1x25 mm² (1,016,662 đ/m)",
            "3x70 + 1x35 mm² (1,441,521 đ/m)",
            "3x95 + 1x50 mm² (1,971,399 đ/m)",
            "3x120 + 1x70 mm² (2,528,361 đ/m)",
            "3x150 + 1x70 mm² (3,039,268 đ/m)",
            "3x185 + 1x150 mm² (4,151,805 đ/m)",
            "3x240 + 1x150 mm² (5,188,933 đ/m)"
        ],
        "desc": "Cáp đồng treo hạ thế 3 pha 4 lõi Cadisun cấp nguồn tủ phân phối MSB/DB cho nhà xưởng, trạm máy công nghiệp Bắc Ninh.",
        "image": "https://thietbidienhanoi.vn/media/product/1477_0_cap_nhom_4_ruot_xlpe_abc_4x_cadisun.jpg"
    },
    {
        "id": "cds-06",
        "sku": "CDS-CAP-2X-4X",
        "name": "Cáp Đồng Treo 2 Lõi & 4 Lõi Bằng Nhau Cadisun",
        "category": "day-cap",
        "brand": "Cadisun",
        "price": 112870,
        "unit": "Mét",
        "discount": 29.5,
        "variants": [
            "Cáp 2x1.5 mm² (24,363 đ/m)",
            "Cáp 2x2.5 mm² (37,228 đ/m)",
            "Cáp 2x4.0 mm² (57,319 đ/m)",
            "Cáp 2x6.0 mm² (84,231 đ/m)",
            "Cáp 2x10 mm² (132,356 đ/m)",
            "Cáp 2x16 mm² (202,534 đ/m)",
            "Cáp 4x1.5 mm² (47,739 đ/m)",
            "Cáp 4x2.5 mm² (73,091 đ/m)",
            "Cáp 4x4.0 mm² (112,870 đ/m)",
            "Cáp 4x6.0 mm² (161,735 đ/m)",
            "Cáp 4x10 mm² (255,100 đ/m)",
            "Cáp 4x16 mm² (394,728 đ/m)",
            "Cáp 4x25 mm² (614,666 đ/m)",
            "Cáp 4x35 mm² (844,730 đ/m)",
            "Cáp 4x50 mm² (1,150,811 đ/m)"
        ],
        "desc": "Cáp đồng hạ thế treo Cadisun 2 ruột & 4 ruột bằng nhau cách điện XLPE/PVC bền chắc, vận hành an toàn tuyệt đối.",
        "image": "https://thietbidienhanoi.vn/media/product/1477_0_cap_nhom_4_ruot_xlpe_abc_4x_cadisun.jpg"
    },
    {
        "id": "cds-07",
        "sku": "CDS-CAP-NGAM-DSTA",
        "name": "Cáp Ngầm Chôn Đất Bọc Giáp Băng Thép DSTA Cadisun",
        "category": "day-cap",
        "brand": "Cadisun",
        "price": 174353,
        "unit": "Mét",
        "discount": 29.5,
        "variants": [
            "Cáp ngầm 2x2.5 mm² DSTA (48,808 đ/m)",
            "Cáp ngầm 2x4.0 mm² DSTA (69,786 đ/m)",
            "Cáp ngầm 2x6.0 mm² DSTA (95,322 đ/m)",
            "Cáp ngầm 2x10 mm² DSTA (144,819 đ/m)",
            "Cáp ngầm 2x16 mm² DSTA (217,514 đ/m)",
            "Cáp ngầm 2x25 mm² DSTA (328,795 đ/m)",
            "Cáp ngầm 4x2.5 mm² DSTA (84,913 đ/m)",
            "Cáp ngầm 4x4.0 mm² DSTA (124,428 đ/m)",
            "Cáp ngầm 4x6.0 mm² DSTA (174,353 đ/m)",
            "Cáp ngầm 4x10 mm² DSTA (268,895 đ/m)",
            "Cáp ngầm 4x16 mm² DSTA (409,919 đ/m)",
            "Cáp ngầm 4x25 mm² DSTA (632,447 đ/m)",
            "Cáp ngầm 4x35 mm² DSTA (865,292 đ/m)",
            "Cáp ngầm 4x50 mm² DSTA (1,175,649 đ/m)",
            "Cáp ngầm 3x16+1x10 mm² DSTA (378,155 đ/m)",
            "Cáp ngầm 3x25+1x16 mm² DSTA (576,439 đ/m)",
            "Cáp ngầm 3x35+1x16 mm² DSTA (750,279 đ/m)",
            "Cáp ngầm 3x50+1x25 mm² DSTA (1,038,253 đ/m)",
            "Cáp ngầm 3x70+1x35 mm² DSTA (1,485,242 đ/m)",
            "Cáp ngầm 3x95+1x50 mm² DSTA (2,019,834 đ/m)"
        ],
        "desc": "Cáp ngầm bọc 2 lớp giáp băng thép mạ kẽm DSTA Cadisun, chôn trực tiếp dưới đất, chống chuột gặm nhấm và ẩm ngập.",
        "image": "https://capvienthong.vn/media/lib/2549_day-cap-dien-cadisun-cap-ngam-dsta-4x25.jpg"
    },
    {
        "id": "cdg-01",
        "sku": "CDG-CV-CXV-1X",
        "name": "Cáp Đồng Hạ Thế CV & CXV 1 Lõi Cadi-Gold (0.6/1kV)",
        "category": "day-cap",
        "brand": "Cadi-Gold",
        "price": 20100,
        "unit": "Mét",
        "discount": 13.2,
        "variants": [
            "Cáp CV 1x2.5 mm² (12,100 đ/m)",
            "Cáp CV 1x4.0 mm² (20,100 đ/m)",
            "Cáp CV 1x6.0 mm² (29,300 đ/m)",
            "Cáp CV 1x10.0 mm² (47,700 đ/m)",
            "Cáp CV 1x16.0 mm² (74,500 đ/m)",
            "Cáp CV 1x25.0 mm² (115,600 đ/m)",
            "Cáp CV 1x35.0 mm² (159,900 đ/m)",
            "Cáp CV 1x50.0 mm² (218,500 đ/m)",
            "Cáp CXV 1x16 mm² (76,100 đ/m)",
            "Cáp CXV 1x25 mm² (117,500 đ/m)",
            "Cáp CXV 1x35 mm² (162,000 đ/m)",
            "Cáp CXV 1x50 mm² (220,900 đ/m)",
            "Cáp CXV 1x70 mm² (315,200 đ/m)",
            "Cáp CXV 1x95 mm² (436,800 đ/m)",
            "Cáp CXV 1x120 mm² (549,300 đ/m)",
            "Cáp CXV 1x150 mm² (682,100 đ/m)",
            "Cáp CXV 1x185 mm² (849,000 đ/m)",
            "Cáp CXV 1x240 mm² (1,117,600 đ/m)"
        ],
        "desc": "Dòng sản phẩm Cadi-Gold cao cấp của Cadisun, ruột đồng tinh chất, cách điện XLPE 90°C tiêu chuẩn châu Âu.",
        "image": "https://quydan.com.vn/upload/images/san-pham/Cadi-Sun/8_SWA-CTS-3x_2_980x980.png"
    },
    {
        "id": "cdg-02",
        "sku": "CDG-CAP-3P4W",
        "name": "Cáp Điện Lực Treo 3 Pha 4 Lõi Cadi-Gold (3 Pha + 1 Trung Tính)",
        "category": "day-cap",
        "brand": "Cadi-Gold",
        "price": 115900,
        "unit": "Mét",
        "discount": 13.2,
        "variants": [
            "3x2.5 + 1x1.5 mm² (51,300 đ/m)",
            "3x4 + 1x2.5 mm² (80,100 đ/m)",
            "3x6 + 1x4 mm² (115,900 đ/m)",
            "3x10 + 1x6 mm² (181,400 đ/m)",
            "3x16 + 1x10 mm² (282,800 đ/m)",
            "3x25 + 1x16 mm² (436,500 đ/m)",
            "3x35 + 1x16 mm² (570,900 đ/m)",
            "3x50 + 1x25 mm² (794,100 đ/m)",
            "3x70 + 1x35 mm² (1,126,700 đ/m)",
            "3x95 + 1x50 mm² (1,541,600 đ/m)",
            "3x120 + 1x70 mm² (1,977,200 đ/m)",
            "3x150 + 1x70 mm² (2,498,300 đ/m)",
            "3x185 + 1x120 mm² (3,117,900 đ/m)",
            "3x240 + 1x120 mm² (3,926,900 đ/m)"
        ],
        "desc": "Cáp treo 3 pha 4 lõi Cadi-Gold cấp điện trục đứng tòa nhà, xưởng sản xuất KCN Bắc Ninh, vận hành ổn định không phát nhiệt.",
        "image": "https://quydan.com.vn/upload/images/san-pham/Cadi-Sun/8_SWA-CTS-3x_2_980x980.png"
    },
    {
        "id": "cdg-03",
        "sku": "CDG-CAP-2X-4X",
        "name": "Cáp Đồng Treo 2 Lõi & 4 Lõi Cadi-Gold",
        "category": "day-cap",
        "brand": "Cadi-Gold",
        "price": 87100,
        "unit": "Mét",
        "discount": 13.2,
        "variants": [
            "Cáp 2x1.5 mm² (18,300 đ/m)",
            "Cáp 2x2.5 mm² (28,300 đ/m)",
            "Cáp 2x4.0 mm² (43,900 đ/m)",
            "Cáp 2x6.0 mm² (64,900 đ/m)",
            "Cáp 2x10 mm² (102,400 đ/m)",
            "Cáp 2x16 mm² (157,400 đ/m)",
            "Cáp 4x2.5 mm² (56,200 đ/m)",
            "Cáp 4x4.0 mm² (87,100 đ/m)",
            "Cáp 4x6.0 mm² (125,400 đ/m)",
            "Cáp 4x10 mm² (200,300 đ/m)",
            "Cáp 4x16 mm² (307,400 đ/m)",
            "Cáp 4x25 mm² (479,400 đ/m)",
            "Cáp 4x35 mm² (659,300 đ/m)",
            "Cáp 4x50 mm² (898,500 đ/m)"
        ],
        "desc": "Cáp đồng hạ thế 2 ruột & 4 ruột Cadi-Gold độ tin cậy cao, chuyên dùng trạm bơm, điều hòa trung tâm VRV, chiller.",
        "image": "https://quydan.com.vn/upload/images/san-pham/Cadi-Sun/8_SWA-CTS-3x_2_980x980.png"
    },
    {
        "id": "cdg-04",
        "sku": "CDG-CAP-NGAM-DSTA",
        "name": "Cáp Đồng Ngầm Chôn Đất Bọc Giáp Băng Thép DSTA Cadi-Gold",
        "category": "day-cap",
        "brand": "Cadi-Gold",
        "price": 135800,
        "unit": "Mét",
        "discount": 13.2,
        "variants": [
            "Cáp ngầm 2x2.5 mm² DSTA (37,300 đ/m)",
            "Cáp ngầm 2x4.0 mm² DSTA (53,700 đ/m)",
            "Cáp ngầm 2x6.0 mm² DSTA (74,100 đ/m)",
            "Cáp ngầm 2x10 mm² DSTA (112,800 đ/m)",
            "Cáp ngầm 2x16 mm² DSTA (169,700 đ/m)",
            "Cáp ngầm 4x2.5 mm² DSTA (65,900 đ/m)",
            "Cáp ngầm 4x4.0 mm² DSTA (96,800 đ/m)",
            "Cáp ngầm 4x6.0 mm² DSTA (135,800 đ/m)",
            "Cáp ngầm 4x10 mm² DSTA (212,000 đ/m)",
            "Cáp ngầm 4x16 mm² DSTA (323,500 đ/m)",
            "Cáp ngầm 4x25 mm² DSTA (494,100 đ/m)",
            "Cáp ngầm 3x16+1x10 mm² DSTA (295,500 đ/m)",
            "Cáp ngầm 3x25+1x16 mm² DSTA (450,300 đ/m)",
            "Cáp ngầm 3x35+1x16 mm² DSTA (586,300 đ/m)",
            "Cáp ngầm 3x50+1x25 mm² DSTA (811,400 đ/m)",
            "Cáp ngầm 3x70+1x35 mm² DSTA (1,161,200 đ/m)"
        ],
        "desc": "Cáp ngầm lực bọc giáp băng thép DSTA Cadi-Gold, chống ẩm ngập, côn trùng gặm nhấm, an toàn cho hệ thống điện ngầm đô thị & KCN.",
        "image": "https://quydan.com.vn/upload/images/san-pham/Cadi-Sun/8_SWA-CTS-3x_2_980x980.png"
    },
    {
        "id": "cdg-05",
        "sku": "CDG-CAP-MEM",
        "name": "Cáp Điện Mềm Nhiều Lõi Cadi-Gold (2 Ruột, 3 Ruột, 4 Ruột)",
        "category": "day-cap",
        "brand": "Cadi-Gold",
        "price": 25100,
        "unit": "Mét",
        "discount": 13.2,
        "variants": [
            "Cáp mềm 2x1.5 mm² (15,450 đ/m)",
            "Cáp mềm 2x2.5 mm² (25,100 đ/m)",
            "Cáp mềm 3x1.0 mm² (16,000 đ/m)",
            "Cáp mềm 3x1.5 mm² (22,350 đ/m)",
            "Cáp mềm 3x2.5 mm² (36,780 đ/m)",
            "Cáp mềm 3x4.0 mm² (57,750 đ/m)",
            "Cáp mềm 3x6.0 mm² (88,000 đ/m)",
            "Cáp mềm 4x1.5 mm² (29,460 đ/m)",
            "Cáp mềm 4x2.5 mm² (48,250 đ/m)",
            "Cáp mềm 4x4.0 mm² (76,200 đ/m)",
            "Cáp mềm 4x6.0 mm² (116,100 đ/m)"
        ],
        "desc": "Cáp đồng mềm nhiều ruột Cadi-Gold vỏ PVC bền dẻo, dùng đấu nối tủ động lực và thiết bị di động trong nhà xưởng.",
        "image": "https://quydan.com.vn/upload/images/san-pham/Cadi-Sun/8_SWA-CTS-3x_2_980x980.png"
    },
    {
        id: 'dp-01',
        sku: 'TP-VCm-2.5',
        name: 'Dây Điện Đơn Mềm Trần Phú Chính Hãng (Cuộn 100m)',
        category: 'day-cap',
        brand: 'Trần Phú',
        price: 685000,
        unit: 'Cuộn (100m)',
        discount: 18,
        variants: ['Tiết diện 1.5mm² (Đỏ/Xanh/Vàng)', 'Tiết diện 2.5mm² (Đỏ/Xanh/Đen)', 'Tiết diện 4.0mm² (Chạy nguồn chính)', 'Tiết diện 6.0mm² (Chạy trục tổng)'],
        desc: 'Dây đồng nguyên chất 99.99% dẫn điện tối ưu, vỏ PVC chống cháy lan chuyên dùng đi âm tường xây nhà mới.',
        image: 'assets/images/kho-day-cap-thiet-bi.jpg'
    },
    {
        id: 'dp-02',
        sku: 'CDV-CV-4.0',
        name: 'Dây Cáp Điện Đơn Cứng Cadivi CV Chính Hãng',
        category: 'day-cap',
        brand: 'Cadivi',
        price: 1120000,
        unit: 'Cuộn (100m)',
        discount: 20,
        variants: ['CV 1.5mm² - 450/750V', 'CV 2.5mm² - 450/750V', 'CV 4.0mm² - 450/750V', 'CV 6.0mm² - 450/750V', 'CV 10.0mm² - Cáp nguồn tổng'],
        desc: 'Thương hiệu quốc gia Cadivi, chịu tải cao cho điều hòa, bình nóng lạnh, bếp từ và trục đứng nhà ống 2-5 tầng.',
        image: createProductSvgDataUri('Dây Cáp Điện Cadivi CV', 'CADIVI', 'CDV-CV-4.0', '#D4AF37', '🔌')
    },
    {
        id: 'dp-03',
        sku: 'CDS-3P-4x16',
        name: 'Cáp Đồng Hạ Thế 3 Pha 4 Lõi Cadisun (Dùng Cho Nhà Xưởng)',
        category: 'day-cap',
        brand: 'Cadisun',
        price: 165000,
        unit: 'Mét',
        discount: 22,
        variants: ['CVV 3x6 + 1x4 mm²', 'CVV 3x10 + 1x6 mm²', 'CVV 3x16 + 1x10 mm²', 'CVV 3x25 + 1x16 mm²', 'CVV 3x35 + 1x16 mm²'],
        desc: 'Cáp lực 3 pha cấp nguồn tổng cho tủ điện MSB/DB nhà xưởng vừa và nhỏ tại các KCN Bắc Ninh. Cắt lẻ theo số mét yêu cầu.',
        image: createProductSvgDataUri('Cáp Lực 3 Pha 4 Lõi Nhà Xưởng', 'CADISUN', 'CDS-3P-4x16', '#06B6D4', '🏭')
    },
    {
        id: 'dp-04',
        sku: 'BRT-LUX-G1',
        name: 'Bộ Công Tắc & Ổ Cắm Cao Cấp BRETINA Viền Kim Loại',
        category: 'cong-tac-o-cam',
        brand: 'Bretina',
        price: 145000,
        unit: 'Bộ',
        discount: 25,
        variants: ['Ổ cắm đôi 3 chấu mặt Vàng Champagne', 'Công tắc 2 hạt mặt Vàng Champagne', 'Công tắc 3 hạt mặt Xám Titan', 'Công tắc 1 hạt 2 chiều (Cầu thang)', 'Hạt mạng LAN + Tivi đồng bộ'],
        desc: 'Dòng thiết bị mặt viền sang trọng trưng bày trực tiếp tại Showroom Duy Phong, tiếp điểm đồng hợp kim đàn hồi chống đánh lửa.',
        image: 'assets/images/kho-day-cap-thiet-bi.jpg'
    },
    {
        id: 'dp-05',
        sku: 'VNI-PRO-S2',
        name: 'Bộ Công Tắc & Ổ Cắm Cao Cấp VANNI Chính Hãng',
        category: 'cong-tac-o-cam',
        brand: 'Vanni',
        price: 125000,
        unit: 'Bộ',
        discount: 25,
        variants: ['Bộ ổ cắm đôi 3 chấu đa năng', 'Bộ công tắc 1 chiều (1-2-3 hạt)', 'Bộ công tắc cầu thang 2 chiều', 'Công tắc bình nóng lạnh 20A có đèn báo'],
        desc: 'Thiết kế hiện đại, mặt nhựa Polycarbonate chống ố vàng, bảo hành đổi mới dài hạn cho công trình nhà dân & biệt thự.',
        image: createProductSvgDataUri('Công Tắc & Ổ Cắm Cao Cấp VANNI', 'VANNI', 'VNI-PRO-S2', '#D4AF37', '✨')
    },
    {
        id: 'dp-06',
        sku: 'PANA-WIDE-W',
        name: 'Bộ Công Tắc Ổ Cắm Panasonic Dòng Wide / Halumie',
        category: 'cong-tac-o-cam',
        brand: 'Panasonic',
        price: 118000,
        unit: 'Bộ',
        discount: 22,
        variants: ['Bộ ổ cắm đôi 3 chấu có màn che', 'Bộ 1 công tắc + 1 ổ cắm', 'Bộ 2 công tắc 1 chiều', 'Bộ 3 công tắc 1 chiều', 'Công tắc 2 cực 20A cho Điều hòa/Nóng lạnh'],
        desc: 'Dòng sản phẩm Panasonic bền bỉ theo năm tháng, được các thợ điện Bắc Ninh tin dùng nhiều nhất cho nhà xây mới.',
        image: createProductSvgDataUri('Công Tắc Ổ Cắm Panasonic Wide', 'PANASONIC', 'PANA-WIDE-W', '#10B981', '🔘')
    },
    {
        id: 'dp-07',
        sku: 'NNC-DL-9W',
        name: 'Đèn LED Âm Trần Downlight Nanoco / Panasonic Đổi Màu',
        category: 'chieu-sang',
        brand: 'Nanoco',
        price: 115000,
        unit: 'Cái',
        discount: 28,
        variants: ['9W Đổi 3 màu (Lỗ khoét Φ90mm)', '12W Đổi 3 màu (Lỗ khoét Φ110mm)', '9W Ánh sáng Trắng 6500K (Φ90mm)', '9W Ánh sáng Vàng ấm 3000K (Φ90mm)'],
        desc: 'Đế nhôm đúc tản nhiệt nhanh, chip LED RG0 chống chói bảo vệ mắt, ánh sáng trung thực CRI > 80 cho phòng khách & phòng ngủ.',
        image: createProductSvgDataUri('Đèn LED Âm Trần Downlight 3 Màu', 'NANOCO', 'NNC-DL-9W', '#F59E0B', '💡')
    },
    {
        id: 'dp-08',
        sku: 'RD-BN-40W',
        name: 'Đèn LED Bán Nguyệt & Tuýp LED Rạng Đông 1.2m Siêu Sáng',
        category: 'chieu-sang',
        brand: 'Rạng Đông',
        price: 168000,
        unit: 'Bộ',
        discount: 20,
        variants: ['Bán nguyệt 1.2m - 40W Trắng', 'Bán nguyệt 1.2m - 50W Siêu sáng', 'Bộ Tuýp LED đôi 1.2m - 2x20W', 'Bán nguyệt 0.6m - 20W'],
        desc: 'Giải pháp chiếu sáng tiết kiệm điện cho hành lang, bếp, phòng sinh hoạt chung, cửa hàng và văn phòng nhà xưởng.',
        image: createProductSvgDataUri('Đèn LED Bán Nguyệt 1.2m 40W', 'RẠNG ĐÔNG', 'RD-BN-40W', '#D4AF37', '🌟')
    },
    {
        id: 'dp-09',
        sku: 'HB-IND-150W',
        name: 'Đèn LED Highbay & Đèn Pha Nhà Xưởng Công Nghiệp IP65',
        category: 'chieu-sang',
        brand: 'MPE',
        price: 890000,
        unit: 'Bộ',
        discount: 24,
        variants: ['Highbay Nhà xưởng 100W (Chóa nhôm)', 'Highbay Nhà xưởng 150W (Chóa nhôm)', 'Highbay Nhà xưởng 200W (Trần cao >7m)', 'Đèn Pha LED Ngoài Trời 100W IP66'],
        desc: 'Chuyên dụng chiếu sáng nhà xưởng sản xuất, kho hàng, bãi xe KCN với tuổi thọ 30.000 giờ, chống bụi và ẩm IP65.',
        image: createProductSvgDataUri('Đèn LED Highbay Nhà Xưởng IP65', 'MPE INDUSTRIAL', 'HB-IND-150W', '#06B6D4', '🔦')
    },
    {
        id: 'dp-10',
        sku: 'SCH-MCB-2P',
        name: 'Aptomat Tép (MCB) & Chống Giật (RCBO) Schneider / Panasonic',
        category: 'dong-cat-tu-dien',
        brand: 'Schneider',
        price: 155000,
        unit: 'Cái',
        discount: 22,
        variants: ['MCB 1P 16A/20A (Nhánh chiếu sáng/ổ cắm)', 'MCB 2P 32A/40A (Điều hòa/Bếp từ)', 'MCB 2P 63A (Aptomat tổng từng tầng)', 'RCBO Chống giật 2P 40A/63A 30mA'],
        desc: 'Thiết bị bảo vệ quá tải, ngắn mạch và chống dòng rò giật điện an toàn tuyệt đối cho từng phòng và từng tầng gia đình.',
        image: createProductSvgDataUri('Aptomat MCB & RCBO Chống Giật', 'SCHNEIDER', 'SCH-MCB-2P', '#10B981', '🛡️')
    },
    {
        id: 'dp-11',
        sku: 'LS-MCCB-3P',
        name: 'Aptomat Khối 3 Pha (MCCB) & Khởi Động Từ LS Hàn Quốc',
        category: 'dong-cat-tu-dien',
        brand: 'LS',
        price: 980000,
        unit: 'Cái',
        discount: 25,
        variants: ['MCCB ABN103c 3P 63A (18kA)', 'MCCB ABN103c 3P 100A (18kA)', 'MCCB ABN203c 3P 150A/200A (30kA)', 'Contactor MC-32a / MC-50a 380V'],
        desc: 'Thiết bị đóng cắt công nghiệp chính hãng LS Hàn Quốc, đầy đủ CO/CQ dùng lắp tủ điện tổng nhà xưởng và máy sản xuất.',
        image: createProductSvgDataUri('Aptomat Khối 3 Pha MCCB LS', 'LS ELECTRIC', 'LS-MCCB-3P', '#06B6D4', '⚙️')
    },
    {
        id: 'dp-12',
        sku: 'NNC-BOX-12M',
        name: 'Tủ Điện Âm Tường Gia Đình & Vỏ Tủ Điện Sơn Tĩnh Điện Nhà Xưởng',
        category: 'dong-cat-tu-dien',
        brand: 'Nanoco',
        price: 265000,
        unit: 'Cái',
        discount: 20,
        variants: ['Tủ âm tường 8-12 Module nắp kim loại', 'Tủ âm tường 16-18 Module (Nhà 3 tầng)', 'Vỏ tủ điện công nghiệp 400x600x200mm', 'Vỏ tủ điện tổng xưởng 600x800x250mm'],
        desc: 'Tủ điện thẩm mỹ cao cho gia đình và vỏ tủ thép sơn tĩnh điện dày 1.2mm - 1.5mm cho công trình nhà xưởng.',
        image: createProductSvgDataUri('Tủ Điện Âm Tường & Vỏ Tủ Xưởng', 'NANOCO', 'NNC-BOX-12M', '#D4AF37', '🗄️')
    },
    {
        id: 'dp-13',
        sku: 'NNC-PIPE-20',
        name: 'Ống Luồn Dây Điện Chống Cháy (Ống Ruột Gà & Ống Cứng + Đế Âm)',
        category: 'vat-tu-phu-kien',
        brand: 'Nanoco',
        price: 245000,
        unit: 'Cuộn / Lô',
        discount: 25,
        variants: ['Ống ruột gà chống cháy Φ16 (Cuộn 50m)', 'Ống ruột gà chống cháy Φ20 (Cuộn 50m)', 'Combo 50 Đế âm tường đơn chống cháy', 'Ống cứng luồn dây PVC Φ20 (Bó 25 cây)'],
        desc: 'Vật tư giai đoạn 1 (đi phần thô âm tường, âm sàn bê tông) không thể thiếu khi khởi công xây nhà mới.',
        image: createProductSvgDataUri('Ống Ruồn Dây & Đế Âm Chống Cháy', 'NANOCO / SINO', 'NNC-PIPE-20', '#F59E0B', '🛠️')
    },
    {
        id: 'dp-14',
        sku: 'PANA-FAN-5B',
        name: 'Quạt Trần Đèn & Quạt Hút Âm Trần Chính Hãng Panasonic / Nanoco',
        category: 'vat-tu-phu-kien',
        brand: 'Panasonic',
        price: 2150000,
        unit: 'Bộ',
        discount: 18,
        variants: ['Quạt trần 5 cánh động cơ DC tiết kiệm điện', 'Quạt trần 4 cánh có điều khiển từ xa', 'Quạt thông gió âm trần phòng vệ sinh 240x240'],
        desc: 'Lắp đặt hoàn thiện đồng bộ cho phòng khách, phòng ngủ và khu vệ sinh, vận hành êm ái, bảo hành chính hãng.',
        image: 'assets/images/cua-hang-mat-tien.jpg'
    }
];

// 3 Gói Combo Gợi Ý Nhanh (1-Click nạp toàn bộ danh sách vật tư theo quy mô công trình)
const PROJECT_COMBOS = {
    'nha-pho': {
        title: 'Gói Vật Tư Nhà Phố / Nhà Ống 2-3 Tầng',
        customerType: 'Chu-nha-xay-moi',
        items: [
            { productId: 'dp-01', variant: 'Tiết diện 2.5mm² (Đỏ/Xanh/Đen)', qty: 6 },
            { productId: 'dp-01', variant: 'Tiết diện 1.5mm² (Đỏ/Xanh/Vàng)', qty: 5 },
            { productId: 'dp-02', variant: 'CV 4.0mm² - 450/750V', qty: 2 },
            { productId: 'dp-06', variant: 'Bộ ổ cắm đôi 3 chấu có màn che', qty: 35 },
            { productId: 'dp-06', variant: 'Bộ 2 công tắc 1 chiều', qty: 18 },
            { productId: 'dp-07', variant: '9W Đổi 3 màu (Lỗ khoét Φ90mm)', qty: 45 },
            { productId: 'dp-10', variant: 'MCB 2P 63A (Aptomat tổng từng tầng)', qty: 3 },
            { productId: 'dp-10', variant: 'MCB 1P 16A/20A (Nhánh chiếu sáng/ổ cắm)', qty: 12 },
            { productId: 'dp-12', variant: 'Tủ âm tường 8-12 Module nắp kim loại', qty: 3 },
            { productId: 'dp-13', variant: 'Ống ruột gà chống cháy Φ20 (Cuộn 50m)', qty: 6 }
        ]
    },
    'biet-thu': {
        title: 'Gói Vật Tư Biệt Thự / Nhà Vườn Cao Cấp',
        customerType: 'Chu-nha-xay-moi',
        items: [
            { productId: 'dp-02', variant: 'CV 6.0mm² - 450/750V', qty: 4 },
            { productId: 'dp-01', variant: 'Tiết diện 2.5mm² (Đỏ/Xanh/Đen)', qty: 12 },
            { productId: 'dp-04', variant: 'Ổ cắm đôi 3 chấu mặt Vàng Champagne', qty: 55 },
            { productId: 'dp-04', variant: 'Công tắc 3 hạt mặt Xám Titan', qty: 28 },
            { productId: 'dp-07', variant: '12W Đổi 3 màu (Lỗ khoét Φ110mm)', qty: 80 },
            { productId: 'dp-10', variant: 'RCBO Chống giật 2P 40A/63A 30mA', qty: 6 },
            { productId: 'dp-12', variant: 'Tủ âm tường 16-18 Module (Nhà 3 tầng)', qty: 4 },
            { productId: 'dp-14', variant: 'Quạt trần 5 cánh động cơ DC tiết kiệm điện', qty: 3 }
        ]
    },
    'nha-xuong': {
        title: 'Gói Thi Công Nhà Xưởng Vừa & Nhỏ (200m² - 800m²)',
        customerType: 'Nha-thau-xuong',
        items: [
            { productId: 'dp-03', variant: 'CVV 3x16 + 1x10 mm²', qty: 85 },
            { productId: 'dp-02', variant: 'CV 4.0mm² - 450/750V', qty: 6 },
            { productId: 'dp-09', variant: 'Highbay Nhà xưởng 150W (Chóa nhôm)', qty: 16 },
            { productId: 'dp-08', variant: 'Bán nguyệt 1.2m - 50W Siêu sáng', qty: 20 },
            { productId: 'dp-11', variant: 'MCCB ABN103c 3P 100A (18kA)', qty: 2 },
            { productId: 'dp-11', variant: 'MCCB ABN103c 3P 63A (18kA)', qty: 6 },
            { productId: 'dp-11', variant: 'Contactor MC-32a / MC-50a 380V', qty: 4 },
            { productId: 'dp-12', variant: 'Vỏ tủ điện tổng xưởng 600x800x250mm', qty: 1 }
        ]
    }
};

// Trạng thái toàn cục của ứng dụng
let state = {
    products: [],
    boqCart: [], // Mảng { cartId, productId, sku, name, brand, variant, unit, price, discount, qty, isCustom }
    quotes: [],  // Danh sách yêu cầu báo giá gửi về Admin
    activeCategory: 'all',
    activeBrand: 'all',
    searchQuery: '',
    viewMode: 'grid', // 'grid' | 'table'
    uploadedImageDataUrl: ''
};

// Định dạng tiền tệ VNĐ
function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN').format(Math.round(amount || 0)) + ' đ';
}

// Trích xuất giá cụ thể của từng quy cách / phân loại
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

// Cập nhật giá theo thời gian thực khi khách chọn quy cách khác
function onVariantChange(productId, variantValue) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    const priceEl = document.getElementById('price-val-' + productId);
    if (priceEl) {
        const vPrice = getVariantPrice(product, variantValue);
        priceEl.textContent = formatVND(vPrice);
    }
}

// Hiển thị thông báo Toast góc màn hình
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
    }, 3200);
}

// Khởi tạo dữ liệu từ LocalStorage
function initData() {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (savedProducts) {
        try {
            const list = JSON.parse(savedProducts);
            const existingIds = new Set(list.map(p => p.id));
            INITIAL_PRODUCTS.forEach(ip => {
                if (!existingIds.has(ip.id)) {
                    list.unshift(ip);
                }
            });
            state.products = list;
            saveProducts();
        } catch (e) {
            state.products = [...INITIAL_PRODUCTS];
            saveProducts();
        }
    } else {
        state.products = [...INITIAL_PRODUCTS];
        saveProducts();
    }

    const savedCart = localStorage.getItem(STORAGE_KEYS.CART_BOQ);
    if (savedCart) {
        try {
            state.boqCart = JSON.parse(savedCart);
        } catch (e) {
            state.boqCart = [];
        }
    }

    const savedQuotes = localStorage.getItem(STORAGE_KEYS.QUOTES);
    if (savedQuotes) {
        try {
            state.quotes = JSON.parse(savedQuotes);
        } catch (e) {
            state.quotes = [];
        }
    }
}

function saveProducts() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(state.products));
}

function saveCart() {
    localStorage.setItem(STORAGE_KEYS.CART_BOQ, JSON.stringify(state.boqCart));
    updateHeaderAndFloatingBadges();
}

function saveQuotes() {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(state.quotes));
}

// Lọc sản phẩm theo danh mục, thương hiệu, từ khóa tìm kiếm
function getFilteredProducts() {
    return state.products.filter(p => {
        const matchCategory = state.activeCategory === 'all' || p.category === state.activeCategory;
        const matchBrand = state.activeBrand === 'all' || p.brand.toLowerCase() === state.activeBrand.toLowerCase();
        const q = state.searchQuery.trim().toLowerCase();
        const matchSearch = !q ||
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            (p.desc && p.desc.toLowerCase().includes(q)) ||
            (Array.isArray(p.variants) && p.variants.some(v => v.toLowerCase().includes(q)));
        return matchCategory && matchBrand && matchSearch;
    });
}

// Tự động cập nhật dropdown lọc Thương hiệu theo danh sách thực tế
function populateBrandFilter() {
    const brandSelect = document.getElementById('brandFilterSelect');
    if (!brandSelect) return;
    const brands = Array.from(new Set(state.products.map(p => p.brand))).filter(Boolean).sort();
    
    let html = `<option value="all">⚡ Tất Cả Thương Hiệu (${state.products.length})</option>`;
    brands.forEach(b => {
        const count = state.products.filter(p => p.brand === b).length;
        html += `<option value="${b}">${b} (${count})</option>`;
    });
    brandSelect.innerHTML = html;
    brandSelect.value = state.activeBrand;
}

// Render Danh mục Sản phẩm (Cả chế độ Lưới Grid và Bảng Kê Nhanh Table)
function renderCatalog() {
    const gridEl = document.getElementById('productsGrid');
    const tableBodyEl = document.getElementById('productsTableBody');
    const tableWrapperEl = document.getElementById('productsTableWrapper');
    const countEl = document.getElementById('filteredProductCount');

    if (!gridEl) return;

    const filtered = getFilteredProducts();
    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
        gridEl.innerHTML = `
            <div class="empty-boq" style="grid-column: 1 / -1;">
                <i class="fas fa-search" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 12px;"></i>
                <h4 style="color: #fff; margin-bottom: 6px;">Không tìm thấy vật tư phù hợp</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Vui lòng kiểm tra lại từ khóa tìm kiếm hoặc chọn lại danh mục / hãng sản xuất.</p>
                <button class="btn btn-outline-gold" onclick="resetCatalogFilters()"><i class="fas fa-sync"></i> Xem tất cả sản phẩm</button>
            </div>
        `;
        if (tableBodyEl) tableBodyEl.innerHTML = '';
        return;
    }

    // 1. Render Grid Cards
    gridEl.innerHTML = filtered.map(p => {
        const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : ['Tiêu chuẩn chính hãng'];
        const inCartItems = state.boqCart.filter(item => item.productId === p.id);
        const totalQtyInCart = inCartItems.reduce((sum, item) => sum + item.qty, 0);

        return `
            <div class="product-card ${totalQtyInCart > 0 ? 'in-quote' : ''}" id="card-${p.id}">
                <div class="product-thumb-wrap">
                    <img src="${p.image}" alt="${p.name}" onerror="this.src='${createProductSvgDataUri(p.name.slice(0,22), p.brand, p.sku)}'"/>
                    <span class="product-brand-tag">${p.brand}</span>
                    <span class="product-discount-tag">CK tới -${p.discount || 15}%</span>
                    ${totalQtyInCart > 0 ? `<div class="in-quote-ribbon"><i class="fas fa-check-circle"></i> Đã chọn: ${totalQtyInCart} ${p.unit}</div>` : ''}
                </div>
                <div class="product-body">
                    <div class="product-sku">MÃ: ${p.sku}</div>
                    <h3 class="product-title">${p.name}</h3>
                    <p class="product-desc">${p.desc || ''}</p>
                    
                    <div class="product-variant-box">
                        <label><i class="fas fa-sliders-h"></i> Chọn phân loại / thông số kỹ thuật:</label>
                        <select class="variant-select" id="variant-${p.id}" onchange="onVariantChange('${p.id}', this.value)">
                            ${variants.map(v => `<option value="${v}">${v}</option>`).join('')}
                        </select>
                    </div>

                    <div class="product-price-row">
                        <div>
                            <span class="price-main" id="price-val-${p.id}">${formatVND(getVariantPrice(p, variants[0]))}</span>
                            <span class="price-unit">/ ${p.unit}</span>
                        </div>
                        <span style="font-size: 0.76rem; color: var(--accent-green); font-weight: 600;">Sẵn hàng tại kho BN</span>
                    </div>

                    <div class="product-order-controls">
                        <div class="qty-row">
                            <div class="qty-stepper">
                                <button type="button" class="qty-btn" onclick="stepProductQty('${p.id}', -1)">−</button>
                                <input type="number" min="1" value="1" class="qty-input" id="qty-${p.id}" aria-label="Số lượng"/>
                                <button type="button" class="qty-btn" onclick="stepProductQty('${p.id}', 1)">+</button>
                            </div>
                            <div class="quick-qty-chips">
                                <button type="button" class="chip-qty" onclick="stepProductQty('${p.id}', 5)">+5</button>
                                <button type="button" class="chip-qty" onclick="stepProductQty('${p.id}', 10)">+10</button>
                                <button type="button" class="chip-qty" onclick="stepProductQty('${p.id}', 50)">+50</button>
                            </div>
                        </div>

                        <button class="btn btn-gold btn-block" onclick="addToQuoteFromCard('${p.id}')">
                            <i class="fas fa-file-invoice-dollar"></i> Chọn Vào Báo Giá
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // 2. Render Fast BOQ Table
    if (tableBodyEl) {
        tableBodyEl.innerHTML = filtered.map((p, idx) => {
            const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : ['Tiêu chuẩn chính hãng'];
            const inCart = state.boqCart.find(item => item.productId === p.id);
            const currentQty = inCart ? inCart.qty : 0;

            return `
                <tr>
                    <td style="color: var(--text-muted); font-weight: 600;">${idx + 1}</td>
                    <td>
                        <img src="${p.image}" class="table-thumb" alt="${p.name}" onerror="this.src='${createProductSvgDataUri(p.name.slice(0,18), p.brand, p.sku)}'"/>
                    </td>
                    <td>
                        <strong style="color: #fff;">${p.name}</strong>
                        <div style="font-size: 0.78rem; color: var(--text-muted);">SKU: ${p.sku} | Hãng: <span style="color: var(--primary);">${p.brand}</span></div>
                    </td>
                    <td>
                        <select class="variant-select" id="tbl-variant-${p.id}" style="min-width: 210px;" onchange="const tp = document.getElementById('tbl-price-' + '${p.id}'); if(tp) tp.textContent = formatVND(getVariantPrice(state.products.find(x => x.id === '${p.id}'), this.value));">
                            ${variants.map(v => `<option value="${v}">${v}</option>`).join('')}
                        </select>
                    </td>
                    <td><strong>${p.unit}</strong></td>
                    <td>
                        <div style="color: var(--primary-light); font-weight: 700;" id="tbl-price-${p.id}">${formatVND(getVariantPrice(p, variants[0]))}</div>
                        <div style="font-size: 0.74rem; color: var(--accent-green);">CK Thợ/Dự án tới -${p.discount || 15}%</div>
                    </td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <input type="number" min="0" value="${currentQty > 0 ? currentQty : 0}" id="tbl-qty-${p.id}" class="form-control" style="width: 90px; text-align: center; font-weight: 700; border-color: var(--border-gold);"/>
                            <button class="chip-qty" onclick="document.getElementById('tbl-qty-${p.id}').value = parseInt(document.getElementById('tbl-qty-${p.id}').value || 0) + 10">+10</button>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-outline-gold" style="padding: 7px 12px; font-size: 0.82rem;" onclick="addSingleFromTable('${p.id}')">
                            <i class="fas fa-plus"></i> Đưa vào DS
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Chuyển đổi hiển thị giữa Grid và Table
    if (state.viewMode === 'table') {
        gridEl.style.display = 'none';
        tableWrapperEl.classList.add('active');
    } else {
        gridEl.style.display = 'grid';
        tableWrapperEl.classList.remove('active');
    }
}

// Tăng/giảm số lượng trên thẻ sản phẩm
function stepProductQty(productId, delta) {
    const input = document.getElementById(`qty-${productId}`);
    if (!input) return;
    let current = parseInt(input.value, 10) || 1;
    current += delta;
    if (current < 1) current = 1;
    input.value = current;
}

// Thêm sản phẩm từ Thẻ sản phẩm vào Danh sách Báo giá
function addToQuoteFromCard(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const variantEl = document.getElementById(`variant-${productId}`);
    const qtyEl = document.getElementById(`qty-${productId}`);
    const selectedVariant = variantEl ? variantEl.value : 'Tiêu chuẩn';
    const qty = Math.max(1, parseInt(qtyEl ? qtyEl.value : 1, 10) || 1);

    upsertBoqItem(product, selectedVariant, qty, true);
    if (qtyEl) qtyEl.value = 1;
    renderCatalog();
    showToast(`Đã thêm <strong>${qty} ${product.unit}</strong> "${product.name}" vào Danh sách báo giá!`);
}

// Thêm 1 dòng từ Chế độ Bảng Kê Nhanh
function addSingleFromTable(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    const variantEl = document.getElementById(`tbl-variant-${productId}`);
    const qtyEl = document.getElementById(`tbl-qty-${productId}`);
    const selectedVariant = variantEl ? variantEl.value : 'Tiêu chuẩn';
    let qty = parseInt(qtyEl ? qtyEl.value : 1, 10) || 0;
    if (qty <= 0) qty = 1;
    if (qtyEl) qtyEl.value = qty;

    upsertBoqItem(product, selectedVariant, qty, false);
    renderCatalog();
    showToast(`Đã cập nhật <strong>${qty} ${product.unit}</strong> "${product.name}" vào Bảng báo giá!`);
}

// Nút "Cập Nhật Hàng Loạt" tất cả các dòng có số lượng > 0 trong Chế độ Bảng Kê Nhanh
function applyBulkTableSelection() {
    const filtered = getFilteredProducts();
    let countAdded = 0;

    filtered.forEach(p => {
        const qtyEl = document.getElementById(`tbl-qty-${p.id}`);
        const variantEl = document.getElementById(`tbl-variant-${p.id}`);
        if (!qtyEl) return;
        const qty = parseInt(qtyEl.value, 10) || 0;
        const selectedVariant = variantEl ? variantEl.value : 'Tiêu chuẩn';

        if (qty > 0) {
            upsertBoqItem(p, selectedVariant, qty, false);
            countAdded++;
        }
    });

    if (countAdded === 0) {
        showToast('Vui lòng nhập số lượng (> 0) cho ít nhất 1 sản phẩm trong bảng!', 'fa-exclamation-circle');
        return;
    }

    renderCatalog();
    showToast(`Đã gom thành công <strong>${countAdded} mặt hàng</strong> vào Danh sách báo giá!`);
    document.getElementById('boq-section').scrollIntoView({ behavior: 'smooth' });
}

// Hàm thêm hoặc cộng dồn sản phẩm vào giỏ BOQ
function upsertBoqItem(product, variant, qty, accumulate = true) {
    const cartId = `${product.id}__${variant}`;
    const existing = state.boqCart.find(item => item.cartId === cartId);
    const actualPrice = getVariantPrice(product, variant);

    if (existing) {
        existing.qty = accumulate ? (existing.qty + qty) : qty;
        if (!existing.price || existing.price === Number(product.price)) existing.price = actualPrice;
    } else {
        state.boqCart.push({
            cartId,
            productId: product.id,
            sku: product.sku,
            name: product.name,
            brand: product.brand,
            variant,
            unit: product.unit,
            price: actualPrice,
            discount: Number(product.discount) || 15,
            qty: qty,
            isCustom: false
        });
    }
    saveCart();
}

// Nạp nhanh 1 Gói Combo Công Trình (Nhà phố / Biệt thự / Nhà xưởng)
function loadProjectCombo(comboKey) {
    const combo = PROJECT_COMBOS[comboKey];
    if (!combo) return;

    combo.items.forEach(entry => {
        const product = state.products.find(p => p.id === entry.productId);
        if (product) {
            upsertBoqItem(product, entry.variant, entry.qty, false);
        }
    });

    const customerTypeSelect = document.getElementById('quoteCustomerType');
    if (customerTypeSelect && combo.customerType) {
        customerTypeSelect.value = combo.customerType;
    }

    renderCatalog();
    renderBoqSection();
    updateHeaderAndFloatingBadges();

    showToast(`Đã nạp <strong>${combo.title}</strong> vào Danh sách báo giá! Hãy cuộn xuống để chỉnh sửa.`);
    document.getElementById('boq-section').scrollIntoView({ behavior: 'smooth' });
}

// Thêm vật tư ngoài danh mục do khách hàng tự nhập tay
function addCustomItemToBoq() {
    const nameEl = document.getElementById('customItemName');
    const specEl = document.getElementById('customItemSpec');
    const unitEl = document.getElementById('customItemUnit');
    const qtyEl  = document.getElementById('customItemQty');

    if (!nameEl || !qtyEl) return;

    const name = nameEl.value.trim();
    const variant = specEl ? specEl.value.trim() : 'Quy cách đặc biệt';
    const unit = unitEl ? unitEl.value.trim() : 'Cái';
    const qty = Math.max(1, parseInt(qtyEl.value, 10) || 1);

    if (!name) {
        showToast('Vui lòng nhập tên loại vật tư bạn cần báo giá!', 'fa-exclamation-triangle');
        nameEl.focus();
        return;
    }

    const cartId = `custom__${Date.now()}`;
    state.boqCart.push({
        cartId,
        productId: 'custom',
        sku: 'CUSTOM-NOTE',
        name,
        brand: 'Theo yêu cầu',
        variant: variant || 'Theo mô tả của khách',
        unit: unit || 'Cái/Bộ',
        price: 0, // Admin sẽ điền giá khi báo lại
        discount: 0,
        qty,
        isCustom: true
    });

    saveCart();
    renderBoqSection();
    showToast(`Đã thêm vật tư ghi chú: <strong>${name}</strong> (${qty} ${unit})!`);

    nameEl.value = '';
    if (specEl) specEl.value = '';
    qtyEl.value = 1;
}

// Cập nhật số lượng hoặc xóa dòng trong Bảng Báo Giá
function updateBoqQty(cartId, newQty) {
    const item = state.boqCart.find(i => i.cartId === cartId);
    if (!item) return;

    const parsed = parseInt(newQty, 10) || 0;
    if (parsed <= 0) {
        removeBoqItem(cartId);
        return;
    }
    item.qty = parsed;
    saveCart();
    renderBoqSection();
    renderCatalog();
}

function removeBoqItem(cartId) {
    const index = state.boqCart.findIndex(i => i.cartId === cartId);
    if (index !== -1) {
        const removed = state.boqCart[index];
        state.boqCart.splice(index, 1);
        saveCart();
        renderBoqSection();
        renderCatalog();
        showToast(`Đã bỏ "${removed.name}" khỏi danh sách báo giá.`, 'fa-trash-alt');
    }
}

function clearEntireBoq() {
    if (state.boqCart.length === 0) return;
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách vật tư đã chọn không?')) {
        state.boqCart = [];
        saveCart();
        renderBoqSection();
        renderCatalog();
        showToast('Đã làm trống Danh sách Báo giá!', 'fa-trash');
    }
}

// Tính toán tổng tiền niêm yết & chiết khấu dựa trên phân loại khách hàng
function calculateBoqSummary() {
    const customerTypeSelect = document.getElementById('quoteCustomerType');
    const customerType = customerTypeSelect ? customerTypeSelect.value : 'Chu-nha-xay-moi';

    let totalItems = 0;
    let subtotalListed = 0;
    let estimatedDiscount = 0;

    state.boqCart.forEach(item => {
        totalItems += item.qty;
        const lineTotal = (item.price || 0) * item.qty;
        subtotalListed += lineTotal;

        // Tỷ lệ chiết khấu linh hoạt theo đối tượng khách hàng:
        // - Thợ điện / Nhà thầu Bắc Ninh: Được hưởng mức chiết khấu kịch sàn của từng sản phẩm + 3%
        // - Chủ nhà xưởng / Dự án: Hưởng chiết khấu chuẩn dự án
        // - Chủ nhà đang xây mới: Hưởng chiết khấu bán lẻ khuyến mãi tốt nhất Bắc Ninh
        let discountRate = (item.discount || 15) / 100;
        if (customerType === 'Tho-dien-Bac-Ninh') {
            discountRate = Math.min(0.40, discountRate + 0.03);
        } else if (customerType === 'Nha-thau-xuong') {
            discountRate = Math.min(0.38, discountRate + 0.02);
        }

        estimatedDiscount += lineTotal * discountRate;
    });

    const finalEstimated = Math.max(0, subtotalListed - estimatedDiscount);

    return {
        totalItems,
        subtotalListed,
        estimatedDiscount,
        finalEstimated,
        customerType
    };
}

// Render Bảng Danh Sách Yêu Cầu Báo Giá (Bảng BOQ tương tác)
function renderBoqSection() {
    const listBodyEl = document.getElementById('boqTableBody');
    const emptyStateEl = document.getElementById('boqEmptyState');
    const tableContainerEl = document.getElementById('boqTableContainer');
    const totalItemsBadge = document.getElementById('boqTotalItemsCount');
    const subtotalEl = document.getElementById('boqSubtotalListed');
    const discountEl = document.getElementById('boqEstimatedDiscount');
    const finalTotalEl = document.getElementById('boqFinalTotalEstimated');
    const discountNoticeEl = document.getElementById('boqDiscountNotice');

    if (!listBodyEl) return;

    const summary = calculateBoqSummary();

    if (totalItemsBadge) totalItemsBadge.textContent = state.boqCart.length;

    if (state.boqCart.length === 0) {
        if (emptyStateEl) emptyStateEl.style.display = 'block';
        if (tableContainerEl) tableContainerEl.style.display = 'none';
        if (subtotalEl) subtotalEl.textContent = '0 đ';
        if (discountEl) discountEl.textContent = '0 đ';
        if (finalTotalEl) finalTotalEl.textContent = '0 đ';
        return;
    }

    if (emptyStateEl) emptyStateEl.style.display = 'none';
    if (tableContainerEl) tableContainerEl.style.display = 'block';

    listBodyEl.innerHTML = state.boqCart.map((item, idx) => {
        const linePrice = (item.price || 0) * item.qty;
        return `
            <tr>
                <td style="color: var(--text-muted); font-weight: 700;">${idx + 1}</td>
                <td>
                    <div style="font-weight: 700; color: #fff;">${item.name}</div>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">
                        Hãng: <span style="color: var(--primary);">${item.brand}</span> ${item.sku ? `| SKU: ${item.sku}` : ''}
                    </div>
                </td>
                <td>
                    <span class="badge" style="background: rgba(212,175,55,0.15); color: var(--primary-light); font-size: 0.8rem; border: 1px solid rgba(212,175,55,0.3); padding: 4px 8px; border-radius: 4px;">
                        ${item.variant}
                    </span>
                </td>
                <td><strong>${item.unit}</strong></td>
                <td>
                    ${item.price > 0 ? `<span style="color: #cbd5e1;">${formatVND(item.price)}</span>` : '<span style="color: var(--accent-gold); font-style: italic;">Chờ A Thành định giá</span>'}
                </td>
                <td>
                    <div class="boq-qty-stepper">
                        <button type="button" class="boq-qty-btn" onclick="updateBoqQty('${item.cartId}', ${item.qty - 1})">−</button>
                        <input type="number" min="1" class="boq-qty-input" value="${item.qty}" onchange="updateBoqQty('${item.cartId}', this.value)" aria-label="Số lượng"/>
                        <button type="button" class="boq-qty-btn" onclick="updateBoqQty('${item.cartId}', ${item.qty + 1})">+</button>
                    </div>
                </td>
                <td style="text-align: right; font-weight: 700; color: var(--primary-light);">
                    ${linePrice > 0 ? formatVND(linePrice) : '---'}
                </td>
                <td style="text-align: center;">
                    <button class="boq-del-btn" onclick="removeBoqItem('${item.cartId}')" title="Xóa dòng này">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    if (subtotalEl) subtotalEl.textContent = formatVND(summary.subtotalListed);
    if (discountEl) discountEl.textContent = `− ${formatVND(summary.estimatedDiscount)}`;
    if (finalTotalEl) finalTotalEl.textContent = formatVND(summary.finalEstimated);

    if (discountNoticeEl) {
        if (summary.customerType === 'Tho-dien-Bac-Ninh') {
            discountNoticeEl.innerHTML = '<i class="fas fa-user-shield" style="color: var(--accent-green);"></i> Áp dụng chính sách <strong>Chiết khấu Thợ Điện / Đội Thi Công Bắc Ninh</strong> (Tặng thêm chiết khấu & hỗ trợ đổi trả cuối công trình).';
        } else if (summary.customerType === 'Nha-thau-xuong') {
            discountNoticeEl.innerHTML = '<i class="fas fa-industry" style="color: var(--accent-cyan);"></i> Áp dụng chính sách <strong>Vật tư Công Nghiệp / Nhà Xưởng</strong> (Có xuất hóa đơn VAT điện tử & CO/CQ cáp lực).';
        } else {
            discountNoticeEl.innerHTML = '<i class="fas fa-home" style="color: var(--primary);"></i> Áp dụng chính sách <strong>Chủ Nhà Xây Mới</strong> (Báo giá trọn gói tiết kiệm 20% - 30% so với mua lẻ từng đợt).';
        }
    }
}

// Cập nhật số đếm trên Header và Thanh nổi Mobile
function updateHeaderAndFloatingBadges() {
    const totalCount = state.boqCart.reduce((sum, item) => sum + item.qty, 0);
    const badgeHeader = document.getElementById('headerBoqCount');
    const badgeFloating = document.getElementById('floatingBoqBadge');

    if (badgeHeader) badgeHeader.textContent = totalCount;
    if (badgeFloating) badgeFloating.textContent = totalCount;
}

// Tạo nội dung văn bản tổng hợp để gửi qua Zalo cho A Thành
function generateZaloQuoteMessage(quoteData) {
    const summary = quoteData.summary;
    let msg = `⚡ *YÊU CẦU BÁO GIÁ VẬT TƯ ĐIỆN - DUY PHONG BẮC NINH*\n`;
    msg += `-------------------------------------------\n`;
    msg += `👤 *Khách hàng:* ${quoteData.customerName}\n`;
    msg += `📞 *Số điện thoại:* ${quoteData.customerPhone}\n`;
    msg += `📍 *Địa chỉ / Công trình:* ${quoteData.projectAddress || 'Chưa cung cấp'}\n`;
    msg += `🏷️ *Đối tượng:* ${quoteData.customerTypeLabel}\n`;
    if (quoteData.notes) msg += `📝 *Ghi chú:* ${quoteData.notes}\n`;
    msg += `-------------------------------------------\n`;
    msg += `📋 *DANH MỤC VẬT TƯ (${quoteData.items.length} món):*\n`;

    quoteData.items.forEach((item, i) => {
        msg += `${i + 1}. ${item.name} [${item.brand}] - ${item.variant}: *${item.qty} ${item.unit}*\n`;
    });

    msg += `-------------------------------------------\n`;
    msg += `💰 *Tổng niêm yết:* ${formatVND(summary.subtotalListed)}\n`;
    msg += `🎁 *Chiết khấu ước tính:* -${formatVND(summary.estimatedDiscount)}\n`;
    msg += `🔥 *TẠM TÍNH SAU CHIẾT KHẤU:* ${formatVND(summary.finalEstimated)}\n`;
    msg += `-------------------------------------------\n`;
    msg += `(Gửi từ hệ thống Website Báo Giá Vật Tư Điện Duy Phong - 549 Ngô Gia Tự, TP. Bắc Ninh)`;

    return msg;
}

// Xử lý khi Khách Hàng bấm "GỬI YÊU CẦU BÁO GIÁ TRỰC TIẾP"
async function handleQuoteSubmission(event) {
    if (event) event.preventDefault();

    if (state.boqCart.length === 0) {
        showToast('Danh sách vật tư đang trống! Vui lòng chọn sản phẩm vào bảng trước khi gửi.', 'fa-exclamation-triangle');
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const nameInput = document.getElementById('quoteCustomerName');
    const phoneInput = document.getElementById('quoteCustomerPhone');
    const addressInput = document.getElementById('quoteProjectAddress');
    const typeSelect = document.getElementById('quoteCustomerType');
    const notesInput = document.getElementById('quoteNotes');

    const customerName = nameInput ? nameInput.value.trim() : '';
    const customerPhone = phoneInput ? phoneInput.value.trim() : '';
    const projectAddress = addressInput ? addressInput.value.trim() : '';
    const customerType = typeSelect ? typeSelect.value : 'Chu-nha-xay-moi';
    const notes = notesInput ? notesInput.value.trim() : '';

    if (!customerName) {
        showToast('Vui lòng nhập Họ Tên của bạn để A Thành tiện xưng hô!', 'fa-user');
        if (nameInput) nameInput.focus();
        return;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!customerPhone || !phoneRegex.test(customerPhone.replace(/[\s\.-]/g, ''))) {
        showToast('Vui lòng nhập số điện thoại hoặc số Zalo hợp lệ (10 số)!', 'fa-phone-alt');
        if (phoneInput) phoneInput.focus();
        return;
    }

    const customerTypeLabels = {
        'Chu-nha-xay-moi': 'Chủ nhà đang xây mới',
        'Tho-dien-Bac-Ninh': 'Thợ điện / Đội thi công Bắc Ninh',
        'Nha-thau-xuong': 'Nhà thầu / Chủ xưởng Bắc Ninh'
    };

    const quoteCode = 'BG-' + Math.floor(100000 + Math.random() * 900000);
    const summary = calculateBoqSummary();

    const quoteRecord = {
        code: quoteCode,
        createdAt: new Date().toLocaleString('vi-VN'),
        customerName,
        customerPhone,
        projectAddress,
        customerType,
        customerTypeLabel: customerTypeLabels[customerType] || customerType,
        notes,
        items: [...state.boqCart],
        summary: {
            totalItems: summary.totalItems,
            subtotalListed: summary.subtotalListed,
            estimatedDiscount: summary.estimatedDiscount,
            finalEstimated: summary.finalEstimated
        },
        status: 'Chờ A Thành liên hệ'
    };

    // Lưu vào lịch sử đơn hàng trên LocalStorage
    state.quotes.unshift(quoteRecord);
    saveQuotes();

    // Bắn ngầm dữ liệu về Google Sheets & Email tự động
    submitQuoteToGoogleSheets(quoteRecord);

    // Chuẩn bị mở Zalo để gửi trực tiếp cho A Thành
    const zaloMsg = generateZaloQuoteMessage(quoteRecord);
    const zaloUrl = `https://zalo.me/0904511227?text=${encodeURIComponent(zaloMsg)}`;

    // Hiển thị Modal hoàn tất báo giá
    showQuoteSuccessModal(quoteRecord, zaloUrl);
}

// Hiển thị Modal Thành Công sau khi gửi
function showQuoteSuccessModal(quoteRecord, zaloUrl) {
    const modalEl = document.getElementById('quoteSuccessModal');
    if (!modalEl) {
        window.open(zaloUrl, '_blank');
        return;
    }

    document.getElementById('successQuoteCode').textContent = quoteRecord.code;
    document.getElementById('successCustomerName').textContent = quoteRecord.customerName;
    document.getElementById('successCustomerPhone').textContent = quoteRecord.customerPhone;
    document.getElementById('successTotalEstimated').textContent = formatVND(quoteRecord.summary.finalEstimated);
    document.getElementById('successItemCount').textContent = quoteRecord.items.length;

    const zaloBtn = document.getElementById('btnOpenZaloDirect');
    if (zaloBtn) {
        zaloBtn.onclick = () => window.open(zaloUrl, '_blank');
    }

    modalEl.classList.add('active');
}

function closeSuccessModal() {
    const modalEl = document.getElementById('quoteSuccessModal');
    if (modalEl) modalEl.classList.remove('active');
}

// ============================================================================
// HỆ THỐNG TỰ ĐỘNG GỬI EMAIL NGẦM MỖI KHI CÓ KHÁCH ĐẶT BÁO GIÁ
// ============================================================================
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzqV_sO_W5B5v37W1eIq_QjXk6m_yqE8F9e1b2c3d4/exec';

// Bắn ngầm dữ liệu đơn hàng về Webhook Google Apps Script để lưu Sheet & gửi Email
async function submitQuoteToGoogleSheets(quoteData) {
    const GOOGLE_APPS_SCRIPT_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbywWj6t32jGf5eN56eA7N79T-lZ2qFzQn8c/exec';
    
    try {
        if (!GOOGLE_APPS_SCRIPT_WEBAPP_URL || GOOGLE_APPS_SCRIPT_WEBAPP_URL.includes('AKfycbywWj6t32jGf5eN56eA7N79T')) {
            console.log('⚡ Lưu trữ báo giá thành công nội bộ (Mã: ' + quoteData.code + ')');
            return;
        }

        await fetch(GOOGLE_APPS_SCRIPT_WEBAPP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quote: quoteData })
        });
        console.log('✅ Đã bắn dữ liệu thành công về Google Apps Script');
    } catch (err) {
        console.warn('⚠️ Lỗi gửi Webhook ngầm (Dữ liệu vẫn an toàn trong LocalStorage):', err);
    }
}

// ============================================================================
// CÔNG CỤ NỘI BỘ DÀNH RIÊNG CHO ADMIN (A THÀNH - DUY PHONG BẮC NINH)
// ============================================================================

// Admin tự thao tác: Copy báo giá và mở Zalo
function copyQuoteAndOpenZalo(quoteIndex) {
    const q = state.quotes[quoteIndex];
    if (!q) return;
    const msg = generateZaloQuoteMessage(q);
    navigator.clipboard.writeText(msg).then(() => {
        showToast('Đã copy nội dung báo giá! Đang mở Zalo của khách...');
        const cleanPhone = q.customerPhone.replace(/[\s\.-]/g, '');
        window.open(`https://zalo.me/${cleanPhone}`, '_blank');
    }).catch(() => {
        window.open(`https://zalo.me/0904511227?text=${encodeURIComponent(msg)}`, '_blank');
    });
}

// Tạo Ảnh Phiếu Báo Giá (PNG) nét căng để A Thành gửi thẳng qua Zalo/Facebook cho khách
function generateQuoteImage(quoteIndex) {
    const q = state.quotes[quoteIndex];
    if (!q) return;

    const canvas = document.createElement('canvas');
    canvas.width = 900;
    const itemHeight = 36;
    const baseHeight = 520;
    canvas.height = baseHeight + (q.items.length * itemHeight);

    const ctx = canvas.getContext('2d');

    // Nền sang trọng Luxury
    ctx.fillStyle = '#0B0F17';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Viền Gold
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Header
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 28px Arial';
    ctx.fillText('THIẾT BỊ ĐIỆN CAO CẤP DUY PHONG', 50, 75);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '15px Arial';
    ctx.fillText('549 Ngô Gia Tự, P. Ninh Xá, TP. Bắc Ninh | Hotline/Zalo: 0904.511.227', 50, 105);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 125);
    ctx.lineTo(850, 125);
    ctx.stroke();

    // Thông tin khách hàng
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`PHIẾU BÁO GIÁ VẬT TƯ: #${q.code}`, 50, 165);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#E2E8F0';
    ctx.fillText(`Khách hàng: ${q.customerName} (${q.customerTypeLabel})`, 50, 200);
    ctx.fillText(`Điện thoại: ${q.customerPhone} | Ngày tạo: ${q.createdAt}`, 50, 228);
    if (q.projectAddress) ctx.fillText(`Địa chỉ: ${q.projectAddress}`, 50, 256);

    // Bảng vật tư header
    let startY = q.projectAddress ? 295 : 275;
    ctx.fillStyle = '#161F30';
    ctx.fillRect(50, startY, 800, 36);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 15px Arial';
    ctx.fillText('STT', 65, startY + 24);
    ctx.fillText('Tên Vật Tư', 120, startY + 24);
    ctx.fillText('Quy Cách', 460, startY + 24);
    ctx.fillText('ĐVT', 640, startY + 24);
    ctx.fillText('SL', 700, startY + 24);
    ctx.fillText('Thành Tiền', 760, startY + 24);

    // Các dòng vật tư
    startY += 38;
    ctx.font = '14px Arial';
    q.items.forEach((item, i) => {
        ctx.fillStyle = i % 2 === 0 ? '#0F172A' : '#141D2E';
        ctx.fillRect(50, startY, 800, itemHeight);

        ctx.fillStyle = '#94A3B8';
        ctx.fillText(`${i + 1}`, 70, startY + 23);

        ctx.fillStyle = '#FFFFFF';
        const displayName = item.name.length > 32 ? item.name.slice(0, 32) + '...' : item.name;
        ctx.fillText(displayName, 120, startY + 23);

        ctx.fillStyle = '#D4AF37';
        const displayVariant = (item.variant || '').slice(0, 18);
        ctx.fillText(displayVariant, 460, startY + 23);

        ctx.fillStyle = '#E2E8F0';
        ctx.fillText(item.unit, 640, startY + 23);
        ctx.fillText(`${item.qty}`, 705, startY + 23);

        const lineTotal = (item.price || 0) * item.qty;
        ctx.fillStyle = '#F3E5AB';
        ctx.fillText(lineTotal > 0 ? formatVND(lineTotal) : '---', 760, startY + 23);

        startY += itemHeight;
    });

    // Tổng tiền chân trang
    startY += 20;
    ctx.strokeStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(50, startY);
    ctx.lineTo(850, startY);
    ctx.stroke();

    startY += 35;
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '16px Arial';
    ctx.fillText(`Tổng giá niêm yết: ${formatVND(q.summary.subtotalListed)}`, 50, startY);
    ctx.fillText(`Chiết khấu hỗ trợ: -${formatVND(q.summary.estimatedDiscount)}`, 50, startY + 28);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 22px Arial';
    ctx.fillText(`TỔNG THANH TOÁN DỰ KIẾN: ${formatVND(q.summary.finalEstimated)}`, 50, startY + 68);

    ctx.font = 'italic 14px Arial';
    ctx.fillStyle = '#94A3B8';
    ctx.fillText('Cam kết 100% hàng chính hãng đầy đủ giấy tờ CO/CQ. Hỗ trợ giao tận chân công trình Bắc Ninh.', 50, startY + 105);

    // Tải ảnh về máy
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `BaoGia_DuyPhong_${q.code}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(`Đã xuất ảnh phiếu báo giá #${q.code} thành công!`);
}

// Xuất danh sách báo giá ra file CSV (Mở được bằng Excel tiếng Việt không lỗi font)
function exportBoqToExcel(quoteIndex) {
    const q = state.quotes[quoteIndex];
    if (!q) return;

    let csv = '\uFEFF'; // BOM UTF-8 chống lỗi font tiếng Việt trên Microsoft Excel
    csv += `"THIẾT BỊ ĐIỆN CAO CẤP DUY PHONG (A THÀNH BẮC NINH)"\n`;
    csv += `"Địa chỉ: 549 Ngô Gia Tự, TP. Bắc Ninh | Hotline/Zalo: 0904.511.227"\n`;
    csv += `"BẢNG KÊ VẬT TƯ BÁO GIÁ: #${q.code}"\n`;
    csv += `"Khách hàng: ${q.customerName}"\n`;
    csv += `"Số điện thoại: ${q.customerPhone}"\n`;
    csv += `"Công trình: ${q.projectAddress || '---'}"\n`;
    csv += `"Ngày yêu cầu: ${q.createdAt}"\n\n`;

    csv += `STT,Mã SKU,Tên Vật Tư,Thương Hiệu,Quy Cách/Thông Số,ĐVT,Đơn Giá Niêm Yết,Số Lượng,Thành Tiền Niêm Yết\n`;

    q.items.forEach((item, i) => {
        const lineTotal = (item.price || 0) * item.qty;
        csv += `"${i + 1}","${item.sku || ''}","${item.name}","${item.brand}","${item.variant}","${item.unit}","${item.price}","${item.qty}","${lineTotal}"\n`;
    });

    csv += `\n,,,,,,,TỔNG NIÊM YẾT,"${q.summary.subtotalListed}"\n`;
    csv += `,,,,,,,CHIẾT KHẤU ƯỚC TÍNH,"-${q.summary.estimatedDiscount}"\n`;
    csv += `,,,,,,,TẠM TÍNH SAU CHIẾT KHẤU,"${q.summary.finalEstimated}"\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BangKe_VatTu_${q.code}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Đã xuất file Excel cho mã #${q.code}!`);
}

// Xử lý Upload hình ảnh từ máy tính / điện thoại (Chuyển sang Base64 lưu trực tiếp)
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showToast('Vui lòng chọn đúng tệp tin hình ảnh (JPG, PNG, WEBP)!', 'fa-exclamation-triangle');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        showToast('Ảnh quá lớn (> 2MB). Vui lòng chọn ảnh dung lượng nhẹ hơn để trang load mượt!', 'fa-exclamation-triangle');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        state.uploadedImageDataUrl = e.target.result;
        const preview = document.getElementById('adminImagePreview');
        if (preview) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        showToast('Đã tải ảnh lên thành công!');
    };
    reader.readAsDataURL(file);
}

// Xem trước khi dán link URL ảnh
function handleImageUrlChange(val) {
    const preview = document.getElementById('adminImagePreview');
    if (!preview) return;
    if (val && val.trim().startsWith('http')) {
        preview.src = val.trim();
        preview.style.display = 'block';
        preview.onerror = () => {
            preview.src = createProductSvgDataUri('Xem trước sản phẩm', 'DUY PHONG', 'PREVIEW');
        };
    } else if (!state.uploadedImageDataUrl) {
        preview.style.display = 'none';
    }
}

// Lưu sản phẩm mới hoặc cập nhật sản phẩm trong Admin
function handleSaveProduct(event) {
    if (event) event.preventDefault();

    const idInput = document.getElementById('adminProductId');
    const nameInput = document.getElementById('adminProductName');
    const skuInput = document.getElementById('adminProductSku');
    const brandInput = document.getElementById('adminProductBrand');
    const catInput = document.getElementById('adminProductCategory');
    const priceInput = document.getElementById('adminProductPrice');
    const unitInput = document.getElementById('adminProductUnit');
    const discountInput = document.getElementById('adminProductDiscount');
    const variantsInput = document.getElementById('adminProductVariants');
    const descInput = document.getElementById('adminProductDesc');
    const urlInput = document.getElementById('adminProductImageUrl');

    const name = nameInput.value.trim();
    if (!name) {
        showToast('Vui lòng điền tên sản phẩm!', 'fa-exclamation-triangle');
        nameInput.focus();
        return;
    }

    const brand = brandInput.value.trim() || 'Duy Phong';
    const sku = (skuInput.value.trim() || ('DP-' + Math.floor(1000 + Math.random() * 9000))).toUpperCase();
    const category = catInput.value;
    const price = Math.max(0, parseInt(priceInput.value, 10) || 0);
    const unit = unitInput.value.trim() || 'Cái';
    const discount = Math.max(0, parseInt(discountInput.value, 10) || 15);
    const desc = descInput.value.trim();

    // Tách các phân loại (mỗi dòng 1 phân loại)
    const rawVariants = variantsInput.value.split('\n').map(v => v.trim()).filter(Boolean);
    const variants = rawVariants.length > 0 ? rawVariants : ['Tiêu chuẩn chính hãng'];

    // Chọn ảnh: ưu tiên ảnh upload từ máy > link URL > tạo SVG Luxury
    let finalImage = state.uploadedImageDataUrl || (urlInput ? urlInput.value.trim() : '');
    if (!finalImage) {
        finalImage = createProductSvgDataUri(name.slice(0, 24), brand, sku);
    }

    const editingId = idInput ? idInput.value : '';

    if (editingId) {
        // Cập nhật sản phẩm cũ
        const index = state.products.findIndex(p => p.id === editingId);
        if (index !== -1) {
            state.products[index] = {
                ...state.products[index],
                name, sku, brand, category, price, unit, discount, variants, desc,
                image: finalImage
            };
            showToast(`Đã cập nhật sản phẩm "${name}"!`);
        }
    } else {
        // Thêm sản phẩm mới
        const newProduct = {
            id: 'p_' + Date.now(),
            sku, name, brand, category, price, unit, discount, variants, desc,
            image: finalImage
        };
        state.products.unshift(newProduct);
        showToast(`Đã thêm thành công sản phẩm mới "${name}"!`);
    }

    saveProducts();
    populateBrandFilter();
    renderCatalog();
    renderAdminProductsList();
    resetAdminProductForm();
}

// Chỉnh sửa 1 sản phẩm
function editProduct(productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) return;

    document.getElementById('adminProductId').value = p.id;
    document.getElementById('adminProductName').value = p.name;
    document.getElementById('adminProductSku').value = p.sku;
    document.getElementById('adminProductBrand').value = p.brand;
    document.getElementById('adminProductCategory').value = p.category;
    document.getElementById('adminProductPrice').value = p.price;
    document.getElementById('adminProductUnit').value = p.unit;
    document.getElementById('adminProductDiscount').value = p.discount || 15;
    document.getElementById('adminProductVariants').value = (p.variants || []).join('\n');
    document.getElementById('adminProductDesc').value = p.desc || '';

    const preview = document.getElementById('adminImagePreview');
    if (preview) {
        preview.src = p.image;
        preview.style.display = 'block';
    }

    document.getElementById('adminFormTitle').textContent = 'Chỉnh Sửa Sản Phẩm: ' + p.name;
    document.getElementById('adminSubmitBtnText').textContent = 'Lưu Cập Nhật';
    document.getElementById('adminCancelEditBtn').style.display = 'inline-block';

    document.getElementById('adminProductForm').scrollIntoView({ behavior: 'smooth' });
}

// Xóa sản phẩm trong Admin
function deleteProduct(productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) return;

    if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${p.name}" (${p.sku}) không?`)) {
        state.products = state.products.filter(item => item.id !== productId);
        saveProducts();
        populateBrandFilter();
        renderCatalog();
        renderAdminProductsList();
        showToast(`Đã xóa sản phẩm "${p.name}".`, 'fa-trash');
    }
}

// Khôi phục danh mục gốc
function resetToDefaultProducts() {
    if (confirm('Khôi phục lại danh mục sản phẩm tiêu chuẩn ban đầu của Showroom Duy Phong?')) {
        state.products = [...INITIAL_PRODUCTS];
        saveProducts();
        populateBrandFilter();
        renderCatalog();
        renderAdminProductsList();
        showToast('Đã khôi phục danh mục gốc thành công!');
    }
}

function resetAdminProductForm() {
    const form = document.getElementById('adminProductForm');
    if (form) form.reset();
    document.getElementById('adminProductId').value = '';
    document.getElementById('adminFormTitle').textContent = 'Thêm Sản Phẩm Mới Vào Website';
    document.getElementById('adminSubmitBtnText').textContent = 'Lưu Sản Phẩm Mới';
    document.getElementById('adminCancelEditBtn').style.display = 'none';

    const preview = document.getElementById('adminImagePreview');
    if (preview) preview.style.display = 'none';
    state.uploadedImageDataUrl = '';
}

// Render danh sách sản phẩm trong Admin
function renderAdminProductsList() {
    const tbody = document.getElementById('adminProductsTableBody');
    if (!tbody) return;

    tbody.innerHTML = state.products.map((p, idx) => `
        <tr>
            <td style="color: var(--text-muted);">${idx + 1}</td>
            <td>
                <img src="${p.image}" class="table-thumb" alt="${p.name}" onerror="this.src='${createProductSvgDataUri(p.name.slice(0,18), p.brand, p.sku)}'"/>
            </td>
            <td>
                <strong style="color: #fff;">${p.name}</strong>
                <div style="font-size: 0.78rem; color: var(--text-muted);">SKU: ${p.sku}</div>
            </td>
            <td><span style="color: var(--primary); font-weight: 600;">${p.brand}</span></td>
            <td><strong style="color: var(--primary-light);">${formatVND(p.price)}</strong> / ${p.unit}</td>
            <td><span class="badge" style="background: rgba(16,185,129,0.15); color: var(--accent-green); border: 1px solid rgba(16,185,129,0.3); padding: 3px 8px; border-radius: 4px;">-${p.discount || 15}%</span></td>
            <td>
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline-gold" style="padding: 5px 10px; font-size: 0.78rem;" onclick="editProduct('${p.id}')">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button class="boq-del-btn" onclick="deleteProduct('${p.id}')" title="Xóa">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render danh sách Yêu cầu báo giá của khách trong Admin
function renderAdminQuotesList() {
    const container = document.getElementById('adminQuotesList');
    const badge = document.getElementById('adminQuoteBadge');
    if (badge) badge.textContent = state.quotes.length;

    if (!container) return;

    if (state.quotes.length === 0) {
        container.innerHTML = `
            <div class="empty-boq" style="padding: 40px 20px;">
                <i class="fas fa-inbox" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 12px;"></i>
                <h4 style="color: #fff;">Chưa có yêu cầu báo giá nào từ khách</h4>
                <p style="color: var(--text-muted); font-size: 0.9rem;">Khi khách gửi form báo giá trên website, danh sách và chi tiết vật tư sẽ lập tức xuất hiện tại đây.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = state.quotes.map((q, idx) => `
        <div class="admin-quote-card" style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: 12px; padding: 20px; margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
                <div>
                    <span class="badge" style="background: var(--primary); color: #000; font-weight: 800; font-size: 0.85rem; padding: 4px 10px; border-radius: 4px;">#${q.code}</span>
                    <span style="color: var(--text-muted); font-size: 0.82rem; margin-left: 10px;">${q.createdAt}</span>
                    <h3 style="color: #fff; margin: 8px 0 4px 0; font-size: 1.25rem;">${q.customerName}</h3>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">
                        <i class="fas fa-phone-alt" style="color: var(--accent-green);"></i> <strong>${q.customerPhone}</strong>
                        ${q.projectAddress ? ` | <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i> ${q.projectAddress}` : ''}
                        | <span style="color: var(--accent-gold);">${q.customerTypeLabel}</span>
                    </div>
                    ${q.notes ? `<div style="background: rgba(255,255,255,0.04); padding: 8px 12px; border-radius: 6px; margin-top: 8px; font-size: 0.86rem; color: #cbd5e1;"><i class="fas fa-comment-dots"></i> <em>"${q.notes}"</em></div>` : ''}
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 0.82rem; color: var(--text-muted);">Tạm tính chiết khấu</div>
                    <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary-light);">${formatVND(q.summary.finalEstimated)}</div>
                    <div style="font-size: 0.78rem; color: var(--accent-green);">${q.items.length} mặt hàng • ${q.summary.totalItems} đơn vị</div>
                </div>
            </div>

            <div style="max-height: 180px; overflow-y: auto; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.05); border-radius: 6px;">
                <table class="products-table" style="font-size: 0.82rem; margin: 0;">
                    <thead>
                        <tr>
                            <th>Tên Vật Tư</th>
                            <th>Hãng</th>
                            <th>Phân loại</th>
                            <th>ĐVT</th>
                            <th>SL</th>
                            <th>Niêm yết</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${q.items.map(it => `
                            <tr>
                                <td style="color: #fff; font-weight: 600;">${it.name}</td>
                                <td>${it.brand}</td>
                                <td><span style="color: var(--primary-light);">${it.variant}</span></td>
                                <td>${it.unit}</td>
                                <td><strong>${it.qty}</strong></td>
                                <td>${it.price > 0 ? formatVND(it.price * it.qty) : '---'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-end;">
                <button class="btn btn-gold" style="padding: 8px 14px; font-size: 0.82rem;" onclick="copyQuoteAndOpenZalo(${idx})">
                    <i class="fab fa-whatsapp"></i> Gửi Zalo Cho Khách
                </button>
                <button class="btn btn-outline-gold" style="padding: 8px 14px; font-size: 0.82rem;" onclick="generateQuoteImage(${idx})">
                    <i class="fas fa-image"></i> Xuất Ảnh Báo Giá (PNG)
                </button>
                <button class="btn btn-outline-gold" style="padding: 8px 14px; font-size: 0.82rem;" onclick="exportBoqToExcel(${idx})">
                    <i class="fas fa-file-excel"></i> Xuất Excel (CSV)
                </button>
                <button class="boq-del-btn" style="padding: 8px 14px; height: auto;" onclick="deleteQuoteRecord(${idx})" title="Xóa yêu cầu này">
                    <i class="fas fa-trash-alt"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');
}

function deleteQuoteRecord(index) {
    if (confirm('Bạn có chắc chắn muốn xóa lịch sử yêu cầu báo giá này không?')) {
        state.quotes.splice(index, 1);
        saveQuotes();
        renderAdminQuotesList();
        showToast('Đã xóa yêu cầu báo giá!');
    }
}

// Cập nhật số lượng thông báo báo giá trên nút Admin Header
function updateAdminQuoteBadge() {
    const badge = document.getElementById('headerAdminBadge');
    if (badge) {
        badge.textContent = state.quotes.length;
        badge.style.display = state.quotes.length > 0 ? 'inline-block' : 'none';
    }
}

// Xuất 1 đơn báo giá của khách ra file text tổng hợp để gửi Zalo / In ấn
function exportSingleQuoteToText(quoteIndex) {
    const q = state.quotes[quoteIndex];
    if (!q) return;
    const txt = generateZaloQuoteMessage(q);
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DonBaoGia_${q.code}_${q.customerName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Đã xuất file đơn báo giá #${q.code}!`);
}

// Xuất toàn bộ các đơn khách đã gửi ra 1 file Excel (CSV) tổng hợp để lưu trữ kế toán
function exportAllQuotesToMasterExcel() {
    if (!state.quotes || state.quotes.length === 0) {
        showToast('Chưa có dữ liệu báo giá nào để xuất!', 'fa-exclamation-triangle');
        return;
    }

    let csv = '\uFEFF';
    csv += `"THIẾT BỊ ĐIỆN DUY PHONG BẮC NINH - TỔNG HỢP TOÀN BỘ ĐƠN BÁO GIÁ CỦA KHÁCH HÀNG"\n`;
    csv += `"Xuất ngày: ${new Date().toLocaleString('vi-VN')}"\n\n`;
    csv += `STT,Mã Đơn,Thời Gian,Tên Khách Hàng,Số Điện Thoại,Địa Chỉ Công Trình,Đối Tượng,Tổng Niêm Yết,Chiết Khấu,Tạm Tính Sau CK,Số Mặt Hàng,Ghi Chú Khách\n`;

    state.quotes.forEach((q, idx) => {
        csv += `"${idx + 1}","${q.code}","${q.createdAt}","${q.customerName}","${q.customerPhone}","${q.projectAddress || ''}","${q.customerTypeLabel}","${q.summary.subtotalListed}","${q.summary.estimatedDiscount}","${q.summary.finalEstimated}","${q.items.length}","${(q.notes || '').replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TongHop_BaoGia_DuyPhong_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Đã xuất tổng hợp ${state.quotes.length} đơn báo giá ra file Excel!`);
}

// Xuất toàn bộ các đơn ra file dữ liệu JSON (để lưu trữ hoặc khôi phục trên máy khác)
function exportQuotesToJson() {
    if (!state.quotes || state.quotes.length === 0) {
        showToast('Chưa có đơn báo giá nào để xuất file JSON!', 'fa-exclamation-triangle');
        return;
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.quotes, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `Backup_DonHang_DuyPhong_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Đã xuất file sao lưu JSON thành công!');
}

// Xuất dữ liệu sản phẩm ra JSON để backup
function exportProductsToJson() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state.products, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = `DanhSach_SanPham_DuyPhong_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Đã xuất file sao lưu sản phẩm!');
}

// Bộ lọc danh mục & chế độ hiển thị
function filterCategory(catKey) {
    state.activeCategory = catKey;
    document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === catKey);
    });
    renderCatalog();
}

function setViewMode(mode) {
    state.viewMode = mode;
    const btnGrid = document.getElementById('viewModeGridBtn');
    const btnTable = document.getElementById('viewModeTableBtn');

    if (btnGrid) btnGrid.classList.toggle('active', mode === 'grid');
    if (btnTable) btnTable.classList.toggle('active', mode === 'table');

    renderCatalog();
}

function resetCatalogFilters() {
    state.activeCategory = 'all';
    state.activeBrand = 'all';
    state.searchQuery = '';
    const searchInput = document.getElementById('globalSearchInput');
    const brandSelect = document.getElementById('brandFilterSelect');
    if (searchInput) searchInput.value = '';
    if (brandSelect) brandSelect.value = 'all';

    document.querySelectorAll('.cat-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'all');
    });

    renderCatalog();
}

// Ghi nhận nhật ký người truy cập website (IP, thời gian, thiết bị, nguồn truy cập)
function trackVisitorTraffic() {
    const TRAFFIC_STORAGE_KEY = 'duyphong_traffic_logs_v1';
    try {
        const logs = JSON.parse(localStorage.getItem(TRAFFIC_STORAGE_KEY) || '[]');
        const userAgent = navigator.userAgent;
        const screenRes = `${window.screen.width}x${window.screen.height}`;
        const referrer = document.referrer || 'Truy cập trực tiếp';
        const now = new Date();
        const visitTime = now.toLocaleString('vi-VN');

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? 'Điện thoại' : 'Máy tính';

        const visitRecord = {
            id: 'VISIT-' + Date.now(),
            time: visitTime,
            timestamp: now.getTime(),
            device: deviceType,
            screen: screenRes,
            referrer: referrer,
            page: window.location.pathname
        };

        // Lấy thêm IP công khai ẩn danh qua api miễn phí ipify
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                visitRecord.ip = data.ip;
                logs.unshift(visitRecord);
                if (logs.length > 300) logs.pop(); // Giữ 300 lượt gần nhất
                localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify(logs));
            })
            .catch(() => {
                visitRecord.ip = 'Ẩn danh';
                logs.unshift(visitRecord);
                if (logs.length > 300) logs.pop();
                localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify(logs));
            });
    } catch (e) {
        console.warn('Traffic tracking error:', e);
    }
}

// Render các bài viết cẩm nang kỹ thuật ngoài trang chủ
function renderHomeArticles() {
    const container = document.getElementById('articlesGrid');
    if (!container) return;

    const ARTICLES_STORAGE_KEY = 'duyphong_articles_v1';
    let articles = [];
    try {
        articles = JSON.parse(localStorage.getItem(ARTICLES_STORAGE_KEY) || '[]');
    } catch (e) {
        articles = [];
    }

    if (articles.length === 0) {
        // Cung cấp 3 bài viết mẫu chuẩn SEO ngành điện Bắc Ninh nếu chưa có bài nào
        articles = [
            {
                id: 'art-01',
                title: 'Bí Quyết Chọn Tiết Diện Dây Cáp Điện Cho Nhà Phố 3-4 Tầng An Toàn & Tiết Kiệm',
                date: '07/11/2026',
                author: 'A Thành Bắc Ninh',
                desc: 'Hướng dẫn chủ nhà tính toán đúng công suất bếp từ, bình nóng lạnh, điều hòa inverter để chọn dây Trần Phú, Cadisun không lo sụt áp hay quá tải.',
                image: 'assets/images/kho-day-cap-thiet-bi.jpg'
            },
            {
                id: 'art-02',
                title: 'Phân Biệt Công Tắc Ổ Cắm BRETINA và PANASONIC: Nên Chọn Dòng Nào Cho Biệt Thự?',
                date: '06/11/2026',
                author: 'Kỹ Thuật Duy Phong',
                desc: 'So sánh chi tiết về độ bền cơ học, độ nhạy tiếp điểm đồng và thẩm mỹ viền kim loại Luxury giữa dòng Bretina cao cấp và Panasonic Wide truyền thống.',
                image: 'assets/images/cua-hang-mat-tien.jpg'
            },
            {
                id: 'art-03',
                title: 'Tiêu Chuẩn Lắp Đặt Tủ Điện Phân Phối và Cáp 3 Pha Cho Xưởng Cơ Khí Vừa & Nhỏ',
                date: '05/11/2026',
                author: 'A Thành Bắc Ninh',
                desc: 'Kinh nghiệm lựa chọn MCCB khối LS Hàn Quốc, khởi động từ contactor và cáp treo ngầm DSTA Cadisun chịu tải cao cho nhà xưởng tại KCN Bắc Ninh.',
                image: 'assets/images/kho-day-cap-thiet-bi.jpg'
            }
        ];
        try {
            localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
        } catch (e) {}
    }

    container.innerHTML = articles.map(art => `
        <div class="article-card" style="background: var(--bg-card); border: 1px solid var(--border-gold); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
            <div style="height: 180px; overflow: hidden; position: relative;">
                <img src="${art.image}" alt="${art.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <span style="position: absolute; bottom: 10px; left: 10px; background: rgba(11,15,23,0.85); backdrop-filter: blur(4px); color: var(--primary-light); font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(212,175,55,0.3);">
                    <i class="far fa-calendar-alt"></i> ${art.date}
                </span>
            </div>
            <div style="padding: 16px; display: flex; flex-direction: column; flex-grow: 1;">
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px;">
                    <i class="far fa-user"></i> Tác giả: <strong style="color: var(--primary);">${art.author || 'A Thành'}</strong>
                </div>
                <h4 style="color: #fff; font-size: 1.05rem; line-height: 1.4; margin-bottom: 8px;">${art.title}</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; flex-grow: 1; margin-bottom: 14px;">${art.desc || ''}</p>
                <a href="https://zalo.me/0904511227" target="_blank" class="btn btn-outline-gold btn-block" style="font-size: 0.82rem; padding: 7px 12px; text-align: center;">
                    <i class="fab fa-whatsapp"></i> Hỏi A Thành
                </a>
            </div>
        </div>
    `).join('');
}

// Khởi chạy khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    initData();
    populateBrandFilter();
    renderCatalog();
    renderBoqSection();
    renderHomeArticles();
    trackVisitorTraffic();
    updateHeaderAndFloatingBadges();
    updateAdminQuoteBadge();

    // Lắng nghe ô tìm kiếm
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderCatalog();
        });
    }

    // Lắng nghe lọc thương hiệu
    const brandSelect = document.getElementById('brandFilterSelect');
    if (brandSelect) {
        brandSelect.addEventListener('change', (e) => {
            state.activeBrand = e.target.value;
            renderCatalog();
        });
    }

    // Lắng nghe thay đổi loại khách hàng để tính lại chiết khấu tự động
    const customerTypeSelect = document.getElementById('quoteCustomerType');
    if (customerTypeSelect) {
        customerTypeSelect.addEventListener('change', () => {
            renderBoqSection();
            updateHeaderAndFloatingBadges();
        });
    }
});