import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ContactViewProps {
  onBack: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Tư vấn tour trong nước',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Quy trình đặt cọc và thanh toán tour như thế nào?',
      a: 'Quý khách chỉ cần đặt cọc trước 30% - 50% tổng giá trị tour khi đăng ký giữ chỗ. Số tiền còn lại sẽ được thanh toán trước ngày khởi hành 03 - 05 ngày (đối với tour trong nước) hoặc 07 - 10 ngày (đối với tour quốc tế).',
    },
    {
      q: 'Nếu có việc bận đột xuất tôi có thể đổi ngày đi hoặc hoàn tiền không?',
      a: 'TravelAnytime hỗ trợ đổi ngày miễn phí nếu thông báo trước 14 ngày đối với tour nội địa và 21 ngày đối với tour quốc tế. Trường hợp hủy tour bất khả kháng do thiên tai hoặc dịch bệnh, công ty sẽ hoàn 100% chi phí.',
    },
    {
      q: 'Giá tour đã bao gồm vé máy bay và bảo hiểm chưa?',
      a: 'Tất cả các tour trọn gói của TravelAnytime đều đã bao gồm vé máy bay khứ hồi (kèm hành lý), khách sạn theo tiêu chuẩn, ăn uống suốt tuyến và bảo hiểm du lịch lên tới 100.000.000đ/vụ (nội địa) hoặc 1 tỷ đồng (quốc tế).',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 pb-16 select-none space-y-10">
      <div className="flex items-center justify-between pb-6 border-b border-[var(--line)]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--accent)] bg-[var(--bg-alt)] border border-[var(--line)] px-4 py-2 rounded-[6px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
          <span>Quay lại trang chủ</span>
        </button>

        <span className="font-mono-code text-xs text-[var(--text-muted)]">
          Trung tâm hỗ trợ khách hàng 24/7
        </span>
      </div>

      {/* Header */}
      <div className="max-w-3xl">
        <span className="font-mono-code text-xs tracking-[0.14em] uppercase text-[var(--sea)] inline-block pb-1 border-b border-[var(--sea)] mb-4">
          Liên hệ &amp; Hỗ trợ
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          Chúng tôi luôn sẵn sàng đồng hành cùng bạn
        </h1>
        <p className="text-[var(--text-muted)] text-sm sm:text-base mt-3 leading-relaxed">
          Đội ngũ tư vấn viên TravelAnytime luôn túc trực để thiết kế hành trình riêng và giải đáp mọi thắc mắc của quý khách.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[var(--bg-alt)] p-5 rounded-[6px] border border-[var(--line)] flex items-start gap-3.5">
            <MapPin className="w-5 h-5 text-[var(--ink)] shrink-0 mt-0.5 stroke-[1.5]" />
            <div>
              <h4 className="font-display text-base font-medium text-[var(--ink)]">Trụ sở chính</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Số 51, đường Lý Tự Trọng, khối 12, phường Hà Huy Tập, thành phố Vinh, tỉnh Nghệ An, Việt Nam.
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-alt)] p-5 rounded-[6px] border border-[var(--line)] flex items-start gap-3.5">
            <Phone className="w-5 h-5 text-[var(--ink)] shrink-0 mt-0.5 stroke-[1.5]" />
            <div>
              <h4 className="font-display text-base font-medium text-[var(--ink)]">Hotline đặt tour &amp; Khẩn cấp</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 space-y-0.5">
                <span className="block">
                  Tư vấn nhanh: <a href="tel:0911708015" className="font-mono-code text-[var(--ink)] font-semibold hover:text-[var(--accent)]">0911 708 015</a>
                </span>
                <span className="block">
                  Hỗ trợ 24/7: <a href="tel:0909885681" className="font-mono-code text-[var(--ink)] font-semibold hover:text-[var(--accent)]">0909 885 681</a>
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-alt)] p-5 rounded-[6px] border border-[var(--line)] flex items-start gap-3.5">
            <Mail className="w-5 h-5 text-[var(--ink)] shrink-0 mt-0.5 stroke-[1.5]" />
            <div>
              <h4 className="font-display text-base font-medium text-[var(--ink)]">Hòm thư điện tử</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                <a href="mailto:tramanh150618@gmail.com" className="text-[var(--ink)] hover:text-[var(--accent)] underline">
                  tramanh150618@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-alt)] p-5 rounded-[6px] border border-[var(--line)] flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-[var(--ink)] shrink-0 mt-0.5 stroke-[1.5]" />
            <div>
              <h4 className="font-display text-base font-medium text-[var(--ink)]">Thời gian làm việc</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                Thứ 2 - Thứ 7: 08:00 - 18:30
                <br />
                Chủ nhật &amp; Ngày Lễ: 08:30 - 17:00 (Trực hotline 24/24)
              </p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 bg-[var(--bg-alt)] p-6 sm:p-8 rounded-[6px] border border-[var(--line)]">
          <div className="mb-5">
            <h3 className="font-display text-2xl font-medium text-[var(--ink)]">
              Gửi yêu cầu tư vấn / Báo giá tour theo đoàn
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Điền thông tin bên dưới, nhân viên chăm sóc khách hàng sẽ gọi lại tư vấn chi tiết trong 10 phút.
            </p>
          </div>

          {submitted ? (
            <div className="bg-[var(--bg)] border border-[var(--ink)] rounded-[6px] p-6 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[var(--accent)] mx-auto stroke-[1.5]" />
              <h4 className="font-display text-xl font-medium text-[var(--ink)]">
                Yêu cầu đã được gửi thành công
              </h4>
              <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                Cảm ơn <strong className="text-[var(--ink)]">{formData.name}</strong>. Chúng tôi đã nhận được thông tin và sẽ liên hệ lại qua số <strong className="text-[var(--ink)] font-mono-code">{formData.phone}</strong> trong ít phút.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', topic: 'Tư vấn tour', message: '' });
                }}
                className="mt-2 text-xs font-semibold text-[var(--accent)] underline cursor-pointer"
              >
                Gửi thêm yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[var(--ink)] mb-1">
                    Họ và tên <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[var(--ink)] mb-1">
                    Số điện thoại <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[var(--ink)] mb-1">
                    Email nhận báo giá
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[var(--ink)] mb-1">
                    Chủ đề tư vấn
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                  >
                    <option value="Tư vấn tour trong nước">Tư vấn tour trong nước</option>
                    <option value="Tư vấn tour nước ngoài">Tư vấn tour nước ngoài</option>
                    <option value="Tư vấn tour cho đoàn / Doanh nghiệp">Tư vấn tour cho đoàn / Doanh nghiệp</option>
                    <option value="Hợp tác dịch vụ / Đại lý">Hợp tác dịch vụ / Đại lý</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[var(--ink)] mb-1">
                  Nội dung yêu cầu chi tiết
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ví dụ: Đoàn 10 người cần tour Đà Nẵng 4N3Đ vào dịp cuối tuần, khởi hành từ Hà Nội..."
                  className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs focus:border-[var(--ink)] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[var(--accent)] hover:bg-[#be4921] text-[var(--bg)] font-semibold text-sm rounded-[6px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4 stroke-[1.5]" />
                <span>Gửi yêu cầu tư vấn</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="pt-8 border-t border-[var(--line)]">
        <h3 className="font-display text-2xl font-normal text-[var(--ink)] mb-6">
          Câu hỏi thường gặp khi đặt tour
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-[var(--bg-alt)] p-5 rounded-[6px] border border-[var(--line)]">
              <h5 className="font-display text-base font-medium text-[var(--ink)] mb-2">
                {faq.q}
              </h5>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
