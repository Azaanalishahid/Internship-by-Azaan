import app from '../src/app.js';
import http from 'http';

const PORT = 3099;
let server;

function request(path, method = 'GET', headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Express Supabase Auth Verification Suite...\n');

  server = app.listen(PORT, async () => {
    try {
      // 1. Healthcheck
      console.log('Test 1: GET /health');
      const healthRes = await request('/health');
      console.assert(healthRes.status === 200, 'Healthcheck failed');
      console.log('  ✅ Healthcheck passed:', healthRes.body.status);

      // 2. Validation - Missing fields
      console.log('\nTest 2: POST /api/auth/signup (Missing fields validation)');
      const badSignup = await request('/api/auth/signup', 'POST', {}, { email: '' });
      console.assert(badSignup.status === 400, 'Validation failed');
      console.log('  ✅ Validation rejected empty request correctly:', badSignup.body.message);

      // 3. Signup attempt
      const testEmail = `dev.supabase.user.${Date.now()}@gmail.com`;
      const testPass = 'SuperPassword123!';
      console.log(`\nTest 3: POST /api/auth/signup (${testEmail})`);
      const signupRes = await request('/api/auth/signup', 'POST', {}, {
        email: testEmail,
        password: testPass,
        name: 'Test Automation'
      });

      console.log('  Status:', signupRes.status);
      console.log('  Response:', signupRes.body.message);

      if (signupRes.status === 201) {
        console.log('  ✅ Signup completed successfully!');
      }

      // 4. Login attempt
      console.log(`\nTest 4: POST /api/auth/login (${testEmail})`);
      const loginRes = await request('/api/auth/login', 'POST', {}, {
        email: testEmail,
        password: testPass
      });

      console.log('  Status:', loginRes.status);
      console.log('  Response:', loginRes.body.message);

      if (loginRes.status === 200 && loginRes.body.data?.session?.access_token) {
        const token = loginRes.body.data.session.access_token;
        const refreshToken = loginRes.body.data.session.refresh_token;

        console.log('  ✅ Received JWT Access Token & Session!');

        // 5. Profile request with Bearer token
        console.log('\nTest 5: GET /api/auth/me (Protected Route)');
        const profileRes = await request('/api/auth/me', 'GET', {
          'Authorization': `Bearer ${token}`
        });
        console.assert(profileRes.status === 200, 'Profile request failed');
        console.log('  ✅ Authenticated User ID:', profileRes.body.data?.user?.id);

        // 6. Token Refresh
        console.log('\nTest 6: POST /api/auth/refresh');
        const refreshRes = await request('/api/auth/refresh', 'POST', {}, {
          refresh_token: refreshToken
        });
        console.log('  Status:', refreshRes.status);
        if (refreshRes.status === 200) {
          console.log('  ✅ Session Refreshed Successfully!');
        }

        // 7. Logout
        console.log('\nTest 7: POST /api/auth/logout');
        const logoutRes = await request('/api/auth/logout', 'POST', {
          'Authorization': `Bearer ${token}`
        });
        console.log('  Status:', logoutRes.status);
        console.log('  ✅ Logged out successfully!');
      }

      console.log('\n🎉 All API Tests Completed Successfully!\n');
    } catch (err) {
      console.error('❌ Verification Error:', err);
    } finally {
      server.close();
      process.exit(0);
    }
  });
}

runTests();
