enum Mode {
  SYNC = 'sync',
  ASYNC = 'async',
}

export const resyncNFTMetadata = async (tokenAddress: string | number, tokenId: string | number) => {
  let status = '';
  try {
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2/nft/${tokenAddress}/${tokenId}/metadata/resync?chain=bsc&flag=uri&mode=${Mode.SYNC}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': `${process.env.NEXT_PUBLIC_MORALIS_API_KEY}`,
        },
      },
    );

    if (!response.ok) {
      console.log('Could not fetch resync nft metadata!');
    }
    status = response.status.toString();
  } catch (error) {
    console.log(error);
  }
  return status;
};
