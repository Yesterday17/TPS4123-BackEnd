-- /import sevtps 0

function main(g,q,m)
  local json = require("dkjson");
  local ret = URLDownload("http://server.yesterday17.cn:8081/");
  local msg = json.decode(ret);

  if (msg.now.time == "undefined") then
    sendGroupMsg(g, "当前未收到统计数据！");
  else
    sendGroupMsg(g, "服务器TPS：" .. msg.now.tps .. "，检测时间：" .. msg.now.time .. "\n历史最低TPS：" .. msg.lowest.tps .. "，检测时间：" .. msg.lowest.time .. "\n历史最高TPS：" .. msg.highest.tps .. "，检测时间：" .. msg.highest.time);
  end
end

-- /bind sevtps sevtps