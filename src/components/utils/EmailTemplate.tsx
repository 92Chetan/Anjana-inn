import * as React from 'react';

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
  <div>
    <h1>Welcome, {firstName}!</h1>
    {authCode && <h1>Your otp is {authCode}</h1>}
    {hashCode && (
      <h1>
        Your reset link is http://localhost:3000/api/reset/{id}?hashCode={hashCode}
      </h1>
    )}
  </div>
);
