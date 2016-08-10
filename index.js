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

//# sourceMappingURL=data:application/json;base64,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QUFDO29CQUVWO3dCQUVJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO3dCQUN4QixLQUFLLENBQUM7Z0JBRWQsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFNTCxnQkFBQztBQUFELENBaEdBLEFBZ0dDLElBQUE7QUFoR0Q7MkJBZ0dDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCAqIGFzIGp3dCBmcm9tIFwianNvbndlYnRva2VuXCJcbmltcG9ydCAqIGFzIFByb21pc2UgZnJvbSBcImJsdWViaXJkXCI7XG5pbXBvcnQgKiBhcyBzdXBlcmFnZW50IGZyb20gXCJzdXBlcmFnZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzZWNyZXQ6IHN0cmluZztcbiAgICBjb3VjaGRiOiBzdHJpbmc7XG4gICAgYXBwX2lkOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IobzogeyBzZWNyZXQ6IHN0cmluZywgY291Y2hkYj86IHN0cmluZywgYXBwX2lkPzogc3RyaW5nIH0pIHtcbiAgICAgICAgaWYgKCFvIHx8ICFvLnNlY3JldCkgdGhyb3cgRXJyb3IoXCJubyBzZWNyZXQgcHJvdmlkZWRcIik7XG5cbiAgICAgICAgaWYgKG8uY291Y2hkYikgdGhpcy5jb3VjaGRiID0gby5jb3VjaGRiO1xuICAgICAgICBpZiAoby5hcHBfaWQpIHRoaXMuYXBwX2lkID0gby5hcHBfaWQ7XG5cbiAgICAgICAgdGhpcy5zZWNyZXQgPSBvLnNlY3JldDtcbiAgICB9XG5cblxuICAgIGRlY29kZSh0b2tlbik6IGFueSB7XG4gICAgICAgIGxldCBkZWNvZGVkO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHRoaXMuc2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBkZWNvZGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlY29kZWQ7XG4gICAgfVxuXG4gICAgY291Y2hkYmF1dGhvcml6ZShvOiB7IHVzZXI6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyB9KSB7XG4gICAgICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKG8pIHtcbiAgICAgICAgICAgICAgICBpZiAoby51c2VyICYmIG8ucGFzc3dvcmQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY291Y2hkYiAmJiBfdGhpcy5hcHBfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VjaGRiOiBzdHJpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VjaGRiID0gX3RoaXMuY291Y2hkYjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cGVyYWdlbnQucG9zdChfdGhpcy5jb3VjaGRiICsgXCIvZ2V0bWFjaGluZXNcIikuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWU6IG8udXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzdzogby5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBfaWQ6IF90aGlzLmFwcF9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXMgJiYgcmVzLmJvZHkgJiYgcmVzLmJvZHkuZGF0YSAmJiByZXMuYm9keS5kYXRhLmFwcGRiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHJlcy5ib2R5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZGF0YS5hcHBkYi51c2VyID0gby51c2VyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoudG9rZW4gPSBqd3Quc2lnbihvYmouZGF0YS5hcHBkYiwgX3RoaXMuc2VjcmV0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG9iailcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwibm8gY291Y2hkYnNlcnZlciBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChcInByb3ZpZGUgY3JlZGVudGlhbHMhXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwid3JvbmcgcGFyYW1zXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGF1dGhvcml6ZShvOiB7IHByb3ZpZGVyOiBzdHJpbmc7IHVzZXI6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyB9KSB7XG5cbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmc+KChyZXNvbHZlLCByZWplY3QpID0+IHtcblxuICAgICAgICAgICAgaWYgKCFvKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KFwibm8gdmFycyBwcm92aWRlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIW8ucHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXCJubyBwcm92aWRlclwiKTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoby5wcm92aWRlcikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY291Y2hkYlwiOlxuXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jb3VjaGRiYXV0aG9yaXplKG8pLnRoZW4oKGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoXCJ3cm9uZyBwcm92aWRlclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gICByZWdpc3RlcihvOiB7IHByb3ZpZGVyOiBzdHJpbmc7IHVzZXI6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZGI/OiBzdHJpbmcgfSk6IHN0cmluZyB7XG5cbiAgICAvLyAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
