import webpack from 'webpack';
import path from 'path';
import createBuilder from './index';

jest.mock('webpack');

describe('External code builder', () => {
  let mockRunCompiler;

  const inputs = ['source/a.js', 'source/b.js', 'source/c.js'];

  const mockRunStats = {
    toJson: () => {},
    hasErrors: () => false,
    hasWarnings: () => false,
  };

  beforeEach(() => {
    jest.resetAllMocks();

    mockRunCompiler = jest.fn();
    const mockCompiler = { run: mockRunCompiler };
    webpack.mockReturnValue(mockCompiler);

    mockRunCompiler.mockImplementation(callback =>
      callback(null, mockRunStats),
    );
  });

  it('returns a list of bundle definitions', () => {
    const { bundles } = createBuilder(inputs, 'bundles');

    expect(bundles).toHaveLength(3);

    const assertHasBundle = sourceName => {
      expect(
        bundles.find(bundle => {
          return bundle.source === `source/${sourceName}.js`;
        }),
      ).not.toBeUndefined();
    };

    assertHasBundle('a');
    assertHasBundle('b');
    assertHasBundle('c');
  });

  it('defines bundle destinations in the bundles directory', () => {
    const { bundles } = createBuilder(inputs, 'bundles', {});

    const assertHasDest = sourceName => {
      const bundle = bundles.find(b => b.source === `source/${sourceName}.js`);

      expect(path.dirname(bundle.dest)).toBe('bundles');
      expect(path.basename(bundle.dest, '.js').includes(sourceName)).toBe(true);
    };

    assertHasDest('a');
    assertHasDest('b');
    assertHasDest('c');
  });

  it('generates unique destination paths', () => {
    const { bundles } = createBuilder(
      ['source/a/index.js', 'source/b/index.js'],
      'bundles',
      {},
    );

    expect(bundles[0].dest).not.toEqual(bundles[1].dest);
  });

  it('instantiates a webpack compiler with entries and outputs matching bundle definitions', async () => {
    const { bundles, run } = createBuilder(inputs, 'bundles', {});

    await run();

    const webpackCall = webpack.mock.calls[0][0];

    expect(webpackCall.output).toEqual({
      filename: '[name].js',
      path: 'bundles',
      libraryTarget: 'commonjs2',
    });

    const assertEntry = source => {
      const bundle = bundles.find(b => b.source === source);
      expect(webpackCall.entry[bundle.id]).toEqual(source);
    };

    assertEntry('source/a.js');
    assertEntry('source/b.js');
    assertEntry('source/c.js');

    expect(mockRunCompiler).toHaveBeenCalledTimes(1);
  });

  it('returns a promise that rejects when compilation fails', () => {
    mockRunCompiler.mockImplementation(callback =>
      callback(new Error(), mockRunStats),
    );

    return expect(createBuilder(inputs, 'bundles', {}).run()).rejects.toEqual(
      expect.any(Error),
    );
  });

  it('passes provided configuration to webpack', async () => {
    await createBuilder(inputs, 'bundles', { option1: true }).run();

    expect(webpack).toHaveBeenCalledWith(
      expect.objectContaining({ option1: true }),
    );
  });

  it('does not start webpack if there are no files to build', async () => {
    await createBuilder([], 'bundles', { option1: true }).run();

    expect(webpack).not.toHaveBeenCalled();
  });
});
