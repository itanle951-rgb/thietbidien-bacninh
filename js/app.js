/**
 * ============================================================================
 * HỆ THỐNG WEBSITE & BÁO GIÁ VẬT TƯ ĐIỆN - THIẾT BỊ ĐIỆN CAO CẤP DUY PHONG
 * Mã Khách Hàng: A Thành BN
 * Địa chỉ: 549 Ngô Gia Tự, Ninh Xá, TP. Bắc Ninh | Hotline/Zalo: 0904.511.227
 * ============================================================================
 */

const STORAGE_KEYS = {
    PRODUCTS: 'duyphong_athanhbn_products_v20261108_465',
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
        <text x="45" y="65" fill="#F3E5AB" font-family="Arial, sans-serif" font-size="15" font-weight="bold" letter-spacing="1">${brand.toUpperCase()} • DUY PHONG ELECTRICS</text>
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
    }
,
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
            { productId: 'dp-tp-vcm-25', qty: 6 },
            { productId: 'dp-tp-vcm-15', qty: 5 },
            { productId: 'dp-cdv-cv-40', qty: 2 },
            { productId: 'dp-pana-oc-doi', qty: 35 },
            { productId: 'dp-pana-ct-2c', qty: 18 },
            { productId: 'dp-led-nano-9w-3m', qty: 45 },
            { productId: 'dp-mcb-sch-2p-63a', qty: 3 },
            { productId: 'dp-mcb-sch-1p-20a', qty: 12 },
            { productId: 'dp-tu-dien-am-12m', qty: 3 },
            { productId: 'dp-ong-ruot-ga-d20', qty: 6 }
        ]
    },
    'biet-thu': {
        title: 'Gói Vật Tư Biệt Thự / Nhà Vườn Cao Cấp',
        customerType: 'Chu-nha-xay-moi',
        items: [
            { productId: 'dp-cdv-cv-60', qty: 4 },
            { productId: 'dp-tp-vcm-25', qty: 12 },
            { productId: 'dp-brt-oc-doi-vang', qty: 55 },
            { productId: 'dp-brt-ct-3h-xam', qty: 28 },
            { productId: 'dp-led-nano-12w-3m', qty: 80 },
            { productId: 'dp-rcbo-sch-2p-40a', qty: 6 },
            { productId: 'dp-tu-dien-am-18m', qty: 4 },
            { productId: 'dp-quat-tran-5c-dc', qty: 3 }
        ]
    },
    'nha-xuong': {
        title: 'Gói Thi Công Nhà Xưởng Vừa & Nhỏ (200m² - 800m²)',
        customerType: 'Nha-thau-xuong',
        items: [
            { productId: 'dp-cds-cvv-3x16-1x10', qty: 85 },
            { productId: 'dp-cdv-cv-40', qty: 6 },
            { productId: 'dp-highbay-rd-150w', qty: 16 },
            { productId: 'dp-led-tube-bn-12m', qty: 20 },
            { productId: 'dp-mccb-ls-3p-100a', qty: 2 },
            { productId: 'dp-mccb-ls-3p-63a', qty: 6 },
            { productId: 'dp-contactor-ls-mc32a', qty: 4 },
            { productId: 'dp-vo-tu-dien-600x800', qty: 1 }
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
    viewMode: 'table', // 'table' (chính mặc định) | 'grid'
    currentPage: 1,    // Trang hiện tại
    pageSize: 20,      // Giới hạn 20 dòng / trang
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

// Khởi tạo dữ liệu từ LocalStorage hoặc toàn bộ 420 sản phẩm danh mục nhà máy
function initData() {
    const catalogData = (typeof window !== 'undefined' && window.ALL_PRODUCTS_DATA && Array.isArray(window.ALL_PRODUCTS_DATA) && window.ALL_PRODUCTS_DATA.length > 0)
        ? window.ALL_PRODUCTS_DATA
        : [...INITIAL_PRODUCTS];

    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (savedProducts) {
        try {
            const parsed = JSON.parse(savedProducts);
            if (Array.isArray(parsed) && parsed.length >= 200) {
                state.products = parsed;
            } else {
                state.products = [...catalogData];
                saveProducts();
            }
        } catch (e) {
            state.products = [...catalogData];
            saveProducts();
        }
    } else {
        state.products = [...catalogData];
        saveProducts();
    }

    const savedCart = localStorage.getItem(STORAGE_KEYS.CART_BOQ);
    if (savedCart) {
        try {
            state.boqCart = JSON.parse(savedCart);
            // Cập nhật lại giá chính xác cho các mục nếu có
            if (Array.isArray(state.boqCart)) {
                state.boqCart.forEach(item => {
                    const found = state.products.find(p => p.id === item.productId || p.sku === item.sku);
                    if (found && found.price) {
                        item.price = Number(found.price);
                    }
                });
            }
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
    populateBrandFilter();
}

function saveCart() {
    localStorage.setItem(STORAGE_KEYS.CART_BOQ, JSON.stringify(state.boqCart));
    renderBoqSection();
    updateHeaderAndFloatingBadges();
}

function saveQuotes() {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(state.quotes));
    updateAdminQuoteBadge();
}

// Lọc sản phẩm theo danh mục, thương hiệu, từ khóa
function getFilteredProducts() {
    return state.products.filter(p => {
        const matchCat = state.activeCategory === 'all' || p.category === state.activeCategory;
        const matchBrand = state.activeBrand === 'all' || p.brand.toLowerCase() === state.activeBrand.toLowerCase();
        const q = state.searchQuery.trim().toLowerCase();
        const matchSearch = !q ||
            p.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            (p.desc && p.desc.toLowerCase().includes(q));
        return matchCat && matchBrand && matchSearch;
    });
}

// Tự động cập nhật dropdown lọc Thương hiệu
function populateBrandFilter() {
    const select = document.getElementById('brandFilterSelect');
    if (!select) return;
    const brands = Array.from(new Set(state.products.map(p => p.brand))).filter(Boolean).sort();
    const current = state.activeBrand;
    select.innerHTML = `<option value="all">⚡ Tất cả sản phẩm (${state.products.length} mặt hàng)</option>` +
        brands.map(b => {
            const count = state.products.filter(p => p.brand === b).length;
            return `<option value="${b}" ${b === current ? 'selected' : ''}>Hãng: ${b} (${count} mặt hàng)</option>`;
        }).join('');
}

// Render Danh mục Sản phẩm (Cả chế độ Lưới Thẻ và Chế độ Bảng Chọn Nhanh)
function renderCatalog() {
    const filtered = getFilteredProducts();
    const gridEl = document.getElementById('productsGrid') || document.getElementById('productGridContainer');
    const tableWrapperEl = document.getElementById('productsTableWrapper') || document.getElementById('quickTableWrapper');
    const tableBodyEl = document.getElementById('productsTableBody') || document.getElementById('quickTableBody');
    const countLabel = document.getElementById('filteredProductCount') || document.getElementById('catalogCountLabel');
    const paginationEl = document.getElementById('catalogPagination');

    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / state.pageSize));
    if (state.currentPage > totalPages) state.currentPage = totalPages;
    if (state.currentPage < 1) state.currentPage = 1;

    const startIdx = (state.currentPage - 1) * state.pageSize;
    const endIdx = Math.min(startIdx + state.pageSize, totalItems);
    const pagedProducts = filtered.slice(startIdx, endIdx);

    if (countLabel) {
        countLabel.innerHTML = totalItems > 0
            ? `Hiển thị <strong>${startIdx + 1} - ${endIdx}</strong> / <strong>${totalItems}</strong> mặt hàng chính hãng (Trang <strong>${state.currentPage}</strong> / ${totalPages})`
            : `Hiển thị 0 mặt hàng chính hãng`;
    }

    if (totalItems === 0) {
        if (gridEl) {
            gridEl.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: var(--bg-card); border-radius: 12px; border: 1px dashed var(--border-gold);">
                    <i class="fas fa-box-open" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 12px;"></i>
                    <h3>Không tìm thấy sản phẩm khớp bộ lọc</h3>
                    <p style="color: var(--text-secondary); margin: 8px 0 16px;">Bạn có thể xóa bộ lọc hoặc nhập trực tiếp tên vật tư vào ô "Thêm Vật Tư Ngoài Danh Mục" bên dưới.</p>
                    <button class="btn btn-outline-gold" onclick="resetCatalogFilters()"><i class="fas fa-sync"></i> Xem tất cả sản phẩm</button>
                </div>
            `;
        }
        if (tableBodyEl) {
            tableBodyEl.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 36px 16px; color: var(--text-secondary);">
                        <i class="fas fa-box-open" style="font-size: 2rem; color: var(--primary); margin-bottom: 10px; display: block;"></i>
                        Không tìm thấy sản phẩm khớp với từ khóa hoặc bộ lọc đã chọn.
                        <div style="margin-top: 12px;">
                            <button class="btn btn-outline-gold" onclick="resetCatalogFilters()"><i class="fas fa-sync"></i> Xem tất cả sản phẩm</button>
                        </div>
                    </td>
                </tr>
            `;
        }
        if (paginationEl) paginationEl.innerHTML = '';
        return;
    }

    // 1. Render Grid Cards (cho 20 sản phẩm trang hiện tại)
    if (gridEl) {
        gridEl.innerHTML = pagedProducts.map(p => {
            const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : ['Tiêu chuẩn chính hãng'];
            const inCartItems = state.boqCart.filter(item => item.productId === p.id);
            const totalQtyInCart = inCartItems.reduce((sum, item) => sum + item.qty, 0);

            return `
                <div class="product-card ${totalQtyInCart > 0 ? 'in-quote' : ''}" id="card-${p.id}">
                    <div class="product-thumb-wrap">
                        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='${createProductSvgDataUri(p.name.slice(0,22), p.brand, p.sku, p.brandColor || '#D4AF37')}';"/>
                        <span class="product-brand-tag">${p.brand}</span>
                        <span class="product-catalog-badge" style="position: absolute; top: 12px; right: 12px; background: rgba(212,175,55,0.18); color: var(--primary-light); border: 1px solid rgba(212,175,55,0.35); font-size: 0.72rem; padding: 3px 8px; border-radius: 4px; font-weight: 600;"><i class="fas fa-certificate"></i> Giá Catalog</span>
                        ${totalQtyInCart > 0 ? `<div class="in-quote-ribbon"><i class="fas fa-check-circle"></i> Đã chọn: ${totalQtyInCart} ${p.unit}</div>` : ''}
                    </div>
                    <div class="product-body">
                        <div class="product-sku">MÃ: ${p.sku}</div>
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-desc">${p.desc || ''}</p>
                        
                        <div class="product-variant-box" style="margin-bottom: 10px;">
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;"><i class="fas fa-certificate" style="color: var(--primary);"></i> Thông số / Quy cách:</div>
                            <div style="color: #F3E5AB; font-weight: 600; font-size: 0.88rem; background: rgba(212,175,55,0.08); padding: 6px 10px; border-radius: 6px; border: 1px solid rgba(212,175,55,0.2);">${p.spec || (p.variants && p.variants[0]) || 'Chính hãng'}</div>
                        </div>

                        <div class="product-price-row">
                            <div>
                                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px;">Giá Catalog niêm yết:</div>
                                <span class="price-main" id="price-val-${p.id}">${formatVND(p.price)}</span>
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
                            <button type="button" class="btn btn-gold" style="width: 100%;" onclick="addToQuoteFromCard('${p.id}')">
                                <i class="fas fa-cart-plus"></i> Thêm Vào Danh Sách Báo Giá
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // 2. Render Quick Table Mode (Chế độ Bảng Kê Nhanh Chính - 20 dòng trang hiện tại)
    if (tableBodyEl) {
        tableBodyEl.innerHTML = pagedProducts.map(p => {
            const variants = Array.isArray(p.variants) && p.variants.length > 0 ? p.variants : ['Tiêu chuẩn chính hãng'];
            const inCartItems = state.boqCart.filter(item => item.productId === p.id);
            const currentQty = inCartItems.reduce((s, i) => s + i.qty, 0);

            return `
                <tr>
                    <td>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="${p.image}" class="table-thumb" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.src='${createProductSvgDataUri(p.name.slice(0,18), p.brand, p.sku, p.brandColor || '#D4AF37')}';"/>
                            <div>
                                <div style="font-weight: 700; color: var(--text-primary);">${p.name}</div>
                                <div style="font-size: 0.76rem; color: var(--accent-cyan);">Mã: ${p.sku} • Hãng: <strong>${p.brand}</strong></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div style="color: #F3E5AB; font-weight: 600; font-size: 0.88rem; line-height: 1.4;">${p.spec || (p.variants && p.variants[0]) || 'Chính hãng'}</div>
                    </td>
                    <td style="text-align: center;"><strong>${p.unit}</strong></td>
                    <td>
                        <div style="color: var(--primary-light); font-weight: 700;" id="tbl-price-${p.id}">${formatVND(p.price)}</div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">Giá Catalog chính hãng</div>
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
        if (gridEl) gridEl.style.display = 'none';
        if (tableWrapperEl) tableWrapperEl.classList.add('active');
    } else {
        if (gridEl) gridEl.style.display = 'grid';
        if (tableWrapperEl) tableWrapperEl.classList.remove('active');
    }

    // Render bộ điều khiển phân trang
    renderCatalogPagination(totalItems, totalPages);
}

// Chuyển trang danh mục và cuộn mượt về đầu khu vực sản phẩm
function changeCatalogPage(newPage) {
    const filtered = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
    if (newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;
    state.currentPage = newPage;
    renderCatalog();
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Render phân trang thanh lịch (Previous, 1, 2, 3 ... 21, Next)
function renderCatalogPagination(totalItems, totalPages) {
    const paginationEl = document.getElementById('catalogPagination');
    if (!paginationEl) return;

    if (totalItems <= state.pageSize) {
        paginationEl.innerHTML = `
            <div class="page-info-summary">
                Hiển thị tất cả <strong>${totalItems}</strong> sản phẩm
            </div>
            <div></div>
        `;
        return;
    }

    const startItem = (state.currentPage - 1) * state.pageSize + 1;
    const endItem = Math.min(state.currentPage * state.pageSize, totalItems);

    // Tính toán các nút hiển thị số trang với dấu ...
    let pages = [];
    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (state.currentPage > 3) pages.push('...');
        const start = Math.max(2, state.currentPage - 1);
        const end = Math.min(totalPages - 1, state.currentPage + 1);
        for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
        }
        if (state.currentPage < totalPages - 2) pages.push('...');
        if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    const pagesHtml = pages.map(p => {
        if (p === '...') {
            return `<span class="page-btn dots">…</span>`;
        }
        return `<button type="button" class="page-btn ${p === state.currentPage ? 'active' : ''}" onclick="changeCatalogPage(${p})">${p}</button>`;
    }).join('');

    paginationEl.innerHTML = `
        <div class="page-info-summary">
            Hiển thị dòng <strong>${startItem} - ${endItem}</strong> / <strong>${totalItems}</strong> sản phẩm (Trang <strong>${state.currentPage}</strong> / ${totalPages})
        </div>
        <div class="pagination-pages">
            <button type="button" class="page-btn" ${state.currentPage <= 1 ? 'disabled' : ''} onclick="changeCatalogPage(${state.currentPage - 1})" title="Trang trước">
                <i class="fas fa-chevron-left"></i> Trước
            </button>
            ${pagesHtml}
            <button type="button" class="page-btn" ${state.currentPage >= totalPages ? 'disabled' : ''} onclick="changeCatalogPage(${state.currentPage + 1})" title="Trang sau">
                Sau <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    `;
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

    const qtyEl = document.getElementById(`qty-${productId}`);
    const selectedVariant = product.spec || (product.variants && product.variants[0]) || 'Chính hãng';
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
    const qtyEl = document.getElementById(`tbl-qty-${productId}`);
    const selectedVariant = product.spec || (product.variants && product.variants[0]) || 'Chính hãng';
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
        const selectedVariant = p.spec || (p.variants && p.variants[0]) || 'Chính hãng';

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
    const actualPrice = Number(product.price) || 0;

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
            const variant = product.spec || entry.variant || 'Chính hãng';
            upsertBoqItem(product, variant, entry.qty, false);
        }
    });

    const customerTypeSelect = document.getElementById('quoteCustomerType');
    if (customerTypeSelect && combo.customerType) {
        customerTypeSelect.value = combo.customerType;
    }

    renderCatalog();
    renderBoqSection();
    showToast(`Đã nạp <strong>${combo.title}</strong> (${combo.items.length} hạng mục) vào Danh sách báo giá!`);
    document.getElementById('boq-section').scrollIntoView({ behavior: 'smooth' });
}

// Thêm vật tư ngoài danh mục do khách hoặc thợ điện tự gõ
function addCustomBoqItem() {
    const nameEl = document.getElementById('customItemName');
    const specEl = document.getElementById('customItemSpec');
    const unitEl = document.getElementById('customItemUnit');
    const qtyEl  = document.getElementById('customItemQty');

    const name = (nameEl.value || '').trim();
    const spec = (specEl.value || '').trim() || 'Theo yêu cầu thực tế';
    const unit = (unitEl.value || '').trim() || 'Cái/Bộ';
    const qty  = Math.max(1, parseInt(qtyEl.value, 10) || 1);

    if (!name) {
        showToast('Vui lòng nhập tên vật tư cần mua thêm!', 'fa-info-circle');
        nameEl.focus();
        return;
    }

    state.boqCart.push({
        cartId: 'custom_' + Date.now(),
        productId: 'custom',
        sku: 'TU-CHON',
        name: name,
        brand: 'Theo yêu cầu',
        variant: spec,
        unit: unit,
        price: 0, // Cửa hàng sẽ báo giá trực tiếp
        discount: 0,
        qty: qty,
        isCustom: true
    });

    nameEl.value = '';
    specEl.value = '';
    qtyEl.value = '1';
    saveCart();
    showToast(`Đã thêm mục tự chọn "${name}" (SL: ${qty} ${unit}) vào phiếu báo giá!`);
}

// Cập nhật số lượng hoặc xóa dòng trong bảng BOQ
function updateBoqItemQty(cartId, newQty) {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty <= 0) {
        removeBoqItem(cartId);
        return;
    }
    const item = state.boqCart.find(i => i.cartId === cartId);
    if (item) {
        item.qty = qty;
        saveCart();
        renderBoqSection();
        renderCatalog();
        updateHeaderAndFloatingBadges();
    }
}

