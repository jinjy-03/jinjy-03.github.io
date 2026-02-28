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
      button.type = 'button';
      button.setAttribute('aria-label', '复制代码');
      button.innerHTML = '<svg class="copy-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';

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
          button.setAttribute('data-copied', 'true');
          button.setAttribute('aria-label', '已复制');
          button.innerHTML = '<svg class="copy-btn-icon copy-btn-icon--check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
          setTimeout(function() {
            button.removeAttribute('data-copied');
            button.setAttribute('aria-label', '复制代码');
            button.innerHTML = '<svg class="copy-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
          }, 2000);
        }).catch(function(err) {
          console.error('复制失败:', err);
          button.setAttribute('aria-label', '复制失败');
          button.innerHTML = '<svg class="copy-btn-icon copy-btn-icon--check" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
          setTimeout(function() {
            button.setAttribute('aria-label', '复制代码');
            button.innerHTML = '<svg class="copy-btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
          }, 2000);
        });
      });
      
      // 将按钮添加到代码块
      block.style.position = 'relative'; // 确保相对定位
      block.appendChild(button);
    }
  });
});