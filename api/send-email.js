import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, plan, category } = request.body;

  try {
    const data = await resend.emails.send({
      from: 'Indian Writers League <no_reply@inkfetish.in>',
      to: [email],
      subject: `You're In! Welcome to the Indian Writers League 🏆`,
      html: `
        <div style="font-family: 'Georgia', serif; color: #1a0505; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f8f5f2; border: 1px solid #d4c5b5;">
          
          <div style="text-align: center; padding: 40px 20px; background: linear-gradient(to bottom, #8B0000, #5e4b35);">
             <h1 style="color: #f8f5f2; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; margin: 0;">Indian Writers League</h1>
             <p style="color: #e0c9a6; font-size: 14px; margin-top: 10px; font-style: italic;">Season 1: The Beginning</p>
          </div>

          <div style="background: white; padding: 40px 30px; border-bottom: 4px solid #8B0000;">
            <p style="font-size: 18px; line-height: 1.6; color: #1a0505;"><strong>Dear ${name},</strong></p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a;">
              Thank you for registering. You have just taken the first step towards making history. We are thrilled to welcome you to India's biggest writing arena.
            </p>

            <div style="background: #fdfbf7; border: 1px solid #e0c9a6; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <h3 style="color: #8B0000; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Registration Confirmed</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0; color: #5e4b35; font-size: 14px;"><strong>Pass Type:</strong></td>
                  <td style="padding: 5px 0; color: #1a0505; font-size: 14px;">${plan}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #5e4b35; font-size: 14px;"><strong>Category:</strong></td>
                  <td style="padding: 5px 0; color: #1a0505; font-size: 14px;">${category}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #4a4a4a;">
              <strong>What Happens Next?</strong><br/>
              Keep an eye on your inbox. Within the next 24 hours, you will receive two important things:
            </p>
            <ul style="color: #4a4a4a; font-size: 16px; line-height: 1.6;">
              <li>Your Official Dashboard Access Link</li>
              <li>Detailed Submission Guidelines</li>
            </ul>

            <p style="font-size: 16px; line-height: 1.6; margin-top: 30px; color: #4a4a4a;">
              Get your pens ready. The world is waiting to hear your story.
            </p>

            <div style="margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
              <p style="font-size: 14px; margin: 0; color: #1a0505;"><strong>Warm Regards,</strong></p>
              <p style="font-size: 14px; margin: 5px 0; color: #5e4b35;">Team Indian Writers League</p>
              <p style="font-size: 12px; margin: 5px 0; color: #888;">(Powered by Inkfetish & Authorverse)</p>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; background-color: #f8f5f2; color: #8B0000; font-size: 12px;">
            &copy; ${new Date().getFullYear()} Indian Writers League. All rights reserved.
          </div>
        </div>
      `
    });

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