function updateBoqQty(cartId, newQty) {
    updateBoqItemQty(cartId, newQty);
}

function removeBoqItem(cartId) {
    state.boqCart = state.boqCart.filter(i => i.cartId !== cartId);
    saveCart();
    renderBoqSection();
    renderCatalog();
    updateHeaderAndFloatingBadges();
}

function clearAllBoq() {
    if (state.boqCart.length === 0) return;
    state.boqCart = [];
    saveCart();
    renderBoqSection();
    renderCatalog();
    updateHeaderAndFloatingBadges();
    showToast('Đã làm mới toàn bộ danh sách vật tư báo giá.');
}

// Tính toán tổng tiền niêm yết & chiết khấu dự kiến theo nhóm khách hàng
function calculateBoqSummary() {
    const customerTypeEl = document.getElementById('quoteCustomerType');
    const customerType = customerTypeEl ? customerTypeEl.value : 'Chu-nha-xay-moi';

    // Hệ số chiết khấu tham khảo theo phân khúc khách hàng
    let bonusDiscountFactor = 0.75; // Chủ nhà xây mới hưởng ~75% mức CK tối đa
    if (customerType === 'Tho-dien-doi-tac') bonusDiscountFactor = 1.0; // Thợ điện Bắc Ninh hưởng tối đa CK đại lý
    if (customerType === 'Nha-thau-xuong') bonusDiscountFactor = 1.0;   // Nhà thầu nhà xưởng hưởng tối đa CK dự án

    let totalItems = state.boqCart.length;
    let totalUnits = 0;
    let subtotalListed = 0;
    let estimatedDiscount = 0;

    state.boqCart.forEach(item => {
        totalUnits += item.qty;
        const lineListed = (item.price || 0) * item.qty;
        subtotalListed += lineListed;
        const effectiveRate = ((item.discount || 15) * bonusDiscountFactor) / 100;
        estimatedDiscount += lineListed * effectiveRate;
    });

    const finalEstimated = Math.max(0, subtotalListed - estimatedDiscount);
    return {
        totalItems,
        totalUnits,
        subtotalListed,
        estimatedDiscount,
        finalEstimated
    };
}

