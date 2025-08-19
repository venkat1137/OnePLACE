const nodemailer = require('nodemailer');

module.exports = async function (context, req) {
  try {
    const { name, email, company, message } = req.body || {};
    if (!name || !email || !message) {
      context.res = { status: 400, body: { error: 'Missing required fields: name, email, message' } };
      return;
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const to = process.env.MAIL_TO || 'info@oneplacetech.com';
    const from = process.env.MAIL_FROM || `ONEPLACE TechSolutions <no-reply@oneplacetech.com>`;

    if (!smtpHost || !smtpUser || !smtpPass) {
      context.res = { status: 500, body: { error: 'SMTP environment not configured' } };
      return;
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass }
    });

    const info = await transporter.sendMail({
      from,
      to,
      subject: `New contact form from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || ''}\n\nMessage:\n${message}`,
    });

    context.res = { status: 200, body: { ok: true, id: info.messageId } };
  } catch (err) {
    context.log('Send error', err);
    context.res = { status: 500, body: { error: err.message } };
  }
};
