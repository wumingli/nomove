(function () {
  var logic = {
    createDom: function createDom() {
      var parentNode = document.getElementsByTagName('body')[0];
      var winWidth;
      if (window.innerWidth) {
        winWidth = window.innerWidth;
      } else if (document.body && document.body.clientWidth) {
        winWidth = document.body.clientWidth;
      }
      var childNodeLeft = (winWidth - 1100) / 2 + 1100;
      var styles = {
        sideBar: "z-index:99;width:112px;position:fixed;top:20%;left:" + childNodeLeft + "px;resize:none;",
        customer: "width:112px;height:125px;",
        img: "width:100%;cursor:pointer;"
      };
      var tempNode = "<div style=" + styles.sideBar + ">\n        <div style=" + styles.customer + ">\n          <a href=\"javascript:void(0)\">\n            <img style=" + styles.img + " src=\"../images/customer-service.png\">\n          </a>\n        </div>\n        <div style=\"width:70px;height:70px;margin-right:auto;margin-left:auto;border-bottom:1px solid #fff\"}>\n          <a href=\"concat.html\">\n            <img style=" + styles.img + " src=\"../images/call.jpg\">\n          </a>\n        </div>\n        <div class=\"wechat-box\" style=\"width:70px;height:70px;margin-right:auto;margin-left:auto;border-bottom:1px solid #fff\">\n          <a href=\"#\">\n            <img style=" + styles.img + " src=\"../images/wechat.jpg\">\n          </a>\n          <div class=\"qr-code\">\n          </div>\n        </div>\n        <div style=\"width:70px;height:70px;margin-right:auto;margin-left:auto;border-bottom:1px solid #fff\" id=\"goUp\">\n          <a title=\"\u8FD4\u56DE\u9876\u90E8\">\n            <img style=" + styles.img + " src=\"../images/to-up.jpg\">\n          </a>\n        </div>\n      </div>";
      var childNode = document.createElement("div");
      childNode.setAttribute("id", "sideBar");
      document.body.appendChild(childNode);
      childNode.innerHTML = tempNode;
    },
    event: function event() {
      document.getElementById("goUp").onclick = function () {
        if (document.body && document.body.scrollTop) {
          document.body.scrollTop = 0;
        } else if (document.documentElement && document.documentElement.scrollTop) {
          document.documentElement.scrollTop = 0;
        }
      };
    }
  };
  logic.createDom();
  logic.event();
  window.onresize = function () {
    var sideBar = document.getElementById("sideBar");
    document.body.removeChild(sideBar);
    logic.createDom();
    logic.event();
  };
})();