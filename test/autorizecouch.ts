import aut from "../index";
import * as mocha from "mocha";
const expect = require("chai").expect;

let authmodule:aut;

before(function () {

authmodule = new aut({ secret: "tt", app_id: "energytrack", couchdb: "https://couchman.kernel.online" });

})


describe("authorize with couchdb", function () {

    describe("authorization object", function () {
        this.timeout(30000);

        it("verificate authorization", function (done) {
            authmodule.authorize({ provider: "couchdb", user: "testconsumi", password: "testconsumi0101" }).then((a) => {
                expect(a).to.be.an('Object');
                done()
            }).catch((err) => {
                done(err)
            })
        })


    })
})