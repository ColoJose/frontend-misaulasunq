export default function AuthorizeJWT(jwt) {
    (function(){
        var instance;

        function createInstance() {
            var obj = new Object(jwt);
            return obj;
        }

        return {
            getInstance: function() {
                if(!instance) { instance = createInstance()}
                return instance;
            }
        };
    })();
}