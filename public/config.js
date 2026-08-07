// KyuuApi - Supabase Configuration
window.CONFIG = {
    SUPABASE_URL: "https://dswwidruxfdyzmatwwui.supabase.co",
    SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzd3dpZHJ1eGZkeXptYXR3d3VpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNDI5NzMsImV4cCI6MjEwMTYxODk3M30.hfmbuiLD3Zirrz07TJS2Ya5MiEooMU6F32anT8OSX-s",
    SITE_NAME: "KyuuApi",
    SITE_URL: "https://kyuuapi.eu.cc",
    DEFAULT_AVATAR: "https://via.placeholder.com/150",
    API_BASE: "/api/v1",
    PLANS: {
        free: {
            name: "Free",
            requests: 100,
            price: 0,
            currency: "IDR",
            color: "#8b5cf6",
            features: ["100 requests/hari", "Dokumentasi lengkap", "Support community"]
        },
        premium: {
            name: "Premium",
            requests: 10000,
            price: 50000,
            currency: "IDR",
            color: "#eab308",
            features: ["10.000 requests/hari", "Custom API Key", "Priority Support", "Akses semua endpoint", "Tidak ada limitasi"]
        }
    }
};

// Inisialisasi secara Global agar aman dari error "undefined"
if (typeof window.supabase !== 'undefined') {
    window.supabaseClient = window.supabase.createClient(
        window.CONFIG.SUPABASE_URL,
        window.CONFIG.SUPABASE_ANON_KEY
    );
} else {
    console.error("❌ CDN Supabase belum ter-load!");
}
