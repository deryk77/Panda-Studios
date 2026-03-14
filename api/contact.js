const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ ok: false, error: 'Method not allowed' });
    }

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ ok: false, error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ ok: false, error: 'Invalid email address' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailBody = [
        'New contact form submission from pandastudios.co',
        '─────────────────────────────────────',
        '',
        `Name:    ${name}`,
        `Email:   ${email}`,
        '',
        'Message:',
        message,
        '',
        '─────────────────────────────────────',
        `Submitted: ${new Date().toUTCString()}`,
    ].join('\n');

    try {
        await transporter.sendMail({
            from: `"Panda Studios Website" <${process.env.GMAIL_USER}>`,
            to: 'pandastudios77@gmail.com',
            replyTo: `${name} <${email}>`,
            subject: `New Brief from ${name} — Panda Studios Website`,
            text: mailBody,
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Mail error:', err.message);
        return res.status(500).json({ ok: false, error: 'Mail server error' });
    }
};
