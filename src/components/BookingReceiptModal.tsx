import React from 'react';
import { CheckCircle2, Printer, ArrowRight, ShieldCheck, Calendar, Users, Building2, Plane } from 'lucide-react';
import { ConfirmedBooking } from '../types/travel';
import { formatPrice } from './TourCard';

interface BookingReceiptModalProps {
  booking: ConfirmedBooking;
  onClose: () => void;
}

export const BookingReceiptModal: React.FC<BookingReceiptModalProps> = ({ booking, onClose }) => {
  const { customer, title, itemType, total, bookingId, createdAt } = booking;

  const getTypeLabel = () => {
    if (itemType === 'hotel') return 'Đặt phòng khách sạn thành công';
    if (itemType === 'combo') return 'Săn combo du lịch thành công';
    return 'Đặt tour du lịch thành công';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#12344D]/70 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[var(--bg)] rounded-[6px] border border-[var(--ink)] overflow-hidden my-6">
        {/* Success Header */}
        <div className="bg-[var(--ink)] text-[var(--bg)] p-6 text-center border-b border-[var(--line)]/20">
          <div className="w-12 h-12 rounded-[6px] border border-[var(--bg)]/30 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-[var(--accent)] stroke-[1.75]" />
          </div>
          <span className="font-mono-code text-[11px] uppercase tracking-[0.14em] text-[var(--bg)]/75">
            Giao dịch xác nhận
          </span>
          <h2 className="font-display text-2xl font-medium mt-1">
            {getTypeLabel()}
          </h2>
          <p className="text-xs text-[var(--bg)]/85 mt-2">
            Mã đặt chỗ:{' '}
            <strong className="font-mono-code text-[var(--accent)] bg-[var(--bg)] px-2 py-0.5 rounded-[4px] ml-1">
              {bookingId}
            </strong>
          </p>
        </div>

        {/* Receipt Content */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs text-[var(--text)]">
          {/* Summary Card */}
          <div className="bg-[var(--bg-alt)] p-4 rounded-[6px] border border-[var(--line)]">
            <div className="flex items-center gap-1.5 font-mono-code text-[11px] text-[var(--sea)] mb-1">
              {itemType === 'hotel' ? <Building2 className="w-3.5 h-3.5" /> : itemType === 'combo' ? <Plane className="w-3.5 h-3.5" /> : null}
              <span>{itemType === 'hotel' ? 'Khách sạn / Resort' : itemType === 'combo' ? 'Gói Combo Du Lịch' : 'Tour Trọn Gói'}</span>
            </div>
            <h4 className="font-display text-base font-medium text-[var(--ink)]">{title}</h4>
            <div className="grid grid-cols-2 gap-2 mt-2.5 text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--sea)]" />
                <span>{itemType === 'hotel' ? 'Nhận phòng:' : 'Khởi hành:'} <strong className="text-[var(--ink)]">{customer.departureDate}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--sea)]" />
                <span>
                  {itemType === 'hotel'
                    ? `${customer.adults} đêm`
                    : `${customer.adults} Lớn${customer.children > 0 ? `, ${customer.children} Trẻ` : ''}`}
                </span>
              </div>
            </div>
          </div>

          {/* Customer info */}
          <div className="bg-[var(--bg)] p-4 rounded-[6px] border border-[var(--line)] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Khách hàng:</span>
              <span className="font-semibold text-[var(--ink)]">{customer.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Số điện thoại:</span>
              <span className="font-mono-code font-medium text-[var(--ink)]">{customer.phone}</span>
            </div>
            {customer.email && (
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">Email:</span>
                <span className="text-[var(--ink)]">{customer.email}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">Thời gian tạo đơn:</span>
              <span className="font-mono-code text-[var(--text-muted)]">{createdAt}</span>
            </div>
          </div>

          {/* Payment Box */}
          <div className="border border-[var(--ink)]/30 bg-[var(--bg-alt)] p-4 rounded-[6px] text-center space-y-2">
            <span className="font-mono-code text-[11px] text-[var(--ink)] uppercase tracking-wider block">
              Tổng số tiền thanh toán
            </span>
            <span className="font-display text-3xl font-semibold text-[var(--accent)] block tabular-nums">
              {formatPrice(total)}
            </span>

            {customer.paymentMethod === 'bank_transfer' && (
              <div className="mt-3 pt-3 border-t border-[var(--line)] text-left text-[11px] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Ngân hàng:</span>
                  <strong className="text-[var(--ink)]">MB BANK (Quân Đội)</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Số tài khoản:</span>
                  <strong className="text-[var(--ink)] font-mono-code">0911708015</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Chủ tài khoản:</span>
                  <strong className="text-[var(--ink)]">TRAVELANYTIME CO., LTD</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--text-muted)]">Nội dung:</span>
                  <strong className="text-[var(--accent)] font-mono-code">
                    {bookingId} {customer.phone}
                  </strong>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px] justify-center">
            <ShieldCheck className="w-4 h-4 text-[var(--sea)] shrink-0" />
            <span>Chuyên viên tư vấn sẽ liên hệ xác nhận sau 15 phút.</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[var(--bg-alt)] border-t border-[var(--line)] flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2.5 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] font-semibold text-xs flex items-center gap-1.5 hover:border-[var(--ink)] transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In vé</span>
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-[6px] bg-[var(--ink)] hover:bg-[var(--accent)] text-[var(--bg)] font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Hoàn tất &amp; Về trang chủ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
