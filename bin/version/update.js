import fs from 'node:fs';

export async function updateManifestVersion(manifestPath, target) {
  const { default: manifest } = await import(`../../${manifestPath}`, {
    assert: {
      type: 'json',
    },
  });

  const updatedVersion = getUpdatedVersion(manifest.version, target);

  manifest.version = updatedVersion;
  manifest.version_name = updatedVersion;

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

function getUpdatedVersion(version, target) {
  const [major, minor, patch] = version
    .split('.')
    .map((version) => parseInt(version));

  if (target === 'major') {
    return [major + 1, 0, 0].join('.');
  }

  if (target === 'minor') {
    return [major, minor + 1, 0].join('.');
  }

  if (target === 'patch') {
    return [major, minor, patch + 1].join('.');
  }

  return [major, minor, patch].join('.');
}
