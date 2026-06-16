const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5002;
process.env.PORT = PORT; // override for test server

// Import server app
const { app, server } = require('../server');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: JSON.parse(data)
          });
        } catch {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data
          });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Starting automated API backend integration tests...');
  let exitCode = 0;

  try {
    // Test 1: Health Check
    console.log('\nTest 1: Health check endpoint GET /api/health');
    const resHealth = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/health',
      method: 'GET'
    });
    console.log(`Status Code: ${resHealth.statusCode}`);
    if (resHealth.statusCode === 200 && resHealth.body.status === 'healthy') {
      console.log('✓ Health check passed.');
    } else {
      console.error('✗ Health check failed:', resHealth.body);
      exitCode = 1;
    }

    // Test 2: Get Public Products list
    console.log('\nTest 2: Public products listing GET /api/products');
    const resProducts = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/products',
      method: 'GET'
    });
    console.log(`Status Code: ${resProducts.statusCode}`);
    if (resProducts.statusCode === 200 && Array.isArray(resProducts.body.data)) {
      console.log(`✓ Products fetch passed. Retrieved ${resProducts.body.data.length} seeded products.`);
    } else {
      console.error('✗ Products fetch failed:', resProducts.body);
      exitCode = 1;
    }

    // Test 3: Get Public Categories list
    console.log('\nTest 3: Public categories listing GET /api/categories');
    const resCats = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/categories',
      method: 'GET'
    });
    console.log(`Status Code: ${resCats.statusCode}`);
    if (resCats.statusCode === 200 && Array.isArray(resCats.body.data)) {
      console.log(`✓ Categories fetch passed. Retrieved ${resCats.body.data.length} categories.`);
    } else {
      console.error('✗ Categories fetch failed:', resCats.body);
      exitCode = 1;
    }

    // Test 4: Admin login endpoint with seeded credentials
    console.log('\nTest 4: Admin authentication POST /api/auth/login');
    const resLogin = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      email: 'rahul05',
      password: '200505'
    });
    console.log(`Status Code: ${resLogin.statusCode}`);
    let token = '';
    if (resLogin.statusCode === 200 && resLogin.body.token) {
      token = resLogin.body.token;
      console.log('✓ Admin login authenticated successfully. Token received.');
    } else {
      console.error('✗ Admin login failed:', resLogin.body);
      exitCode = 1;
    }

    // Test 5: Fetch protected inquiries without token (should fail)
    console.log('\nTest 5: Protected inquiries fetch without auth headers GET /api/inquiries');
    const resInqUnauth = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/inquiries',
      method: 'GET'
    });
    console.log(`Status Code: ${resInqUnauth.statusCode} (Expected: 401)`);
    if (resInqUnauth.statusCode === 401) {
      console.log('✓ Protected check passed. Access Denied without token.');
    } else {
      console.error('✗ Protected check failed. Allowed access without valid token.');
      exitCode = 1;
    }

    // Test 6: Create new Inquiry (Public)
    console.log('\nTest 6: Submit new inquiry POST /api/inquiries');
    const resCreateInquiry = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/inquiries',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, {
      name: 'Integration Test Client',
      company_name: 'Test Atelier Dev',
      email: 'integration@test.com',
      phone: '123-456-7890',
      country: 'India',
      message: 'Self-verification test request.',
      inquiry_type: 'B2B Trade'
    });
    console.log(`Status Code: ${resCreateInquiry.statusCode}`);
    if (resCreateInquiry.statusCode === 201 && resCreateInquiry.body.data.id) {
      console.log(`✓ Inquiry submitted successfully. ID: ${resCreateInquiry.body.data.id}`);
    } else {
      console.error('✗ Inquiry submission failed:', resCreateInquiry.body);
      exitCode = 1;
    }

    // Test 7: Fetch inquiries with Bearer token (should succeed)
    if (token) {
      console.log('\nTest 7: Fetch inquiries with Bearer Token GET /api/inquiries');
      const resInqAuth = await makeRequest({
        hostname: 'localhost',
        port: PORT,
        path: '/api/inquiries',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(`Status Code: ${resInqAuth.statusCode}`);
      if (resInqAuth.statusCode === 200 && Array.isArray(resInqAuth.body.data)) {
        console.log(`✓ Protected check passed. Retrieved ${resInqAuth.body.data.length} inquiry logs.`);
      } else {
        console.error('✗ Protected inquiries fetch failed:', resInqAuth.body);
        exitCode = 1;
      }
    }

    if (exitCode === 0) {
      console.log('\n======================================');
      console.log('ALL API ENDPOINT INTEGRATION TESTS PASSED!');
      console.log('======================================');
    } else {
      console.log('\n======================================');
      console.error('SOME API ENDPOINT TESTS FAILED.');
      console.log('======================================');
    }

  } catch (error) {
    console.error('Fatal error during testing execution:', error);
    exitCode = 1;
  } finally {
    // Close Express server
    console.log('\nTearing down verification server socket...');
    server.close(() => {
      console.log('Verification server socket closed.');
      process.exit(exitCode);
    });
  }
}

// Bounded wait to allow DB connection to initiate
setTimeout(runTests, 1000);
