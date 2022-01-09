async function getLandSales() {
    let queryBody = "{\"operationName\":\"GetLandsGrid\",\"variables\":{\"from\":{OFFSET},\"size\":{SIZE},\"sort\":\"PriceAsc\",\"auctionType\":\"Sale\",\"owner\":null,\"criteria\":{\"landType\":[]}},\"query\":\"query GetLandsGrid($from: Int!, $size: Int!, $sort: SortBy!, $owner: String, $criteria: LandSearchCriteria, $auctionType: AuctionType) {\\n  lands(criteria: $criteria, from: $from, size: $size, sort: $sort, owner: $owner, auctionType: $auctionType) {\\n    total\\n    results {\\n      ...LandBriefV2\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\\nfragment LandBriefV2 on LandPlot {\\n  tokenId\\n  owner\\n  landType\\n  row\\n  col\\n  auction {\\n    currentPrice\\n    startingTimestamp\\n    currentPriceUSD\\n    __typename\\n  }\\n  ownerProfile {\\n    name\\n    __typename\\n  }\\n  __typename\\n}\\n\"}";
    //get count
    let response = await (await fetch("https://graphql-gateway.axieinfinity.com/graphql?r=freak", {
      "headers": {
        "content-type": "application/json",
      },
      "body": queryBody.replace("{OFFSET}", "0").replace("{SIZE}", "1"),
      "method": "POST"
    })).json();


    var promises = [];

    //get individual land sales
    let lands = response.data.lands;
    let total = parseInt(lands.total);
        for (let offset = 0; offset < total; offset += 100) {
          let response = await fetch("https://graphql-gateway.axieinfinity.com/graphql?r=freak", {
              "headers": {
                "content-type": "application/json",
              },
              "body": queryBody.replace("{OFFSET}", offset).replace("{SIZE}", "100"),
            "method": "POST"
          });
          promises.push(response);
    }
    //TEMP: workaround. Axie servers no longer seemed to be able to handle concurrent requests. Added an await for the previous fetch() and commenting out Promise.all
    //let ps = await Promise.all(promises);
    ps = promises;

    for (let p in ps) {
        let result = ps[p];
        let res = await result.json();
        let items = res.data.lands.results;
        for (let i in items) {
            //if (items[i].assetType != "land") continue;
            id = items[i].tokenId;
            allItems[id] = items[i];
            allItems[id].saleType = "single";
        }
    }

    promises = [];
    queryBody = "{\"operationName\":\"GetBundleList\",\"variables\":{\"from\":{OFFSET},\"size\":{SIZE},\"sort\":\"PriceAsc\",\"criteria\":{\"itemRarity\":[],\"landType\":[\"Genesis\",\"Arctic\",\"Savannah\",\"Mystic\",\"Forest\"],\"itemType\":[],\"totalItems\":[2,40],\"itemAlias\":[]}},\"query\":\"query GetBundleList($from: Int!, $size: Int!, $sort: SortBy, $seller: String, $criteria: BundleSearchCriteria) {\\n  bundles(from: $from, size: $size, criteria: $criteria, sort: $sort, seller: $seller) {\\n    total\\n    results {\\n      name\\n      listingIndex\\n      auction {\\n        currentPrice\\n        currentPriceUSD\\n        __typename\\n      }\\n      items {\\n        ... on LandItem {\\n          realTokenId\\n          figureURL\\n          rarity\\n          __typename\\n        }\\n        ... on LandPlot {\\n          realTokenId\\n          landType\\n          col\\n          row\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}";
    //get bundles with lands
    response = await (await fetch("https://graphql-gateway.axieinfinity.com/graphql?r=freak", {
      "headers": {
        "content-type": "application/json",
      },
      "body": queryBody.replace("{OFFSET}", "0").replace("{SIZE}", "1"),
      "method": "POST",
    })).json();

    total = parseInt(response.data.bundles.total);
    for (let offset = 0; offset < total; offset += 100) {
        response = await fetch("https://graphql-gateway.axieinfinity.com/graphql?r=freak", {
            "headers": {
                "content-type": "application/json",
            },
            "body": queryBody.replace("{OFFSET}", offset).replace("{SIZE}", "100"),
            "method": "POST",
        });
        promises.push(response);
    }
    //TEMP: workaround. Axie servers no longer seemed to be able to handle concurrent requests. Added an await for the previous fetch() and commenting out Promise.all
    //ps = await Promise.all(promises);
    ps = promises;


    for (let p in ps) {
        let result = ps[p];
        res = await result.json();
        let bundles = res.data.bundles.results;
        for (let i in bundles) {
            for (let j in bundles[i].items) {
                if (!bundles[i].items[j].hasOwnProperty("landType")) continue;
                id = bundles[i].items[j].realTokenId;
                allItems[id] = bundles[i].items[j];
                allItems[id].auction = bundles[i].auction;
                allItems[id].saleType = "bundle";
            }
        }
    }
}


