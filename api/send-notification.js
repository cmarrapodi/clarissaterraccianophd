export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { clientName, clientEmail, clientPhone, serviceTitle, sessionDate, sessionTime, notes } = req.body;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  try {
    // Email to Clarissa
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Clarissa Terracciano <onboarding@resend.dev>',
        to: 'terraccianophd@gmail.com',
        subject: `New Booking: ${serviceTitle}`,
        html: `
          <h2>New Booking Received</h2>
          <p><strong>Service:</strong> ${serviceTitle}</p>
          <p><strong>Date:</strong> ${sessionDate}</p>
          <p><strong>Time:</strong> ${sessionTime}</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${clientEmail}</p>
          <p><strong>Phone:</strong> ${clientPhone || 'Not provided'}</p>
          <p><strong>Notes:</strong> ${notes || 'None'}</p>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errText = await adminEmailResponse.text();
      throw new Error(`Resend API error: ${errText}`);
    }

    // Confirmation email to client
    const clientEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:'Clarissa Terracciano <onboarding@resend.dev>',
        to: clientEmail,
        subject: `Your booking is confirmed — ${serviceTitle}`,
        html: `
          <h2>Your booking is confirmed!</h2>
          <p>Hi ${clientName},</p>
          <p>Thank you for booking with Dr. Clarissa Terracciano. Here are your session details:</p>
          <p><strong>Service:</strong> ${serviceTitle}</p>
          <p><strong>Date:</strong> ${sessionDate}</p>
          <p><strong>Time:</strong> ${sessionTime} ET</p>
          <p>Your session will be conducted via Zoom. Dr. Terracciano will send you a Zoom link before your session.</p>
          <p>If you need to reschedule or have any questions, please reply to this email.</p>
          <br/>
          <p>Warm regards,</p>
          <p><strong>Dr. Clarissa Terracciano</strong><br/>Educational Consultant</p>
        `,
      }),
    });

    if (!clientEmailResponse.ok) {
      const errText = await clientEmailResponse.text();
      throw new Error(`Resend API error: ${errText}`);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: error.message });
  }
}
