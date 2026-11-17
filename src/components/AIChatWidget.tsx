import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Phone, MessageSquare } from 'lucide-react';
import { ChatMessage, Tour } from '../types/travel';

interface AIChatWidgetProps {
  onSelectTourById?: (tourId: string) => void;
  onOpenBooking?: (tour: Tour) => void;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: 'Xin chào quý khách! Em là Trợ lý AI Chăm sóc Khách hàng của TravelAnytime. Em có thể tư vấn tour hè, tour Tết, đặt phòng khách sạn và combo du lịch tiết kiệm. Quý khách đang quan tâm đến hành trình nào ạ?',
      timestamp: 'Vừa xong',
      suggestions: [
        'Gợi ý tour hè giá rẻ',
        'Tour du lịch Tết hot nhất',
        'Combo vé máy bay + khách sạn',
        'Khách sạn 5 sao Đà Nẵng',
        'Mã giảm giá hôm nay',
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const getOfflineSmartResponse = (userText: string): { text: string; suggestions?: string[] } => {
    const textLower = userText.toLowerCase();

    if (textLower.includes('hè') || textLower.includes('biển') || textLower.includes('đảo')) {
      return {
        text: `Mùa hè này TravelAnytime đang có các chùm tour biển đảo với ưu đãi giảm tới 500.000₫:\n\n1. Tour Phú Quốc 3N2Đ: Cano 4 đảo lặn san hô — Giá từ 12.000.000₫\n2. Tour Nha Trang 4N3Đ: Hòn Tằm tắm bùn khoáng — Giá từ 6.990.000₫\n3. Tour Quy Nhơn - Phú Yên 4N3Đ: Kỳ Co - Eo Gió — Giá từ 7.590.000₫\n4. Tour Quốc tế Bali 4N3Đ: Cổng Trời Lempuyang — Giá từ 13.900.000₫\n\nQuý khách muốn em gửi chi tiết lịch trình của tour nào ạ?`,
        suggestions: ['Chi tiết tour Phú Quốc', 'Chi tiết tour Nha Trang', 'Xem tour Bali', 'Tư vấn hotline'],
      };
    }

    if (textLower.includes('tết') || textLower.includes('xuân') || textLower.includes('đầu năm')) {
      return {
        text: `Chùm tour du lịch Tết Nguyên Đán tại TravelAnytime đang mở bán với nhiều hành trình du xuân đón lộc:\n\n1. Tour Tết Miền Tây Sông Nước 4N3Đ: Viếng Miếu Bà Chúa Xứ, rừng tràm Trà Sư — 5.800.000₫\n2. Tour Tết Tâm Linh Tràng An - Bái Đính - Tam Chúc - Yên Tử 4N3Đ — 6.890.000₫\n3. Tour Sa Pa - Fansipan 3N2Đ Săn Mây — 4.990.000₫\n4. Tour Tết Đài Loan 5N4Đ Thả Đèn Trời Thập Phần — 17.900.000₫\n5. Tour Tết Thái Lan 5N4Đ Buffet Du Thuyền 5 Sao — 8.290.000₫\n\nĐặt sớm hôm nay tặng ngay voucher TET2027 giảm 800.000₫.`,
        suggestions: ['Tour Tết Miền Tây', 'Tour Tết Tràng An Tam Chúc', 'Tour Tết Đài Loan', 'Mã voucher Tết'],
      };
    }

    if (textLower.includes('khách sạn') || textLower.includes('resort') || textLower.includes('phòng')) {
      return {
        text: `TravelAnytime hợp tác trực tiếp với các chuỗi khách sạn & resort 4–5 sao hàng đầu:\n\n• Vinpearl Luxury Đà Nẵng 5 Sao: Bãi biển riêng, từ 2.850.000₫/đêm\n• Mövenpick Resort Waverly Phú Quốc 5 Sao: Tặng giờ chocolate, từ 2.450.000₫/đêm\n• Amiana Resort Nha Trang 5 Sao: Hồ bơi nước biển 2.500m², từ 3.100.000₫/đêm\n• Hotel de la Coupole Sa Pa 5 Sao: Từ 3.650.000₫/đêm\n\nQuý khách có thể vào mục "Khách sạn" trên thanh menu để xem thêm các hạng phòng.`,
        suggestions: ['Xem khách sạn Đà Nẵng', 'Xem resort Phú Quốc', 'Đặt phòng ngay', 'Combo kèm vé máy bay'],
      };
    }

    if (textLower.includes('combo') || textLower.includes('vé máy bay')) {
      return {
        text: `Gói Combo Du Lịch Tự Do (Vé máy bay khứ hồi + Khách sạn 4–5 sao + Buffet sáng):\n\n1. Combo Đà Nẵng 3N2Đ — 3.490.000₫/người (Tiết kiệm 28%)\n2. Combo Phú Quốc 3N2Đ (Resort 5 sao Mövenpick) — 4.290.000₫/người\n3. Combo Nha Trang 3N2Đ (Vinpearl 5 sao) — 3.890.000₫/người\n4. Combo Sa Pa 2N1Đ (Limousine VIP + MGallery 5 sao) — 2.890.000₫/người\n\nMời quý khách vào mục "Thông tin Combo" để đặt giữ chỗ ạ.`,
        suggestions: ['Combo Đà Nẵng 3N2Đ', 'Combo Phú Quốc 3N2Đ', 'Combo Sa Pa 2N1Đ', 'Tư vấn đặt chỗ'],
      };
    }

    if (textLower.includes('mã') || textLower.includes('voucher') || textLower.includes('khuyến mãi') || textLower.includes('giảm giá')) {
      return {
        text: `Các mã giảm giá đang có hiệu lực hôm nay:\n\n• VOUCHER500K: Giảm ngay 500.000₫ cho tất cả các tour\n• HE2025: Giảm 500.000₫ cho các tour hè biển đảo\n• NHOM3T: Giảm trực tiếp 3.000.000₫ khi đăng ký nhóm từ 4 người\n• TET2027: Giảm 800.000₫ cho các tour khởi hành dịp Tết\n\nQuý khách nhập mã tại bước thanh toán trong Form Đặt Tour.`,
        suggestions: ['Gợi ý tour hè', 'Gợi ý tour tết', 'Combo vé máy bay + khách sạn'],
      };
    }

    if (textLower.includes('hủy') || textLower.includes('đổi') || textLower.includes('hoàn tiền') || textLower.includes('chính sách')) {
      return {
        text: `Chính sách hỗ trợ khách hàng của TravelAnytime:\n\n• Đổi ngày khởi hành: Miễn phí trước 14 ngày (tour trong nước) hoặc 21 ngày (tour quốc tế).\n• Bảo hiểm trọn gói: Mức 100.000.000₫ (nội địa) và 1.000.000.000₫ (quốc tế).\n• Hủy tour bất khả kháng: Hoàn tiền 100%.\n• Hotline hỗ trợ 24/7: 0911 708 015 hoặc 0909 885 681.`,
        suggestions: ['Tư vấn tour trong nước', 'Tư vấn tour quốc tế', 'Mã giảm giá hôm nay'],
      };
    }

    return {
      text: `Em đã ghi nhận thông tin của quý khách. TravelAnytime có đầy đủ các tour nội địa (Hà Giang, Đà Nẵng, Phú Quốc, Sa Pa, Quy Nhơn, Huế, Đà Lạt...) và tour quốc tế (Thái Lan, Hàn Quốc, Nhật Bản, Thụy Sỹ, Úc, Canada...).\n\nQuý khách dự kiến đi mấy người và khởi hành khoảng thời gian nào để em gợi ý hành trình phù hợp nhất ạ?`,
      suggestions: ['Tour hè biển đảo', 'Tour du lịch Tết', 'Combo vé + khách sạn', 'Mã giảm giá hôm nay'],
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          conversationHistory: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: ChatMessage = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          text: data.reply || 'TravelAnytime luôn sẵn sàng tư vấn cho quý khách!',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          suggestions: data.suggestions || ['Tour hè giá rẻ', 'Tour tết hot', 'Combo khách sạn'],
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, aiMsg]);
        return;
      }
    } catch {
      // Smooth offline fallback
    }

    setTimeout(() => {
      const fallback = getOfflineSmartResponse(query);
      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: fallback.text,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        suggestions: fallback.suggestions,
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <>
      {/* Quiet Floating Trigger Button — solid --ink, 6px radius, zero gradient/pulse */}
      {!isOpen && (
        <div className="fixed bottom-5 left-5 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[var(--ink)] hover:bg-[var(--accent)] text-[var(--bg)] font-medium text-xs sm:text-sm px-4 py-2.5 rounded-[6px] border border-[var(--line)]/40 transition-colors cursor-pointer"
            aria-label="Mở hộp thoại tư vấn CSKH AI"
          >
            <MessageSquare className="w-4 h-4 stroke-[1.5]" />
            <span className="hidden sm:inline">Nhắn tin CSKH AI</span>
            <span className="sm:hidden">Chat AI</span>
            <span className="font-mono-code text-[10px] text-[var(--bg)]/80 border-l border-[var(--bg)]/25 pl-2">
              24/7
            </span>
          </button>
        </div>
      )}

      {/* Chat Drawer — flat warm sand & deep navy */}
      {isOpen && (
        <div className="fixed bottom-4 left-4 z-50 w-[94vw] sm:w-[400px] max-h-[85vh] h-[560px] bg-[var(--bg)] rounded-[6px] border border-[var(--ink)] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[var(--ink)] text-[var(--bg)] p-4 flex items-center justify-between border-b border-[var(--line)]/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] border border-[var(--bg)]/25 flex items-center justify-center">
                <Bot className="w-4 h-4 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-display text-base font-medium leading-tight">
                  Trợ lý CSKH TravelAnytime
                </h3>
                <div className="font-mono-code text-[10px] text-[var(--bg)]/75 mt-0.5">
                  Trả lời tự động 24/7
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="tel:0911708015"
                title="Gọi hotline"
                className="text-[var(--bg)]/80 hover:text-[var(--bg)] p-1.5 rounded-[4px] transition-colors"
              >
                <Phone className="w-4 h-4 stroke-[1.5]" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Đóng hộp chat"
                className="text-[var(--bg)]/80 hover:text-[var(--bg)] p-1.5 rounded-[4px] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-[var(--bg-alt)] border-b border-[var(--line)] px-4 py-2 text-[11px] text-[var(--text-muted)] flex items-center justify-between">
            <span>Hỏi đáp tour hè, tour Tết, khách sạn, voucher</span>
            <a href="tel:0911708015" className="font-mono-code font-medium text-[var(--ink)] underline">
              0911 708 015
            </a>
          </div>

          {/* Message List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[var(--bg)] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-[6px] bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                )}

                <div className="max-w-[84%] space-y-1.5">
                  <div
                    className={`p-3 rounded-[6px] leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-[var(--ink)] text-[var(--bg)]'
                        : 'bg-[var(--bg-alt)] text-[var(--text)] border border-[var(--line)]'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestions.map((sug, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(sug)}
                          className="bg-[var(--bg)] hover:bg-[var(--ink)] text-[var(--ink)] hover:text-[var(--bg)] border border-[var(--line)] text-[11px] font-medium px-2.5 py-1 rounded-[4px] transition-colors cursor-pointer"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`block font-mono-code text-[10px] text-[var(--text-muted)] ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-[6px] border border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 stroke-[1.5]" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-[var(--text-muted)] text-xs">
                <div className="w-7 h-7 rounded-[6px] bg-[var(--ink)] text-[var(--bg)] flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 stroke-[1.5]" />
                </div>
                <div className="bg-[var(--bg-alt)] px-3 py-2.5 rounded-[6px] border border-[var(--line)] text-[11px]">
                  AI đang soạn tin trả lời...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[var(--bg-alt)] border-t border-[var(--line)] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Nhập câu hỏi của quý khách..."
              className="flex-1 px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--ink)]"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              aria-label="Gửi tin nhắn"
              className="bg-[var(--accent)] hover:bg-[#be4921] disabled:opacity-40 text-[var(--bg)] p-2 rounded-[6px] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 stroke-[1.5]" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
