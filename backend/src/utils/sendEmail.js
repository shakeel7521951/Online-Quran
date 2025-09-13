import sgMail from "@sendgrid/mail";

// Load API key
const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  console.error(" SENDGRID_API_KEY is missing from environment variables");
} else {
  // show only first 8 characters for debugging
  console.log(" SENDGRID_API_KEY loaded, starts with:", apiKey.substring(0, 8));
}

sgMail.setApiKey(apiKey);

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    console.log(" Preparing to send email...");
    console.log("   To:", to);
    console.log("   From:", process.env.EMAIL_FROM);
    console.log("   Subject:", subject);

    const response = await sgMail.send({
      to,
      from: process.env.EMAIL_FROM, // must be a verified sender
      subject,
      text,
      html,
    });

    console.log(" Email sent successfully:", response[0].statusCode);
    return true;
  } catch (err) {
    console.error(" SendGrid error:");
    if (err.response?.body) {
      console.error(JSON.stringify(err.response.body, null, 2));
    } else {
      console.error(err.message || err);
    }
    throw new Error("Email sending failed");
  }
};
