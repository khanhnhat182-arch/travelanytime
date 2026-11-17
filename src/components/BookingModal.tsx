import React, { useState } from 'react';
import { X, CheckCircle, Calendar, User, CreditCard, Shield, QrCode } from 'lucide-react';
import { BookingData, ConfirmedBooking } from '../types/travel';
import { formatPrice } from './TourCard';
import { VOUCHERS } from '../data/travelData';

export interface BookingTargetItem {
  type: 'tour' | 'hotel' | 'combo';
  title: string;
  duration?: string;
  price: number;
  originalPrice: number;
  departureDates?: string[];
}

interface BookingModalProps {
  item: BookingTargetItem;
  onClose: () => void;
  onSuccess: (confirmed: ConfirmedBooking) => void;
  initialVoucher?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  item,
  onClose,
  onSuccess,
  initialVoucher = '',
}) => {
  const defaultDates =
    item.departureDates && item.departureDates.length > 0
      ? item.departureDates
      : ['2026-11-01', '2026-11-15', '2026-12-01', '2027-02-08'];

  const [formData, setFormData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    departureDate: defaultDates[0],
    adults: item.type === 'hotel' ? 1 : 2,
    children: 0,
    notes: '',
    paymentMethod: 'bank_transfer',
    voucherCode: initialVoucher,
  });

  const [appliedVoucher, setAppliedVoucher] = useState<string>(
    initialVoucher && VOUCHERS[initialVoucher] ? initialVoucher : ''
  );
  const [voucherError, setVoucherError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adultPrice = item.price;
  const childPrice = item.type === 'hotel' ? 0 : Math.round(item.price * 0.75);
  const subtotal =
    item.type === 'hotel'
      ? formData.adults * adultPrice
      : formData.adults * adultPrice + formData.children * childPrice;

  const discountAmount =
    appliedVoucher && VOUCHERS[appliedVoucher]
      ? VOUCHERS[appliedVoucher].discount
      : 0;

  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyVoucher = () => {
    const code = formData.voucherCode.trim().toUpperCase();
    if (!code) {
      setVoucherError('Vui lòng nhập mã giảm giá');
      return;
    }
    if (VOUCHERS[code]) {
      setAppliedVoucher(code);
      setVoucherError('');
    } else {
      setVoucherError('Mã không hợp lệ. Thử: VOUCHER500K, HE2025, TET2027');
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+ ]{9,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Số điện thoại không đúng định dạng';
    }
    if (!formData.departureDate) {
      newErrors.departureDate = 'Vui lòng chọn ngày khởi hành / nhận phòng';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const prefix = item.type === 'hotel' ? 'KS-' : item.type === 'combo' ? 'CB-' : 'TA-';
      const bookingId = prefix + Math.floor(100000 + Math.random() * 900000);
      const confirmed: ConfirmedBooking = {
        bookingId,
        itemType: item.type,
        title: item.title,
        customer: { ...formData, voucherCode: appliedVoucher },
        adultPrice,
        childPrice,
        subtotal,
        discount: discountAmount,
        total,
        createdAt: new Date().toLocaleString('vi-VN'),
      };
      setIsSubmitting(false);
      onSuccess(confirmed);
    }, 500);
  };

  const getSubHeading = () => {
    if (item.type === 'hotel') return 'Đăng ký đặt phòng khách sạn trực tuyến';
    if (item.type === 'combo') return 'Đăng ký săn combo vé máy bay + khách sạn';
    return 'Đăng ký giữ chỗ tour du lịch trực tuyến';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#12344D]/70 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[var(--bg)] rounded-[6px] border border-[var(--ink)] overflow-hidden my-6">
        {/* Modal Header — solid deep navy */}
        <div className="bg-[var(--ink)] text-[var(--bg)] p-5 flex items-start justify-between border-b border-[var(--line)]/20">
          <div>
            <span className="font-mono-code text-[11px] uppercase tracking-[0.12em] text-[var(--bg)]/75">
              {getSubHeading()}
            </span>
            <h2 className="font-display text-lg sm:text-xl font-medium mt-1 leading-snug line-clamp-1">
              {item.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--bg)]/85 mt-1.5 font-mono-code">
              {item.duration && (
                <>
                  <span>{item.duration}</span>
                  <span>·</span>
                </>
              )}
              <span>
                {formatPrice(item.price)}
                {item.type === 'hotel' ? '/đêm' : '/khách'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng biểu mẫu đặt chỗ"
            className="text-[var(--bg)]/80 hover:text-[var(--bg)] p-1 rounded-[4px] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Customer Info Section */}
          <div className="space-y-3">
            <h3 className="font-mono-code text-[11px] uppercase tracking-wider text-[var(--sea)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Thông tin khách hàng liên hệ</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                Họ và tên quý khách <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Ví dụ: Nguyễn Văn Nam"
                className={`w-full px-3 py-2 rounded-[6px] border text-sm text-[var(--text)] placeholder-[var(--text-muted)] bg-[var(--bg)] focus:outline-none focus:border-[var(--ink)] ${
                  errors.fullName ? 'border-[var(--accent)]' : 'border-[var(--line)]'
                }`}
              />
              {errors.fullName && (
                <p className="text-[var(--accent)] text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                  Số điện thoại <span className="text-[var(--accent)]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0912 345 678"
                  className={`w-full px-3 py-2 rounded-[6px] border text-sm text-[var(--text)] placeholder-[var(--text-muted)] bg-[var(--bg)] focus:outline-none focus:border-[var(--ink)] ${
                    errors.phone ? 'border-[var(--accent)]' : 'border-[var(--line)]'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[var(--accent)] text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                  Email nhận vé &amp; xác nhận
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] text-sm text-[var(--text)] placeholder-[var(--text-muted)] bg-[var(--bg)] focus:outline-none focus:border-[var(--ink)]"
                />
              </div>
            </div>
          </div>

          {/* Departure Date & Passengers */}
          <div className="space-y-3 pt-4 border-t border-[var(--line)]">
            <h3 className="font-mono-code text-[11px] uppercase tracking-wider text-[var(--sea)] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>{item.type === 'hotel' ? 'Ngày nhận phòng & Số đêm' : 'Ngày khởi hành & Số lượng khách'}</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                {item.type === 'hotel' ? 'Chọn ngày nhận phòng' : 'Chọn ngày khởi hành'} <span className="text-[var(--accent)]">*</span>
              </label>
              <select
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                className="w-full px-3 py-2 rounded-[6px] border border-[var(--line)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--ink)] bg-[var(--bg)]"
              >
                {defaultDates.map((date) => (
                  <option key={date} value={date}>
                    {new Date(date).toLocaleDateString('vi-VN', {
                      weekday: 'long',
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </option>
                ))}
              </select>
            </div>

            <div className={`grid ${item.type === 'hotel' ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
              <div className="bg-[var(--bg-alt)] p-3 rounded-[6px] border border-[var(--line)]">
                <span className="block text-xs font-semibold text-[var(--ink)]">
                  {item.type === 'hotel' ? 'Số đêm lưu trú' : 'Người lớn (≥ 12 tuổi)'}
                </span>
                <span className="font-mono-code text-[11px] text-[var(--text-muted)] block mb-2">
                  {formatPrice(adultPrice)}{item.type === 'hotel' ? '/đêm' : '/khách'}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                    className="w-7 h-7 rounded-[4px] border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center font-bold text-[var(--ink)] hover:border-[var(--ink)] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono-code font-semibold text-base text-[var(--ink)] min-w-4 text-center">
                    {formData.adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                    className="w-7 h-7 rounded-[4px] border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center font-bold text-[var(--ink)] hover:border-[var(--ink)] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {item.type !== 'hotel' && (
                <div className="bg-[var(--bg-alt)] p-3 rounded-[6px] border border-[var(--line)]">
                  <span className="block text-xs font-semibold text-[var(--ink)]">
                    Trẻ em (5 - 11 tuổi)
                  </span>
                  <span className="font-mono-code text-[11px] text-[var(--text-muted)] block mb-2">
                    {formatPrice(childPrice)} (75%)
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                      className="w-7 h-7 rounded-[4px] border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center font-bold text-[var(--ink)] hover:border-[var(--ink)] cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-mono-code font-semibold text-base text-[var(--ink)] min-w-4 text-center">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                      className="w-7 h-7 rounded-[4px] border border-[var(--line)] bg-[var(--bg)] flex items-center justify-center font-bold text-[var(--ink)] hover:border-[var(--ink)] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Voucher Code */}
          <div className="pt-4 border-t border-[var(--line)]">
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1.5">
              Mã ưu đãi / Voucher giảm giá
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.voucherCode}
                onChange={(e) => {
                  setFormData({ ...formData, voucherCode: e.target.value });
                  setVoucherError('');
                }}
                placeholder="VOUCHER500K, HE2025 hoặc NHOM3T"
                className="flex-1 px-3 py-2 rounded-[6px] border border-[var(--line)] bg-[var(--bg)] text-xs sm:text-sm uppercase font-mono-code tracking-wider focus:outline-none focus:border-[var(--ink)]"
              />
              <button
                type="button"
                onClick={handleApplyVoucher}
                className="bg-[var(--ink)] hover:bg-[var(--sea)] text-[var(--bg)] font-semibold text-xs px-4 py-2 rounded-[6px] transition-colors cursor-pointer"
              >
                Áp dụng
              </button>
            </div>
            {voucherError && (
              <p className="text-[var(--accent)] text-xs mt-1">{voucherError}</p>
            )}
            {appliedVoucher && (
              <p className="text-[var(--sea)] text-xs mt-1.5 flex items-center gap-1.5 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Đã áp dụng: {VOUCHERS[appliedVoucher]?.label}</span>
              </p>
            )}
          </div>

          {/* Payment Method Selector */}
          <div className="pt-4 border-t border-[var(--line)]">
            <label className="block text-xs font-semibold text-[var(--ink)] mb-2">
              Hình thức thanh toán
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                className={`p-3 rounded-[6px] border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  formData.paymentMethod === 'bank_transfer'
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-semibold'
                    : 'border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                <QrCode className="w-4 h-4 stroke-[1.5]" />
                <span>Chuyển khoản QR</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'credit_card' })}
                className={`p-3 rounded-[6px] border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  formData.paymentMethod === 'credit_card'
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-semibold'
                    : 'border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                <CreditCard className="w-4 h-4 stroke-[1.5]" />
                <span>Thẻ tín dụng</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                className={`p-3 rounded-[6px] border flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  formData.paymentMethod === 'cash'
                    ? 'border-[var(--ink)] bg-[var(--ink)] text-[var(--bg)] font-semibold'
                    : 'border-[var(--line)] bg-[var(--bg-alt)] text-[var(--ink)] hover:border-[var(--ink)]'
                }`}
              >
                <Shield className="w-4 h-4 stroke-[1.5]" />
                <span>Tiền mặt VP</span>
              </button>
            </div>
          </div>

          {/* Total Summary */}
          <div className="bg-[var(--bg-alt)] rounded-[6px] p-4 border border-[var(--line)] space-y-1.5 text-xs text-[var(--text)]">
            <div className="flex justify-between">
              <span>
                {item.type === 'hotel'
                  ? `Tạm tính (${formData.adults} đêm):`
                  : `Tạm tính (${formData.adults} người lớn${formData.children > 0 ? `, ${formData.children} trẻ em` : ''}):`}
              </span>
              <span className="font-mono-code font-medium tabular-nums">{formatPrice(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[var(--sea)] font-semibold">
                <span>Giảm giá voucher:</span>
                <span className="font-mono-code tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2.5 border-t border-[var(--line)] text-[var(--ink)] font-semibold text-sm">
              <span>Tổng thanh toán:</span>
              <span className="font-display text-2xl font-semibold text-[var(--accent)] tabular-nums">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-[6px] border border-[var(--line)] text-[var(--ink)] font-semibold text-xs sm:text-sm hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-[2] py-2.5 px-5 rounded-[6px] bg-[var(--accent)] hover:bg-[#be4921] text-[var(--bg)] font-semibold text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center"
            >
              {isSubmitting ? 'Đang xử lý đặt chỗ...' : 'Xác nhận đặt chỗ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