// Render Bảng Danh Sách Yêu Cầu Báo Giá (BOQ Section)
function renderBoqSection() {
    const tbody = document.getElementById('boqTableBody');
    if (!tbody) return;

    if (state.boqCart.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 36px 16px; color: var(--text-secondary);">
                    <i class="fas fa-clipboard-list" style="font-size: 2.2rem; color: var(--primary); margin-bottom: 10px; display: block;"></i>
                    Danh sách báo giá của bạn đang trống. Hãy chọn sản phẩm ở trên hoặc bấm vào <strong>3 Gói Combo Mẫu</strong> để nạp danh sách nhanh!
                </td>
            </tr>
        `;
    } else {
        tbody.innerHTML = state.boqCart.map((item, idx) => {
            const lineTotal = (item.price || 0) * item.qty;
            return `
                <tr>
                    <td style="text-align: center; color: var(--text-muted); font-weight: 700;">${idx + 1}</td>
                    <td style="text-align: left;">
                        <div style="font-weight: 700; color: #fff; line-height: 1.35; font-size: 0.92rem;">${item.name}</div>
                        <div style="font-size: 0.76rem; color: var(--text-muted); margin-top: 3px;">
                            Hãng: <span style="color: var(--primary); font-weight: 600;">${item.brand}</span> ${item.sku ? `| SKU: ${item.sku}` : ''}
                        </div>
                    </td>
                    <td style="text-align: left;">
                        <span style="color: #F3E5AB; font-weight: 600; font-size: 0.88rem; line-height: 1.4; display: inline-block;">
                            ${item.variant}
                        </span>
                    </td>
                    <td style="text-align: center; color: #cbd5e1; font-weight: 600;">${item.unit}</td>
                    <td style="text-align: right; font-weight: 600; color: #cbd5e1; white-space: nowrap;">
                        ${item.isCustom ? '<em style="color:var(--accent-cyan)">Báo giá sau</em>' : (item.price > 0 ? formatVND(item.price) : '<span style="color: var(--accent-gold); font-style: italic;">Chờ báo giá</span>')}
                    </td>
                    <td style="text-align: center;">
                        <div class="boq-qty-stepper">
                            <button type="button" class="boq-qty-btn" onclick="updateBoqItemQty('${item.cartId}', ${item.qty - 1})">−</button>
                            <input type="number" min="1" class="boq-qty-input" value="${item.qty}" onchange="updateBoqItemQty('${item.cartId}', this.value)" aria-label="Số lượng"/>
                            <button type="button" class="boq-qty-btn" onclick="updateBoqItemQty('${item.cartId}', ${item.qty + 1})">+</button>
                        </div>
                    </td>
                    <td style="text-align: right; font-weight: 700; color: var(--primary-light); white-space: nowrap;">
                        ${item.isCustom ? 'Chờ báo giá' : (lineTotal > 0 ? formatVND(lineTotal) : '---')}
                    </td>
                    <td style="text-align: center;" class="no-print">
                        <button type="button" class="boq-del-btn" onclick="removeBoqItem('${item.cartId}')" title="Xóa mặt hàng này">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    const summary = calculateBoqSummary();
    const elTotalItems = document.getElementById('summaryTotalItems');
    const elSubtotal = document.getElementById('summarySubtotal');
    const elDiscount = document.getElementById('summaryDiscount');
    const elFinal = document.getElementById('summaryFinal');

    if (elTotalItems) elTotalItems.textContent = `${summary.totalItems} đầu mục (${summary.totalUnits} sản phẩm)`;
    if (elSubtotal) elSubtotal.textContent = formatVND(summary.subtotalListed);
    if (elDiscount) elDiscount.textContent = 'A Thành báo riêng qua Zalo';
    if (elFinal) elFinal.textContent = formatVND(summary.subtotalListed);
}

// Cập nhật số đếm trên Header và Thanh Nổi Dưới Cùng
function updateHeaderAndFloatingBadges() {
    const summary = calculateBoqSummary();
    const headerBadge = document.getElementById('headerBoqCount') || document.getElementById('headerQuoteBadge');
    const floatBar = document.getElementById('floatingQuoteBar');
    const floatCount = document.getElementById('floatingItemCount');
    const floatTotal = document.getElementById('floatingTotalAmount');

    if (headerBadge) headerBadge.textContent = summary.totalItems;
    if (floatCount) floatCount.textContent = `${summary.totalItems} mặt hàng (Tổng SL: ${summary.totalUnits})`;
    if (floatTotal) floatTotal.textContent = formatVND(summary.subtotalListed);

    if (floatBar) {
        if (summary.totalItems > 0) {
            floatBar.classList.remove('hidden');
        } else {
            floatBar.classList.add('hidden');
        }
    }
}

// Tạo nội dung văn bản tổng hợp để gửi Zalo hoặc lưu trữ
function buildQuoteTextPayload(quoteObj) {
    let lines = [
        `📋 YÊU CẦU BÁO GIÁ VẬT TƯ ĐIỆN - DUY PHONG BN`,
        `Mã phiếu: ${quoteObj.code} | Ngày: ${quoteObj.createdAt}`,
        `----------------------------------------`,
        `👤 Khách hàng: ${quoteObj.customerName}`,
        `📞 SĐT/Zalo: ${quoteObj.customerPhone}`,
        `🏷️ Phân loại: ${quoteObj.customerTypeLabel}`,
        `📍 Công trình: ${quoteObj.projectAddress}`,
        `📝 Ghi chú: ${quoteObj.notes || 'Không có'}`,
        `----------------------------------------`,
        `📦 DANH SÁCH VẬT TƯ CẦN BÁO GIÁ (${quoteObj.items.length} mục):`
    ];

    quoteObj.items.forEach((item, idx) => {
        lines.push(`${idx + 1}. ${item.name} [${item.variant}] - SL: ${item.qty} ${item.unit} (${item.isCustom ? 'Báo giá riêng' : formatVND(item.price) + '/' + item.unit})`);
    });

    lines.push(`----------------------------------------`);
    lines.push(`💰 Tạm tính giá niêm yết: ${formatVND(quoteObj.summary.subtotalListed)}`);
    lines.push(`🎁 Chiết khấu dự kiến: -${formatVND(quoteObj.summary.estimatedDiscount)}`);
    lines.push(`✅ TỔNG DỰ KIẾN SAU CHIẾT KHẤU: ${formatVND(quoteObj.summary.finalEstimated)}`);
    lines.push(`(Nhờ A Thành BN - 0904.511.227 kiểm tra tồn kho và chốt giá chiết khấu tốt nhất giúp tôi!)`);

    return lines.join('\n');
}

// Xử lý khi Khách Hàng bấm "GỬI YÊU CẦU BÁO GIÁ CHO CHỦ WEBSITE"
function submitQuoteRequest(sendViaZalo = false) {
    if (state.boqCart.length === 0) {
        showToast('Danh sách sản phẩm đang trống! Hãy chọn ít nhất 1 sản phẩm trước khi gửi báo giá.', 'fa-exclamation-triangle');
        document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
        return;
    }

    const nameEl = document.getElementById('quoteCustomerName');
    const phoneEl = document.getElementById('quoteCustomerPhone');
    const typeEl = document.getElementById('quoteCustomerType');
    const addrEl = document.getElementById('quoteProjectAddress');
    const noteEl = document.getElementById('quoteNotes');

    const customerName = (nameEl.value || '').trim();
    const customerPhone = (phoneEl.value || '').trim();
    const customerType = typeEl.value;
    const customerTypeLabel = typeEl.options[typeEl.selectedIndex].text;
    const projectAddress = (addrEl.value || '').trim() || 'Khu vực Bắc Ninh';
    const notes = (noteEl.value || '').trim();

    if (!customerName || !customerPhone) {
        showToast('Vui lòng nhập Họ tên và Số điện thoại/Zalo để cửa hàng liên hệ báo giá!', 'fa-user-check');
        if (!customerName) nameEl.focus();
        else phoneEl.focus();
        return;
    }

    const summary = calculateBoqSummary();
    const quoteCode = 'BG-' + Math.floor(100000 + Math.random() * 900000);
    const nowStr = new Date().toLocaleString('vi-VN');

    const newQuote = {
        id: 'q_' + Date.now(),
        code: quoteCode,
        createdAt: nowStr,
        customerName,
        customerPhone,
        customerType,
        customerTypeLabel,
        projectAddress,
        notes,
        status: 'Mới nhận - Chờ báo giá',
        items: JSON.parse(JSON.stringify(state.boqCart)),
        summary
    };

    state.quotes.unshift(newQuote);
    saveQuotes();

    // 1. Tự động gửi Email thông báo đơn hàng mới ngầm về hộp thư của bạn
    sendSilentEmailNotification(newQuote, false);

    // 2. Bắn ngầm dữ liệu về Webhook nội bộ (nếu Admin có cài đặt) mà khách không hề biết
    triggerSilentInternalWebhook(newQuote);

    // Hiển thị thông báo xác nhận lịch sự cho khách hàng (Không bật popup Zalo làm phiền khách)
    const resultBanner = document.getElementById('quoteSuccessBanner');
    if (resultBanner) {
        resultBanner.style.display = 'block';
        resultBanner.innerHTML = `
            <div>
                <h4 style="color: var(--accent-green); font-size: 1.08rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                    <i class="fas fa-check-circle"></i> Đã gửi yêu cầu báo giá thành công! (Mã phiếu: ${quoteCode})
                </h4>
                <p style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.55;">
                    Cảm ơn Quý khách <strong>${customerName}</strong>. Danh sách <strong>${summary.totalItems} mặt hàng (Tổng SL: ${summary.totalUnits})</strong> đã được chuyển vào hệ thống nội bộ của <strong>Thiết Bị Điện Cao Cấp Duy Phong (A Thành BN)</strong>.
                </p>
                <p style="font-size: 0.84rem; color: var(--primary-light); margin-top: 6px;">
                    <i class="fas fa-headset"></i> Cửa hàng đang áp mức chiết khấu tốt nhất và sẽ phản hồi trực tiếp qua SĐT/Zalo <strong>${customerPhone}</strong> của Quý khách trong ít phút!
                </p>
            </div>
        `;
    }

    showToast(`Đã gửi yêu cầu báo giá thành công! Mã phiếu: ${quoteCode}`);
}

// ============================================================================
// HỆ THỐNG TỰ ĐỘNG GỬI EMAIL NGẦM MỖI KHI CÓ ĐƠN MỚI (FORMSUBMIT AJAX API)
// ============================================================================
const DEFAULT_ADMIN_EMAIL = 'itanle951@gmail.com';

function getAdminNotifyEmail() {
    const saved = (localStorage.getItem('duyphong_athanhbn_notify_email_v1') || '').trim();
    if (!saved || saved === 'hoangthinh.logistics1688@gmail.com') {
        localStorage.setItem('duyphong_athanhbn_notify_email_v1', DEFAULT_ADMIN_EMAIL);
        return DEFAULT_ADMIN_EMAIL;
    }
    return saved;
}

function getAdminNotifyCcEmail() {
    return (localStorage.getItem('duyphong_athanhbn_notify_cc_v1') || '').trim();
}

function saveAdminEmailSettings() {
    const emailInput = document.getElementById('adminNotifyEmailInput');
    const ccInput = document.getElementById('adminNotifyCcEmailInput');
    const email = emailInput ? emailInput.value.trim() : DEFAULT_ADMIN_EMAIL;
    const cc = ccInput ? ccInput.value.trim() : '';

    if (!email) {
        showToast('Vui lòng nhập địa chỉ Email nhận thông báo đơn hàng!', 'fa-exclamation-circle');
        return;
    }

    localStorage.setItem('duyphong_athanhbn_notify_email_v1', email);
    localStorage.setItem('duyphong_athanhbn_notify_cc_v1', cc);
    showToast(`Đã lưu cấu hình nhận đơn tự động qua Email: <strong>${email}</strong>`);
}

function sendSilentEmailNotification(quoteObj, isManualTest = false) {
    const targetEmail = getAdminNotifyEmail();
    const ccEmail = getAdminNotifyCcEmail();
    if (!targetEmail) return;

    const emailPayload = {
        _subject: `⚡ [ĐƠN BÁO GIÁ MỚI ${quoteObj.code}] KH: ${quoteObj.customerName} (${quoteObj.customerPhone}) - Duy Phong BN`,
        _template: 'table',
        _captcha: 'false',
        '01_Mã_Phiếu_Báo_Giá': quoteObj.code,
        '02_Thời_Gian_Đặt': quoteObj.createdAt,
        '03_Tên_Khách_Hàng': quoteObj.customerName,
        '04_SĐT_Zalo_Khách': quoteObj.customerPhone,
        '05_Phân_Loại_Khách': quoteObj.customerTypeLabel,
        '06_Địa_Chỉ_Công_Trình': quoteObj.projectAddress,
        '07_Ghi_Chú_Đơn_Hàng': quoteObj.notes || 'Không có',
        '08_Tổng_Số_Mặt_Hàng': `${quoteObj.summary.totalItems} mục (Tổng SL: ${quoteObj.summary.totalUnits})`
    };

    if (ccEmail) {
        emailPayload._cc = ccEmail;
    }

    // Đưa từng mặt hàng vào bảng trong Email để chủ web đọc ngay trên điện thoại
    quoteObj.items.forEach((item, idx) => {
        const stt = String(idx + 1).padStart(2, '0');
        const lineMoney = item.isCustom ? 'Báo giá riêng' : formatVND((item.price || 0) * item.qty);
        emailPayload[`Vật_Tư_${stt}`] = `${item.name} | Phân loại: ${item.variant} | SL: ${item.qty} ${item.unit} | Đơn giá: ${formatVND(item.price)} | Thành tiền: ${lineMoney}`;
    });

    emailPayload['97_Tổng_Giá_Niêm_Yết'] = formatVND(quoteObj.summary.subtotalListed);
    emailPayload['98_Chiết_Khấu_Dự_Kiến'] = `- ${formatVND(quoteObj.summary.estimatedDiscount)}`;
    emailPayload['99_TỔNG_SAU_CHIẾT_KHẤU'] = formatVND(quoteObj.summary.finalEstimated);

    fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
    })
    .then(res => res.json())
    .then(data => {
        quoteObj.emailSentTo = targetEmail;
        saveQuotes();
        renderAdminQuotesList();
        if (isManualTest) {
            showToast(`Đã gửi Email tới <strong>${targetEmail}</strong>! (Hãy kiểm tra Hộp thư đến hoặc Spam để bấm Activate nếu là lần đầu).`);
        }
    })
    .catch(() => {
        if (isManualTest) {
            showToast('Không thể kết nối máy chủ gửi Email. Vui lòng kiểm tra kết nối mạng!', 'fa-exclamation-triangle');
        }
    });
}

