    //Moon: Aqua + Rep
    //Star: Plant + Bird
    //Nut: Beast + Bug
    const classGeneMap = {"0000": "beast", "0001": "bug", "0010": "bird", "0011": "plant", "0100": "aquatic", "0101": "reptile", "1000": "??? Nut", "1001": "??? Star", "1010": "??? Moon"};
    const typeOrder = {"eyes": 2, "ears": 4, "mouth": 3, "horn": 5, "back": 6, "tail": 7};  //swap ears and mouth ordering
    const regionGeneMap = {"00000": "global", "00001": "japan"};
    const tagGeneMap ={"00000": "Normal", "00001": "Origin", "00010": "Agamogenesis", "00011": "Meo Corp", "00100": "Meo Corp II"};
    var hash = window.location.hash.substr(1);

    function getClassFromGenes(id) {
        let bin = axies[id].genes.slice(0, 4);
        if (!(bin in classGeneMap)) {
            console.log(bin + " is not in the gene map. unknown class.");
            return "unknown";
        }
        return classGeneMap[bin];
    }

    function generateIDs(ids) {
        var list = "";
        for (let i in ids) {
            let axie = axies[ids[i]];
            let color = "";
            if (axie == null || axie['class'] == null || typeof axie == "undefined") {
                color = "btn-" + getClassFromGenes(ids[i]);
            } else {
                color = "btn-" + axie['class'];
            }
            if (typeof axie != "undefined" && axie['auction'] && hash.indexOf("auction") != -1) {
                //like everything else, auction data is not real-time
                list += '<a target="_blank" role="button" class="mb-1 btn btn-sm btn-info ' + color + '" href="https://marketplace.axieinfinity.com/axie/' + ids[i] + '?r=CHl5UkYrgttjndv97yqxcY_6dnY">#' + ids[i] + '*</a> ';
            } else {
                list += '<a target="_blank" role="button" class="mb-1 btn btn-sm btn-info ' + color + '" href="https://marketplace.axieinfinity.com/axie/' + ids[i] + '?r=CHl5UkYrgttjndv97yqxcY_6dnY">#' + ids[i] + '</a> ';
            }
        }
        return list;
    }

    function renderID(data, type, row, meta) {
        let out = data;
        if(type === 'display'){
            out = generateIDs([data]);
            if (axies[data].name && axies[data].name != "Axie #" + data) {
                let name = axies[data].name;
                if (name.length > 12) {
                    name = name.substr(0, 12) + "…";
                }
                out += '<br><span class="small">' + weakEscape(name) + "</span>";
            }
        }
        return out;
    }

    function renderGroup0(data, type, row, meta) {
        let bin = data.slice(0, 4);
        if(type === 'display') {
            if (bin in classGeneMap) {
                return '<div class="binary">' + bin + "(" + parseInt(bin, 2) + ")</div>" + classGeneMap[bin];
            } else{
                return '<div class="binary">' + bin + "(" + parseInt(bin, 2) + ")</div>???";
            }

        }
        return bin;
    }

    function renderGroup01(data, type, row, meta) {
        let bin = data.slice(4, 8);
        if(type === 'display'){
            return '<div class="binary">' + bin + '</div>';
        }
        return bin;
    }

    //XXX: assuming 5 bits
    function renderRegion(data, type, row, meta) {
        let bin = data.slice(8, 13);
        if(type === 'display'){
            let region = "?";
            if (bin in regionGeneMap) {
                region = regionGeneMap[bin];
            }
            return '<div class="binary">' + bin + "</div>" + region;
        }
        return bin;
    }

    //XXX: assuming 5 bits
    function renderTag(data, type, row, meta) {
        let bin = data.slice(13, 18);
        if(type === 'display'){
            let tag = "?";
            if (bin in tagGeneMap) {
                tag = tagGeneMap[bin];
            }
            return '<div class="binary">' + bin + '</div>' + tag;
        }
        return bin;
    }

    function renderBodySkin(data, type, row, meta) {
        let bin = data.slice(18, 22);
        if(type === 'display'){
            //Temporary until more bodies appear
            if (bin == "0001") {
                return '<div class="binary">' + bin + '</div>Frosty';
            }
            return '<div class="binary">' + bin + '</div>';
        }
        return bin;
    }

    //Temporary map. Just represent parts (yes/no) for now.
    //TODO: consider breaking this up into 2 bit chunks
    var skinMap = {"eyes": parseInt("010000000000", 2), "mouth": parseInt("000100000000", 2), "ears": parseInt("000001000000", 2), "horn": parseInt("000000010000", 2), "back": parseInt("000000000100", 2), "tail": parseInt("000000000001", 2)}
    var skinMapNames = {"eyes": {"010000000000": "Icy Gaze"}, "mouth": {"000100000000": "Tiny Carrot"}, "ears": {"000001000000": "Pinecones"}, "horn": {"000000010000": "Santa's Gift"}, "back": {"000000000100": "Frozen Bucket"}, "tail": {"000000000001": "Fir Trunk"}}
    function renderPartSkin(data, type, row, meta) {
        let bin = data.slice(22, 34);
        if(type === 'display'){
            let binVal = parseInt(bin, 2)
            let skinned = [];
            for (let part in skinMap) {
                //TODO: fix this when skinned value overflows into the 2nd bit
                if (skinMap[part] & binVal) {
                    skinned.push(part);
                }
            }
            if (skinned.length > 0) {
                return '<div class="binary">' + bin + '</div>' + skinned.join(", ");
            }
            return '<div class="binary">' + bin + '</div>';
        }
        return bin;
    }

    function renderGroup1(data, type, row, meta) {
        let bin = data.slice(0, 2);
        if(type === 'display'){
            return '<div class="binary">' + bin + '</div>';
        }
        return bin;
    }

    //wetdog 1 + 30 = 33
    //chubby 29 + 3 = 34
    //bigyak 33 + 34 = 49
    var patternMap = {"000001": "greyfuzzy","000010": "(0, 0, 64, 130)", "000011": "(0, 0, 61, 107)", "000100": "(0, 0, 82, 74)", "000101": "(0, 0, 66, 101)", "000110": "(0, 0, 51, 134)", "000111": "(0, 0, 57, 117)", "001000": "(0, 0, 59, 67)", "001001": "(0, 0, 51, 104)", "001010": "(0, 0, 63, 131)", "001011": "(0, 0, 73, 153)", "001100": "(0, 0, 78, 127)", "001101": "(0, 0, 63, 99)", "001110": "(0, 0, 65, 55)", "011101": "greyspiky", "011110": "greycurly", "100001": "greywetdog", "100010": "greychubby", "110001": "greybigyak"};
    function renderPatternD(data, type, row, meta) {
        let bin = data.slice(0, 6);
        if(type === 'display'){
            let pattern = patternMap[bin];
            if (pattern) {
                return '<b><div class="text-primary binary">' + bin +  "(" + parseInt(bin, 2) + ')</div><img height="25" class="changebg autoBig" src="colors/' + pattern + '-pattern.png"></b>';
            }
            else {
                return '<b><div class="text-primary binary">' + bin +  "(" + parseInt(bin, 2) + ')</div>?</b>';
            }
        }
        return bin;
    }

    function renderPatternR1(data, type, row, meta) {
        let bin = data.slice(6, 12);
        if(type === 'display'){
            let pattern = patternMap[bin];
            if (pattern) {
                return '<div class="binary">' + bin +  "(" + parseInt(bin, 2) + ')</div><img height="25" class="changebg autoBig" src="colors/' + pattern + '-pattern.png">';
            }
            else {
                return '<div class="binary">' + bin +  "(" + parseInt(bin, 2) + ')</div>?';
            }
        }
        return bin;
    }

    function renderPatternR2(data, type, row, meta) {
        let bin = data.slice(12, 18);
        if(type === 'display'){
            let pattern = patternMap[bin];
            if (pattern) {
                return '<div class="binary">' + bin +  "(" + parseInt(bin, 2) + ')</div><img height="25" class="changebg autoBig" src="colors/' + pattern + '-pattern.png">';
            }
            else {
                return '<div class="binary">' + bin +  "(" + parseInt(bin, 2) + ')</div>?';
            }
        }
        return bin;
    }

    var geneColorMap = {"0000": {"0010": "ffec51","0011": "ffa12a","0100": "f0c66e", "0110": "60afce"},
    "0001": {"0010": "ff7183", "0011": "ff6d61", "0100": "f74e4e",},
    "0010": {"0010": "ff9ab8", "0011": "ffb4bb", "0100": "ff778e"},
    "0011": {"0010": "ccef5e", "0011": "efd636", "0100": "c5ffd9"},
    "0100": {"0010": "4cffdf", "0011": "2de8f2", "0100": "759edb", "0110": "ff5a71"},
    "0101": {"0010": "fdbcff", "0011": "ef93ff", "0100": "f5e1ff", "0110": "43e27d"},
    //nut
    "1000": {"0010": "d0dada", "0011": "d4a69e","0100": "93828a"},
    //star
    "1001": {"0010": "d7ccfe", "0011": "fefda0","0100": "c0fcfe"},
    //moon
    "1010": {"0010": "62c5c3", "0011": "389ec6","0100": "1bc4c4"}};

    function renderGroup16(data, type, row, meta) {
        let bin = data.slice(18, 22);
        let color = "";
        if(type === 'display'){
            if (bin == "0000") {
                color = "ffffff";
            } else if (bin == "0001") {
                color = "7a6767";
            } else {
                let cls = row.group0.slice(0, 4);
                color = geneColorMap[cls][bin];
            }
            return '<b><div class="text-primary binary">' + bin + "(" + parseInt(bin, 2) + ')</div><img width="25" src="colors/' + color + '-body.png">' + "</b>";
        }
        return bin;
    }

    function renderGroup17(data, type, row, meta) {
        let bin = data.slice(22, 26);
        let color = "";
        if(type === 'display'){
            if (bin == "0000") {
                color = "ffffff";
            } else if (bin == "0001") {
                color = "7a6767";
            } else {
                let cls = row.group0.slice(0, 4);
                color = geneColorMap[cls][bin];
            }
            return '<div class="binary">' + bin + "(" + parseInt(bin, 2) + ')</div><img width="25" src="colors/' + color + '-body.png">';
        }

        return bin;
    }

    function renderGroup18(data, type, row, meta) {
        let bin = data.slice(26, 30);
        let color = "";
        if(type === 'display'){
            if (bin == "0000") {
                color = "ffffff";
            } else if (bin == "0001") {
                color = "7a6767";
            } else {
                let cls = row.group0.slice(0, 4);
                color = geneColorMap[cls][bin];
            }
            return '<div class="binary">' + bin + "(" + parseInt(bin, 2) + ')</div><img width="25" src="colors/' + color + '-body.png">';
        }
        return bin
    }

    //Mystic
    function renderGroup2(data, type, row, meta) {
        let bin = data.slice(0, 2);
        if (type === 'display') {
            if (bin == "11") {
                return '<div class="binary">' + bin + '</div>Mystic';
            } else if (bin == "10") {
                return '<div class="binary">' + bin + '</div>Xmas';
            }
            return '<div class="binary">' + bin + '</div>Normal';
        }
        return bin;
    }

    //class
    function renderGroup21(data, type, row, meta) {
        let bin = data.slice(2, 6);
        if(type === 'display'){
            return '<div class="text-primary"><b><div class="binary">' + bin + '</div>' + classGeneMap[bin] + "</b></div>";
        }
        return bin;
    }

    function getRegion(row) {
        let rBit = row.group0.slice(8,13);
        if (rBit in regionGeneMap) {
            return regionGeneMap[rBit];
        } else {
            console.log("unknown region");
            return null;
        }

    }

    //skinBinary is the first 2 bits of the group (e.g. mystic is 11). It's same skinBinary for all 3 D, R1, R2
    function getTraitName(row, skinBinary, classBinary, traitBinary, type, checkMystic = false, newSkinBinary = null) {

        let region = getRegion(row);
        if (region == null) {
            console.log("unknown region");
            return "Unknown regional trait";
        }

        if (traitMapping[classGeneMap[classBinary]][type] == null) {
            console.log("classBinary: " + classBinary + "classGeneMap[classBinary]" + classGeneMap[classBinary] + " type: " + type + " traitMapping[classGeneMap[classBinary]][type] " + traitMapping[classGeneMap[classBinary]][type]);
        }
        if (!(traitBinary in traitMapping[classGeneMap[classBinary]][type])) return "UNKNOWN";
        let name = "";
        if (newSkinBinary != null) {
            //TODO: fix this when skinned value overflows into the 2nd bit
            for (skinBin in skinMapNames[type]) {
                if (parseInt(skinBin, 2) & parseInt(newSkinBinary, 2)) {
                    return skinMapNames[type][skinBin];
                }
            }
        }
        if (skinBinary == "11" && checkMystic) {
            let isMystic = skinBinary == "11";
            name = traitMapping[classGeneMap[classBinary]][type][traitBinary]["mystic"];
        } else {
            if (skinBinary == "10") {
                name = traitMapping[classGeneMap[classBinary]][type][traitBinary]["xmas"];
            } else {
                name = traitMapping[classGeneMap[classBinary]][type][traitBinary][region];
            }
        }
        if (typeof name == "undefined") {
            //unknown region?
            name = traitMapping[classGeneMap[classBinary]][type][traitBinary]["global"];
            if (typeof name == "undefined") {
                let keys = Object.keys(traitMapping[classGeneMap[classBinary]][type][traitBinary]);
                if (keys.length > 0) {
                    return "Undiscovered regional?: " + traitMapping[classGeneMap[classBinary]][type][traitBinary][keys[0]];
                }
                return "UNKNOWN region?";
            }

        }
        return name;
    }

    function renderGroup22(data, type, row, meta) {
        let bin = data.slice(6, 12);
        name = getTraitName(row, data.slice(0, 2), data.slice(2, 6), bin, meta.settings.aoColumns[meta.col].sTitle.toLowerCase(), true, row.group0.slice(22, 34));
        if(type === 'display'){
            //name = getTraitName(row, data.slice(0, 6), bin, meta.settings.aoColumns[meta.col].sTitle.toLowerCase(), true);
            return '<div class="text-primary"><b><div class="binary">' + bin + "</div>" + name + "</b></div>";
        }
        //return bin;
        return name;
    }
