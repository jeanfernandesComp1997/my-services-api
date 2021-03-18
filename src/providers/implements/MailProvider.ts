import { IMessage } from './../IMailProvider';
import { IMailProvider } from "../IMailProvider";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import 'dotenv/config'

export class MailProvider implements IMailProvider {
    private transporter: Mail;
    private host: any;
    private port: any;
    private user: any;
    private pass: any;


    constructor() {
        this.host = process.env.SMTP_HOST
        this.port = process.env.SMTP_PORT
        this.user = process.env.SMTP_USERNAME
        this.pass = process.env.SMTP_KEY

        this.transporter = nodemailer.createTransport({
            host: this.host,
            port: this.port,
            auth: {
                user: this.user,
                pass: this.pass
            }
        });
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        });
    }
}