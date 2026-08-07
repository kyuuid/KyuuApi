// File: api/tourl.js

export default async function handler(req, res) {
    // 1. Pastikan response dari Vercel selalu JSON
    res.setHeader('Content-Type', 'application/json');

    try {
        const targetUrl = 'https://venst.zone.id/api/tourl';
        
        const queryString = new URLSearchParams(req.query).toString();
        const finalUrl = queryString ? `${targetUrl}?${queryString}` : targetUrl;

        const options = {
            method: req.method,
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/json',
                'User-Agent': 'KyuuApi-Vercel-Proxy'
            }
        };

        if (req.method !== 'GET' && req.method !== 'HEAD') {
            options.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
        }

        const response = await fetch(finalUrl, options);
        
        // 2. Cek apakah hasil dari venst beneran JSON
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return res.status(response.status).json(data);
        } else {
            // Kalau target API malah ngasih HTML/Text (misal lagi error 502/404)
            const textData = await response.text();
            return res.status(502).json({
                status: false,
                creator: "KyuuApi",
                message: "Target API (venst.zone.id) tidak merespons dengan JSON yang valid.",
                error_detail: textData.substring(0, 100) // Ambil sedikit pesan errornya
            });
        }

    } catch (error) {
        // 3. Error dari internal server / jaringan Vercel
        return res.status(500).json({ 
            status: false,
            creator: "KyuuApi",
            message: "Terjadi kesalahan pada server internal API.", 
            error: error.message 
        });
    }
}
