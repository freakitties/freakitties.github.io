async function getItems() {
    let rarity = "";  //mystic, epic, rare, common, empty (land)
    let sort = "lowest_price"; //lowest_price, recently_listed, highest_price
    //let baseUrl = "https://axieinfinity.com/marketplace-api/query-assets?sorting=" + sort + "&rarity=" + rarity + "&offset=0&count=";
    let baseUrl = "https://axieinfinity.com/marketplace-api/query-assets?sorting=" + sort + "&item_name=land&count=";
    let r = await fetch(baseUrl + "1");
    data = await r.json();

    let total = parseInt(data.total);
    let url = baseUrl + total + "&offset=";
    for (let offset = 0; offset < total; offset += 500) {
        url = baseUrl + total + "&offset=" + offset;
        r = await fetch(url);
        data = await r.json();
        items = data.results;
        for (let i in items) {
            //if (items[i].assetType != "land") continue;
            id = items[i].realTokenId;
            allItems[id] = items[i];
        }

    }
}