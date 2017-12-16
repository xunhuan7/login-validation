class Layer {

  /**
   * 消息提示
   * @data {Object}
   * Options:content kind
   */
  open(data) {
    // 创建消息框
    let box = document.createElement('div');
    document.body.appendChild(box);
    // 设置消息框:样式和文本
    switch (data.kind) {
      case 'message':
        box.setAttribute('class', 'open fa fa-info-circle open-message');
        break;
      case 'success':
        box.setAttribute('class', 'open fa fa-check-circle-o open-success');
        break;
      case 'warning':
        box.setAttribute('class', 'open fa fa-exclamation-triangle open-warning');
        break;
      case 'error':
        box.setAttribute('class', 'open fa fa-times-circle-o open-error');
        break;
      default:
        box.setAttribute('class', 'open fa fa-info-circle open-message');
        break;
    }
    box.innerText = data.content || '';
    // 移除消息框
    setTimeout(() => {
      document.body.removeChild(box);
    }, 2000);
  }

}

module.exports = new Layer();

