import { EmailTemplate } from '@/components/utils/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type Mail = {
  email: string;
  subject: string;
  name?: string;
  hashCode?: string;
  authCode?: string;
  id?: string;
  amount?: number;
  sub_id?: string;
  user_id?: string;
  addon_id?: string;
};

export const mailSender = async ({
  email,
  subject,
  name,
  authCode,
  hashCode,
  id,
  amount,
  sub_id,
  user_id,
  addon_id
}: Mail): Promise<any> => {
  const emailContent = EmailTemplate({
    firstName: name,
    authCode,
    hashCode,
    id,
    amount,
    sub_id,
    user_id,
    addon_id
  });

  const data = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject,
    react: emailContent,
    text: ''
  });

  return data;
};
