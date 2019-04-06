onmessage = function(e) {
    if ("selectedParts" in e.data) {
        offThreadCalc(e.data.selectedParts, e.data.axies, e.data.ignoreList);
    }
}

function offThreadCalc(selectedParts, axies, ignoreList) {
    let selectedIds = Object.keys(selectedParts);
    console.log("sub " + selectedIds);

    let typePartMap = {};
    for (let id in selectedParts) {
       typePartMap[id.substr(0, id.indexOf("-"))] = id;
    }

    var matchingParts = {};
    for (let id in axies) {
        if (ignoreList.has(parseInt(id))) continue;
        let axie = axies[id];
        for (let typ in typePartMap) {
            if (selectedIds.includes(axie.traits[typ].d.partId) || selectedIds.includes(axie.traits[typ].r1.partId) || selectedIds.includes(axie.traits[typ].r2.partId)) {
                matchingParts[axie.id] = axie;
                break;
            }
        }
    }
    allProbs = [];
    let pairs = [];
    for (let id1 in matchingParts) {
        for (let id2 in matchingParts) {
            let pair = Math.min(id1, id2) + "_" + Math.max(id1, id2);
            //lazy
            if (id1 != id2 && isBreedable(matchingParts[id1], matchingParts[id2]) && !pairs.includes(pair)) {
                let prob = calcTraitsProb(typePartMap, matchingParts[id1], matchingParts[id2]);
                if (prob > 0) {
                    allProbs.push({probability : prob, pair: pair});
                }
                pairs.push(pair);
            }
        }
    }
    allProbs.sort((a, b) => {
        return b.probability - a.probability;
    });
    postMessage({allProbs: allProbs});
    //renderTraitProbs(selectedParts, allProbs);
}

function calcTraitsProb(traits, sire, matron) {
    let sireTraits = sire.traits;
    let matronTraits = matron.traits;

    let probability = 1;
    for (let typ in traits) {
        let typeProb = sumProbs(sireTraits[typ], matronTraits[typ]);
        if (typeProb.hasOwnProperty(traits[typ])) {
            probability *= typeProb[traits[typ]]
        } else {
            probability = 0;
        }
    }
    return probability;
}

const PROBABILITIES = {d: 0.375, r1: 0.09375, r2: 0.03125};
function sumProbs(sireTraits, matronTraits) {
    let probs = {};
    for (let place in sireTraits) {
        if (place == "mystic") continue;
        if (sireTraits[place].partId in probs) {
            probs[sireTraits[place].partId] += PROBABILITIES[place];
        } else {
            probs[sireTraits[place].partId] = PROBABILITIES[place];
        }
    }
    for (let place in matronTraits) {
        if (place == "mystic") continue;
        if (matronTraits[place].partId in probs) {
            probs[matronTraits[place].partId] += PROBABILITIES[place];
        } else {
            probs[matronTraits[place].partId] = PROBABILITIES[place];
        }
    }
    return probs;
}

function isBreedable(axie1, axie2) {
    //self check
    if (axie1.id == axie2.id) {
        return false;
    }
    //sterile check
    if(axie1.expForBreeding > 10000 || axie2.expForBreeding > 10000){
        return false;
    }
    //parents check
    if (axie2.matronId == axie1.id || axie2.sireId == axie1.id) {
        return false;
    }
    if (axie1.matronId == axie2.id || axie1.sireId == axie2.id) {
        return false;
    }
    //After checking parents, skip if ether is a tagged axie
    if (axie1.matronId == 0 || axie2.matronId == 0) {
        return true;
    }
    //check siblings
    if (axie1.matronId == axie2.matronId || axie1.matronId == axie2.sireId) {
        return false;
    }
    if (axie1.sireId == axie2.matronId || axie1.sireId == axie2.sireId) {
        return false;
    }
    return true;
}