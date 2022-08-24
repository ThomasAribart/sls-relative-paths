import runServerless from '@serverless/test/run-serverless';
import { resolve } from 'path';

const serverlessDir = resolve(__dirname, '../../node_modules/serverless');

describe('plugin', () => {
  describe('ts', () => {
    it('throws if a function misses dirName property', async () => {
      await expect(
        runServerless(serverlessDir, {
          command: 'print',
          cwd: resolve(__dirname, 'fixtures/ts'),
          options: { config: 'missingDirNameService.fixture.test.ts' },
        }),
      ).rejects.toThrow(
        `Configuration error at 'functions.missingDirNameFn': must have required property 'dirName'\n\nLearn more about configuration validation here: http://slss.io/configuration-validation`,
      );
    });

    it('updates fn path otherwise', async () => {
      const { serverless } = await runServerless(serverlessDir, {
        command: 'print',
        cwd: resolve(__dirname, 'fixtures/ts'),
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
      expect(
        // @ts-expect-error dirName is not present in AWS definition
        serverless.service.functions?.otherValidFn.dirName,
      ).toBeUndefined();
    });

    it('uses default path if needed', async () => {
      const { serverless } = await runServerless(serverlessDir, {
        command: 'print',
        cwd: resolve(__dirname, 'fixtures/ts'),
        options: { config: 'defaultPathService.fixture.test.ts' },
      });

      expect(serverless.service.functions).toMatchObject({
        validFn: {
          handler: 'functions/foo.bar',
        },
        missingPathFn: {
          handler: 'functions/wiz.biz',
        },
      });

      // @ts-expect-error dirName is not present in AWS definition
      expect(serverless.service.functions?.validFn.dirName).toBeUndefined();
      expect(
        // @ts-expect-error dirName is not present in AWS definition
        serverless.service.functions?.missingPathFn.dirName,
      ).toBeUndefined();
    });

    it('throws if service props are invalid', async () => {
      await expect(
        runServerless(serverlessDir, {
          command: 'print',
          cwd: resolve(__dirname, 'fixtures/ts'),
          options: { config: 'invalidPropsService.fixture.test.ts' },
        }),
      ).rejects.toThrow(
        `Configuration error at 'relativePaths.default': must be string\n\nLearn more about configuration validation here: http://slss.io/configuration-validation`,
      );
    });

    it('throws if no default can be applied', async () => {
      await expect(
        runServerless(serverlessDir, {
          command: 'print',
          cwd: resolve(__dirname, 'fixtures/ts'),
          options: { config: 'missingFallbackRelPathService.fixture.test.ts' },
        }),
      ).rejects.toThrow(
        `No relative path found for function missingPathFn\n\nLearn more on https://github.com/ThomasAribart/sls-relative-paths`,
      );
    });
  });

  describe('js', () => {
    it('throws if a function misses dirName property', async () => {
      await expect(
        runServerless(serverlessDir, {
          command: 'print',
          cwd: resolve(__dirname, 'fixtures/js'),
          options: { config: 'missingDirNameService.fixture.test.js' },
        }),
      ).rejects.toThrow(
        `Configuration error at 'functions.missingDirNameFn': must have required property 'dirName'\n\nLearn more about configuration validation here: http://slss.io/configuration-validation`,
      );
    });

    it('updates fn path otherwise', async () => {
      const { serverless } = await runServerless(serverlessDir, {
        command: 'print',
        cwd: resolve(__dirname, 'fixtures/js'),
        options: { config: 'validService.fixture.test.js' },
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
      expect(
        // @ts-expect-error dirName is not present in AWS definition
        serverless.service.functions?.otherValidFn.dirName,
      ).toBeUndefined();
    });

    it('uses default path if needed', async () => {
      const { serverless } = await runServerless(serverlessDir, {
        command: 'print',
        cwd: resolve(__dirname, 'fixtures/js'),
        options: { config: 'defaultPathService.fixture.test.js' },
      });

      expect(serverless.service.functions).toMatchObject({
        validFn: {
          handler: 'functions/foo.bar',
        },
        missingPathFn: {
          handler: 'functions/wiz.biz',
        },
      });

      // @ts-expect-error dirName is not present in AWS definition
      expect(serverless.service.functions?.validFn.dirName).toBeUndefined();
      expect(
        // @ts-expect-error dirName is not present in AWS definition
        serverless.service.functions?.missingPathFn.dirName,
      ).toBeUndefined();
    });

    it('throws if service props are invalid', async () => {
      await expect(
        runServerless(serverlessDir, {
          command: 'print',
          cwd: resolve(__dirname, 'fixtures/js'),
          options: { config: 'invalidPropsService.fixture.test.js' },
        }),
      ).rejects.toThrow(
        `Configuration error at 'relativePaths.default': must be string\n\nLearn more about configuration validation here: http://slss.io/configuration-validation`,
      );
    });

    it('throws if no default can be applied', async () => {
      await expect(
        runServerless(serverlessDir, {
          command: 'print',
          cwd: resolve(__dirname, 'fixtures/js'),
          options: { config: 'missingFallbackRelPathService.fixture.test.js' },
        }),
      ).rejects.toThrow(
        `No relative path found for function missingPathFn\n\nLearn more on https://github.com/ThomasAribart/sls-relative-paths`,
      );
    });
  });
});
