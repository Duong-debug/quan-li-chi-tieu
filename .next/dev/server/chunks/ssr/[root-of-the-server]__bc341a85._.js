module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const translations = {
    vi: {
        // Auth
        'Login': 'Đăng Nhập',
        'Register': 'Đăng Ký',
        'Email': 'Email',
        'Password': 'Mật khẩu',
        'Confirm Password': 'Xác nhận mật khẩu',
        'Full Name': 'Họ tên',
        'Manage your personal expenses': 'Quản lý chi tiêu cá nhân của bạn',
        'Sign In': 'Đăng nhập',
        'Sign Up': 'Đăng ký',
        'Already have an account?': 'Đã có tài khoản?',
        "Don't have an account?": 'Chưa có tài khoản?',
        'Passwords do not match': 'Mật khẩu không khớp',
        'Logout': 'Đăng xuất',
        // Navigation
        'Dashboard': 'Bảng điều khiển',
        'Expenses': 'Chi tiêu',
        'Categories': 'Hạng mục',
        'Reports': 'Báo cáo',
        'AI': 'AI',
        'Settings': 'Cài đặt',
        // Dashboard
        'Total Income': 'Tổng thu nhập',
        'Total Expense': 'Tổng chi tiêu',
        'Total Balance': 'Số dư',
        'Expense by Month': 'Chi tiêu theo tháng',
        'Expense by Category': 'Tỷ lệ chi tiêu theo danh mục',
        'Quick Add Transaction': 'Thêm giao dịch nhanh',
        // Expenses
        'Expense Management': 'Quản lý chi tiêu',
        'Date': 'Ngày',
        'Category': 'Danh mục',
        'Amount': 'Số tiền',
        'Note': 'Ghi chú',
        'Add Transaction': 'Thêm giao dịch',
        'Edit Transaction': 'Sửa giao dịch',
        'Delete Transaction': 'Xóa giao dịch',
        'Filter by Date': 'Lọc theo ngày',
        'Filter by Category': 'Lọc theo danh mục',
        'Filter by Amount': 'Lọc theo số tiền',
        'No transactions yet': 'Chưa có giao dịch nào',
        'Add': 'Thêm mới',
        'View All': 'Xem tất cả',
        // Categories
        'Food': 'Ăn uống',
        'Transportation': 'Giao thông',
        'Entertainment': 'Giải trí',
        'Utilities': 'Hóa đơn',
        'Health': 'Sức khỏe',
        'Education': 'Giáo dục',
        'Shopping': 'Mua sắm',
        'Other': 'Khác',
        'Coming Soon': 'Chức năng đang được phát triển...',
        // AI
        'AI Features': 'AI Hỗ trợ',
        'Auto Categorization': 'Tự động phân loại',
        'Enter transaction description': 'Nhập mô tả giao dịch',
        'Suggested Category': 'Danh mục gợi ý',
        'Expense Prediction': 'Dự đoán chi tiêu',
        'Saving Suggestions': 'Gợi ý tiết kiệm',
        'No suggestions available': 'Không có gợi ý nào',
        // Settings
        'Language': 'Ngôn ngữ',
        'User Information': 'Thông tin người dùng',
        'Expense updated successfully': 'Cập nhật giao dịch thành công',
        'Expense added successfully': 'Thêm giao dịch thành công',
        'Are you sure you want to delete this expense?': 'Bạn có chắc chắn muốn xóa giao dịch này?',
        'Expense deleted successfully': 'Xóa giao dịch thành công',
        'View and manage your transaction history.': 'Xem và quản lý lịch sử giao dịch của bạn.',
        'Add Expense': 'Thêm chi tiêu',
        'Profile updated successfully': 'Cập nhật hồ sơ thành công',
        'Manage your account preferences and application settings.': 'Quản lý tùy chọn tài khoản và cài đặt ứng dụng.',
        'General': 'Chung',
        'Profile': 'Hồ sơ',
        'Security': 'Bảo mật',
        'Appearance': 'Giao diện',
        'Customize the look and feel of the application.': 'Tùy chỉnh giao diện ứng dụng.',
        'Theme': 'Chủ đề',
        'Select your preferred language.': 'Chọn ngôn ngữ ưu tiên của bạn.',
        'Select Language': 'Chọn ngôn ngữ',
        'Profile Information': 'Thông tin hồ sơ',
        'Update your personal information.': 'Cập nhật thông tin cá nhân của bạn.',
        'Save Changes': 'Lưu thay đổi',
        'Current Password': 'Mật khẩu hiện tại',
        'New Password': 'Mật khẩu mới',
        'Change Password': 'Đổi mật khẩu',
        'Danger Zone': 'Vùng nguy hiểm',
        'Account Information': 'Thông tin tài khoản',
        'Filters': 'Bộ lọc',
        'Clear': 'Xóa',
        'All': 'Tất cả',
        'Max Amount': 'Số tiền tối đa',
        'Actions': 'Hành động',
        'Edit': 'Sửa',
        'Delete': 'Xóa',
        'No transactions found': 'Không tìm thấy giao dịch nào',
        'Title': 'Tiêu đề',
        'Add New Expense': 'Thêm chi tiêu mới',
        'Edit Expense': 'Sửa chi tiêu',
        'Update the details of your expense.': 'Cập nhật chi tiết chi tiêu của bạn.',
        'Enter the details of your expense here.': 'Nhập chi tiết chi tiêu của bạn tại đây.',
        'Update Expense': 'Cập nhật chi tiêu',
        'Save Expense': 'Lưu chi tiêu',
        'AI-powered prediction for next month\'s spending.': 'Dự đoán chi tiêu cho tháng tới dựa trên AI.',
        'Predicted Total': 'Tổng dự đoán',
        'Trend': 'Xu hướng',
        'AI Assistant': 'Trợ lý AI',
        'Leverage AI to analyze, predict, and optimize your finances.': 'Tận dụng AI để phân tích, dự đoán và tối ưu hóa tài chính của bạn.',
        'Smart Classification': 'Phân loại thông minh',
        'Enter a transaction description and let AI categorize it for you.': 'Nhập mô tả giao dịch và để AI phân loại giúp bạn.',
        'Description': 'Mô tả',
        'Add Category': 'Thêm hạng mục',
        'Edit Category': 'Sửa hạng mục',
        'Category Name': 'Tên hạng mục',
        'Create a new category to organize your expenses.': 'Tạo hạng mục mới để sắp xếp chi tiêu của bạn.',
        'Update the details of your category.': 'Cập nhật thông tin hạng mục.',
        'Category created successfully': 'Tạo hạng mục thành công',
        'Category updated successfully': 'Cập nhật hạng mục thành công',
        'Category deleted successfully': 'Xóa hạng mục thành công',
        'Are you sure you want to delete this category?': 'Bạn có chắc chắn muốn xóa hạng mục này?',
        'Custom category': 'Hạng mục tùy chỉnh',
        'No custom categories yet': 'Chưa có hạng mục tùy chỉnh',
        'Create your first custom category to better organize your expenses.': 'Tạo hạng mục tùy chỉnh đầu tiên để sắp xếp chi tiêu tốt hơn.',
        'Manage your expense categories and budgets': 'Quản lý hạng mục và ngân sách chi tiêu',
        'Default Categories': 'Hạng mục mặc định',
        'Custom Categories': 'Hạng mục tùy chỉnh',
        'Are you sure?': 'Bạn có chắc chắn?',
        'This action cannot be undone.': 'Hành động này không thể hoàn tác.',
        'Cancel': 'Hủy',
        'Deleting...': 'Đang xóa...',
        'Budgets': 'Ngân sách',
        'Budget Management': 'Quản lý ngân sách',
        'Add Budget': 'Thêm ngân sách',
        'Edit Budget': 'Sửa ngân sách',
        'Budget Amount': 'Số tiền ngân sách',
        'Period': 'Kỳ hạn',
        'Alert Threshold': 'Ngưỡng cảnh báo',
        'Daily': 'Hàng ngày',
        'Weekly': 'Hàng tuần',
        'Monthly': 'Hàng tháng',
        'Yearly': 'Hàng năm',
        'Start Date': 'Ngày bắt đầu',
        'End Date': 'Ngày kết thúc',
        'Optional': 'Tùy chọn',
        'Spent': 'Đã chi',
        'Budget': 'Ngân sách',
        'Remaining': 'Còn lại',
        'Over Budget': 'Vượt ngân sách',
        'On Track': 'Đúng kế hoạch',
        'Warning': 'Cảnh báo',
        'Exceeded': 'Vượt quá',
        'Budget created successfully': 'Tạo ngân sách thành công',
        'Budget updated successfully': 'Cập nhật ngân sách thành công',
        'Budget deleted successfully': 'Xóa ngân sách thành công',
        'No budgets yet': 'Chưa có ngân sách',
        'Create your first budget to track spending limits.': 'Tạo ngân sách đầu tiên để theo dõi giới hạn chi tiêu.',
        'Track your spending limits and stay on budget': 'Theo dõi giới hạn chi tiêu và kiểm soát ngân sách',
        'Set a spending limit for a category.': 'Đặt giới hạn chi tiêu cho một hạng mục.',
        'Update your budget details.': 'Cập nhật thông tin ngân sách.',
        'Get notified when spending reaches this percentage': 'Nhận thông báo khi chi tiêu đạt tỷ lệ này',
        'Create Budget': 'Tạo ngân sách',
        'Update Budget': 'Cập nhật ngân sách',
        'Select category': 'Chọn hạng mục',
        'Recurring': 'Định kỳ',
        'Recurring Transactions': 'Giao dịch định kỳ',
        'Add Recurring': 'Thêm định kỳ',
        'Edit Recurring': 'Sửa định kỳ',
        'Frequency': 'Tần suất',
        'Next Occurrence': 'Lần tiếp theo',
        'Day of Month': 'Ngày trong tháng',
        'Day of Week': 'Ngày trong tuần',
        'Pause': 'Tạm dừng',
        'Resume': 'Tiếp tục',
        'Paused': 'Đã tạm dừng',
        'Active': 'Đang hoạt động',
        'Every day': 'Hàng ngày',
        'Every week': 'Hàng tuần',
        'Every month': 'Hàng tháng',
        'Every year': 'Hàng năm',
        'Recurring transaction created successfully': 'Tạo giao dịch định kỳ thành công',
        'Recurring transaction updated successfully': 'Cập nhật giao dịch định kỳ thành công',
        'Recurring transaction deleted successfully': 'Xóa giao dịch định kỳ thành công',
        'No recurring transactions yet': 'Chưa có giao dịch định kỳ',
        'Set up automatic transactions for bills and subscriptions.': 'Thiết lập giao dịch tự động cho hóa đơn và đăng ký.',
        'Manage automatic transactions for bills and subscriptions': 'Quản lý giao dịch tự động cho hóa đơn và đăng ký',
        'Update your recurring transaction.': 'Cập nhật giao dịch định kỳ của bạn.',
        'Create Recurring': 'Tạo định kỳ',
        'Update Recurring': 'Cập nhật định kỳ',
        'Are you sure you want to delete this recurring transaction?': 'Bạn có chắc muốn xóa giao dịch định kỳ này?',
        'Status updated': 'Đã cập nhật trạng thái',
        'Select day': 'Chọn ngày',
        'Financial Reports': 'Báo cáo tài chính',
        'Analyze your spending patterns and trends': 'Phân tích mẫu chi tiêu và xu hướng của bạn',
        'Export PDF': 'Xuất PDF',
        'This Month': 'Tháng này',
        'Last Month': 'Tháng trước',
        'This Year': 'Năm nay',
        'Custom Range': 'Tùy chỉnh',
        'Total Income': 'Tổng thu nhập',
        'Total Expense': 'Tổng chi tiêu',
        'Net Balance': 'Số dư thuần',
        'Transaction Count': 'Số giao dịch',
        'Category Breakdown': 'Phân tích theo hạng mục',
        'Monthly Trends': 'Xu hướng theo tháng',
        'Top Expenses': 'Chi tiêu hàng đầu',
        'Downloading PDF...': 'Đang tải PDF...',
        'PDF downloaded successfully': 'Tải PDF thành công',
        'Charts': 'Biểu đồ',
        'Goals': 'Mục tiêu',
        'Savings Goals': 'Mục tiêu tiết kiệm',
        'Add Goal': 'Thêm mục tiêu',
        'Edit Goal': 'Sửa mục tiêu',
        'Target Amount': 'Số tiền mục tiêu',
        'Current Amount': 'Số tiền hiện tại',
        'Deadline': 'Hạn chốt',
        'Days Left': 'ngày còn lại',
        'Progress': 'Tiến độ',
        'Contribute': 'Đóng góp',
        'Add Contribution': 'Thêm đóng góp',
        'Contribution Amount': 'Số tiền đóng góp',
        'Goal Name': 'Tên mục tiêu',
        'Completed': 'Hoàn thành',
        'In Progress': 'Đang thực hiện',
        'Overdue': 'Quá hạn',
        'Goal created successfully': 'Đã tạo mục tiêu thành công',
        'Goal updated successfully': 'Đã cập nhật mục tiêu thành công',
        'Goal deleted successfully': 'Đã xóa mục tiêu thành công',
        'Contribution added successfully': 'Đã thêm đóng góp thành công',
        'No goals yet': 'Chưa có mục tiêu nào',
        'Set savings goals and track your progress.': 'Đặt mục tiêu tiết kiệm và theo dõi tiến độ của bạn.',
        'You have reached your goal!': 'Bạn đã đạt được mục tiêu!',
        'Start setting your financial goals and track your progress.': 'Bắt đầu đặt mục tiêu tài chính và theo dõi tiến độ.',
        'e.g., Emergency Fund': 'Ví dụ: Quỹ dự phòng',
        'Add notes about this goal...': 'Thêm ghi chú về mục tiêu này...',
        'Add money to your goal': 'Thêm tiền vào mục tiêu của bạn',
        'Add a note...': 'Thêm ghi chú...',
        'Are you sure you want to delete this goal?': 'Bạn có chắc muốn xóa mục tiêu này?',
        'Remaining': 'Còn lại',
        'Icon': 'Biểu tượng',
        'Adding...': 'Đang thêm...',
        'Upload Avatar': 'Tải lên ảnh đại diện',
        'Change Avatar': 'Thay đổi ảnh đại diện',
        'Avatar uploaded successfully': 'Đã tải lên ảnh đại diện thành công',
        'File too large. Max 2MB': 'File quá lớn. Tối đa 2MB',
        'Invalid file type. Use JPG or PNG': 'Loại file không hợp lệ. Sử dụng JPG hoặc PNG',
        'JPG or PNG. Max 2MB': 'JPG hoặc PNG. Tối đa 2MB',
        'Uploading...': 'Đang tải lên...',
        'Profile Picture': 'Ảnh đại diện',
        'Notifications': 'Thông báo',
        'unread': 'chưa đọc',
        'Budget Alert': 'Cảnh báo ngân sách',
        'You have exceeded 80% of your monthly budget': 'Bạn đã vượt quá 80% ngân sách tháng',
        'Goal Achieved': 'Đạt mục tiêu',
        'Congratulations! You reached your savings goal': 'Chúc mừng! Bạn đã đạt mục tiêu tiết kiệm',
        'Recurring Transaction': 'Giao dịch định kỳ',
        'Monthly subscription payment processed': 'Thanh toán đăng ký hàng tháng đã xử lý',
        'View all notifications': 'Xem tất cả thông báo'
    },
    en: {
        // Auth
        'Login': 'Login',
        'Register': 'Register',
        'Email': 'Email',
        'Password': 'Password',
        'Confirm Password': 'Confirm Password',
        'Full Name': 'Full Name',
        'Manage your personal expenses': 'Manage your personal expenses',
        'Sign In': 'Sign In',
        'Sign Up': 'Sign Up',
        'Already have an account?': 'Already have an account?',
        "Don't have an account?": "Don't have an account?",
        'Passwords do not match': 'Passwords do not match',
        'Logout': 'Logout',
        // Navigation
        'Dashboard': 'Dashboard',
        'Expenses': 'Expenses',
        'Categories': 'Categories',
        'Reports': 'Reports',
        'AI': 'AI',
        'Settings': 'Settings',
        // Dashboard
        'Total Income': 'Total Income',
        'Total Expense': 'Total Expense',
        'Total Balance': 'Total Balance',
        'Expense by Month': 'Expense by Month',
        'Expense by Category': 'Expense by Category',
        'Quick Add Transaction': 'Quick Add Transaction',
        // Expenses
        'Expense Management': 'Expense Management',
        'Date': 'Date',
        'Category': 'Category',
        'Amount': 'Amount',
        'Note': 'Note',
        'Add Transaction': 'Add Transaction',
        'Edit Transaction': 'Edit Transaction',
        'Delete Transaction': 'Delete Transaction',
        'Filter by Date': 'Filter by Date',
        'Filter by Category': 'Filter by Category',
        'Filter by Amount': 'Filter by Amount',
        'No transactions yet': 'No transactions yet',
        'Add': 'Add',
        'View All': 'View All',
        // Categories
        'Food': 'Food',
        'Transportation': 'Transportation',
        'Entertainment': 'Entertainment',
        'Utilities': 'Utilities',
        'Health': 'Health',
        'Education': 'Education',
        'Shopping': 'Shopping',
        'Other': 'Other',
        'Coming Soon': 'Coming Soon',
        // AI
        'AI Features': 'AI Features',
        'Auto Categorization': 'Auto Categorization',
        'Enter transaction description': 'Enter transaction description',
        'Suggested Category': 'Suggested Category',
        'Expense Prediction': 'Expense Prediction',
        'Saving Suggestions': 'Saving Suggestions',
        'No suggestions available': 'No suggestions available',
        // Settings
        'Language': 'Language',
        'User Information': 'User Information',
        'Expense updated successfully': 'Expense updated successfully',
        'Expense added successfully': 'Expense added successfully',
        'Are you sure you want to delete this expense?': 'Are you sure you want to delete this expense?',
        'Expense deleted successfully': 'Expense deleted successfully',
        'View and manage your transaction history.': 'View and manage your transaction history.',
        'Add Expense': 'Add Expense',
        'Profile updated successfully': 'Profile updated successfully',
        'Manage your account preferences and application settings.': 'Manage your account preferences and application settings.',
        'General': 'General',
        'Profile': 'Profile',
        'Security': 'Security',
        'Appearance': 'Appearance',
        'Customize the look and feel of the application.': 'Customize the look and feel of the application.',
        'Theme': 'Theme',
        'Select your preferred language.': 'Select your preferred language.',
        'Select Language': 'Select Language',
        'Profile Information': 'Profile Information',
        'Update your personal information.': 'Update your personal information.',
        'Save Changes': 'Save Changes',
        'Current Password': 'Current Password',
        'New Password': 'New Password',
        'Change Password': 'Change Password',
        'Danger Zone': 'Danger Zone',
        'Account Information': 'Account Information',
        'Filters': 'Filters',
        'Clear': 'Clear',
        'All': 'All',
        'Max Amount': 'Max Amount',
        'Actions': 'Actions',
        'Edit': 'Edit',
        'Delete': 'Delete',
        'No transactions found': 'No transactions found',
        'Title': 'Title',
        'Add New Expense': 'Add New Expense',
        'Edit Expense': 'Edit Expense',
        'Update the details of your expense.': 'Update the details of your expense.',
        'Enter the details of your expense here.': 'Enter the details of your expense here.',
        'Update Expense': 'Update Expense',
        'Save Expense': 'Save Expense',
        'AI-powered prediction for next month\'s spending.': 'AI-powered prediction for next month\'s spending.',
        'Predicted Total': 'Predicted Total',
        'Trend': 'Trend',
        'AI Assistant': 'AI Assistant',
        'Leverage AI to analyze, predict, and optimize your finances.': 'Leverage AI to analyze, predict, and optimize your finances.',
        'Smart Classification': 'Smart Classification',
        'Enter a transaction description and let AI categorize it for you.': 'Enter a transaction description and let AI categorize it for you.',
        'Description': 'Description',
        'Add Category': 'Add Category',
        'Edit Category': 'Edit Category',
        'Category Name': 'Category Name',
        'Create a new category to organize your expenses.': 'Create a new category to organize your expenses.',
        'Update the details of your category.': 'Update the details of your category.',
        'Category created successfully': 'Category created successfully',
        'Category updated successfully': 'Category updated successfully',
        'Category deleted successfully': 'Category deleted successfully',
        'Are you sure you want to delete this category?': 'Are you sure you want to delete this category?',
        'Custom category': 'Custom category',
        'No custom categories yet': 'No custom categories yet',
        'Create your first custom category to better organize your expenses.': 'Create your first custom category to better organize your expenses.',
        'Manage your expense categories and budgets': 'Manage your expense categories and budgets',
        'Default Categories': 'Default Categories',
        'Custom Categories': 'Custom Categories',
        'Are you sure?': 'Are you sure?',
        'This action cannot be undone.': 'This action cannot be undone.',
        'Cancel': 'Cancel',
        'Deleting...': 'Deleting...',
        'Budgets': 'Budgets',
        'Budget Management': 'Budget Management',
        'Add Budget': 'Add Budget',
        'Edit Budget': 'Edit Budget',
        'Budget Amount': 'Budget Amount',
        'Period': 'Period',
        'Alert Threshold': 'Alert Threshold',
        'Daily': 'Daily',
        'Weekly': 'Weekly',
        'Monthly': 'Monthly',
        'Yearly': 'Yearly',
        'Start Date': 'Start Date',
        'End Date': 'End Date',
        'Optional': 'Optional',
        'Spent': 'Spent',
        'Budget': 'Budget',
        'Remaining': 'Remaining',
        'Over Budget': 'Over Budget',
        'On Track': 'On Track',
        'Warning': 'Warning',
        'Exceeded': 'Exceeded',
        'Budget created successfully': 'Budget created successfully',
        'Budget updated successfully': 'Budget updated successfully',
        'Budget deleted successfully': 'Budget deleted successfully',
        'No budgets yet': 'No budgets yet',
        'Create your first budget to track spending limits.': 'Create your first budget to track spending limits.',
        'Track your spending limits and stay on budget': 'Track your spending limits and stay on budget',
        'Set a spending limit for a category.': 'Set a spending limit for a category.',
        'Update your budget details.': 'Update your budget details.',
        'Get notified when spending reaches this percentage': 'Get notified when spending reaches this percentage',
        'Create Budget': 'Create Budget',
        'Update Budget': 'Update Budget',
        'Select category': 'Select category',
        'Recurring': 'Recurring',
        'Recurring Transactions': 'Recurring Transactions',
        'Add Recurring': 'Add Recurring',
        'Edit Recurring': 'Edit Recurring',
        'Frequency': 'Frequency',
        'Next Occurrence': 'Next Occurrence',
        'Day of Month': 'Day of Month',
        'Day of Week': 'Day of Week',
        'Pause': 'Pause',
        'Resume': 'Resume',
        'Paused': 'Paused',
        'Active': 'Active',
        'Every day': 'Every day',
        'Every week': 'Every week',
        'Every month': 'Every month',
        'Every year': 'Every year',
        'Recurring transaction created successfully': 'Recurring transaction created successfully',
        'Recurring transaction updated successfully': 'Recurring transaction updated successfully',
        'Recurring transaction deleted successfully': 'Recurring transaction deleted successfully',
        'No recurring transactions yet': 'No recurring transactions yet',
        'Set up automatic transactions for bills and subscriptions.': 'Set up automatic transactions for bills and subscriptions.',
        'Manage automatic transactions for bills and subscriptions': 'Manage automatic transactions for bills and subscriptions',
        'Update your recurring transaction.': 'Update your recurring transaction.',
        'Create Recurring': 'Create Recurring',
        'Update Recurring': 'Update Recurring',
        'Are you sure you want to delete this recurring transaction?': 'Are you sure you want to delete this recurring transaction?',
        'Status updated': 'Status updated',
        'Select day': 'Select day',
        'Financial Reports': 'Financial Reports',
        'Analyze your spending patterns and trends': 'Analyze your spending patterns and trends',
        'Export PDF': 'Export PDF',
        'This Month': 'This Month',
        'Last Month': 'Last Month',
        'This Year': 'This Year',
        'Custom Range': 'Custom Range',
        'Total Income': 'Total Income',
        'Total Expense': 'Total Expense',
        'Net Balance': 'Net Balance',
        'Transaction Count': 'Transaction Count',
        'Category Breakdown': 'Category Breakdown',
        'Monthly Trends': 'Monthly Trends',
        'Top Expenses': 'Top Expenses',
        'Downloading PDF...': 'Downloading PDF...',
        'PDF downloaded successfully': 'PDF downloaded successfully',
        'Charts': 'Charts',
        'Goals': 'Goals',
        'Savings Goals': 'Savings Goals',
        'Add Goal': 'Add Goal',
        'Edit Goal': 'Edit Goal',
        'Target Amount': 'Target Amount',
        'Current Amount': 'Current Amount',
        'Deadline': 'Deadline',
        'Days Left': 'days left',
        'Progress': 'Progress',
        'Contribute': 'Contribute',
        'Add Contribution': 'Add Contribution',
        'Contribution Amount': 'Contribution Amount',
        'Goal Name': 'Goal Name',
        'Completed': 'Completed',
        'In Progress': 'In Progress',
        'Overdue': 'Overdue',
        'Goal created successfully': 'Goal created successfully',
        'Goal updated successfully': 'Goal updated successfully',
        'Goal deleted successfully': 'Goal deleted successfully',
        'Contribution added successfully': 'Contribution added successfully',
        'No goals yet': 'No goals yet',
        'Set savings goals and track your progress.': 'Set savings goals and track your progress.',
        'You have reached your goal!': 'You have reached your goal!',
        'Start setting your financial goals and track your progress.': 'Start setting your financial goals and track your progress.',
        'e.g., Emergency Fund': 'e.g., Emergency Fund',
        'Add notes about this goal...': 'Add notes about this goal...',
        'Add money to your goal': 'Add money to your goal',
        'Add a note...': 'Add a note...',
        'Are you sure you want to delete this goal?': 'Are you sure you want to delete this goal?',
        'Remaining': 'Remaining',
        'Icon': 'Icon',
        'Adding...': 'Adding...',
        'Upload Avatar': 'Upload Avatar',
        'Change Avatar': 'Change Avatar',
        'Avatar uploaded successfully': 'Avatar uploaded successfully',
        'File too large. Max 2MB': 'File too large. Max 2MB',
        'Invalid file type. Use JPG or PNG': 'Invalid file type. Use JPG or PNG',
        'JPG or PNG. Max 2MB': 'JPG or PNG. Max 2MB',
        'Uploading...': 'Uploading...',
        'Profile Picture': 'Profile Picture',
        'Notifications': 'Notifications',
        'unread': 'unread',
        'Budget Alert': 'Budget Alert',
        'You have exceeded 80% of your monthly budget': 'You have exceeded 80% of your monthly budget',
        'Goal Achieved': 'Goal Achieved',
        'Congratulations! You reached your savings goal': 'Congratulations! You reached your savings goal',
        'Recurring Transaction': 'Recurring Transaction',
        'Monthly subscription payment processed': 'Monthly subscription payment processed',
        'View all notifications': 'View all notifications'
    }
};
}),
"[project]/app/context/language-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('vi');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const saved = localStorage.getItem('language') || 'vi';
        setLanguage(saved);
        setMounted(true);
    }, []);
    const t = (key)=>{
        const translation = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][language]?.[key];
        return translation || key;
    };
    const handleSetLanguage = (lang)=>{
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage: handleSetLanguage,
            t
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/language-context.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
function useLanguage() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        return {
            language: 'vi',
            setLanguage: ()=>{},
            t: (key)=>key
        };
    }
    return context;
}
}),
"[project]/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/hooks/use-toast.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reducer",
    ()=>reducer,
    "toast",
    ()=>toast,
    "useToast",
    ()=>useToast
]);
// Inspired by react-hot-toast library
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 5000;
const actionTypes = {
    ADD_TOAST: 'ADD_TOAST',
    UPDATE_TOAST: 'UPDATE_TOAST',
    DISMISS_TOAST: 'DISMISS_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST'
};
let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}
const toastTimeouts = new Map();
const addToRemoveQueue = (toastId)=>{
    if (toastTimeouts.has(toastId)) {
        return;
    }
    const timeout = setTimeout(()=>{
        toastTimeouts.delete(toastId);
        dispatch({
            type: 'REMOVE_TOAST',
            toastId: toastId
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
};
const reducer = (state, action)=>{
    switch(action.type){
        case 'ADD_TOAST':
            return {
                ...state,
                toasts: [
                    action.toast,
                    ...state.toasts
                ].slice(0, TOAST_LIMIT)
            };
        case 'UPDATE_TOAST':
            return {
                ...state,
                toasts: state.toasts.map((t)=>t.id === action.toast.id ? {
                        ...t,
                        ...action.toast
                    } : t)
            };
        case 'DISMISS_TOAST':
            {
                const { toastId } = action;
                // ! Side effects ! - This could be extracted into a dismissToast() action,
                // but I'll keep it here for simplicity
                if (toastId) {
                    addToRemoveQueue(toastId);
                } else {
                    state.toasts.forEach((toast)=>{
                        addToRemoveQueue(toast.id);
                    });
                }
                return {
                    ...state,
                    toasts: state.toasts.map((t)=>t.id === toastId || toastId === undefined ? {
                            ...t,
                            open: false
                        } : t)
                };
            }
        case 'REMOVE_TOAST':
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: []
                };
            }
            return {
                ...state,
                toasts: state.toasts.filter((t)=>t.id !== action.toastId)
            };
    }
};
const listeners = [];
let memoryState = {
    toasts: []
};
function dispatch(action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener)=>{
        listener(memoryState);
    });
}
function toast({ ...props }) {
    const id = genId();
    const update = (props)=>dispatch({
            type: 'UPDATE_TOAST',
            toast: {
                ...props,
                id
            }
        });
    const dismiss = ()=>dispatch({
            type: 'DISMISS_TOAST',
            toastId: id
        });
    dispatch({
        type: 'ADD_TOAST',
        toast: {
            ...props,
            id,
            open: true,
            onOpenChange: (open)=>{
                if (!open) dismiss();
            }
        }
    });
    return {
        id: id,
        dismiss,
        update
    };
}
function useToast() {
    const [state, setState] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](memoryState);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        listeners.push(setState);
        return ()=>{
            const index = listeners.indexOf(setState);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, [
        state
    ]);
    return {
        ...state,
        toast,
        dismiss: (toastId)=>dispatch({
                type: 'DISMISS_TOAST',
                toastId
            })
    };
}
;
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/components/ui/toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast,
    "ToastAction",
    ()=>ToastAction,
    "ToastClose",
    ()=>ToastClose,
    "ToastDescription",
    ()=>ToastDescription,
    "ToastProvider",
    ()=>ToastProvider,
    "ToastTitle",
    ()=>ToastTitle,
    "ToastViewport",
    ()=>ToastViewport
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
const ToastProvider = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"];
const ToastViewport = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastViewport.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"].displayName;
const toastVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full', {
    variants: {
        variant: {
            default: 'border bg-background text-foreground',
            destructive: 'destructive group border-destructive bg-destructive text-destructive-foreground',
            success: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-50',
            warning: 'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-50',
            info: 'border-blue-500 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-50'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
const Toast = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(toastVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
Toast.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"].displayName;
const ToastAction = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 65,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastAction.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Action"].displayName;
const ToastClose = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600', className),
        "toast-close": "",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/toast.tsx",
            lineNumber: 89,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 80,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastClose.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Close"].displayName;
const ToastTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 98,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"].displayName;
const ToastDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-sm opacity-90', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/toast.tsx",
        lineNumber: 110,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
ToastDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"].displayName;
;
}),
"[project]/components/ui/toaster.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/toast.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
function Toaster() {
    const { toasts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useToast"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastProvider"], {
        children: [
            toasts.map(function({ id, title, description, action, ...props }) {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toast"], {
                    ...props,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-1",
                            children: [
                                title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastTitle"], {
                                    children: title
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 22,
                                    columnNumber: 25
                                }, this),
                                description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastDescription"], {
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/toaster.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 21,
                            columnNumber: 13
                        }, this),
                        action,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastClose"], {}, void 0, false, {
                            fileName: "[project]/components/ui/toaster.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this)
                    ]
                }, id, true, {
                    fileName: "[project]/components/ui/toaster.tsx",
                    lineNumber: 20,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$toast$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ToastViewport"], {}, void 0, false, {
                fileName: "[project]/components/ui/toaster.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/toaster.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc341a85._.js.map