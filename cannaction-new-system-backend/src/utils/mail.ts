import env from '@/config/env';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transportOptions: SMTPTransport.Options = {
	name: 'No reply Cannaction',
	host: env.MAIL_HOST,
	port: +env.MAIL_PORT,
	secure: true,
	tls: {
		rejectUnauthorized: false // Desativa a verificação SSL (não recomendado em produção!)
	},
	auth: {
		user: env.MAIL_USER,
		pass: env.MAIL_PASSWORD,
	},
	connectionTimeout: 10000, // 10 seconds
	greetingTimeout: 10000, // 10 seconds
	socketTimeout: 10000, // 10 seconds
};

export const transporter = nodemailer.createTransport(transportOptions);

export const sendMail = async (to: string, subject: string, html: string) => {
	const mailOptions = {
		from: `No reply <${env.MAIL_USER}>`,
		to,
		subject,
		html,
	};
	
	// Add timeout wrapper to prevent hanging
	return Promise.race([
		transporter.sendMail(mailOptions),
		new Promise((_, reject) => 
			setTimeout(() => reject(new Error('Email sending timeout')), 15000)
		)
	]);
};

export const createForgotPasswordEmail = (password: string) => {
	return `
	<html>
	<table style="width:40%; border: solid 1px #00675A; background: #fff; font-family: 'Century Gothic',Arial,Verdana,Geneva,sans-serif;"
    cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td style="text-align:center; background-color: #00675A; padding: 20px;">
                <a href="http://www.canna-pl.com" target="_blank">
                    <img style="width: 135px;"
                        src="data:image/png;base64,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"
                        data-filename="canna_logo_white.png">
                </a>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: rgb(0, 51, 45); font-size: 24px; margin: 0px; margin-bottom: 25px; font-weight: bold; text-align: center;">
                    Forgot your password?
                </h1>
            </td>
        </tr>
      
        <tr>
            <td style="padding-bottom: 30px;text-align: center; -moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px; height: 50px; width: 90%;">
                <h3>
                    Don't Worry! We got you.
                </h3>
                <small style="">Here is your new password:</small>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; ">
                <h2>
                    <span style="padding: 10px; text-align: center; border: 1px solid #e5e5e5; border-radius: 10px; width: 50%;">
                        ${password}
                    </span>
                </h2>                
            </td>
        </tr>
        <tr>
            <td style="margin: 10px 25px 20px; text-align: center; -moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px; height: 50px; width: 90%;">
                <h3>                   
                    Don't forget to change it!
                </h3>                
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td
                style="font-size: 10px; padding: 20px; border-top: solid 1px #00675A!important; text-align: center; color: #fff; background-color: #00675A">
                <p id="copyrightText" style="margin: 0px;">Copyright © 2024 CANNA - All Rights Reserved.</p>
            </td>
        </tr>
    </tfoot>
</table>
</html>
	`;
};

export const createNewPasswordEmail = (password: string) => {
	return `
	<html>
	<table style="width:40%; border: solid 1px #00675A; background: #fff; font-family: 'Century Gothic',Arial,Verdana,Geneva,sans-serif;"
    cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td style="text-align:center; background-color: #00675A; padding: 20px;">
                <a href="http://www.canna-pl.com" target="_blank">
                    <img style="width: 135px;"
                        src="data:image/png;base64,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"
                        data-filename="canna_logo_white.png">
                </a>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: rgb(0, 51, 45); font-size: 24px; margin: 0px; margin-bottom: 25px; font-weight: bold; text-align: center;">
                    Hi!
                </h1>
            </td>
        </tr>
      
        <tr>
            <td style="padding-bottom: 30px;text-align: center; -moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px; height: 50px; width: 90%;">
                <h3>
                    A new password has been created for you. 
                </h3>
                <small style="">Here is your new password:</small>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; ">
                <h2>
                    <span style="padding: 10px; text-align: center; border: 1px solid #e5e5e5; border-radius: 10px; width: 50%;">
                        ${password}
                    </span>
                </h2>                
            </td>
        </tr>
        <tr>
            <td style="margin: 10px 25px 20px; text-align: center; -moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px; height: 50px; width: 90%;">
                <h3>                   
                    Don't forget to change it!
                </h3>                
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td
                style="font-size: 10px; padding: 20px; border-top: solid 1px #00675A!important; text-align: center; color: #fff; background-color: #00675A">
                <p id="copyrightText" style="margin: 0px;">Copyright © 2024 CANNA - All Rights Reserved.</p>
            </td>
        </tr>
    </tfoot>
</table>
</html>
	`;
};

export const createNewAccountEmail = (password: string) => {
	return `
	<html>
	<table style="width:40%; border: solid 1px #00675A; background: #fff; font-family: 'Century Gothic',Arial,Verdana,Geneva,sans-serif;"
    cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td style="text-align:center; background-color: #00675A; padding: 20px;">
                <a href="http://www.canna-pl.com" target="_blank">
                    <img style="width: 135px;"
                        src="data:image/png;base64,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"
                        data-filename="canna_logo_white.png">
                </a>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: rgb(0, 51, 45); font-size: 24px; margin: 0px; margin-bottom: 25px; font-weight: bold; text-align: center;">
                    Hi!
                </h1>
            </td>
        </tr>
      
        <tr>
            <td style="padding-bottom: 30px;text-align: center; -moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px; height: 50px; width: 90%;">
                <h3>
                    A new account has been created for you. 
                </h3>
                <small style="">Here is your password:</small>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; ">
                <h2>
                    <span style="padding: 10px; text-align: center; border: 1px solid #e5e5e5; border-radius: 10px; width: 50%;">
                        ${password}
                    </span>
                </h2>                
            </td>
        </tr>
        <tr>
            <td style="margin: 10px 25px 20px; text-align: center; -moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px; height: 50px; width: 90%;">
                <h3>                   
                    Welcome to the Cannaction Club!
                </h3>                
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td
                style="font-size: 10px; padding: 20px; border-top: solid 1px #00675A!important; text-align: center; color: #fff; background-color: #00675A">
                <p id="copyrightText" style="margin: 0px;">Copyright © 2024 CANNA - All Rights Reserved.</p>
            </td>
        </tr>
    </tfoot>
</table>
</html>
	`;
};
