import nodemailer from 'nodemailer';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.APP_EMAIL,
      pass: process.env.APP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'info@internalized.blog',
      subject: 'Contact Form Submission',
      text: `${name} (${email}) says: ${message}`,
      html: `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    res.status(200).json(req.body);
    res.send();
  } catch (err) {
    console.error(err);
    res.status(500).json(req.body);
    res.send();
  }
};
