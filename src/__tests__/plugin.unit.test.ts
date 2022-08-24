import runServerless from '@serverless/test/run-serverless';
import { resolve } from 'path';

const serverlessDir = resolve(__dirname, '../../node_modules/serverless');

describe('plugin', () => {
  it('throws if a function misses dirName property', async () => {
    await expect(
      runServerless(serverlessDir, {
        command: 'print',
        cwd: resolve(__dirname, 'fixtures'),
        options: { config: 'missingDirNameService.fixture.test.ts' },
      }),
    ).rejects.toThrow(
      `Configuration error at 'functions.missingDirNameFn': must have required property 'dirName'\n\nLearn more about configuration validation here: http://slss.io/configuration-validation`,
    );
  });

  it('updates fn path otherwise', async () => {
    const { serverless } = await runServerless(serverlessDir, {
      command: 'print',
      cwd: resolve(__dirname, 'fixtures'),
      options: { config: 'validService.fixture.test.ts' },
    });

    expect(serverless.service.functions).toMatchObject({
      validFn: {
        handler: 'functions/foo.bar',
      },
      otherValidFn: {
        handler: 'functions/otherValidFn/foo.baz',
      },
    });

    // @ts-expect-error dirName is not present in AWS definition
    expect(serverless.service.functions?.validFn.dirName).toBeUndefined();
    // @ts-expect-error dirName is not present in AWS definition
    expect(serverless.service.functions?.otherValidFn.dirName).toBeUndefined();
  });
});
