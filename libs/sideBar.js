(function(){
  var logic = {
    createDom: function(){
      var parentNode = document.getElementsByTagName('body')[0];
      var winWidth;
      if (window.innerWidth){
        winWidth = window.innerWidth;
      }else if ((document.body) && (document.body.clientWidth)){
        winWidth = document.body.clientWidth;
      }
      var childNodeLeft = (winWidth - 1100)/2 + 1100;
      var styles = {
        sideBar: `z-index:99;width:112px;position:fixed;top:20%;left:${childNodeLeft}px;resize:none;`,
        customer: `width:112px;height:125px;`,
        img: `width:100%`,
        callStyle: `width:70px;height:70px;margin-right:auto;margin-left:auto`
      };
      var tempNode = `<div style=${styles.sideBar}>
        <div style=${styles.customer}>
          <a href="#">
            <img style=${styles.img} src="../images/index/customer-service.png">
          </a>
        </div>
        <div style=${styles.callStyle}>
          <a href="#">
            <img style=${styles.img} src="../images/index/call.jpg">
          </a>
        </div>
        <div style=${styles.callStyle}>
          <a href="#">
            <img style=${styles.img} src="../images/index/wechat.jpg">
          </a>
        </div>
        <div style=${styles.callStyle} id="goUp">
          <a>
            <img style=${styles.img} src="../images/index/to-up.jpg">
          </a>
        </div>
      </div>`;
      var childNode = document.createElement("div");
      childNode.setAttribute("id","sideBar")
      document.body.appendChild(childNode);
      childNode.innerHTML = tempNode;
    },
    event: function(){
      document.getElementById("goUp").onclick = function(){
          if(document.body && document.body.scrollTop){
            document.body.scrollTop = 0;
          }else if(document.documentElement && document.documentElement.scrollTop){
            document.documentElement.scrollTop = 0;
          }
      };
    }
  }
  logic.createDom();
  logic.event();
  window.onresize = function(){
    var sideBar = document.getElementById("sideBar");
    document.body.removeChild(sideBar);
    logic.createDom();
  }
})();
