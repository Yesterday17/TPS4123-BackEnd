const Koa = require("koa");
const Router = require("koa-router");
const Koabody = require("koa-body");
const fs = require("fs");

const app = new Koa();
const router = new Router();
const config = "./tps.json";

let store = {
  now: {
    tps: null,
    time: "undefined"
  },
  lowest: {
    tps: 21,
    time: "undefined"
  },
  highest: {
    tps: -1,
    time: "undefined"
  }
};

if (fs.existsSync(config)) {
  store = JSON.parse(fs.readFileSync(config, { encoding: "utf-8" }));
} else {
  fs.writeFileSync(config, JSON.stringify(store, null, 2), {
    encoding: "utf-8"
  });
}

router.get("/", async (ctx, next) => {
  ctx.body = JSON.stringify(store, null, 2);
});

router.post("/", async (ctx, next) => {
  let tps =
    ctx.request.query === {}
      ? parseFloat(ctx.request.query.tps)
      : parseFloat(ctx.request.body.tps);
  console.log(`Update TPS: ${tps}`);

  if (tps !== NaN && tps <= 20 && tps >= 0) {
    store.now.tps = tps;
    store.now.time = new Date().getTime();

    if (store.now.tps > store.highest.tps) {
      with (store) {
        [highest.tps, highest.time] = [now.tps, now.time];
      }
    }

    if (store.now.tps < store.lowest.tps) {
      with (store) {
        [lowest.tps, lowest.time] = [now.tps, now.time];
      }
    }

    ctx.body = JSON.stringify(store, null, 2);
    fs.writeFileSync(config, JSON.stringify(store, null, 2), {
      encoding: "utf-8"
    });
    return;
  }
  ctx.body = JSON.stringify({ message: "Illegal visit!" }, null, 2);
});

app.use(Koabody());
app.use(router.routes()).listen(8081);
