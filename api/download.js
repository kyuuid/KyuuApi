// File: api/download.js

export default async function handler(req, res) {
    // 1. Pastikan response selalu JSON
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        return res.status(405).json({ 
            status: false, 
            creator: "KyuuApi",
            message: "Gunakan method GET!" 
        });
    }

    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ 
                status: false, 
                creator: "KyuuApi",
                message: "Parameter 'url' wajib diisi!" 
            });
        }

        // Validasi URL
        let parsedUrl;
        try {
            parsedUrl = new URL(url);
        } catch (e) {
            return res.status(400).json({ 
                status: false, 
                creator: "KyuuApi",
                message: "Format URL tidak valid! Pastikan diawali dengan http/https." 
            });
        }

        // Filter domain khusus venst.zone.id
        if (parsedUrl.hostname !== 'venst.zone.id') {
            return res.status(403).json({ 
                status: false, 
                creator: "KyuuApi",
                message: "Akses ditolak! Endpoint ini hanya mendukung link download dari domain venst.zone.id." 
            });
        }

        const targetApi = `https://venst.zone.id/api/download?url=${encodeURIComponent(url)}`;
        
        const response = await fetch(targetApi, {
            method: 'GET',
            headers: {
                'User-Agent': 'KyuuApi-Vercel-Proxy'
            }
        });
        
        // 2. Parsing dengan aman (mencegah crash kalau venst down dan ngasih HTML)
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return res.status(response.status).json(data);
        } else {
            const textData = await response.text();
            return res.status(502).json({
                status: false,
                creator: "KyuuApi",
                message: "Target API (venst.zone.id) tidak merespons dengan JSON yang valid.",
                error_detail: textData.substring(0, 100)
            });
        }

    } catch (error) {
        // 3. Error tak terduga
        return res.status(500).json({ 
            status: false, 
            creator: "KyuuApi",
            message: "Gagal memproses request ke server target.", 
            error: error.message 
        });
    }
}
