"use strict";
var index_1 = require("../index");
var expect = require("chai").expect;
var authmodule;
before(function () {
    authmodule = new index_1.default({ secret: "tt", app_id: "energytrack", couchdb: "https://couchman.kernel.online" });
});
describe("authorize with couchdb", function () {
    describe("authorization object", function () {
        this.timeout(30000);
        it("verificate authorization", function (done) {
            authmodule.authorize({ provider: "couchdb", user: "testconsumi", password: "testconsumi0101" }).then(function (a) {
                expect(a).to.be.an('Object');
                done();
            }).catch(function (err) {
                done(err);
            });
        });
    });
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvYXV0b3JpemVjb3VjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsc0JBQWdCLFVBQVUsQ0FBQyxDQUFBO0FBRTNCLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFFdEMsSUFBSSxVQUFjLENBQUM7QUFFbkIsTUFBTSxDQUFDO0lBRVAsVUFBVSxHQUFHLElBQUksZUFBRyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxDQUFDLENBQUM7QUFFekcsQ0FBQyxDQUFDLENBQUE7QUFHRixRQUFRLENBQUMsd0JBQXdCLEVBQUU7SUFFL0IsUUFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFcEIsRUFBRSxDQUFDLDBCQUEwQixFQUFFLFVBQVUsSUFBSTtZQUN6QyxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQztnQkFDbkcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLEVBQUUsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUc7Z0JBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUdOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEiLCJmaWxlIjoidGVzdC9hdXRvcml6ZWNvdWNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF1dCBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCAqIGFzIG1vY2hhIGZyb20gXCJtb2NoYVwiO1xuY29uc3QgZXhwZWN0ID0gcmVxdWlyZShcImNoYWlcIikuZXhwZWN0O1xuXG5sZXQgYXV0aG1vZHVsZTphdXQ7XG5cbmJlZm9yZShmdW5jdGlvbiAoKSB7XG5cbmF1dGhtb2R1bGUgPSBuZXcgYXV0KHsgc2VjcmV0OiBcInR0XCIsIGFwcF9pZDogXCJlbmVyZ3l0cmFja1wiLCBjb3VjaGRiOiBcImh0dHBzOi8vY291Y2htYW4ua2VybmVsLm9ubGluZVwiIH0pO1xuXG59KVxuXG5cbmRlc2NyaWJlKFwiYXV0aG9yaXplIHdpdGggY291Y2hkYlwiLCBmdW5jdGlvbiAoKSB7XG5cbiAgICBkZXNjcmliZShcImF1dGhvcml6YXRpb24gb2JqZWN0XCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0KDMwMDAwKTtcblxuICAgICAgICBpdChcInZlcmlmaWNhdGUgYXV0aG9yaXphdGlvblwiLCBmdW5jdGlvbiAoZG9uZSkge1xuICAgICAgICAgICAgYXV0aG1vZHVsZS5hdXRob3JpemUoeyBwcm92aWRlcjogXCJjb3VjaGRiXCIsIHVzZXI6IFwidGVzdGNvbnN1bWlcIiwgcGFzc3dvcmQ6IFwidGVzdGNvbnN1bWkwMTAxXCIgfSkudGhlbigoYSkgPT4ge1xuICAgICAgICAgICAgICAgIGV4cGVjdChhKS50by5iZS5hbignT2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9uZShlcnIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG5cbiAgICB9KVxufSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
