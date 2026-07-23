import { execSync } from 'child_process';
import fs from 'fs';

console.log("Checking if the error is due to something else in Node...");
// Can't run PM2 commands remotely.
