import ProfileForm from 'components/templates/profile-form';
import React from 'react';
import { Default } from 'components/layouts/Default';

const ProfilePage = () => {
  return (
    <Default pageName="Profile">
      <ProfileForm />
    </Default>
  );
};

export default ProfilePage;
