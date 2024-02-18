import { select } from '@inquirer/prompts';
import { updateManifestVersion } from './update.js';

const manifestPath = 'src/assets/manifest.json';
const target = await select({
  message: 'Select a target',
  choices: [
    {
      name: 'major',
      value: 'major',
    },
    {
      name: 'minor',
      value: 'minor',
    },
    {
      name: 'patch',
      value: 'patch',
    },
  ],
});

updateManifestVersion(manifestPath, target);