/*
    function renderGroup23(data, type, row, meta) {
        let bin = data.slice(11,12);
        if (type === 'display') {
            return '<div class="binary">' + bin + '</div>';
        }
        return bin;
    }
*/
    function renderGroup24(data, type, row, meta) {
        let bin = data.slice(12, 16);
        if (type === 'display') {
            return '<div class="binary">' + bin + '</div>' + classGeneMap[data.slice(12, 16)];
        }
        return bin;
    }

    function renderGroup25(data, type, row, meta) {
        let bin = data.slice(16, 22);
        let name = getTraitName(row, data.slice(0, 2), data.slice(12, 16), bin, meta.settings.aoColumns[meta.col].sTitle.toLowerCase().slice(0, -3));
        if (type === 'display') {
            //let name = getTraitName(row, data.slice(10,16), bin, meta.settings.aoColumns[meta.col].sTitle.toLowerCase().slice(0, -3));
            return '<div class="binary">' + bin + "</div>" + name;
        }
        return name;
        //return bin;
    }
/*
    function renderGroup26(data, type, row, meta) {
        let bin = data.slice(21,22);
        if (type === 'display') {
            return '<div class="binary">' + bin + '</div>';
        }
        return bin;
    }
*/
    function renderGroup27(data, type, row, meta) {
        let bin = data.slice(22, 26);
        if (type === 'display') {
            return '<div class="binary">' + bin + '</div>' + classGeneMap[data.slice(22, 26)];
        }
        return bin;
    }

    function renderGroup28(data, type, row, meta) {
        let bin = data.slice(26, 32);
        let name = getTraitName(row, data.slice(0, 2), data.slice(22, 26), bin, meta.settings.aoColumns[meta.col].sTitle.toLowerCase().slice(0, -3));
        if (type === 'display') {
            //let name = getTraitName(row, data.slice(20,26), bin, meta.settings.aoColumns[meta.col].sTitle.toLowerCase().slice(0, -3));
            return '<div class="binary">' + bin + "</div>" + name;
        }
        return name;
        //return bin;
    }
