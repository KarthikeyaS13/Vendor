import { execSync } from 'child_process';
import fs from 'fs';

try {
  const log = execSync('git log -n 5 --oneline').toString();
  const status = execSync('git status').toString();
  fs.writeFileSync('git-status.txt', log + '\n\n' + status);
} catch(e) {
  fs.writeFileSync('git-status.txt', e.toString());
}
