import { gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";
import { Nft } from "@src/common/interfaces/nft.interface";
import { PaginatedList, QueryNftsResults } from "@src/common/interfaces/query-results.interface";

interface NftVariables {
  owner: string;
  limit: number;
  cursor: string;
}

const getNftsQuery = gql`
  query Nfts($cursor: String, $limit: Int, $owner: String!) {
    # eslint-disable-next-line @graphql-eslint/fields-on-correct-type
    entities: nfts(cursor: $cursor, limit: $limit, owner: $owner)
      # eslint-disable-next-line @graphql-eslint/known-directives
      @rest(
        method: GET
        path: "/api/v1/assets?owner={args.owner}&limit={args.limit}&cursor={args.cursor}"
        type: "[Nft]"
      ) {
      list: assets {
        assetContract: asset_contract {
          address
        }
        description
        entityId: id
        image: image_url
        name
        tokenId: token_id
      }
      next
      prev
    }
  }
`;

function useGetNfts(variables: NftVariables): QueryNftsResults {
  const { loading, error, data, networkStatus, fetchMore } = useQuery<PaginatedList<Nft>>(getNftsQuery, {
    variables,
    notifyOnNetworkStatusChange: true,
    context: {
      clientName: ClientName.opensea,
    },
  });

  return { loading, error, data, networkStatus, fetchMore };
}

export default useGetNfts;