/*
    function renderGroup29(data, type, row, meta) {
        let bin = data.slice(31, 32);
        if (type === 'display') {
            return '<div class="binary">' + bin + '</div>';
        }
        return bin;
    }
*/
    function renderPrice(data, type, row, meta) {
        if (data && type === 'display') {
            return data.toFixed(5);
        }
        return data;
    }

    function getTypeImage(cls, type) {
        return '<div class ="btn-' + cls + ' circle-' + type + '"></div>';
    }

    function formatCompact(row) {
        let tbl = '<table class="table" colspan="10">' +
            '<thead>' +
                '<tr>' +
                    '<th>Part</th>' +
                    '<th>D Class</th>' +
                    '<th>D Name</th>' +
                    '<th>R1 Class</th>' +
                    '<th>R1 Name</th>' +
                    '<th>R2 Class</th>' +
                    '<th>R2 Name</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody>';


            for (let type in typeOrder) {
                let group = "group" + typeOrder[type];
                let skinBinary = row[group].slice(0, 2);
                let classBinary = row[group].slice(2, 6);
                let cls = classGeneMap[classBinary];
                let bin = row[group].slice(6, 12);
                let newSkinBinary = row["group0"].slice(22, 34);
                let html = "<tr><td>" + getTypeImage(cls, type) + "</td>";
                name = getTraitName(row, skinBinary, classBinary, bin, type, true, newSkinBinary);
                if (skinBinary == "11") {
                    name += "*";
                }
                html += "<td>" + cls + "</td><td class=\"text-" + cls + "\">" + name + "</td>";
                classBinary = row[group].slice(12, 16);
                cls = classGeneMap[row[group].slice(12, 16)];
                bin = row[group].slice(16,22);
                name = getTraitName(row, skinBinary, classBinary, bin, type, false);
                html += "<td>" + cls + "</td><td class=\"text-" + cls + "\">" + name + "</td>";
                classBinary = row[group].slice(22, 26);
                cls = classGeneMap[row[group].slice(22, 26)];
                bin = row[group].slice(26,32);
                name = getTraitName(row, skinBinary, classBinary, bin, type, false);
                html += "<td>" + cls + "</td><td class=\"text-" + cls + "\">" + name + "</td></tr>";
                tbl += html;
            }
            tbl += '</tbody></table>';
            if (row.price) {
                tbl += '<div class="row ml-0"><div>Price: ' + row.price.toFixed(4) + ", &nbsp;</div>";
                tbl += '<div id="extraData_' + row.id + '"></div></div>';
            } else {
                tbl += '<div id="extraData_' + row.id + '"></div>';
            }

            return tbl;
    }

    var axieTable;
    var data;
    var columns = [
                {title: "ID", data: "id", "render": renderID},

                {title: "Class", data: "group0", render: renderGroup0, searchable: false},
                {title: "0.1", data: "group0", render: renderGroup01, searchable: false},
                {title: "Region", data: "group0", render: renderRegion, searchable: false},
                {title: "Tag", data: "group0", render: renderTag, searchable: false},
                {title: "Body Skin", data: "group0", render: renderBodySkin, searchable: false},
                {title: "Part Skin", data: "group0", render: renderPartSkin, searchable: false},
                //{title: "1.0", data: "group0", render: renderGroup1, searchable: false},

                {title: "Pattern", data: "group1", render: renderPatternD, searchable: false},
                {title: "Pattern R1", data: "group1", render: renderPatternR1, searchable: false},
                {title: "Pattern R2", data: "group1", render: renderPatternR2, searchable: false},
                {title: "Color", data: "group1", render: renderGroup16, searchable: false},
                {title: "Color R1", data: "group1", render: renderGroup17, searchable: false},
                {title: "Color R2", data: "group1", render: renderGroup18, searchable: false},

                {title: "Skin", data: "group2", render: renderGroup2, searchable: false},
                {title: "Eyes Class", data: "group2", render: renderGroup21, searchable: false},
                {title: "Eyes", data: "group2", render: renderGroup22, searchable: true},
                {title: "Eyes Class R1", data: "group2", render: renderGroup24, searchable: false},
                {title: "Eyes R1", data: "group2", render: renderGroup25, searchable: true},
                {title: "Eyes Class R2", data: "group2", render: renderGroup27, searchable: false},
                {title: "Eyes R2", data: "group2", render: renderGroup28, searchable: true},

                {title: "Skin", data: "group3", render: renderGroup2, searchable: false},
                {title: "Mouth Class", data: "group3", render: renderGroup21, searchable: false},
                {title: "Mouth", data: "group3", render: renderGroup22, searchable: true},
                {title: "Mouth Class R1", data: "group3", render: renderGroup24, searchable: false},
                {title: "Mouth R1", data: "group3", render: renderGroup25, searchable: true},
                {title: "Mouth Class R2", data: "group3", render: renderGroup27, searchable: false},
                {title: "Mouth R2", data: "group3", render: renderGroup28, searchable:true},

                {title: "Skin", data: "group4", render: renderGroup2, searchable: false},
                {title: "Ears Class", data: "group4", render: renderGroup21, searchable: false},
                {title: "Ears", data: "group4", render: renderGroup22, searchable: true},
                {title: "Ears Class R1", data: "group4", render: renderGroup24, searchable: false},
                {title: "Ears R1", data: "group4", render: renderGroup25, searchable: true},
                {title: "Ears Class R2", data: "group4", render: renderGroup27, searchable: false},
                {title: "Ears R2", data: "group4", render: renderGroup28, searchable: true},

                {title: "Skin", data: "group5", render: renderGroup2, searchable: false},
                {title: "Horn Class", data: "group5", render: renderGroup21, searchable: false},
                {title: "Horn", data: "group5", render: renderGroup22, searchable: true},
                {title: "Horn Class R1", data: "group5", render: renderGroup24, searchable: false},
                {title: "Horn R1", data: "group5", render: renderGroup25, searchable: true},
                {title: "Horn Class R2", data: "group5", render: renderGroup27, searchable: false},
                {title: "Horn R2", data: "group5", render: renderGroup28, searchable: true},

                {title: "Skin", data: "group6", render: renderGroup2, searchable: false},
                {title: "Back Class", data: "group6", render: renderGroup21, searchable: false},
                {title: "Back", data: "group6", render: renderGroup22, searchable: true},
                {title: "Back Class R1", data: "group6", render: renderGroup24, searchable: false},
                {title: "Back R1", data: "group6", render: renderGroup25, searchable: true},
                {title: "Back Class R2", data: "group6", render: renderGroup27, searchable: false},
                {title: "Back R2", data: "group6", render: renderGroup28, searchable: true},

                {title: "Skin", data: "group7", render: renderGroup2, searchable: false},
                {title: "Tail Class", data: "group7", render: renderGroup21, searchable: false},
                {title: "Tail", data: "group7", render: renderGroup22, searchable: true},
                {title: "Tail Class R1", data: "group7", render: renderGroup24, searchable: false},
                {title: "Tail R1", data: "group7", render: renderGroup25, searchable: true},
                {title: "Tail Class R2", data: "group7", render: renderGroup27, searchable: false},
                {title: "Tail R2", data: "group7", render: renderGroup28, searchable: true},

                {title: "Exp", data: "exp", searchable: false},
                {title: "Breeds", data: "breedCount", searchable: false},
                {title: "Num Mystics", data: "mystics", searchable: false},
                {title: "Num Beast", data: "beasts", searchable: false},
                {title: "Num Bug", data: "bugs", searchable: false},
                {title: "Num Bird", data: "birds", searchable: false},
                {title: "Num Plant", data: "plants", searchable: false},
                {title: "Num Aquatic", data: "aquatics", searchable: false},
                {title: "Num Reptile", data: "reptiles", searchable: false},

                {title: "HP", data: "stats.hp", searchable: false},
                {title: "Speed", data: "stats.speed", searchable: false},
                {title: "Skill", data: "stats.skill", searchable: false},
                {title: "Morale", data: "stats.morale", searchable: false},

                {title: "owner", data: "owner", searchable: true}
                ];
    function addRow(axie) {
        let row = {id: axie.id};
        let numMystic = 0;
        let numBeast = 0;
        let numBug = 0;
        let numBird = 0;
        let numPlant = 0;
        let numAquatic = 0;
        let numReptile = 0;

        for (let i = 0; i < 8; i++) {
            if (i < 2 ) {
                if (i == 0) {
                    row["group" + i] = axie.genes.slice(0, 34);
                } else {
                    row["group" + i] = axie.genes.slice(34, 64);
                }
            } else {
                row["group" + i] = axie.genes.slice(i * 32, i * 32 + 32);
            }

            if (i > 1) {
                if (row["group" + i].slice(0, 2) == "11") {
                    numMystic++;
                }
                let cls = row["group" + i].slice(2, 6);
                switch(classGeneMap[cls]) {
                    case "beast":
                        numBeast++;
                        break;
                    case "bug":
                        numBug++;
                        break;
                    case "bird":
                        numBird++;
                        break;
                    case "plant":
                        numPlant++;
                        break;
                    case "aquatic":
                        numAquatic++;
                        break;
                    case "reptile":
                        numReptile++;
                        break;
                }
            }
            //row["group" + i].slice(12,16) //R2
            //row["group" + i].slice(22,26) //R1
        }
        row['mystics'] = numMystic;
        if ('owner' in axie) {
            row['owner'] = axie['owner'];
        } else {
            row['owner'] = "?";
        }
        row['exp'] = axie['exp'] ? axie['exp'] : 0;
        row['breedCount'] = axie['breedCount'];
        row["beasts"] = numBeast;
        row["bugs"] = numBug;
        row["birds"] = numBird;
        row["plants"] = numPlant;
        row["aquatics"] = numAquatic;
        row["reptiles"] = numReptile;
        if ("price" in axie) row["price"] = axie["price"];

        row.stats = axie.stats;
        //validate
        row.stats.hp = parseInt(axie.stats.hp);
        row.stats.speed = parseInt(axie.stats.speed);
        row.stats.skill = parseInt(axie.stats.skill);
        row.stats.morale = parseInt(axie.stats.morale);

        //add/adjust for new column

        axieTable.row.add(row);
        axieTable.draw();
    }

    function initTable() {
        axieTable = $('#axieTable').DataTable({
//                dom: 'lfrBtip',

            data: data,
            order: [[ 0, "desc" ]],
            columns: columns,
            deferRender: true,
            "language": {"search": "Filter (ID,owner or trait):"},
            pageLength: 50,
            "columnDefs": [
                { className: "text-center", "targets": [ "_all" ] }
            ]
        });

        $('.dataTables_filter input').off('keyup search input');
        $('.dataTables_filter input').on('keyup search input' , function (e) {
            var searchVal = $('.dataTables_filter input').val().trim();
            if (e.which == 13) {
                if (searchVal.startsWith("0x")) {
                    axieTable.search("").columns().search("");
                    axieTable.column(axieTable.columns()[0].length - 1).search(searchVal).draw();
                } else if (searchVal != "" && !isNaN(searchVal)) {
                    axieTable.search("").columns().search("");
                    axieTable.column(0).search(searchVal).draw();
                } else if (searchVal != "") {
                    axieTable.search("").columns().search("");
                    axieTable.search(searchVal).draw();
                } else {
                    //??
                    axieTable.search("").columns().search("").draw();
                    //axieTable.columns().search(searchVal).draw();
                }
            } else if (searchVal == "") {
                axieTable.search("").columns().search("").draw();
            }
        });

        $("#axieTable_length").after('&nbsp; <input id="binaryToggle" class="text-right ml-4" type="checkbox" onclick="toggleBinary()"/> Hide binary');

        //doesn't copy nicely yet. don't show for now
        //axieTable.buttons().container().appendTo( $('#copyDiv') );

        $('#axieTable tbody').on('click', 'tr', function () {
            var tr = $(this).closest('tr');
            var row = axieTable.row( tr );

            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                //tr.removeClass('shown');
            }
            else {
                // Open this row
                let data = row.data();
                let html = formatCompact(data);
                row.child(html).show();
                row.child()[0].firstChild.colSpan = 8;
                setExtraData(data.id);
                //tr.addClass('shown');
            }
        } );
    }

    function setExtraData(id) {
        let axie = axies[id];
        if (!(axies[id].hasOwnProperty("totalSynced"))) {
            getExtendedAxieData(axie, () => {
                $("#extraData_" + axie.id).text("Exp: " + (axie.exp ? axie.exp : 0) + ", Pending exp: " + axie.truePending + ", Breeds: " + axie.breedCount);
            });
        } else {
            $("#extraData_" + axie.id).text("Exp: " + (axie.exp ? axie.exp : 0) + ", Pending exp: " + axie.truePending + ", Breeds: " + axie.breedCount);
        }
    }