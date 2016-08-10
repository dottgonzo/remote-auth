
import * as jwt from "jsonwebtoken"
import * as Promise from "bluebird";
import * as superagent from "superagent";

export default class {
    secret: string;
    couchdb: string;
    app_id: string;
    constructor(o: { secret: string, couchdb?: string, app_id?: string }) {
        if (!o || !o.secret) throw Error("no secret provided");

        if (o.couchdb) this.couchdb = o.couchdb;
        if (o.app_id) this.app_id = o.app_id;

        this.secret = o.secret;
    }


    decode(token): any {
        let decoded;
        try {
            decoded = jwt.verify(token, this.secret);
        } catch (err) {
            decoded = false;
        }
        return decoded;
    }

    couchdbauthorize(o: { user: string, password: string }) {
        const _this = this;
        return new Promise<string>((resolve, reject) => {
            if (o) {
                if (o.user && o.password) {

                    if (_this.couchdb && _this.app_id) {
                        let couchdb: string;
                        couchdb = _this.couchdb;
                        superagent.post(_this.couchdb + "/getmachines").send({
                            username: o.user,
                            passw: o.password,
                            app_id: _this.app_id
                        }).end((err, res) => {
                            if (err) {
                                reject(err);
                            } else if (res && res.body && res.body.data && res.body.data.appdb) {
                                const obj = res.body;
                                obj.data.appdb.user = o.user;
                                obj.token = jwt.sign(obj.data.appdb, _this.secret)
                                resolve(obj)
                            }
                        })
                    } else {
                        reject("no couchdbserver provided");
                    }
                } else {
                    reject("provide credentials!");
                }
            } else {
                reject("wrong params");
            }
        })
    }

    authorize(o: { provider: string; user: string, password: string }) {

        const _this = this;

        return new Promise<string>((resolve, reject) => {

            if (!o) {
                reject("no vars provided");
            } else if (!o.provider) {
                reject("no provider");

            } else {

                switch (o.provider) {
                    case "couchdb":

                        _this.couchdbauthorize(o).then((a) => {
                            resolve(a)
                        }).catch((err) => {
                            reject(err)
                        })
                        break;

                    default:

                        reject("wrong provider")
                        break;

                }
            }
        })
    }

    //   register(o: { provider: string; user: string, password: string, db?: string }): string {

    //   }

}