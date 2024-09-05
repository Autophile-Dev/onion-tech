const CRYPTO_COINS_LIST = [
    "BTC",
    "ETH",
    "BNB",
    "POLS",
    "ADA",
    "LTC",
    "DOGE",
    "FTM",
    "DOT",
    "LINK",
    "NEO",
    "SOL",
    "XRP"
]

export const headerV3 = () => {
    return `
        <script type="text/javascript">
            baseUrl = "https://widgets.cryptocompare.com/";
            var scripts = document.getElementsByTagName("script");
            var embedder = scripts[ scripts.length - 1 ];
            var cccTheme = {"General":{"background":"#040E33","priceText":"#fff","enableMarquee":true},"Currency":{"color":"#fff"}};
            (function (){
            var appName = encodeURIComponent(window.location.hostname);
            if(appName==""){appName="local";}
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            var theUrl = baseUrl+'serve/v3/coin/header?fsyms=${CRYPTO_COINS_LIST.toString()}&tsyms=USD';
            s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
            embedder.parentNode.appendChild(s);
            })();
        </script>
    
    `
}

export const lineChart = (coinSymbol = "BTC") => {
    return `
        <script type="text/javascript">
            baseUrl = "https://widgets.cryptocompare.com/";
            var scripts = document.getElementsByTagName("script");
            var embedder = scripts[ scripts.length - 1 ];
            var cccTheme = {"General":{"borderColor":"#FFF"},"Header":{"background":"#FFF","color":"#FFF"},"Followers":{"color":"#FFF","borderColor":"#FFF","counterBorderColor":"#FFF","counterColor":"#FFF"},"Data":{"priceColor":"#FFF","infoLabelColor":"#FFF","infoValueColor":"#FFF"},"Chart":{"fillColor":"#FFF"},"Trend":{"colorUp":"#FFF","colorDown":"#FFF","colorUnchanged":"#FFF"},"Conversion":{"color":"#FFF"}};
            (function (){
            var appName = encodeURIComponent(window.location.hostname);
            if(appName==""){appName="local";}
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            var theUrl = baseUrl+'serve/v1/coin/chart?fsym=${coinSymbol}&tsym=USD';
            s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
            embedder.parentNode.appendChild(s);
            })();
        </script>
    `
}

export const advancedChart = (coinSymbol = "BTC") => {
    return `
        <script type="text/javascript">
            baseUrl = "https://widgets.cryptocompare.com/";
            var scripts = document.getElementsByTagName("script");
            var embedder = scripts[ scripts.length - 1 ];
            var cccTheme = {"General":{"borderColor":"#00000000"}};
            (function (){
            var appName = encodeURIComponent(window.location.hostname);
            if(appName==""){appName="local";}
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            var theUrl = baseUrl+'serve/v3/coin/chart?fsym=${coinSymbol}&tsyms=USD';
            s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
            embedder.parentNode.appendChild(s);
            })();
        </script>    
    `
}
export const assetsChart = () => {
    return `
    <script type="text/javascript">
    baseUrl = "https://widgets.cryptocompare.com/";
    var scripts = document.getElementsByTagName("script");
    var embedder = scripts[ scripts.length - 1 ];
    (function (){
    var appName = encodeURIComponent(window.location.hostname);
    if(appName==""){appName="local";}
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    var theUrl = baseUrl+'serve/v1/coin/chartscroller?fsyms=BTC,ETH,XMR,LTC&tsyms=USD,EUR,CNY,GBP';
    s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
    embedder.parentNode.appendChild(s);
    })();
    </script>
    `
}
export const coinChart = (coinSymbol) => {
    console.log("coinSymbol", coinSymbol)
    return `
    <script type="text/javascript">
    baseUrl = "https://widgets.cryptocompare.com/";
    var scripts = document.getElementsByTagName("script");
    var embedder = scripts[ scripts.length - 1 ];
    var cccTheme = {"General":{"background":"#1C4C4C","borderColor":"#1C4C4C"},"Header":{"background":"#1C4C4C","color":"#FFF"},"Followers":{"background":"#f7931a","color":"#FFF","borderColor":"#e0bd93","counterBorderColor":"#fdab48","counterColor":"#f5d7b2"},"Data":{"priceColor":"#FFF","infoLabelColor":"#CCC","infoValueColor":"#CCC"},"Chart":{"fillColor":"rgba(86,202,158,0.5)","borderColor":"#56ca9e"},"Conversion":{"background":"#000","color":"#999"}};
    (function (){
    var appName = encodeURIComponent(window.location.hostname);
    if(appName==""){appName="local";}
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    var theUrl = baseUrl+'serve/v1/coin/chart?fsym=${coinSymbol}&tsym=USD';
    s.src = theUrl + ( theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
    embedder.parentNode.appendChild(s);
    })();
    </script>
    `
}