function sendTestEmailNotification() {
    saveAdminEmailSettings();
    const targetEmail = getAdminNotifyEmail();
    const sampleQuote = state.quotes[0] || {
        id: 'test_' + Date.now(),
        code: 'BG-TEST99',
        createdAt: new Date().toLocaleString('vi-VN'),
        customerName: 'Khách Hàng Test Hệ Thống Email',
        customerPhone: '0904.511.227',
        customerTypeLabel: '🏠 Chủ nhà đang xây / hoàn thiện nhà ở gia đình',
        projectAddress: '549 Ngô Gia Tự, Ninh Xá, TP. Bắc Ninh',
        notes: 'Đây là Email kiểm tra tính năng tự động báo đơn mới về hộp thư của bạn.',
        items: [
            { name: 'Dây Điện Đơn Mềm Trần Phú Chính Hãng', variant: 'Tiết diện 2.5mm²', qty: 6, unit: 'Cuộn (100m)', price: 685000, isCustom: false },
            { name: 'Bộ Công Tắc & Ổ Cắm Cao Cấp BRETINA', variant: 'Ổ cắm đôi 3 chấu mặt Vàng Champagne', qty: 25, unit: 'Bộ', price: 145000, isCustom: false }
        ],
        summary: {
            totalItems: 2,
            totalUnits: 31,
            subtotalListed: 7735000,
            estimatedDiscount: 1250000,
            finalEstimated: 6485000
        }
    };

    showToast(`Đang gửi Email Test tới <strong>${targetEmail}</strong>...`, 'fa-paper-plane');
    sendSilentEmailNotification(sampleQuote, true);
}

