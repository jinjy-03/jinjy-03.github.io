document.addEventListener('DOMContentLoaded', function() {
  // 为每个代码块添加复制按钮
  document.querySelectorAll('.article-entry pre, .article-entry .highlight').forEach(function(block) {
    // 如果是嵌套的 pre，跳过（因为外层的 highlight 已经有按钮了）
    if (block.closest('.highlight') && block.tagName === 'PRE') {
      return;
    }
    
    // 检查是否已经有复制按钮
    if (!block.querySelector('.copy-btn')) {
      // 创建复制按钮
      var button = document.createElement('button');
      button.className = 'copy-btn';
      button.textContent = '复制';
      
      // 添加点击事件
      button.addEventListener('click', function() {
        // 获取代码内容
        var code = block.querySelector('code') || block;
        var text = '';
        
        // 如果是带有行号的代码块
        if (code.querySelector('.gutter')) {
          // 获取代码部分（跳过行号）
          var codeContent = code.querySelector('.code');
          if (codeContent) {
            // 获取所有代码行
            var lines = codeContent.querySelectorAll('.line');
            text = Array.from(lines)
              .map(line => {
                // 移除行号
                var lineText = line.textContent;
                // 如果行号在开头，移除它
                return lineText.replace(/^\d+\s*/, '');
              })
              .join('\n');
          }
        } else {
          // 普通代码块直接获取文本
          text = code.textContent;
        }
        
        // 复制到剪贴板
        navigator.clipboard.writeText(text).then(function() {
          // 复制成功后改变按钮文字
          button.textContent = '已复制!';
          setTimeout(function() {
            button.textContent = '复制';
          }, 2000);
        }).catch(function(err) {
          console.error('复制失败:', err);
          button.textContent = '复制失败';
          setTimeout(function() {
            button.textContent = '复制';
          }, 2000);
        });
      });
      
      // 将按钮添加到代码块
      block.style.position = 'relative'; // 确保相对定位
      block.appendChild(button);
    }
  });
});