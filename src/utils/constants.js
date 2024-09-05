import { Platform } from "react-native"

const DATE_FORMAT = 'YYYY-MM-DD'

const USDT_ID = "TU6oQumHcAyAsgzxynz7N9gmd9Ppx4rMrg"
const BTC_ID = "39PW5qm5U6Y9agnrGVoHEt6xBeiE5KNTcJ"

const SKU_LIST = Platform.select({
    ios: {
        monthly: { sku: "com.onion.ios.onionmonthly", type: 'monthly', price: '$ 9.99', duration: 1 },
        quarterly: { sku: "com.onion.ios.quarterly", type: 'quarterly', price: '$ 24.99', duration: 3 },
        yearly: { sku: "com.onion.ios.yearly", type: 'yearly', price: '$ 89.99', duration: 12 },
    },
    android: {
        monthly: { sku: "com.onion.android.monthly", type: 'monthly', price: '$ 9.99', duration: 1 },
        quarterly: { sku: "com.onion.android.quarterly", type: 'quarterly', price: '$ 24.99', duration: 3 },
        quaterly: { sku: "com.onion.android.quaterly", type: 'quaterly', price: '$ 24.99', duration: 3 },
        yearly: { sku: "com.onion.android.yearly", type: 'yearly', price: '$ 89.99', duration: 12 },
    }
})

const PLANS = ["monthly", "quarterly", "yearly"]

const SKU_IDs = Platform.select({
    ios: ["com.onion.ios.onionmonthly", "com.onion.ios.quarterly", "com.onion.ios.yearly"],
    android: ["com.onion.android.monthly", "com.onion.android.quarterly", "com.onion.android.quaterly", "com.onion.android.yearly"],
})

const PAYMENT_TEXT = Platform.select({
    ios: "Apple",
    android: "Google",
})

export {
    USDT_ID,
    BTC_ID,
    PLANS,
    SKU_LIST,
    SKU_IDs,
    PAYMENT_TEXT,
    DATE_FORMAT
}