function resendQuoteEmail(quoteId) {
    const q = state.quotes.find(item => item.id === quoteId);
    if (!q) return;
    showToast(`Đang gửi lại đơn ${q.code} tới Email <strong>${getAdminNotifyEmail()}</strong>...`, 'fa-envelope');
    sendSilentEmailNotification(q, true);
}

const DEFAULT_GAS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyvZUChHkx8m70IGKW-r9B1p-uUCC71Cqb9IDdo96a6xYHmRsz1Oap9cgYEhRzwVxrx/exec';

function getInternalWebhookUrl() {
    const saved = (localStorage.getItem('duyphong_athanhbn_webhook_v1') || '').trim();
    if (!saved || saved.includes('AKfycbza0_nKZ53lKBA9X_c7tNHxSMJWZoAi3GpQ-OqwFuM')) {
        localStorage.setItem('duyphong_athanhbn_webhook_v1', DEFAULT_GAS_WEBHOOK);
        return DEFAULT_GAS_WEBHOOK;
    }
    return saved;
}

// Bắn ngầm dữ liệu đơn hàng về Webhook Nội Bộ (Google Sheet / Apps Script / n8n / Telegram)
function triggerSilentInternalWebhook(quoteObj) {
    const webhookUrl = getInternalWebhookUrl();
    if (!webhookUrl) return;

    const payload = JSON.stringify({
        source: 'Website Thiết Bị Điện Duy Phong - A Thành BN',
        quote: quoteObj,
        formattedText: buildQuoteTextPayload(quoteObj)
    });

    try {
        // Nếu là Google Apps Script Web App (/macros/s/)
        if (webhookUrl.includes('script.google.com')) {
            // Sử dụng mode: 'no-cors' và Content-Type: 'text/plain' để tránh lỗi CORS Preflight của Google
            fetch(webhookUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: payload
            }).catch(() => {});
        } else {
            // Webhook n8n hoặc API thông thường
            fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload
            }).catch(() => {});
        }
    } catch (e) {}
}

function saveInternalWebhookUrl() {
    const input = document.getElementById('adminWebhookUrlInput');
    if (!input) return;
    let url = input.value.trim();

    // Tự động chuẩn hóa nếu người dùng chỉ dán mỗi Deployment ID
    if (url && !url.startsWith('http')) {
        url = `https://script.google.com/macros/s/${url}/exec`;
        input.value = url;
    }

    localStorage.setItem('duyphong_athanhbn_webhook_v1', url);
    showToast(url ? 'Đã lưu cấu hình Google Apps Script / Webhook thành công!' : 'Đã xóa cấu hình Webhook nội bộ.');
}

// CÔNG CỤ NỘI BỘ DÀNH RIÊNG CHO ADMIN (MỞ TỪ TAB 3 TRONG QUẢN TRỊ ADMIN)
let currentZaloQuoteObj = null;

function openZaloPreviewModal(quoteId) {
    const quoteObj = state.quotes.find(q => q.id === quoteId) || state.quotes[0];
    if (!quoteObj) return;
    currentZaloQuoteObj = quoteObj;

    const textPayload = buildQuoteTextPayload(quoteObj);
    const textarea = document.getElementById('zaloMessagePreviewText');
    if (textarea) textarea.value = textPayload;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textPayload).catch(() => {});
    }

    const modal = document.getElementById('zaloPreviewModalBackdrop');
    if (modal) modal.classList.add('open');
}

function closeZaloPreviewModal() {
    const modal = document.getElementById('zaloPreviewModalBackdrop');
    if (modal) modal.classList.remove('open');
}

// Admin tự thao tác: Copy báo giá và mở Zalo của Khách Hàng để gửi báo giá cho khách
function adminSendQuoteToCustomerZalo() {
    const textarea = document.getElementById('zaloMessagePreviewText');
    const text = textarea ? textarea.value : '';
    if (text && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
    }
    const phoneDigits = currentZaloQuoteObj
        ? (currentZaloQuoteObj.customerPhone || '').replace(/\D/g, '')
        : '0904511227';
    showToast(`Đã sao chép bảng báo giá! Đang mở Zalo của khách (${phoneDigits})...`);
    window.open(`https://zalo.me/${phoneDigits || '0904511227'}`, '_blank');
}

// Tạo Ảnh Phiếu Báo Giá (PNG) nét căng để khách gửi ảnh trực tiếp vào khung chat Zalo
function downloadQuoteImageForZalo() {
    if (!currentZaloQuoteObj) return;
    const q = currentZaloQuoteObj;

    const canvas = document.createElement('canvas');
    const rowHeight = 38;
    const width = 900;
    const height = 430 + (q.items.length * rowHeight);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Nền Luxury Black & Gold
    ctx.fillStyle = '#0B0F17';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Header phiếu
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText('THIẾT BỊ ĐIỆN CAO CẤP DUY PHONG (A THÀNH BN)', 40, 62);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '15px Arial, sans-serif';
    ctx.fillText('Đ/c: 549 Ngô Gia Tự - Ninh Xá - TP. Bắc Ninh  |  Hotline/Zalo: 0904.511.227', 40, 90);

    // Thông tin khách
    ctx.fillStyle = '#161F30';
    ctx.fillRect(40, 110, width - 80, 95);
    ctx.strokeStyle = 'rgba(212,175,55,0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 110, width - 80, 95);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 17px Arial, sans-serif';
    ctx.fillText(`PHIẾU YÊU CẦU BÁO GIÁ: ${q.code}   (${q.createdAt})`, 56, 138);
    ctx.font = '15px Arial, sans-serif';
    ctx.fillStyle = '#F3E5AB';
    ctx.fillText(`Khách hàng: ${q.customerName}   |   SĐT/Zalo: ${q.customerPhone}`, 56, 164);
    ctx.fillStyle = '#94A3B8';
    ctx.fillText(`Phân loại: ${q.customerTypeLabel}   |   Công trình: ${q.projectAddress}`, 56, 188);

    // Header bảng
    let y = 235;
    ctx.fillStyle = '#1E293B';
    ctx.fillRect(40, y - 24, width - 80, 34);
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 14px Arial, sans-serif';
    ctx.fillText('STT', 52, y);
    ctx.fillText('TÊN VẬT TƯ / THIẾT BỊ ĐIỆN', 95, y);
    ctx.fillText('THÔNG SỐ', 450, y);
    ctx.fillText('SL', 640, y);
    ctx.fillText('THÀNH TIỀN', 735, y);

    y += 22;
    ctx.font = '14px Arial, sans-serif';
    q.items.forEach((item, idx) => {
        ctx.fillStyle = idx % 2 === 0 ? '#111827' : '#161F30';
        ctx.fillRect(40, y - 16, width - 80, rowHeight - 2);

        ctx.fillStyle = '#F8FAFC';
        ctx.fillText(`${idx + 1}`, 54, y + 6);
        ctx.fillText((item.name || '').slice(0, 38), 95, y + 6);
        ctx.fillStyle = '#22D3EE';
        ctx.fillText((item.variant || '').slice(0, 22), 450, y + 6);
        ctx.fillStyle = '#F3E5AB';
        ctx.fillText(`${item.qty} ${item.unit}`, 640, y + 6);
        ctx.fillStyle = '#10B981';
        ctx.fillText(item.isCustom ? 'Báo giá sau' : formatVND(item.price * item.qty), 735, y + 6);
        y += rowHeight;
    });

    // Tổng kết
    y += 18;
    ctx.fillStyle = '#F8FAFC';
    ctx.font = 'bold 16px Arial, sans-serif';
    ctx.fillText(`Tổng niêm yết: ${formatVND(q.summary.subtotalListed)}   |   Chiết khấu dự kiến: -${formatVND(q.summary.estimatedDiscount)}`, 40, y);
    y += 30;
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.fillText(`TỔNG TẠM TÍNH SAU CHIẾT KHẤU: ${formatVND(q.summary.finalEstimated)}`, 40, y);

    const link = document.createElement('a');
    link.download = `Phieu-Bao-Gia-${q.code}-DuyPhongBN.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('Đã tải Ảnh Phiếu Báo Giá (.PNG)! Bạn có thể đính kèm ảnh này vào Zalo A Thành.');
}

// Xuất danh sách báo giá ra file CSV (Mở bằng Excel)
function exportBoqToCsv() {
    if (state.boqCart.length === 0) {
        showToast('Danh sách báo giá đang trống!', 'fa-info-circle');
        return;
    }
    let csv = '\uFEFFSTT,Ma SKU,Ten San Pham,Thuong Hieu,Thong So / Phan Loai,Don Vi,So Luong,Don Gia Tham Khao,Thanh Tien\n';
    state.boqCart.forEach((item, i) => {
        const lineTotal = (item.price || 0) * item.qty;
        csv += `${i + 1},"${item.sku}","${item.name.replace(/"/g, '""')}","${item.brand}","${item.variant}","${item.unit}",${item.qty},${item.price},${lineTotal}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Bang-Ke-Vat-Tu-Dien-Duy-Phong-BN.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống bảng kê vật tư định dạng Excel (.CSV)!');
}

