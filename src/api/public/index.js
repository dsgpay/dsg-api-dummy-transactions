const homepage = `
<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Sandbox API Documentation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }
        .link-container {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        h3 {
          margin-top: 0;
          color: #333;
        }
        a {
          text-decoration: none;
          color: #007bff;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }

      </style>
    </head>
    <body>
    
      <div class="container">
        <div class="link-container">
          <a href="/api-docs"><h3>Document a Sandbox API</h3></a>
        </div>
      </div>
    </body>
    </html>
    `;

const apiDocs = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Express API Documentation</title>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #f8f9fa;
    }
    .container {
      margin-top: 50px;
    }
    .link-container {
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .link-container h3 {
      margin-bottom: 20px;
    }
    .link-container a {
      display: block;
      padding: 10px 0;
      color: #007bff;
      text-decoration: none;
      border-bottom: 1px solid #dee2e6;
    }
    .link-container a:last-child {
      border-bottom: none;
    }
    .link-container a:hover {
      background-color: #f0f0f0;
    }

    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #333;
    }

    li {
      float: left;
    }

    li a {
      display: block;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    li a:hover {
      background-color: #111;
    }
  </style>
</head>
<body>

  <ul>
    <li><a class="active" href="/">Home</a></li>
  </ul>

  <div class="container">
    <div class="link-container">
      <h3>Document an Express API</h3>
      <a href="/api-docs/dsg">DSG: API Document</a>
      <a href="/api-docs/fx">FX: API Document</a>
    </div>
  </div>
</body>
</html>
`;

export { homepage, apiDocs };
