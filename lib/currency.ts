type Language = 'vi' | 'en';

// Tỷ giá quy đổi VND sang USD (có thể cập nhật theo tỷ giá thực tế)
const VND_TO_USD_RATE = 0.000040; // 1 VND ≈ 0.00004 USD (25,000 VND = 1 USD)

export const formatCurrency = (amount: number, language: Language = 'vi'): string => {
  if (language === 'vi') {
    return `${amount.toLocaleString('vi-VN')}₫`;
  } else {
    // Quy đổi từ VND sang USD
    const amountInUSD = amount * VND_TO_USD_RATE;
    return `$${amountInUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

export const getCurrencySymbol = (language: Language = 'vi'): string => {
  return language === 'vi' ? '₫' : '$';
};

export const getCurrencyPlaceholder = (language: Language = 'vi'): string => {
  return language === 'vi' ? '0' : '0.00';
};

// Hàm quy đổi tiền (có thể dùng cho các mục đích khác)
export const convertCurrency = (amount: number, fromCurrency: 'VND' | 'USD', toCurrency: 'VND' | 'USD'): number => {
  if (fromCurrency === toCurrency) return amount;
  
  if (fromCurrency === 'VND' && toCurrency === 'USD') {
    return amount * VND_TO_USD_RATE;
  } else {
    return amount / VND_TO_USD_RATE;
  }
};
