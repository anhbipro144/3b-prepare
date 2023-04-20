import { Grid, GridItem, Heading } from '@chakra-ui/react';
import { NFTCard } from 'components/modules';
import { useEvmWalletNFTs } from '@moralisweb3/next';
import { useNetwork } from 'wagmi';

import { Box } from '@chakra-ui/react';

import Profile from 'components/templates/profile';
import { useSession } from 'next-auth/react';

const NFTBalances = () => {
  const { chain } = useNetwork();
  const { data, status } = useSession();

  const { data: nfts } = useEvmWalletNFTs({
    address: data?.user?.address,
    chain: chain?.id,
  });

  console.log(nfts);

  return (
    <>
      {status === 'authenticated' ? <Profile /> : null}
      <Heading size="lg" marginBottom={6} margin={['20px 0px', '']}>
        NFT Balances
      </Heading>

      {nfts?.length ? (
        <div className="nft">
          <Grid templateColumns="repeat(auto-fill, 350px)" rowGap={5} justifyItems="center">
            {nfts.map((nft, key) => (
              <GridItem key={key}>
                <NFTCard nft={nft} />
              </GridItem>
            ))}
          </Grid>
        </div>
      ) : (
        <Box>Looks like you do not have any NFTs</Box>
      )}
    </>
  );
};

export default NFTBalances;
