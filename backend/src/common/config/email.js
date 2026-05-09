import nodemailer from "nodemailer"

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  //we use mailtrap
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});





const sendMail = async(to,subject,html) => {
  
  await transporter.sendMail({
    from: `${process.env.SMTP_FROM_EMAIL}`,
    to,subject,html
  })
  console.log("Email send to :",to)
}

const sendVerificationEmail = async(email,name,token) => {
  const url = `${process.env.CLIENT_ID}/verify-email/${token}`
    const html = `
      <html>
        <body>
          <h2>Email Verification</h2>
          <p>Hello,${name}</p>
          <p>Click <a href=${url}>here</a> to verify your email.</p>
        </body>
      </html>
    `
  sendMail(email,"Verify your email",html)
}
const sendResetPasswordEmail = async(email,name,token) => {
  const url = `${process.env.CLIENT_ID}/reset-password/${token}`
    const html = `
      <html>
        <body>
          <h2>Reset Password</h2>
          <p>Hello,${name}</p>
          <p>Click <a href=${url}>here</a> to reset your password. This link expires in 15 minutes</p>
        </body>
      </html>
    `
  sendMail(email,"Reset your password",html)
}

export {sendMail,sendVerificationEmail,sendResetPasswordEmail}