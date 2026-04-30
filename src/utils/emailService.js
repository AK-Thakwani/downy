const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendOrderConfirmation = async (customerEmail, orderId, customerName, orderDetails) => {
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const trackingLink = `${appUrl}/track?orderId=${orderId}`;

    const mailOptions = {
        from: `"DownyShoes Store" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: `Order Confirmation - #${orderId} - DownyShoes`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #18181b; margin-bottom: 5px;">DownyShoes</h1>
                    <p style="color: #22c55e; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">Order Confirmed</p>
                </div>

                <h2 style="font-size: 24px; font-weight: 800; color: #18181b;">Thank you, ${customerName}!</h2>
                <p style="font-size: 16px; line-height: 1.6;">We've received your order and our team is getting it ready. You'll receive another email once it has been shipped.</p>

                <div style="background-color: #fdfcf0; padding: 20px; border-radius: 10px; margin: 25px 0;">
                    <p style="margin: 0; font-size: 14px; color: #52525b;">Your Order ID:</p>
                    <h3 style="margin: 5px 0 0; font-size: 20px; color: #18181b;">#${orderId}</h3>
                </div>

                <div style="text-align: center; margin: 35px 0;">
                    <a href="${trackingLink}" style="background-color: #18181b; color: #bcff2f; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block;">Track Your Order</a>
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

                <p style="font-size: 14px; color: #71717a; text-align: center;">
                    If you have any questions, reply to this email or contact us at <br>
                    <strong>support@downyshoes.com</strong>
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order confirmation email sent to: ${customerEmail}`);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
};

exports.sendOrderCancellation = async (customerEmail, orderId, customerName, isDeleted = false) => {
    const subject = isDeleted ? `Update regarding your Order - #${orderId}` : `Order Cancelled - #${orderId} - DownyShoes`;
    const messageTitle = isDeleted ? "Order Update" : "Order Cancelled";
    const statusColor = isDeleted ? "#f59e0b" : "#ef4444"; // Orange for deleted/update, Red for cancelled

    const mailOptions = {
        from: `"DownyShoes Store" <${process.env.EMAIL_USER}>`,
        to: customerEmail,
        subject: subject,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #18181b; margin-bottom: 5px;">DownyShoes</h1>
                    <p style="color: ${statusColor}; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">${messageTitle}</p>
                </div>

                <h2 style="font-size: 24px; font-weight: 800; color: #18181b;">Hi ${customerName},</h2>
                <p style="font-size: 16px; line-height: 1.6;">We are sorry to inform you that your order <strong>#${orderId}</strong> has been cancelled due to some reasons.</p>
                
                <div style="background-color: #fdfcf0; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 4px solid #bcff2f;">
                    <p style="margin: 0; font-size: 16px; color: #18181b; font-weight: 600;">Unfortunately, we can't place your order at this moment, but you can order other things from our latest collection!</p>
                </div>

                <p style="font-size: 15px; color: #52525b; line-height: 1.6;">We have restocked some of our best-selling sneakers that we think you'll love.</p>

                <div style="text-align: center; margin: 35px 0;">
                    <a href="${process.env.APP_URL || 'http://localhost:8000'}" style="background-color: #18181b; color: #bcff2f; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block;">Explore New Arrivals</a>
                </div>

                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">

                <p style="font-size: 14px; color: #71717a; text-align: center;">
                    If you have any questions, reply to this email or contact us at <br>
                    <strong>support@downyshoes.com</strong>
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Order status email sent to: ${customerEmail}`);
    } catch (error) {
        console.error('Error sending order status email:', error);
    }
};
