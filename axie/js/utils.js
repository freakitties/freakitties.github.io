    function strMul(str, num) {
        var s = "";
        for (var i = 0; i < num; i++) {
            s += str;
        }
        return s;
    }

    function genesToBin(genes) {
        var genesString = genes.toString(2);
        genesString = strMul("0", 256 - genesString.length) + genesString
        return genesString;
    }