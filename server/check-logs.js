import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

try {
  // We can't access pm2 directly from local machine, but wait!
  console.log("Wait, we are running locally, not on the server!");
} catch (e) {
  console.error(e);
}
