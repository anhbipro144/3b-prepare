import React, { useState } from 'react';

import Image from 'next/image';
import { Form, Input, Upload } from 'antd';
import classes from './profileForm.module.css';

import DEFAULT_AVATER from '../../../../public/img/profile&cover-01.png';
import { useSession } from 'next-auth/react';

import * as firebase from '../../../lib/firebaseConfig';

interface TForm {
  referral: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  bio: string | undefined;
}

const ProfileForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageUrl, setImageUrl] = useState<{ avatar: string | undefined; background: string | undefined }>({
    avatar: undefined,
    background: undefined,
  });

  const { data } = useSession();
  const domain = process.env.NODE_ENV === 'production' ? 'https://nft.threeb.ai' : 'http://localhost:3000';

  const onSubmit = (values: TForm) => {
    fetch(`${domain}/api/user`, {
      method: 'POST',
      body: JSON.stringify({
        data: {
          wallet_address: data?.user?.address,
          name: values?.name,
          email: values?.email,
          phone: values?.phone,
          bio: values?.bio,
          avatar_image: imageUrl?.avatar,
          background_image: imageUrl?.background,
        },
      }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  };

  const handleUploadFile = async (file: any, type: string) => {
    console.log({ type });
    // eslint-disable-next-line no-undef
    const formdata = new FormData();
    formdata.append('image', file);
    await firebase.uploadImage(file, file.text.toString());
  };

  return (
    <div className={classes.profile}>
      <Form name="profile" onFinish={onSubmit}>
        <div className={classes.boxAvatar}>
          <Image src={DEFAULT_AVATER} alt="" width={60} height={60} />
          <div>
            <Upload showUploadList={false} beforeUpload={(file) => handleUploadFile(file, 'AVATAR')}>
              <button type="button">Upload Avatar</button>
            </Upload>
            <Upload showUploadList={false} beforeUpload={(file) => handleUploadFile(file, 'BACKGROUND')}>
              <button type="button">Upload Background</button>
            </Upload>
          </div>
        </div>
        <div className={classes.formContent}>
          <h4>Your Information</h4>
          <Form.Item name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
            <div className={classes.boxForm}>
              <label>Name *</label>
              <Input placeholder="Enter your name" />
            </div>
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}>
            <div className={classes.boxForm}>
              <label>Email *</label>
              <Input placeholder="Enter your mail" />
            </div>
          </Form.Item>
          <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone!' }]}>
            <div className={classes.boxForm}>
              <label>Phone *</label>
              <Input placeholder="Enter your number" />
            </div>
          </Form.Item>
          <Form.Item name="bio">
            <div className={classes.boxForm}>
              <label>Bio</label>
              <Input.TextArea placeholder="Enter your bio" />
            </div>
          </Form.Item>
          <Form.Item>
            <button className={classes.btnSubmit} type="submit">
              Update
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;
