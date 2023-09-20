graphURL = "https://inlbopit6dzanouihbjvavgwfe0iorww.lambda-url.us-west-1.on.aws?url=https://graphql-gateway.axieinfinity.com/graphql%3fr%3dfreak";
async function getAxieDetails(id) {
    let response = await (await fetch(graphURL, {
      "headers": {
        "content-type": "application/json",
      },
      "body": "{\"operationName\":\"GetAxieDetail\",\"variables\":{\"axieId\":\"" + parseInt(id) + "\"},\"query\":\"query GetAxieDetail($axieId: ID!) {\\n  axie(axieId: $axieId) {\\n    ...AxieDetail\\n    __typename\\n  }\\n}\\n\\nfragment AxieDetail on Axie {\\n  id\\n  image\\n  class\\n  chain\\n  name\\n  genes\\n  newGenes\\n  owner\\n  birthDate\\n  bodyShape\\n  class\\n  sireId\\n  sireClass\\n  matronId\\n  matronClass\\n  stage\\n  title\\n  breedCount\\n  figure {\\n    atlas\\n    model\\n    image\\n    __typename\\n  }\\n  parts {\\n    ...AxiePart\\n    __typename\\n  }\\n  stats {\\n    ...AxieStats\\n    __typename\\n  }\\n  order {\\n    ...OrderInfo\\n    __typename\\n  }\\n  ownerProfile {\\n    name\\n    __typename\\n  }\\n  battleInfo {\\n    ...AxieBattleInfo\\n    __typename\\n  }\\n  children {\\n    id\\n    name\\n    class\\n    image\\n    title\\n    stage\\n    __typename\\n  }\\n  potentialPoints {\\n    beast\\n    aquatic\\n    plant\\n    bug\\n    bird\\n    reptile\\n    mech\\n    dawn\\n    dusk\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieBattleInfo on AxieBattleInfo {\\n  banned\\n  banUntil\\n  __typename\\n}\\n\\nfragment AxiePart on AxiePart {\\n  id\\n  name\\n  class\\n  type\\n  specialGenes\\n  stage\\n  abilities {\\n    ...AxieCardAbility\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieCardAbility on AxieCardAbility {\\n  id\\n  name\\n  attack\\n  defense\\n  energy\\n  description\\n  backgroundUrl\\n  effectIconUrl\\n  __typename\\n}\\n\\nfragment AxieStats on AxieStats {\\n  hp\\n  speed\\n  skill\\n  morale\\n  __typename\\n}\\n\\nfragment OrderInfo on Order {\\n  id\\n  maker\\n  kind\\n  assets {\\n    ...AssetInfo\\n    __typename\\n  }\\n  expiredAt\\n  paymentToken\\n  startedAt\\n  basePrice\\n  endedAt\\n  endedPrice\\n  expectedState\\n  nonce\\n  marketFeePercentage\\n  signature\\n  hash\\n  duration\\n  timeLeft\\n  currentPrice\\n  suggestedPrice\\n  currentPriceUsd\\n  __typename\\n}\\n\\nfragment AssetInfo on Asset {\\n  erc\\n  address\\n  id\\n  quantity\\n  orderId\\n  __typename\\n}\\n\"}",
      "method": "POST",
    })).json();

    return response.data.axie;
}

function validateAddress(address) {
  if (/^0x[a-f0-9]{40}$/.test(address.toLocaleLowerCase())) {
    return address;
  }
  throw "Bad Address";
}

var AXIE_QUERY_SIZE = 100;
const ALL_CLASSES = ["Beast", "Bug", "Bird", "Plant", "Aquatic", "Reptile"];
//cls is single class, purenesses is a csv string of ints. TODO: validate purenesses
async function getAxiesByAddress(address, offset, parts="null", cls="", purenesses="") {
    if (cls != "") {
      if (!ALL_CLASSES.includes(cls)) {
        console.log("class not found " + cls);
        cls = "";
      } else {
        cls = "\"" + cls + "\"";
      }
    }
    let response = await (await fetch(graphURL, {
      "headers": {
        "content-type": "application/json",
      },
      "body": "{\"operationName\":\"GetAxieBriefList\",\"variables\":{\"from\":" + offset + ",\"size\":" + AXIE_QUERY_SIZE + ",\"sort\":\"IdDesc\",\"auctionType\":\"All\",\"owner\":\"" + validateAddress(address) + "\",\"criteria\":{\"region\":null,\"parts\":" + parts + ",\"bodyShapes\":null,\"classes\":[" + cls + "],\"stages\":null,\"numMystic\":null,\"pureness\":[" + purenesses + "],\"title\":null,\"breedable\":null,\"breedCount\":null,\"hp\":[],\"skill\":[],\"speed\":[],\"morale\":[]}},\"query\":\"query GetAxieBriefList($auctionType: AuctionType, $criteria: AxieSearchCriteria, $from: Int, $sort: SortBy, $size: Int, $owner: String) {\\n  axies(auctionType: $auctionType, criteria: $criteria, from: $from, sort: $sort, size: $size, owner: $owner) {\\n    total\\n    results {\\n      ...AxieBrief\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment AxieBrief on Axie {\\n  id\\n  name\\n  owner\\n  genes\\n  newGenes\\n  sireId\\n  matronId\\n  stage\\n  class\\n  breedCount\\n  image\\n  title\\n  battleInfo {\\n    banned\\n    __typename\\n  }\\n  auction {\\n    currentPrice\\n    currentPriceUSD\\n    __typename\\n  }\\n  parts {\\n    id\\n    name\\n    class\\n    type\\n    __typename\\n  }\\n  stats {\\n    ...AxieStats\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment AxieStats on AxieStats {\\n  hp\\n  speed\\n  skill\\n  morale\\n  __typename\\n}\\n\"}",
      "method": "POST",
    })).json();
    return response.data.axies;
}

async function getProfileByEthAddress(address) {
    let response = await fetch(graphURL, {
        "headers": {
        "content-type": "application/json",
        },
        "body": "{\"operationName\":\"GetProfileByEthAddress\",\"variables\":{\"ethereumAddress\":\"" + address + "\"},\"query\":\"query GetProfileByEthAddress($ethereumAddress: String!) {\\n  publicProfileWithEthereumAddress(ethereumAddress: $ethereumAddress) {\\n    ...Profile\\n    __typename\\n  }\\n}\\n\\nfragment Profile on PublicProfile {\\n  accountId\\n  name\\n  addresses {\\n    ...Addresses\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment Addresses on NetAddresses {\\n  ethereum\\n  tomo\\n  loom\\n  ronin\\n  __typename\\n}\\n\"}",
        "method": "POST",
    });
    return await response.json();
}