/* ==========================================================================
   PHẦN QUẢN TRỊ ADMIN (CMS) - THÊM SẢN PHẨM, UPLOAD ẢNH & DUYỆT BÁO GIÁ
   ========================================================================== */

function openAdminModal(defaultTab = 'tab-add-product') {
    const modal = document.getElementById('adminModalBackdrop');
    if (modal) {
        modal.classList.add('open');
        switchAdminTab(defaultTab);
        renderAdminProductList();
        renderAdminQuotesList();
        const whInput = document.getElementById('adminWebhookUrlInput');
        if (whInput) {
            whInput.value = getInternalWebhookUrl();
        }
        const emailInput = document.getElementById('adminNotifyEmailInput');
        if (emailInput) {
            emailInput.value = getAdminNotifyEmail();
        }
        const ccInput = document.getElementById('adminNotifyCcEmailInput');
        if (ccInput) {
            ccInput.value = getAdminNotifyCcEmail();
        }
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminModalBackdrop');
    if (modal) modal.classList.remove('open');
}

function switchAdminTab(tabId) {
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.admin-tab-pane').forEach(pane => {
        pane.style.display = pane.id === tabId ? 'block' : 'none';
    });
}

function updateAdminQuoteBadge() {
    const badge = document.getElementById('adminQuoteCountBadge');
    const tabBadge = document.getElementById('adminTabQuoteBadge');
    const count = state.quotes.length;
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
    if (tabBadge) {
        tabBadge.textContent = count;
    }
}

// Xử lý Upload hình ảnh từ máy tính / điện thoại (Tự động nén ảnh qua HTML5 Canvas để lưu mượt mà)
function handleAdminImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const maxDim = 680;
            let w = img.width;
            let h = img.height;
            if (w > maxDim || h > maxDim) {
                if (w > h) {
                    h = Math.round((h * maxDim) / w);
                    w = maxDim;
                } else {
                    w = Math.round((w * maxDim) / h);
                    h = maxDim;
                }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.84);
            state.uploadedImageDataUrl = compressedDataUrl;

            const previewImg = document.getElementById('adminImagePreview');
            if (previewImg) {
                previewImg.src = compressedDataUrl;
                previewImg.style.display = 'block';
            }
            const placeholder = document.getElementById('adminImagePlaceholder');
            if (placeholder) placeholder.style.display = 'none';

            showToast('Đã tải và tối ưu hóa ảnh sản phẩm thành công!');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Xem trước khi dán link URL ảnh
function handleAdminImageUrlInput(url) {
    const clean = (url || '').trim();
    if (!clean) return;
    state.uploadedImageDataUrl = clean;
    const previewImg = document.getElementById('adminImagePreview');
    if (previewImg) {
        previewImg.src = clean;
        previewImg.style.display = 'block';
    }
    const placeholder = document.getElementById('adminImagePlaceholder');
    if (placeholder) placeholder.style.display = 'none';
}

// Lưu sản phẩm mới hoặc cập nhật sản phẩm đang sửa trong Admin
function saveAdminProduct(event) {
    event.preventDefault();

    const editId = document.getElementById('adminEditProductId').value;
    const name = document.getElementById('adminProdName').value.trim();
    const sku = document.getElementById('adminProdSku').value.trim() || ('DP-' + Math.floor(100 + Math.random() * 900));
    const category = document.getElementById('adminProdCategory').value;
    const brand = document.getElementById('adminProdBrand').value.trim() || 'Chính hãng';
    const unit = document.getElementById('adminProdUnit').value.trim() || 'Cái';
    const price = Number(document.getElementById('adminProdPrice').value) || 0;
    const discount = Number(document.getElementById('adminProdDiscount').value) || 15;
    const variantsRaw = document.getElementById('adminProdVariants').value.trim();
    const desc = document.getElementById('adminProdDesc').value.trim();

    if (!name) {
        showToast('Vui lòng nhập Tên sản phẩm!', 'fa-exclamation-circle');
        return;
    }

    const variants = variantsRaw
        ? variantsRaw.split(',').map(s => s.trim()).filter(Boolean)
        : ['Tiêu chuẩn chính hãng'];

    const imageToUse = state.uploadedImageDataUrl || createProductSvgDataUri(name.slice(0, 24), brand, sku);

    if (editId) {
        // Cập nhật sản phẩm đã có
        const idx = state.products.findIndex(p => p.id === editId);
        if (idx !== -1) {
            state.products[idx] = {
                ...state.products[idx],
                name,
                sku,
                category,
                brand,
                unit,
                price,
                discount,
                variants,
                desc,
                image: state.uploadedImageDataUrl ? state.uploadedImageDataUrl : state.products[idx].image
            };
            showToast(`Đã cập nhật sản phẩm "${name}" thành công!`);
        }
    } else {
        // Thêm mới lên đầu danh sách
        const newProduct = {
            id: 'dp-' + Date.now(),
            sku,
            name,
            category,
            brand,
            price,
            unit,
            discount,
            variants,
            desc: desc || 'Sản phẩm phân phối chính hãng tại Thiết Bị Điện Cao Cấp Duy Phong - 549 Ngô Gia Tự, Bắc Ninh.',
            image: imageToUse
        };
        state.products.unshift(newProduct);
        showToast(`Đã đăng sản phẩm mới "${name}" lên Website!`);
    }

    saveProducts();
    resetAdminProductForm();
    renderCatalog();
    renderAdminProductList();
}

function resetAdminProductForm() {
    const form = document.getElementById('adminProductForm');
    if (form) form.reset();
    document.getElementById('adminEditProductId').value = '';
    document.getElementById('adminFormSubmitBtn').innerHTML = '<i class="fas fa-plus-circle"></i> Đăng Sản Phẩm Lên Website';
    state.uploadedImageDataUrl = '';
    const previewImg = document.getElementById('adminImagePreview');
    if (previewImg) {
        previewImg.src = '';
        previewImg.style.display = 'none';
    }
    const placeholder = document.getElementById('adminImagePlaceholder');
    if (placeholder) placeholder.style.display = 'block';
}

// Chỉnh sửa 1 sản phẩm
function editAdminProduct(productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) return;

    document.getElementById('adminEditProductId').value = p.id;
    document.getElementById('adminProdName').value = p.name;
    document.getElementById('adminProdSku').value = p.sku;
    document.getElementById('adminProdCategory').value = p.category;
    document.getElementById('adminProdBrand').value = p.brand;
    document.getElementById('adminProdUnit').value = p.unit;
    document.getElementById('adminProdPrice').value = p.price;
    document.getElementById('adminProdDiscount').value = p.discount || 15;
    document.getElementById('adminProdVariants').value = (p.variants || []).join(', ');
    document.getElementById('adminProdDesc').value = p.desc || '';

    state.uploadedImageDataUrl = p.image;
    const previewImg = document.getElementById('adminImagePreview');
    if (previewImg) {
        previewImg.src = p.image;
        previewImg.style.display = 'block';
    }
    const placeholder = document.getElementById('adminImagePlaceholder');
    if (placeholder) placeholder.style.display = 'none';

    document.getElementById('adminFormSubmitBtn').innerHTML = '<i class="fas fa-save"></i> Lưu Cập Nhật Sản Phẩm';
    switchAdminTab('tab-add-product');
}

