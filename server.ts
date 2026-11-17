import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PrismaClient } from '@prisma/client'; // 1. Import Prisma Client

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Khởi tạo Prisma Client để kết nối Database
const prisma = new PrismaClient();

// Initialize GoogleGenAI server-side client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// SYSTEM INSTRUCTION FOR TRAVELANYTIME AI ADVISOR
const SYSTEM_INSTRUCTION = `Bạn là Trợ Lý Chăm Sóc Khách Hàng AI cao cấp và thân thiện của nền tảng du lịch "TravelAnytime" (Việt Nam).
Nhiệm vụ của bạn:
1. Tư vấn các tour du lịch trong nước & quốc tế, đặc biệt là các tour hè (biển đảo Phú Quốc, Nha Trang, Quy Nhơn, Bali) và tour Tết (Miền Tây sông nước, Tràng An - Tam Chúc, Sa Pa Fansipan, Đài Loan, Thái Lan).
2. Tư vấn các gói Combo du lịch tự do (Vé máy bay khứ hồi + Khách sạn 4-5 sao + Buffet sáng + Xe đón tiễn) tiết kiệm đến 35%.
3. Giới thiệu các khách sạn & resort 4-5 sao (Vinpearl Luxury Đà Nẵng, Mövenpick Phú Quốc, Amiana Nha Trang, Hotel de la Coupole Sa Pa, FLC Quy Nhơn...).
4. Cung cấp mã giảm giá hôm nay:
  - "VOUCHER500K": Giảm ngay 500.000₫ cho tất cả các tour.
  - "HE2025": Giảm 500.000₫ cho chùm tour hè biển đảo.
  - "NHOM3T": Giảm 3.000.000₫ khi đăng ký nhóm từ 4 người.
  - "TET2027": Giảm 800.000₫ cho tour Tết Nguyên Đán.
5. Thông tin hotline tư vấn: 0911 708 015 hoặc 0909 885 681.
6. Địa chỉ trụ sở: Số 51, đường Lý Tự Trọng, khối 12, P. Hà Huy Tập, TP. Vinh, Nghệ An. Email: tramanh150618@gmail.com.
7. Phong cách trả lời: Ân cần, lễ phép ("Dạ", "quý khách", "em"), bố cục rõ ràng, súc tích, có icon sinh động, luôn mời khách gọi hotline hoặc nhấn Đặt ngay để nhận ưu đãi.`;

// API endpoint for AI customer service chat
app.post('/api/chat', async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, conversationHistory } = req.body;
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Build contents for Gemini
    const contents: any[] = [];
    if (Array.isArray(conversationHistory)) {
      conversationHistory.slice(-4).forEach((item: any) => {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'TravelAnytime luôn sẵn sàng đồng hành cùng quý khách!';
    res.json({ reply });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    // Return graceful fallback message
    res.status(200).json({
      reply: 'Dạ em chào quý khách! TravelAnytime có đa dạng các tour hè, tour Tết, combo vé máy bay + khách sạn 4-5 sao với ưu đãi giảm tới 3 triệu đồng. Quý khách vui lòng liên hệ hotline 0911 708 015 hoặc để lại lời nhắn để em hỗ trợ đặt chỗ ngay nhé ạ!',
      suggestions: ['Tour hè biển đảo', 'Tour du lịch Tết', 'Combo vé + khách sạn', 'Hotline 0911708015'],
    });
  }
});

// ==========================================
// 2. THÊM API ENDPOINT LẤY DỮ LIỆU TỪ DATABASE
// ==========================================
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Không thể lấy dữ liệu người dùng từ database' });
  }
});
// API nhận thông tin đặt tour từ người dùng
app.post('/api/bookings', async (req: Request, res: Response) => {
  try {
    const { fullName, phone, tourName } = req.body;
    
    // Lưu vào database SQLite thông qua Prisma
    const newBooking = await prisma.booking.create({
      data: {
        fullName,
        phone,
        tourName: tourName || 'Tour du lịch TravelAnytime',
      },
    });

    res.json({ success: true, message: 'Đặt tour thành công!', booking: newBooking });
  } catch (error) {
    console.error('Lỗi khi lưu booking:', error);
    res.status(500).json({ error: 'Không thể lưu thông tin đặt tour' });
  }
});
// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();