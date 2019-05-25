async function getItems() {
    let rarity = "";  //mystic, epic, rare, common, empty (land)
    let sort = "lowest_price"; //lowest_price, recently_listed, highest_price
    //let baseUrl = "https://axieinfinity.com/marketplace-api/query-assets?sorting=" + sort + "&rarity=" + rarity + "&offset=0&count=";
    let baseUrl = "https://axieinfinity.com/marketplace-api/query-assets?sorting=" + sort + "&item_name=land&offset=0&count=";
    let r = await fetch(baseUrl + "10");
    data = await r.json();
    let url = baseUrl + parseInt(data.total);
    r = await fetch(url);
    data = await r.json();
    items = data.results;
    for (let i in items) {
        //if (items[i].assetType != "land") continue;
        id = items[i].realTokenId;
        allItems[id] = items[i];
    }
}