"use strict";
var jwt = require("jsonwebtoken");
var Promise = require("bluebird");
var superagent = require("superagent");
var default_1 = (function () {
    function default_1(o) {
        if (!o || !o.secret)
            throw Error("no secret provided");
        if (o.couchdb)
            this.couchdb = o.couchdb;
        if (o.app_id)
            this.app_id = o.app_id;
        this.secret = o.secret;
    }
    default_1.prototype.decode = function (token) {
        var decoded;
        try {
            decoded = jwt.verify(token, this.secret);
        }
        catch (err) {
            decoded = false;
        }
        return decoded;
    };
    default_1.prototype.couchdbauthorize = function (o) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (o) {
                if (o.user && o.password) {
                    if (_this.couchdb && _this.app_id) {
                        var couchdb = void 0;
                        couchdb = _this.couchdb;
                        superagent.post(_this.couchdb + "/getmachines").send({
                            username: o.user,
                            passw: o.password,
                            app_id: _this.app_id
                        }).end(function (err, res) {
                            if (err) {
                                reject(err);
                            }
                            else if (res && res.body && res.body.data && res.body.data.appdb) {
                                var obj = res.body;
                                obj.data.appdb.user = o.user;
                                obj.token = jwt.sign(obj.data.appdb, _this.secret);
                                resolve(obj);
                            }
                            else {
                                reject("server error");
                            }
                        });
                    }
                    else {
                        reject("no couchdbserver provided");
                    }
                }
                else {
                    reject("provide credentials!");
                }
            }
            else {
                reject("wrong params");
            }
        });
    };
    default_1.prototype.authorize = function (o) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!o) {
                reject("no vars provided");
            }
            else if (!o.provider) {
                reject("no provider");
            }
            else {
                switch (o.provider) {
                    case "couchdb":
                        _this.couchdbauthorize(o).then(function (a) {
                            resolve(a);
                        }).catch(function (err) {
                            reject(err);
                        });
                        break;
                    default:
                        reject("wrong provider");
                        break;
                }
            }
        });
    };
    return default_1;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;

//# sourceMappingURL=data:application/json;base64,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NEJBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO3dCQUNmLENBQUMsQ0FBQyxDQUFBO3dCQUNGLEtBQUssQ0FBQztvQkFFVjt3QkFFSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTt3QkFDeEIsS0FBSyxDQUFDO2dCQUVkLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBTUwsZ0JBQUM7QUFBRCxDQWxHQSxBQWtHQyxJQUFBO0FBbEdEOzJCQWtHQyxDQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuaW1wb3J0ICogYXMgc3VwZXJhZ2VudCBmcm9tIFwic3VwZXJhZ2VudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc2VjcmV0OiBzdHJpbmc7XG4gICAgY291Y2hkYjogc3RyaW5nO1xuICAgIGFwcF9pZDogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKG86IHsgc2VjcmV0OiBzdHJpbmcsIGNvdWNoZGI/OiBzdHJpbmcsIGFwcF9pZD86IHN0cmluZyB9KSB7XG4gICAgICAgIGlmICghbyB8fCAhby5zZWNyZXQpIHRocm93IEVycm9yKFwibm8gc2VjcmV0IHByb3ZpZGVkXCIpO1xuXG4gICAgICAgIGlmIChvLmNvdWNoZGIpIHRoaXMuY291Y2hkYiA9IG8uY291Y2hkYjtcbiAgICAgICAgaWYgKG8uYXBwX2lkKSB0aGlzLmFwcF9pZCA9IG8uYXBwX2lkO1xuXG4gICAgICAgIHRoaXMuc2VjcmV0ID0gby5zZWNyZXQ7XG4gICAgfVxuXG5cbiAgICBkZWNvZGUodG9rZW4pOiBhbnkge1xuICAgICAgICBsZXQgZGVjb2RlZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRlY29kZWQgPSBqd3QudmVyaWZ5KHRva2VuLCB0aGlzLnNlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgZGVjb2RlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWNvZGVkO1xuICAgIH1cblxuICAgIGNvdWNoZGJhdXRob3JpemUobzogeyB1c2VyOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcgfSkge1xuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGlmIChvKSB7XG4gICAgICAgICAgICAgICAgaWYgKG8udXNlciAmJiBvLnBhc3N3b3JkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmNvdWNoZGIgJiYgX3RoaXMuYXBwX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291Y2hkYjogc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY291Y2hkYiA9IF90aGlzLmNvdWNoZGI7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdXBlcmFnZW50LnBvc3QoX3RoaXMuY291Y2hkYiArIFwiL2dldG1hY2hpbmVzXCIpLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJuYW1lOiBvLnVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzc3c6IG8ucGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwX2lkOiBfdGhpcy5hcHBfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmVuZCgoZXJyLCByZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzICYmIHJlcy5ib2R5ICYmIHJlcy5ib2R5LmRhdGEgJiYgcmVzLmJvZHkuZGF0YS5hcHBkYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmogPSByZXMuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmRhdGEuYXBwZGIudXNlciA9IG8udXNlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnRva2VuID0gand0LnNpZ24ob2JqLmRhdGEuYXBwZGIsIF90aGlzLnNlY3JldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvYmopXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwic2VydmVyIGVycm9yXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcIm5vIGNvdWNoZGJzZXJ2ZXIgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJwcm92aWRlIGNyZWRlbnRpYWxzIVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIndyb25nIHBhcmFtc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhdXRob3JpemUobzogeyBwcm92aWRlcjogc3RyaW5nOyB1c2VyOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcgfSkge1xuXG4gICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGlmICghbykge1xuICAgICAgICAgICAgICAgIHJlamVjdChcIm5vIHZhcnMgcHJvdmlkZWRcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFvLnByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwibm8gcHJvdmlkZXJcIik7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG8ucHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvdWNoZGJcIjpcblxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuY291Y2hkYmF1dGhvcml6ZShvKS50aGVuKChhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwid3JvbmcgcHJvdmlkZXJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vICAgcmVnaXN0ZXIobzogeyBwcm92aWRlcjogc3RyaW5nOyB1c2VyOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcsIGRiPzogc3RyaW5nIH0pOiBzdHJpbmcge1xuXG4gICAgLy8gICB9XG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
