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

    function weakEscape(str) {
        return str.replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, '&lt;').replace(/>/g, "&gt;");
    }
