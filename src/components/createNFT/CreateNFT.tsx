import { Button, Col, Form, Grid, Input, Row, Spin, Upload } from 'antd';
import React, { useState } from 'react';
import styles from './CreateNFT.module.css';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { ethers, Signer } from 'ethers';
import constants from '../../../constants';
import { useSigner } from 'wagmi';
import { failureModal, successModal } from '../../../helpers/modal';
import { Buffer } from 'buffer';

import Image from 'next/image';
import { useAppSelector } from 'store/hooks';
import { RootState } from 'store';
import { useRouter } from 'next/router';
const { Dragger } = Upload;

const { useBreakpoint } = Grid;

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_PROJECT_SECRET;
const auth = 'Basic '.concat(
  Buffer.from(projectId?.concat(':').concat(projectSecret as string) as string).toString('base64'),
);
const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
});

function CreateNFT() {
  const { md } = useBreakpoint();
  const [form] = Form.useForm();
  const [formInput, updateFormInput] = useState({ name: '', description: '' });
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [formValid, setFormValid] = useState({
    nameErr: false,
    descriptionErr: false,
    fileErr: false,
  });
  const [nameValid, setNameValid] = useState(false);
  const [descValid, setDescValid] = useState(false);
  const [isValidType, setIsValidType] = useState(true);
  const [mediaSrc, setMediaSrc] = useState<string>('');
  const [isValidFileName, setValidFileName] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previewFile, setPreviewFile] = useState(null);
  const [fileUrl, setFileUrl] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileDataURL, setFileDataURL] = useState(null);

  const router = useRouter();

  const { data: signer } = useSigner();
  const nftMarketplace = new ethers.Contract(constants.MRKPLACE_ADDR, constants.MRKPLACE_ABI, signer as Signer);

  const { isAuth } = useAppSelector((state: RootState) => state.user);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [marketplace, setMarketplace] = useState<string>('fixedPrice');
  const [collection, setCollection] = useState<string>('collection1');

  function checkValidType(file: { name: string; size: number | string }) {
    let result = false;
    // .JPG, .PNG, .MP4, .MP3, .WAV.
    const fileExtension = file.name.slice(-4).toLowerCase();
    // eslint-disable-next-line etc/no-commented-out-code
    // const filesize = file.size;

    if (
      fileExtension === '.jpg' ||
      fileExtension === 'jpeg' ||
      fileExtension === '.png' ||
      fileExtension === '.svg' ||
      fileExtension === '.mp4' ||
      fileExtension === '.mp3' ||
      fileExtension === '.wav'
      //  && filesize <= 52428800
    ) {
      result = true;
    }
    return result;
  }

  function checkValidName(name: string) {
    let extensionLength = 4;
    const fileExtension = name.slice(-5).toLowerCase();
    if (fileExtension === '.jpeg') {
      extensionLength = 5;
    }

    const _name = name.substring(0, name.length - extensionLength);
    // eslint-disable-next-line
    let format = /[^A-Z a-z0-9_-]/;
    return format.test(_name) ? false : true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeImage = async (e: any) => {
    const { file } = e;

    if (file === undefined) {
      return;
    }
    console.log('File Info', file);
    setIsValidType(true);
    setFileName('');
    setFileType('');
    setValidFileName(true);

    if (!checkValidType(file)) {
      setIsValidType(false);
      return;
    }

    if (!checkValidName(file.name)) {
      setValidFileName(false);
      setFileName(file.name);
      return;
    }

    setFileName(file.name);
    setFileType(file.type);
    await uploadImageData(file);
  };

  const uploadImageData = async (file: any) => {
    setLoadingImage(true);

    try {
      const added = await client.add(file.originFileObj, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `ipfs://${added.path}`;
      setMediaSrc(url);
      setFileUrl(`https://ipfs.moralis.io:2053/ipfs/${added.path}`);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
    setLoadingImage(false);
  };

  function isFormValid() {
    if (formInput.name === '') {
      setFormValid({ ...formValid, nameErr: true });
      return false;
    }

    if (formInput.description === '') {
      setFormValid({ ...formValid, descriptionErr: true });
      return false;
    }

    if (fileName === '') {
      setFormValid({ ...formValid, fileErr: true });
      return false;
    }
    return true;
  }

  function checkValidInput(input: string) {
    if (input === '') {
      return true;
    }
    const format = /[^A-Z a-z0-9!@#$%^&*().,_+<>/?:"'|\\[={}`~\]\-\n]/;
    return format.test(input) ? false : true;
  }

  const handleInputName = (name: string) => {
    updateFormInput({ ...formInput, name });
    if (checkValidInput(name)) {
      setNameValid(true);
      return;
    }
    setNameValid(false);
  };

  const handleInputDesc = (description: string) => {
    updateFormInput({ ...formInput, description });
    if (checkValidInput(description)) {
      setDescValid(true);
      return;
    }
    setDescValid(false);
  };

  const errorDesField = () => {
    let errorDesMessage: string | undefined;
    if (!formInput.description && formValid.descriptionErr) {
      errorDesMessage = 'Please input your description';
    } else if (formInput.description && !descValid) {
      errorDesMessage = 'English only';
    } else {
      errorDesMessage = '';
    }
    return errorDesMessage;
  };

  const createNFT = async (imgUrl: any) => {
    const { name, description } = formInput;

    const data = JSON.stringify({ name, description, image: imgUrl, type: fileType });
    if (isFormValid()) {
      try {
        const added = await client.add(data);
        const url = `ipfs://${added.path}`;
        /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
        console.log({ url });
        const createLoading = await nftMarketplace.createToken(url);
        await createLoading.wait();
        successModal('Success', 'Create NFT successfully');
        console.log(data);
        router.push('my-collection/nft');
      } catch (error) {
        console.log('Error uploading file: ', error);
      }
    }
  };

  async function handleCreateClicked() {
    if (signer && isAuth) {
      if (!nameValid) {
        setFormValid({ ...formValid, nameErr: true });
        return;
      }
      if (!descValid) {
        setFormValid({ ...formValid, descriptionErr: true });
        return;
      }
      if (mediaSrc === '') {
        setFormValid({ ...formValid, fileErr: true });
      }
      setLoading(true);
      await createNFT(mediaSrc);
      setLoading(false);
    } else {
      failureModal('Error', 'Please connect your wallet first');
    }
  }

  // Show image preview when upload
  const PreviewHTML = () => {
    if (previewFile) {
      const fileReader = new window.FileReader();
      fileReader.onload = (e: any) => {
        const { result } = e.target;
        if (result) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(previewFile);
    }
    if (fileUrl && fileType?.includes('image')) {
      return (
        <img
          alt=""
          // src={fileDataURL ? fileDataURL : ''}
          src={fileUrl}
          style={{
            margin: 'auto',
            width: '300px',
            height: 'auto',
            maxHeight: '300px',
            objectFit: 'cover',
          }}
          width="350"
        />
      );
    }
    return <div></div>;
  };

  const ColRight = () => {
    let errorMessage: string | undefined;

    const renderFile = () => {
      const rendercontentFile = () => {
        if (fileUrl === '') {
          return (
            <>
              <p className="ant-upload-drag-icon">
                <Image src={'/img/createNFT/cloud.svg'} alt="" width={71} height={51} />
              </p>
              <p className="ant-upload-text">
                Drop files to upload
                <br /> or <span>Browse</span>
              </p>
            </>
          );
        }

        if (fileType === 'video/mp4') {
          return (
            <video width="300px" height="auto" controls>
              <source src={fileUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        }

        if (fileType === 'audio/mpeg') {
          return <div className={styles.boxMp3}>{fileName}</div>;
        }

        return <PreviewHTML />;
      };

      return (
        <div>
          <div style={loadingImage ? { display: 'none' } : {}}>{rendercontentFile()}</div>
          {loadingImage ? <Spin /> : null}
        </div>
      );
    };

    if (!fileName && formValid.fileErr) {
      errorMessage = 'Please upload your NFT file';
    } else if (!isValidFileName) {
      errorMessage = 'Please remove the special character in the filename';
    }
    return (
      <Col span={24} md={10} order={0} className={styles.borderR}>
        <Form.Item>
          <Dragger
            style={{ marginTop: '10px' }}
            className={styles.dragger}
            accept=".jpg,.jpeg,.mp4,.mp3,.png,.wav,.svg"
            onChange={onChangeImage}
          >
            {renderFile()}
          </Dragger>
          <div style={{ color: 'red' }}>{errorMessage}</div>

          <p className={styles.subTitle}>Artwork Cover</p>
        </Form.Item>
      </Col>
    );
  };

  const MarketplaceField = () => {
    const listOption = [
      {
        id: 'option1',
        name: 'Fixed price',
        img: '/img/createNFT/marketplace1.svg',
        imgActive: '/img/createNFT/marketplaceAct1.svg',
        value: 'fixedPrice',
      },
      {
        id: 'option2',
        name: 'Open for bids',
        img: '/img/createNFT/marketplace2.svg',
        imgActive: '/img/createNFT/marketplaceAct2.svg',
        value: 'openBids',
      },
      {
        id: 'option3',
        name: 'Timed auction',
        img: '/img/createNFT/marketplace3.svg',
        imgActive: '/img/createNFT/marketplaceAct3.svg',
        value: 'timedAuction',
      },
    ];

    return (
      <Form.Item>
        <label>Put on marketplace</label>
        <p className={styles.explain}>Enter price to allow users instantly purchase your NFT</p>
        <div className={styles.listOption}>
          {listOption?.map?.((item) => (
            <div
              key={item?.id}
              className={marketplace === item.value ? styles.active : ''}
              // onClick={() => setMarketplace(item?.value)}
            >
              <div>
                <div className={styles.boxImg}>
                  {marketplace === item.value ? (
                    <Image src={item?.imgActive} alt="" width={68} height={73} />
                  ) : (
                    <Image src={item?.img} alt="" width={68} height={73} />
                  )}
                </div>
                <div className={styles.name}>{item?.name}</div>
              </div>
            </div>
          ))}
        </div>
      </Form.Item>
    );
  };

  const CollectionField = () => {
    const listCollectionDefault = [
      {
        id: 'collection1',
        img: '/img/drops/1988Dragon_cover-04.png',
        title: 'Shared Collection',
      },
    ];

    return (
      <div className={styles.collection}>
        <label>Choose collection</label>
        <div className={styles.collectionList}>
          {listCollectionDefault?.map?.((item) => (
            <div
              key={item?.id}
              className={collection === item.id ? styles.active : ''}
              onClick={() => setCollection(item?.id)}
            >
              <div>
                <Image src={item?.img} alt="" width={50} height={50} />
                <div>{item?.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CreatBtn = () => {
    let textStatusCreate: string;

    if (loading) {
      textStatusCreate = 'Creating';
    } else {
      textStatusCreate = 'Create Now';
    }
    return (
      <Col style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          className={styles.btnCreate}
          onClick={handleCreateClicked}
          loading={loading}
          disabled={!mediaSrc && fileType && isValidType ? true : false}
        >
          {textStatusCreate}
        </Button>
      </Col>
    );
  };

  return (
    <div className={styles.CreateNFT}>
      <h1>Create new item</h1>
      <div className={styles.CreateWrapper}>
        <h2>Image,Video,Audio or 3D Model</h2>
        <p>File types suppported: JPG, PNG, GIP, SVG, MP4, MP3, WEBM, OGG, GLB, GLTF. Max Size : 100 MB</p>
        <Form form={form} layout="vertical">
          <Row gutter={32}>
            <ColRight />
            <Col span={24} md={14}>
              <Row>
                <Col span={24}>
                  <MarketplaceField />
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <label>Item Name</label>
                    <Input
                      placeholder="Enter the name of the work"
                      value={formInput.name}
                      onChange={(e) => {
                        handleInputName(e.target.value);
                      }}
                    />
                    <div style={{ color: 'red' }}>
                      {!formInput.name && formValid.nameErr
                        ? 'Please input your asset name'
                        : formInput.name && !nameValid
                        ? 'English only'
                        : ''}
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <label>Description</label>
                    <Input.TextArea
                      className={styles.textArea}
                      placeholder="Provide a detailed description of your item."
                      rows={5}
                      style={{ whiteSpace: 'pre-wrap' }}
                      value={formInput.description}
                      onChange={(e) => {
                        handleInputDesc(e.target.value);
                      }}
                    />
                    <div style={{ color: 'red' }}>{errorDesField()}</div>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <CollectionField />
                </Col>
              </Row>
            </Col>
            <div className={styles.footerForm}>
              <div>Cancel</div>
              {md && <CreatBtn />}
              {!md && <CreatBtn />}
            </div>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default CreateNFT;
