import { Html, Head, Text } from '@react-email/components';

interface EmailTemplateProps {
  firstName?: string;
  authCode?: string;
  hashCode?: string;
  id?: string;
  amount?: number;
  sub_id?: string;
  user_id?: string;
  addon_id?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  authCode,
  hashCode,
  id,
  amount,
  sub_id,
  user_id,
  addon_id
}) => (
  <Html lang="en" dir="ltr">
    <Head>
      {sub_id ? 'Hi' : 'Welcome'} {firstName}!
    </Head>
    {authCode && <Text>Your otp is {authCode}</Text>}
    {hashCode && (
      <Text>
        Your reset link is http://localhost:3000/api/reset/{id}?hashCode={hashCode}
      </Text>
    )}
    {amount && sub_id && (
      <>
        <Text>amount - &#8377;{amount}</Text>
        <Text>subscription id - {sub_id}</Text>
      </>
    )}
    {user_id && <Text>user id - {user_id}</Text>}
    {addon_id && <Text>bill id - {addon_id}</Text>}
  </Html>
);
