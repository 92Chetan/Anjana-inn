import { EmailTemplate } from '@/components/utils/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type Mail = {
  email: string;
  subject: string;
  name: string;
  hashCode?: string;
  authCode?: string;
  id?: string;
};

export const mailSender = async ({
  email,
  subject,
  name,
  authCode,
  hashCode,
  id
}: Mail): Promise<any> => {
  const emailContent = EmailTemplate({ firstName: name, authCode, hashCode, id });

  const data = await resend.emails.send({
    from: 'anjanainn@info.anjanainn.com',
    to: [email],
    subject,
    react: emailContent,
    text: ''
  });

  return data;
};
