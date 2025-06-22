# MongoDB Installation and Setup on Windows

This guide will help you install and set up MongoDB on your Windows system to enable backend testing.

## Step 1: Download MongoDB

1. Go to the official MongoDB download page: https://www.mongodb.com/try/download/community
2. Select the latest version for Windows.
3. Download the MSI installer.

## Step 2: Install MongoDB

1. Run the downloaded MSI installer.
2. Choose "Complete" setup type.
3. Select "Install MongoDB as a Service" (recommended).
4. Choose to run the service as Network Service user.
5. Complete the installation.

## Step 3: Verify Installation

1. Open Command Prompt.
2. Run `mongod --version` to verify MongoDB server is installed.
3. Run `mongo --version` to verify MongoDB shell is installed.

## Step 4: Start MongoDB Service

- The MongoDB service should start automatically if installed as a service.
- To start manually, run: `net start MongoDB` in Command Prompt.
- To stop the service, run: `net stop MongoDB`.

## Step 5: Configure Environment Variable (Optional)

- Add MongoDB's `bin` directory to your system PATH to run `mongod` and `mongo` commands from any location.
- Typically located at: `C:\Program Files\MongoDB\Server\<version>\bin`

## Step 6: Test MongoDB Connection

- Run `mongo` in Command Prompt to open the MongoDB shell.
- Run `show dbs` to list databases.

## Step 7: Run Backend Tests

- Ensure your `.env` or environment variable `DATABASE_URL` points to your MongoDB instance, e.g. `mongodb://localhost:27017/solia_test`.
- Run your backend tests again.

---

If you need assistance with any step, please let me know.
