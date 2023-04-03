import { defineConfig } from 'vite';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import fs from 'node:fs/promises';
import path from 'node:path';


async function getFiles(root, directory, hiddenFiles = []) {
  const entries = await fs.readdir(
    path.resolve(process.cwd(), path.join(root, directory)),
    {withFileTypes: true},
  );

  return (await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(root, directory, entry.name);
    const relativePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return getFiles(root, relativePath, hiddenFiles);
    }

    return [[relativePath, {
      content: await fs.readFile(
        path.resolve(process.cwd(), fullPath),
        {encoding: 'utf-8'},
      ),
      hidden: (
        entry.name.startsWith('.') || hiddenFiles.includes(relativePath)
      ),
      selected: false,
    }]];
  }))).flat(1);
}

async function getHiddenFiles(directory) {
  try {
    const file = await fs.readFile(
      path.resolve(process.cwd(), directory, '.playgroundignore'),
      {encoding: 'utf-8'},
    );

    return file.trim().split('\n');
  } catch {
    return [];
  }
}

function playgroundFilesPlugin() {
  const virtualModuleRegex = /^virtual:playground-files\/(.+)$/;
  const resolvedModuleRegex = /^\0virtual:playground-files\/(.+)$/;
  const directories = new Map();

  return {
    name: 'playground-files',
    handleHotUpdate({ file, server: { moduleGraph, ws } }) {
      const updatedModules = [...directories.entries()]
        .filter(([directory]) => file.startsWith(directory))
        .map(([, moduleId]) => moduleId);

      for (const updatedModule of updatedModules) {
        const module = moduleGraph.getModuleById(updatedModule);
        if (module) {
          moduleGraph.invalidateModule(module);
          // eslint-disable-next-line no-console
          console.log(
            '[playground-files plugin HMR]: %o was updated',
            updatedModule,
          );

          if (ws) {
            ws.send({
              type: 'full-reload',
              path: '*',
            });
          }
        }
      }
    },
    async resolveId(id) {
      const match = id.match(virtualModuleRegex);
      if (match) {
        const stats = await fs.stat(match[1]);

        if (!stats.isDirectory()) {
          throw new TypeError(`"${match[1]}" is not a directory`);
        }

        return `\0${id}`;
      }

      return undefined;
    },
    async load(id) {
      const match = id.match(resolvedModuleRegex);

      if (match) {
        directories.set(path.resolve(process.cwd(), match[1]), id);
        const filesEntries = await getFiles(
          match[1],
          './',
          await getHiddenFiles(match[1]),
        );
        filesEntries.sort(([, a], [, b]) => a.hidden - b.hidden);

        return `export default ${JSON.stringify(Object.fromEntries(filesEntries))}`;
      }

      return undefined;
    },
  };
}

export default defineConfig({
  plugins: [playgroundFilesPlugin()],
  server: {port: 3000},
  build: {
    rollupOptions: {
      input: {
        wrapper: path.resolve(__dirname, 'index.html'),
        demo: path.resolve(__dirname, 'demo/index.html'),
      },
      plugins: [importMetaAssets()],
    },
  },
});
