import axios from 'axios'
const sendMail = async (to, subject, html) => {
    try {
        await axios.post('https://api.brevo.com/v3/smtp/email', {
            sender: { email: process.env.SMTP_FROM_EMAIL },
            to: [{ email: to }],
            subject,
            htmlContent: html
        }, {
            headers: {
                'api-key': process.env.BREVO_API_KEY,
                'Content-Type': 'application/json'
            }
        })
        console.log("Email sent to:", to)
    } catch (error) {
        console.log("Email error:", error.response?.data || error.message)
    }
}

const sendVerificationEmail = async(email,name,token) => {
  const url = `${process.env.CLIENT_URL}/verify-email/${token}`
    const html = `
      <html>
        <body>
          <h2>Email Verification</h2>
          <p>Hello,${name}</p>
          <p>Click <a href=${url}>${url}</a> to verify your email.</p>
        </body>
      </html>
    `
  sendMail(email,"Verify your email",html)
}
const sendResetPasswordEmail = async(email,name,token) => {
  const url = `${process.env.CLIENT_URL}/reset-password/${token}`
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