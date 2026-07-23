document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const requestForm = document.getElementById('requestForm');
  const methodSelect = document.getElementById('requestMethod');
  const urlInput = document.getElementById('requestUrl');
  const bodyGroup = document.getElementById('bodyGroup');
  const requestBody = document.getElementById('requestBody');
  const sendRequestBtn = document.getElementById('sendRequestBtn');
  const batchTestBtn = document.getElementById('batchTestBtn');
  
  const logEntriesEl = document.getElementById('logEntries');
  const terminalEmptyEl = document.getElementById('terminalEmpty');
  const clearLogsBtn = document.getElementById('clearLogsBtn');
  const autoRefreshToggle = document.getElementById('autoRefreshToggle');
  
  const totalRequestsEl = document.getElementById('totalRequests');
  const getRequestsEl = document.getElementById('getRequests');
  const writeRequestsEl = document.getElementById('writeRequests');
  const avgLatencyEl = document.getElementById('avgLatency');

  const middlewareCodeEl = document.getElementById('middlewareCode');
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  // Toggle body input based on HTTP method
  methodSelect.addEventListener('change', () => {
    const method = methodSelect.value;
    if (method === 'POST' || method === 'PUT') {
      bodyGroup.style.display = 'flex';
    } else {
      bodyGroup.style.display = 'none';
    }
  });

  // Handle Preset Click
  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const method = btn.dataset.method;
      const url = btn.dataset.url;
      const body = btn.dataset.body || '';

      methodSelect.value = method;
      urlInput.value = url;
      requestBody.value = body;
      
      methodSelect.dispatchEvent(new Event('change'));
      sendHttpRequest(method, url, body);
    });
  });

  // Handle Form Submit
  requestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const method = methodSelect.value;
    const url = urlInput.value.trim();
    const body = requestBody.value.trim();
    sendHttpRequest(method, url, body);
  });

  // Send Single Request
  async function sendHttpRequest(method, url, bodyStr) {
    sendRequestBtn.disabled = true;
    sendRequestBtn.innerHTML = `<span>Sending...</span>`;

    try {
      const options = { method };
      if ((method === 'POST' || method === 'PUT') && bodyStr) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = bodyStr;
      }
      await fetch(url, options);
    } catch (err) {
      console.error('Request failed:', err);
    } finally {
      sendRequestBtn.disabled = false;
      sendRequestBtn.innerHTML = `Send Request`;
      // Immediately fetch updated logs
      fetchLogs();
    }
  }

  // Batch Test Dispatcher
  batchTestBtn.addEventListener('click', async () => {
    batchTestBtn.disabled = true;
    batchTestBtn.innerHTML = `⚡ Testing...`;

    const requests = [
      { method: 'GET', url: '/api/users' },
      { method: 'POST', url: '/api/users', body: JSON.stringify({ name: 'Taylor Swift', role: 'Artist' }) },
      { method: 'PUT', url: '/api/users/1', body: JSON.stringify({ status: 'Updated' }) },
      { method: 'DELETE', url: '/api/users/3' },
      { method: 'GET', url: '/api/system/status' }
    ];

    for (const req of requests) {
      await sendHttpRequest(req.method, req.url, req.body);
      await new Promise(r => setTimeout(r, 250));
    }

    batchTestBtn.disabled = false;
    batchTestBtn.innerHTML = `⚡ Fire Batch Tests`;
  });

  // Fetch Logs from Server
  async function fetchLogs() {
    try {
      const res = await fetch('/api/logs');
      const data = await res.json();
      renderLogs(data.logs || []);
    } catch (err) {
      console.error('Failed to fetch logs:', err);
    }
  }

  // Render Logs in Terminal UI
  function renderLogs(logs) {
    if (!logs || logs.length === 0) {
      terminalEmptyEl.style.display = 'flex';
      logEntriesEl.innerHTML = '';
      updateStats([]);
      return;
    }

    terminalEmptyEl.style.display = 'none';
    updateStats(logs);

    logEntriesEl.innerHTML = logs.map(log => {
      const dateObj = new Date(log.timestamp);
      const timeStr = dateObj.toLocaleTimeString() + '.' + String(dateObj.getMilliseconds()).padStart(3, '0');
      const statusClass = log.statusCode >= 400 ? 's-4xx' : 's-2xx';

      return `
        <div class="log-item">
          <span class="log-time">[${timeStr}]</span>
          <span class="method-badge ${log.method}">${log.method}</span>
          <span class="log-url">${log.url}</span>
          <span class="status-tag ${statusClass}">${log.statusCode}</span>
          <span class="duration-tag">${log.durationMs}ms</span>
        </div>
      `;
    }).join('');
  }

  // Update Stats Cards
  function updateStats(logs) {
    const total = logs.length;
    const getCount = logs.filter(l => l.method === 'GET').length;
    const writeCount = logs.filter(l => ['POST', 'PUT', 'DELETE'].includes(l.method)).length;
    const totalLatency = logs.reduce((sum, l) => sum + (l.durationMs || 0), 0);
    const avgLatency = total > 0 ? Math.round(totalLatency / total) : 0;

    totalRequestsEl.textContent = total;
    getRequestsEl.textContent = getCount;
    writeRequestsEl.textContent = writeCount;
    avgLatencyEl.textContent = `${avgLatency} ms`;
  }

  // Clear Terminal Logs
  clearLogsBtn.addEventListener('click', async () => {
    try {
      await fetch('/api/logs', { method: 'DELETE' });
      fetchLogs();
    } catch (err) {
      console.error('Failed to clear logs:', err);
    }
  });

  // Fetch Source Code of Logger Middleware
  async function loadMiddlewareSource() {
    try {
      const res = await fetch('/api/logger-code');
      const data = await res.json();
      if (data.code) {
        middlewareCodeEl.textContent = data.code;
      }
    } catch (err) {
      middlewareCodeEl.textContent = '// Failed to load logger source code.';
    }
  }

  // Copy Source Code
  copyCodeBtn.addEventListener('click', () => {
    const code = middlewareCodeEl.textContent;
    navigator.clipboard.writeText(code).then(() => {
      copyCodeBtn.textContent = 'Copied!';
      setTimeout(() => copyCodeBtn.textContent = 'Copy Code', 2000);
    });
  });

  // Theme Switcher
  let isDark = true;
  themeToggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  });

  // Auto Refresh Timer (every 1.5 seconds)
  setInterval(() => {
    if (autoRefreshToggle.checked) {
      fetchLogs();
    }
  }, 1500);

  // Initial Load
  loadMiddlewareSource();
  fetchLogs();
});
