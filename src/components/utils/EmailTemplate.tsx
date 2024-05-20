import { Html, Head, Text } from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
  authCode?: string;
  hashCode?: string;
  id?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  authCode,
  hashCode,
  id
}) => (
  <Html lang="en" dir="ltr">
    <Head>Welcome, {firstName}!</Head>
    {authCode && <Text>Your otp is {authCode}</Text>}
    {hashCode && (
      <Text>
        Your reset link is http://localhost:3000/api/reset/{id}?hashCode={hashCode}
      </Text>
    )}
  </Html>
);
