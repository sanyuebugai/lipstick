// 2019-3-7
$(function(){
  var startNum = 4, // 初始的口红数
      successDeg = [], // 成功插入的角度数组
      safeDeg = 12, //安全角度范围 ±12
      toyNum = 6; // 需要插入的口红个数
  var oPage = {
    init: function(){
      this.view();
      this.start();
      this.listen();
    }
  , view: function(){
      for(var i = 0; i < toyNum; i++){
        var p = '<p class="toy"></p>';
        $('.wrapper').append(p);
      }
      $('.toy').eq(toyNum-1).addClass('curToy');
      $('.toy').eq(toyNum-1).css('transform', 'translateX(0.2rem)');
    }
  , start: function(){
      var self = this;
      // 初始渲染口红，随机角度
      for(var i = 0; i < startNum; i++){
        var d = Math.floor( Math.random() * 360 + 1 );
        if(self.checkDeg(d)){
          successDeg.push(d);
          var p = '<p style="transform:rotate(' + d + 'deg)"><img src="./i/item.png"></p>';
          $('#gamebox').append(p);
        } else{
          i--;
        }
      }
    }
  , checkDeg: function(deg){
      var result = true;
      for(var i = 0; i < successDeg.length; i++){
        if(deg < (successDeg[i] + safeDeg) && deg > (successDeg[i] - safeDeg)){
          result = false;
        }
      }
      return result;
    }
  , listen: function(){
      var self = this;
      $('.wrapper').on('click', function(event) {
        var deg = 360 - eval( 'self.get' + $('#gamebox').css('transform'))
        console.log(deg)
        var curToy = $('.curToy');
        curToy.css('transform', 'translateY(-3rem)');
        setTimeout(function(){
          curToy.removeClass('curToy');
          curToy.css('display', 'none');
        },0)
        toyNum--;
        $('.toy').eq(toyNum-1).css('transform', 'translateX(0.2rem)');
        $('.toy').eq(toyNum-1).addClass('curToy')
        var p = '<p style="transform:rotate(' + deg + 'deg)"><img src="./i/item.png"></p>';
        $('#gamebox').append(p);
        setTimeout(function(){
          if(self.checkDeg(deg)){
            successDeg.push(deg);
            if(toyNum==0){
              self.setEnd();
              self.showTip('成功')
            }
          } else{
            self.setEnd();
            self.showTip('失败')
            console.log('失败！')
          }
        },0)
      });
    }
  , setEnd: function () {
    var self = this;
      var nd = eval( 'self.get' + $('#gamebox').css('transform'))
      $('#gamebox').css({
        transform: 'rotate(' + nd + 'deg)',
        animation: 'none'
      });
    }
  , getmatrix: function (a, b, c, d, e, f){  
      var aa = Math.round( 180 * Math.asin(a) / Math.PI );  
      var bb = Math.round( 180 * Math.acos(b) / Math.PI );  
      var cc = Math.round( 180 * Math.asin(c) / Math.PI );  
      var dd = Math.round( 180 * Math.acos(d) / Math.PI );  
      var deg = 0;  
      if(aa == bb || -aa == bb){  
        deg = dd;  
      }else if(-aa + bb == 180){  
        deg = 180 + cc;  
      }else if(aa + bb == 180){  
        deg = 360 - cc || 360 - dd;  
      }  
      return deg >= 360 ? 0 : deg;  
    }
  , showTip: function(txt){
      $('#tipPop').html(txt);
      $('#tipPop').fadeIn();
      setTimeout(function(){
        $('#tipPop').fadeOut();
      },2000);
    }
  }
  oPage.init();
});