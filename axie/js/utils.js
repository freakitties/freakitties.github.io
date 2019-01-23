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

    function getQueryParameter(name) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if(pair[0] == name) {
                return pair[1];
            }
        }
        return false;
    }
