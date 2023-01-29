import { Twilio } from 'twilio';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

export class SmsProvider {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(accountSid, authToken);
  }

  async send(message: string, numberTo: string): Promise<any> {
    await this.client.messages.create({
      from: this.handleNumber(twilioNumber),
      to: this.handleNumber(numberTo),
      body: message,
    });

    console.log('[SMS SEND]', {
      from: this.handleNumber(twilioNumber),
      to: this.handleNumber(numberTo),
      body: message,
    });
  }

  private handleNumber(number: string): string {
    return (number.includes('+') ? number : `+${number}`).replace(/\s+/g, '');
  }
}
