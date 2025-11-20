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
        auth: {
            login: 'Đăng Nhập',
            register: 'Đăng Ký',
            email: 'Email',
            password: 'Mật khẩu',
            confirmPassword: 'Xác nhận mật khẩu',
            fullName: 'Họ tên',
            loginDescription: 'Quản lý chi tiêu cá nhân của bạn',
            signIn: 'Đăng nhập',
            signUp: 'Đăng ký',
            alreadyHaveAccount: 'Đã có tài khoản?',
            noAccount: 'Chưa có tài khoản?',
            passwordMismatch: 'Mật khẩu không khớp'
        },
        dashboard: {
            title: 'Bảng điều khiển',
            totalIncome: 'Tổng thu nhập',
            totalExpense: 'Tổng chi tiêu',
            balance: 'Số dư',
            expenseByMonth: 'Chi tiêu theo tháng',
            expenseByCategory: 'Tỷ lệ chi tiêu theo danh mục',
            quickAddTransaction: 'Thêm giao dịch nhanh'
        },
        expenses: {
            title: 'Quản lý chi tiêu',
            date: 'Ngày',
            category: 'Danh mục',
            amount: 'Số tiền',
            note: 'Ghi chú',
            add: 'Thêm giao dịch',
            edit: 'Sửa giao dịch',
            delete: 'Xóa giao dịch',
            filterByDate: 'Lọc theo ngày',
            filterByCategory: 'Lọc theo danh mục',
            filterByAmount: 'Lọc theo số tiền',
            noExpenses: 'Chưa có giao dịch nào'
        },
        ai: {
            title: 'AI Hỗ trợ',
            autoCategory: 'Tự động phân loại',
            enterDescription: 'Nhập mô tả giao dịch',
            suggestedCategory: 'Danh mục gợi ý',
            prediction: 'Dự đoán chi tiêu',
            savingSuggestions: 'Gợi ý tiết kiệm',
            noSuggestions: 'Không có gợi ý nào'
        },
        settings: {
            title: 'Cài đặt',
            language: 'Ngôn ngữ',
            userInfo: 'Thông tin người dùng',
            logout: 'Đăng xuất'
        },
        navigation: {
            dashboard: 'Bảng điều khiển',
            expenses: 'Chi tiêu',
            ai: 'AI',
            settings: 'Cài đặt'
        },
        categories: {
            food: 'Ăn uống',
            transportation: 'Giao thông',
            entertainment: 'Giải trí',
            utilities: 'Hóa đơn',
            health: 'Sức khỏe',
            education: 'Giáo dục',
            shopping: 'Mua sắm',
            other: 'Khác'
        }
    },
    en: {
        auth: {
            login: 'Login',
            register: 'Register',
            email: 'Email',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            fullName: 'Full Name',
            loginDescription: 'Manage your personal expenses',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            alreadyHaveAccount: 'Already have an account?',
            noAccount: "Don't have an account?",
            passwordMismatch: 'Passwords do not match'
        },
        dashboard: {
            title: 'Dashboard',
            totalIncome: 'Total Income',
            totalExpense: 'Total Expense',
            balance: 'Balance',
            expenseByMonth: 'Expense by Month',
            expenseByCategory: 'Expense by Category',
            quickAddTransaction: 'Quick Add Transaction'
        },
        expenses: {
            title: 'Expense Management',
            date: 'Date',
            category: 'Category',
            amount: 'Amount',
            note: 'Note',
            add: 'Add Transaction',
            edit: 'Edit Transaction',
            delete: 'Delete Transaction',
            filterByDate: 'Filter by Date',
            filterByCategory: 'Filter by Category',
            filterByAmount: 'Filter by Amount',
            noExpenses: 'No transactions yet'
        },
        ai: {
            title: 'AI Features',
            autoCategory: 'Auto Categorization',
            enterDescription: 'Enter transaction description',
            suggestedCategory: 'Suggested Category',
            prediction: 'Expense Prediction',
            savingSuggestions: 'Saving Suggestions',
            noSuggestions: 'No suggestions available'
        },
        settings: {
            title: 'Settings',
            language: 'Language',
            userInfo: 'User Information',
            logout: 'Logout'
        },
        navigation: {
            dashboard: 'Dashboard',
            expenses: 'Expenses',
            ai: 'AI',
            settings: 'Settings'
        },
        categories: {
            food: 'Food',
            transportation: 'Transportation',
            entertainment: 'Entertainment',
            utilities: 'Utilities',
            health: 'Health',
            education: 'Education',
            shopping: 'Shopping',
            other: 'Other'
        }
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
        const keys = key.split('.');
        let value = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translations"][language];
        for (const k of keys){
            value = value?.[k];
        }
        return value || key;
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
        lineNumber: 41,
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
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6c2391a7._.js.map