// Xóa sản phẩm trong Admin
function deleteAdminProduct(productId) {
    const p = state.products.find(item => item.id === productId);
    if (!p) return;
    state.products = state.products.filter(item => item.id !== productId);
    saveProducts();
    renderCatalog();
    renderAdminProductList();
    showToast(`Đã xóa sản phẩm "${p.name}" khỏi danh mục.`);
}

// Khôi phục danh mục gốc
function restoreDefaultCatalog() {
    state.products = [...INITIAL_PRODUCTS];
    saveProducts();
    renderCatalog();
    renderAdminProductList();
    showToast('Đã khôi phục 14 sản phẩm chuẩn của Cửa hàng Duy Phong!');
}

// Render danh sách sản phẩm trong Admin
function renderAdminProductList() {
    const tbody = document.getElementById('adminProductTableBody');
    if (!tbody) return;

    tbody.innerHTML = state.products.map((p, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${p.image}" class="table-thumb" alt="${p.name}"/>
                    <div>
                        <div style="font-weight:700; color:var(--text-primary);">${p.name}</div>
                        <div style="font-size:0.76rem; color:var(--accent-cyan);">Mã: ${p.sku} • ${(p.variants || []).length} phân loại</div>
                    </div>
                </div>
            </td>
            <td><span class="topbar-badge">${p.brand}</span></td>
            <td><strong style="color:var(--primary-light);">${formatVND(p.price)}</strong> / ${p.unit}</td>
            <td><span style="color:var(--accent-green); font-weight:700;">-${p.discount || 15}%</span></td>
            <td>
                <div style="display:flex; gap:6px;">
                    <button type="button" class="btn btn-outline-gold" style="padding:6px 10px; font-size:0.8rem;" onclick="editAdminProduct('${p.id}')">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button type="button" class="btn btn-danger" style="padding:6px 10px; font-size:0.8rem;" onclick="deleteAdminProduct('${p.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render danh sách Yêu cầu báo giá của khách gửi về trong Admin
function renderAdminQuotesList() {
    const container = document.getElementById('adminQuotesContainer');
    if (!container) return;

    if (state.quotes.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding:40px 20px; background:var(--bg-input); border-radius:12px; border:1px dashed var(--border-gold);">
                <i class="fas fa-inbox" style="font-size:2.5rem; color:var(--primary); margin-bottom:10px;"></i>
                <h4>Chưa có yêu cầu báo giá nào từ khách hàng</h4>
                <p style="color:var(--text-secondary); font-size:0.88rem; margin-top:4px;">Khi khách hàng hoặc thợ điện chọn sản phẩm và bấm "Gửi Yêu Cầu Báo Giá", phiếu báo giá sẽ hiển thị chi tiết tại đây.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = state.quotes.map(q => `
        <div style="background:var(--bg-input); border:1px solid var(--border-gold); border-radius:12px; padding:18px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; border-bottom:1px solid var(--border-subtle); padding-bottom:12px; margin-bottom:12px;">
                <div>
                    <span class="topbar-badge" style="margin-right:8px;">${q.code}</span>
                    <strong style="font-size:1.05rem; color:var(--primary-light);">${q.customerName}</strong>
                    <span style="color:var(--accent-cyan); font-weight:700; margin-left:8px;"><i class="fas fa-phone-alt"></i> ${q.customerPhone}</span>
                    <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:4px;">
                        <i class="fas fa-user-tag"></i> ${q.customerTypeLabel} &nbsp;|&nbsp;
                        <i class="fas fa-map-marker-alt"></i> ${q.projectAddress} &nbsp;|&nbsp;
                        <i class="far fa-clock"></i> ${q.createdAt}
                    </div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                    <select class="filter-select" onchange="updateQuoteStatus('${q.id}', this.value)">
                        <option value="Mới nhận - Chờ báo giá" ${q.status === 'Mới nhận - Chờ báo giá' ? 'selected' : ''}>🟡 Mới nhận - Chờ báo giá</option>
                        <option value="Đã gửi báo giá Zalo" ${q.status === 'Đã gửi báo giá Zalo' ? 'selected' : ''}>🔵 Đã gửi báo giá Zalo</option>
                        <option value="Đã chốt đơn & Giao hàng" ${q.status === 'Đã chốt đơn & Giao hàng' ? 'selected' : ''}>🟢 Đã chốt đơn & Giao hàng</option>
                    </select>
                    <button class="btn btn-danger" style="padding:7px 11px;" onclick="deleteQuoteRecord('${q.id}')" title="Xóa phiếu này">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${q.notes ? `<div style="font-size:0.84rem; color:var(--primary-light); margin-bottom:10px; background:rgba(212,175,55,0.08); padding:8px 12px; border-radius:6px;"><i class="fas fa-comment-alt"></i> <strong>Ghi chú của khách:</strong> ${q.notes}</div>` : ''}
            <div style="overflow-x:auto;">
                <table class="quick-table" style="min-width:600px;">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Phân loại / Thông số</th>
                            <th>Số lượng</th>
                            <th>Đơn giá</th>
                            <th>Tạm tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${q.items.map((item, idx) => `
                            <tr>
                                <td>${idx + 1}</td>
                                <td><strong>${item.name}</strong> <span style="font-size:0.75rem; color:var(--text-secondary);">(${item.sku})</span></td>
                                <td>${item.variant}</td>
                                <td><strong style="color:var(--accent-cyan);">${item.qty} ${item.unit}</strong></td>
                                <td>${item.isCustom ? 'Báo giá riêng' : formatVND(item.price)}</td>
                                <td><strong>${item.isCustom ? '-' : formatVND(item.price * item.qty)}</strong></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:12px; padding-top:10px; border-top:1px dashed var(--border-subtle);">
                <div style="font-size:0.9rem;">
                    Niêm yết: <strong>${formatVND(q.summary.subtotalListed)}</strong> &nbsp;→&nbsp;
                    Sau CK dự kiến: <strong style="color:var(--accent-green); font-size:1.05rem;">${formatVND(q.summary.finalEstimated)}</strong>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button type="button" class="btn btn-gold" style="padding:7px 14px; font-size:0.82rem;" onclick="openZaloPreviewModal('${q.id}')">
                        <i class="fas fa-bolt"></i> Xử Lý Nội Bộ & Xuất Ảnh Báo Giá
                    </button>
                    <button type="button" class="btn btn-cyan" style="padding:7px 12px; font-size:0.82rem;" onclick="resendQuoteEmail('${q.id}')">
                        <i class="fas fa-envelope"></i> Gửi Lại Về Email
                    </button>
                    <button type="button" class="btn btn-outline-gold" style="padding:7px 12px; font-size:0.82rem;" onclick="exportSingleQuoteInternalCsv('${q.id}')">
                        <i class="fas fa-file-csv"></i> Tải File Đơn Này (.CSV)
                    </button>
                    <a href="https://zalo.me/${q.customerPhone.replace(/\D/g, '')}" target="_blank" class="btn btn-green" style="padding:7px 14px; font-size:0.82rem;">
                        <i class="fas fa-comment-dots"></i> Nhắn Zalo Báo Giá Cho Khách
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Xuất 1 đơn báo giá của khách ra file CSV nội bộ (mở bằng Excel)
function exportSingleQuoteInternalCsv(quoteId) {
    const q = state.quotes.find(item => item.id === quoteId);
    if (!q) return;
    let csv = `\uFEFFPHIEU YEU CAU BAO GIA NOI BO - DUY PHONG BN\n`;
    csv += `Ma Phieu,"${q.code}",Ngay Gui,"${q.createdAt}"\n`;
    csv += `Khach Hang,"${q.customerName}",SDT Zalo,"${q.customerPhone}"\n`;
    csv += `Phan Loai,"${q.customerTypeLabel}",Cong Trinh,"${q.projectAddress}"\n`;
    csv += `Ghi Chu,"${(q.notes || '').replace(/"/g, '""')}"\n\n`;
    csv += `STT,Ma SKU,Ten San Pham,Thuong Hieu,Thong So Phan Loai,Don Vi,So Luong,Don Gia Niem Yet,Thanh Tien\n`;
    q.items.forEach((item, i) => {
        const lineTotal = (item.price || 0) * item.qty;
        csv += `${i + 1},"${item.sku}","${item.name.replace(/"/g, '""')}","${item.brand}","${item.variant}","${item.unit}",${item.qty},${item.price},${lineTotal}\n`;
    });
    csv += `\n,,,,,,Tong Niem Yet,,${q.summary.subtotalListed}\n`;
    csv += `,,,,,,Chiet Khau Du Kien,,-${Math.round(q.summary.estimatedDiscount)}\n`;
    csv += `,,,,,,TONG SAU CHIET KHAU,,${Math.round(q.summary.finalEstimated)}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Don-Noi-Bo-${q.code}-${q.customerPhone}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Đã xuất file nội bộ đơn ${q.code} (.CSV)!`);
}

// Xuất toàn bộ các đơn khách đã gửi ra 1 file Excel CSV tổng hợp nội bộ
function exportAllQuotesInternalCsv() {
    if (state.quotes.length === 0) {
        showToast('Chưa có đơn yêu cầu báo giá nào để xuất!', 'fa-info-circle');
        return;
    }
    let csv = '\uFEFFMa Phieu,Thoi Gian,Ten Khach Hang,SDT Zalo,Phan Loai Khach,Dia Chi Cong Trinh,Ghi Chu,Trang Thai,Ten San Pham,Thong So,So Luong,Don Vi,Don Gia,Thanh Tien\n';
    state.quotes.forEach(q => {
        q.items.forEach(item => {
            csv += `"${q.code}","${q.createdAt}","${q.customerName.replace(/"/g, '""')}","${q.customerPhone}","${q.customerTypeLabel}","${q.projectAddress.replace(/"/g, '""')}","${(q.notes || '').replace(/"/g, '""')}","${q.status}","${item.name.replace(/"/g, '""')}","${item.variant}",${item.qty},"${item.unit}",${item.price},${(item.price || 0) * item.qty}\n`;
        });
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Danh-Sach-Tong-Hop-Bao-Gia-Noi-Bo-DuyPhongBN.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất toàn bộ đơn hàng ra file Excel Nội bộ (.CSV)!');
}

// Xuất toàn bộ các đơn ra file dữ liệu JSON nội bộ
function exportAllQuotesInternalJson() {
    if (state.quotes.length === 0) {
        showToast('Chưa có đơn yêu cầu báo giá nào để xuất!', 'fa-info-circle');
        return;
    }
    const blob = new Blob([JSON.stringify(state.quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Du-Lieu-Bao-Gia-Noi-Bo-DuyPhongBN.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải file dữ liệu báo giá nội bộ (.JSON)!');
}

function updateQuoteStatus(quoteId, newStatus) {
    const q = state.quotes.find(item => item.id === quoteId);
    if (q) {
        q.status = newStatus;
        saveQuotes();
        showToast(`Đã cập nhật trạng thái phiếu ${q.code}: "${newStatus}"`);
    }
}

function deleteQuoteRecord(quoteId) {
    state.quotes = state.quotes.filter(item => item.id !== quoteId);
    saveQuotes();
    renderAdminQuotesList();
    showToast('Đã xóa phiếu yêu cầu báo giá.');
}

// Xuất dữ liệu sản phẩm ra JSON để backup
function exportProductsJson() {
    const dataStr = JSON.stringify(state.products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'duyphong-products-backup.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống file sao lưu danh mục sản phẩm (.JSON)!');
}

// Bộ lọc danh mục & chế độ hiển thị
function setCategoryFilter(cat, btnEl) {
    state.activeCategory = cat;
    state.currentPage = 1;
    document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderCatalog();
}

function setViewMode(mode) {
    state.viewMode = mode;
    const btnGrid = document.getElementById('viewModeGridBtn') || document.getElementById('viewBtnGrid');
    const btnTable = document.getElementById('viewModeTableBtn') || document.getElementById('viewBtnTable');
    if (btnGrid) btnGrid.classList.toggle('active', mode === 'grid');
    if (btnTable) btnTable.classList.toggle('active', mode === 'table');
    renderCatalog();
}

function resetCatalogFilters() {
    state.activeCategory = 'all';
    state.activeBrand = 'all';
    state.searchQuery = '';
    state.currentPage = 1;
    const searchInput = document.getElementById('globalSearchInput');
    if (searchInput) searchInput.value = '';
    const brandSelect = document.getElementById('brandFilterSelect');
    if (brandSelect) brandSelect.value = 'all';
    document.querySelectorAll('.cat-tab').forEach((b, i) => b.classList.toggle('active', i === 0));
    renderCatalog();
}

// Ghi nhận nhật ký người truy cập website (Traffic Tracker)
function trackVisitorTraffic() {
    try {
        const TRAFFIC_KEY = 'duyphong_traffic_logs_v1';
        let logs = [];
        try {
            logs = JSON.parse(localStorage.getItem(TRAFFIC_KEY) || '[]');
        } catch (e) { logs = []; }

        const now = new Date();
        const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' ' + now.toLocaleDateString('vi-VN');
        const ua = navigator.userAgent || '';
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
        const deviceType = isMobile ? 'Mobile' : 'Desktop';

        let os = 'Windows';
        if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
        else if (/Android/i.test(ua)) os = 'Android';
        else if (/Macintosh/i.test(ua)) os = 'macOS';
        else if (/Linux/i.test(ua)) os = 'Linux';

        let browser = 'Chrome';
        if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
        else if (/Firefox/i.test(ua)) browser = 'Firefox';
        else if (/Edg/i.test(ua)) browser = 'Edge';

        const record = {
            id: 'trf-' + Date.now(),
            time: timeStr,
            timestamp: timeStr,
            deviceType: deviceType,
            os: os,
            browser: browser,
            page: 'Trang Chủ Báo Giá Vật Tư',
            referrer: document.referrer ? (new URL(document.referrer)).hostname : 'Trực tiếp (Direct)'
        };

        logs.push(record);
        // Giới hạn 200 bản ghi mới nhất
        if (logs.length > 200) logs = logs.slice(-200);
        localStorage.setItem(TRAFFIC_KEY, JSON.stringify(logs));
    } catch (err) {
        // Lặng lẽ bỏ qua nếu có lỗi
    }
}

// Render các bài viết cẩm nang kỹ thuật điện ngoài trang chủ
function renderHomeArticles() {
    const container = document.getElementById('articlesGrid') || document.getElementById('homeArticlesContainer');
    if (!container) return;

    const ARTICLES_KEY = 'duyphong_articles_v1';
    const DEFAULT_ARTICLES = [
        {
            id: 'art-01',
            title: 'Kinh nghiệm tính tiết diện dây điện cho nhà phố 3 tầng tại Bắc Ninh',
            category: 'Kinh Nghiệm Xây Nhà',
            author: 'A Thành BN',
            createdAt: '07/11/2026',
            summary: 'Hướng dẫn chủ nhà chọn đúng dây trục tổng 6.0mm²-10.0mm², dây ổ cắm 2.5mm² và dây chiếu sáng 1.5mm² chống quá tải và chập cháy.',
            image: 'assets/images/kho-day-cap-thiet-bi.jpg'
        },
        {
            id: 'art-02',
            title: 'So sánh độ bền dòng công tắc Bretina, Vanni và Panasonic',
            category: 'Góc Thợ Điện BN',
            author: 'A Thành BN',
            createdAt: '05/11/2026',
            summary: 'Đánh giá thực tế về tiếp điểm hợp kim đồng, độ đàn hồi của lá đồng và khả năng chịu tải của các dòng công tắc cao cấp trưng bày tại Showroom Duy Phong.',
            image: 'assets/images/cua-hang-mat-tien.jpg'
        }
    ];

    let articles = [];
    try {
        const saved = localStorage.getItem(ARTICLES_KEY);
        articles = saved ? JSON.parse(saved) : DEFAULT_ARTICLES;
    } catch (e) {
        articles = DEFAULT_ARTICLES;
    }

    if (articles.length === 0) articles = DEFAULT_ARTICLES;

    container.innerHTML = articles.map(art => `
        <div class="product-card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
                <div style="position:relative; height:180px; overflow:hidden; border-radius:8px; margin-bottom:12px; background:#0B0F17;">
                    <img src="${art.image}" alt="${art.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    <span class="product-badge-discount" style="top:10px; left:10px; right:auto;">${art.category}</span>
                </div>
                <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:6px;">
                    <i class="far fa-calendar-alt"></i> ${art.createdAt || 'Mới cập nhật'} • <i class="fas fa-user-edit"></i> ${art.author || 'A Thành BN'}
                </div>
                <h4 style="font-size:1.05rem; color:var(--primary-light); line-height:1.4; margin-bottom:8px;">${art.title}</h4>
                <p style="font-size:0.86rem; color:var(--text-secondary); line-height:1.5;">${art.summary || (art.content ? art.content.slice(0, 120) + '...' : '')}</p>
            </div>
            <div style="margin-top:14px; padding-top:10px; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:0.8rem; color:var(--accent-cyan);"><i class="fas fa-store"></i> Kho 549 Ngô Gia Tự</span>
                <a href="https://zalo.me/0904511227" target="_blank" class="btn btn-outline-gold" style="padding:6px 12px; font-size:0.8rem;">
                    <i class="fab fa-whatsapp"></i> Hỏi A Thành
                </a>
            </div>
        </div>
    `).join('');
}

// Hàm khởi động toàn bộ ứng dụng
function initApplication() {
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
            state.currentPage = 1;
            renderCatalog();
        });
    }

    // Lắng nghe lọc thương hiệu
    const brandSelect = document.getElementById('brandFilterSelect');
    if (brandSelect) {
        brandSelect.addEventListener('change', (e) => {
            state.activeBrand = e.target.value;
            state.currentPage = 1;
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
}

// Khởi chạy khi DOM sẵn sàng (hỗ trợ cả trường hợp script load sau khi DOM đã ready)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApplication);
} else {
    initApplication();
}