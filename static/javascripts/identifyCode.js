/**
 * @identifyCode
 * @param {DOM} canvas的父元素
 * @param {CONTEXT} canvas的应用上下文
 * @main {this} 执行环境上下文，指向Vue实例
 */
function identifyCode(parent, ctx, main) {

  let chars_pos = [],
    choose_flag = true,
    chooseChar = null,
    width = parent.clientWidth,
    height = parent.clientHeight;

  /**
   * 获取范围内的随机数
   * @num
   */
  function num(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * 画布绘制字符
   * @drawCharacters
   */
  function drawCharacter() {
    let str = '五岳寻仙不辞远一生好入名山游',
      chars = [];
    // 四个字符的随机选择和随机定位
    while (chars.length < 4) {
      let i = num(0, str.length - 1);
      if (chars.indexOf(str[i]) < 0) {
        chars.push(str[i]);
      }
    }
    chars_pos = [
      {char: chars[0], x: num(width * 1 / 16, width * 3 / 16), y: num(height * 1 / 8, height * 7 / 8)},
      {char: chars[1], x: num(width * 5 / 16, width * 7 / 16), y: num(height * 1 / 8, height * 7 / 8)},
      {char: chars[2], x: num(width * 9 / 16, width * 11 / 16), y: num(height * 1 / 8, height * 7 / 8)},
      {char: chars[3], x: num(width * 13 / 16, width * 15 / 16), y: num(height * 1 / 8, height * 7 / 8)}
    ];
    // 确定用户应点击字符
    chooseChar = chars_pos[num(0, 3)];
    // 提示和验证字符绘制
    document.querySelector('.tip').innerText = `请点击图片中的"${chooseChar.char}"`;
    chars_pos.forEach(function (item) {
      ctx.beginPath();
      ctx.font = '20px regular';
      ctx.fillStyle = '#fff';
      ctx.fillText(item.char, item.x, item.y);
      ctx.closePath();
    });
  }

  /**
   * 点击事件绑定
   * @bindEvent
   */
  function bindEvent() {
    parent.addEventListener('click', function (ev) {
      if (!choose_flag || ev.target.getAttribute('class') === 'auth-point') {
        return;
      }
      // 点击生成遮罩
      let div = document.createElement('div');
      div.setAttribute('class', 'auth-point');
      div.style.position = 'absolute';
      div.style.background = 'rgba(26, 189, 108, 0.5)';
      div.style.borderRadius = '10px';
      div.style.width = '20px';
      div.style.height = '20px';
      div.style.left = (ev.offsetX - 10) + 'px';
      div.style.top = (ev.offsetY - 10) + 'px';
      parent.appendChild(div);
      // 取消事件,防止一次验证进行多次点击
      choose_flag = false;
      // 验证：若成功则更改Vue实例中的identification属性；失败则重新绘制
      let distance_x = Math.pow(ev.offsetX - chooseChar.x, 2),
        distance_y = Math.pow(ev.offsetY - chooseChar.y, 2),
        distance = Math.sqrt(distance_x + distance_y);
      if (distance < 20) {
        main.status.identification = true;
      } else {
        main.$layer.open({
          kind: 'error',
          content: '验证失败，请重试'
        });
        setTimeout(function () {
          choose_flag = true;
          clearArea();
          drawCharacter();
        }, 1000);
      }

    });
  }

  function clearArea() {
    document.querySelectorAll('.auth-point').forEach(function (item) {
      parent.removeChild(item);
    });
    ctx.clearRect(0, 0, width, height);
  }

  /**
   * 函数调用
   */
  clearArea();
  drawCharacter();
  bindEvent();

}

module.exports = identifyCode;
