import path from 'path';
import buildWebsite from './';

describe('Build website stage', () => {
  it('needs tests', async () => {
    const pagesPath = path.resolve(__dirname, '..', '..', '..', '..', 'pages');
    const allPages = await buildWebsite(pagesPath);
    console.log(allPages);
  });
});
