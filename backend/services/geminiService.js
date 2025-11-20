const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = null;
    this.model = null;
    this.initialize();
  }

  initialize() {
    try {
      if (process.env.GEMINI_API_KEY) {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log('✅ Gemini AI initialized successfully');
      } else {
        console.warn('⚠️ GEMINI_API_KEY not found in environment variables');
      }
    } catch (error) {
      console.error('❌ Failed to initialize Gemini AI:', error.message);
    }
  }

  isAvailable() {
    return this.model !== null;
  }

  // 1. Auto-categorize transaction
  async categorizeTransaction(description, amount = 0) {
    if (!this.isAvailable()) {
      return { category: 'Other', confidence: 0 };
    }

    try {
      const prompt = `Bạn là một chuyên gia kế toán. Hãy phân loại giao dịch tài chính sau vào MỘT trong các danh mục:
Food (Ăn uống), Transport (Di chuyển), Entertainment (Giải trí), Utilities (Hóa đơn), Health (Sức khỏe), Education (Giáo dục), Shopping (Mua sắm), Other (Khác).

Mô tả giao dịch: "${description}"
Số tiền: ${amount.toLocaleString()} VND
Ngữ cảnh: Việt Nam

Quy tắc:
1. Nếu mô tả chứa từ khóa tiếng Việt (ví dụ: "phở", "cà phê", "grab", "điện", "nước"), hãy ưu tiên phân loại theo ngữ cảnh địa phương.
2. Chỉ trả về TÊN DANH MỤC bằng tiếng Anh (ví dụ: Food).
3. Không giải thích thêm.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const category = response.text().trim();

      // Validate category
      const validCategories = ['Food', 'Transport', 'Entertainment', 'Utilities',
        'Health', 'Education', 'Shopping', 'Other'];
      const matchedCategory = validCategories.find(c =>
        category.toLowerCase().includes(c.toLowerCase())
      );

      return {
        category: matchedCategory || 'Other',
        confidence: matchedCategory ? 0.85 : 0.5
      };
    } catch (error) {
      console.error('Gemini categorization error:', error);
      return { category: 'Other', confidence: 0 };
    }
  }

  // 2. Predict next month expenses
  async predictExpenses(transactions) {
    if (!this.isAvailable() || transactions.length < 3) {
      return null;
    }

    try {
      const monthlyData = this.calculateMonthlyAverages(transactions);

      const prompt = `Bạn là chuyên gia phân tích tài chính cá nhân cao cấp. Dựa trên dữ liệu chi tiêu thực tế của người dùng tại Việt Nam trong 6 tháng qua:

${JSON.stringify(monthlyData, null, 2)}

Nhiệm vụ:
1. Dự đoán tổng chi tiêu cho tháng tới dựa trên xu hướng (trung bình có trọng số, mùa vụ).
2. Phân tích ngắn gọn xu hướng hiện tại.

Trả về ĐÚNG format JSON sau (không thêm markdown):
{
  "predictedAmount": <số tiền dự đoán (number)>,
  "trend": "<increasing | decreasing | stable>",
  "confidence": <độ tin cậy 0-100 (number)>,
  "explanation": "<giải thích ngắn gọn, tự nhiên bằng tiếng Việt, xưng hô là 'tôi' và 'bạn'. Ví dụ: 'Dựa trên đà tăng chi tiêu gần đây, tôi dự đoán...'>"
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      // Remove markdown code blocks if present
      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      const prediction = JSON.parse(text);
      return prediction;
    } catch (error) {
      console.error('Gemini prediction error:', error);
      return null;
    }
  }

  // 3. Generate savings suggestions
  async generateSavingsSuggestions(transactions, income, expenses) {
    if (!this.isAvailable() || transactions.length < 5) {
      return [];
    }

    try {
      const categoryBreakdown = this.calculateCategoryBreakdown(transactions);
      const savingsRate = income > 0 ? ((income - expenses) / income * 100).toFixed(1) : 0;

      const prompt = `Bạn là cố vấn tài chính cá nhân thân thiện. Hãy phân tích tình hình tài chính của người dùng tại Việt Nam:

- Tổng thu nhập: ${income.toLocaleString()} VND
- Tổng chi tiêu: ${expenses.toLocaleString()} VND
- Tỷ lệ tiết kiệm: ${savingsRate}%
- Chi tiêu theo danh mục:
${JSON.stringify(categoryBreakdown, null, 2)}

Nhiệm vụ: Đưa ra 3 gợi ý tiết kiệm CỤ THỂ, THỰC TẾ và phù hợp với văn hóa Việt Nam (ví dụ: so sánh ăn ngoài vs nấu ăn, săn sale, tiết kiệm điện, gửi tiết kiệm ngân hàng). Tránh những lời khuyên chung chung sáo rỗng.

Trả về ĐÚNG format JSON sau (không thêm markdown):
{
  "suggestions": [
    {
      "title": "<tiêu đề ngắn gọn, bắt mắt>",
      "description": "<lời khuyên chi tiết, ân cần bằng tiếng Việt>",
      "potentialSavings": <ước tính số tiền tiết kiệm được (number)>,
      "priority": "<high | medium | low>"
    }
  ]
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      const data = JSON.parse(text);
      return data.suggestions || [];
    } catch (error) {
      console.error('Gemini suggestions error:', error);
      return [];
    }
  }

  // 4. Analyze spending patterns
  async analyzeSpendingPatterns(transactions) {
    if (!this.isAvailable() || transactions.length < 5) {
      return { insights: [] };
    }

    try {
      const patterns = this.extractPatterns(transactions);

      const prompt = `Bạn là người bạn đồng hành quản lý tài chính. Hãy xem xét các thói quen chi tiêu sau của người dùng:

${JSON.stringify(patterns, null, 2)}

Nhiệm vụ: Tìm ra các insights thú vị, cảnh báo rủi ro hoặc lời khen ngợi. Hãy dùng giọng văn tự nhiên, khuyến khích, không phán xét.

Trả về ĐÚNG format JSON sau (không thêm markdown):
{
  "insights": [
    {
      "type": "<warning | info | success>",
      "title": "<tiêu đề thu hút>",
      "description": "<nhận xét chi tiết bằng tiếng Việt>"
    }
  ]
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      return JSON.parse(text);
    } catch (error) {
      console.error('Gemini analysis error:', error);
      return { insights: [] };
    }
  }

  // Helper methods
  calculateMonthlyAverages(transactions) {
    const monthlyMap = {};
    const now = new Date();

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' });
      monthlyMap[monthKey] = 0;
    }

    // Sum expenses by month
    transactions.forEach(t => {
      if (t.type === 'expense') {
        const date = new Date(t.date);
        const monthKey = date.toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' });
        if (monthlyMap.hasOwnProperty(monthKey)) {
          monthlyMap[monthKey] += t.amount;
        }
      }
    });

    return monthlyMap;
  }

  calculateCategoryBreakdown(transactions) {
    const breakdown = {};
    transactions.forEach(t => {
      if (t.type === 'expense') {
        const category = t.category || 'Other';
        breakdown[category] = (breakdown[category] || 0) + t.amount;
      }
    });

    // Sort by amount descending
    return Object.fromEntries(
      Object.entries(breakdown).sort(([, a], [, b]) => b - a)
    );
  }

  extractPatterns(transactions) {
    const expenses = transactions.filter(t => t.type === 'expense');

    if (expenses.length === 0) {
      return { message: 'Không đủ dữ liệu để phân tích' };
    }

    const totalAmount = expenses.reduce((sum, t) => sum + t.amount, 0);
    const avgAmount = totalAmount / expenses.length;

    // Most frequent category
    const categoryFreq = {};
    expenses.forEach(t => {
      const cat = t.category || 'Other';
      categoryFreq[cat] = (categoryFreq[cat] || 0) + 1;
    });
    const mostFrequentCategory = Object.keys(categoryFreq).reduce((a, b) =>
      categoryFreq[a] > categoryFreq[b] ? a : b
    );

    // Weekday vs Weekend spending
    let weekdayTotal = 0, weekendTotal = 0;
    let weekdayCount = 0, weekendCount = 0;

    expenses.forEach(t => {
      const day = new Date(t.date).getDay();
      if (day === 0 || day === 6) {
        weekendTotal += t.amount;
        weekendCount++;
      } else {
        weekdayTotal += t.amount;
        weekdayCount++;
      }
    });

    return {
      totalTransactions: expenses.length,
      totalAmount: totalAmount,
      avgTransactionAmount: Math.round(avgAmount),
      mostFrequentCategory: mostFrequentCategory,
      categoryFrequency: categoryFreq,
      weekdaySpending: {
        total: weekdayTotal,
        count: weekdayCount,
        average: weekdayCount > 0 ? Math.round(weekdayTotal / weekdayCount) : 0
      },
      weekendSpending: {
        total: weekendTotal,
        count: weekendCount,
        average: weekendCount > 0 ? Math.round(weekendTotal / weekendCount) : 0
      }
    };
  }
}

module.exports = new GeminiService();
