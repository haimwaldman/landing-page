import nodemailer from 'nodemailer';

export const sendMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your.email@gmail.com',
      pass: 'your_app_password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'your.target@email.com',
    subject: `New Contact Message from ${name}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send('Email failed');
  }
};
