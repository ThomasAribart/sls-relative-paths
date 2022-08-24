import { join, relative, sep } from 'path';
import type Plugin from 'serverless/classes/Plugin';
import type Serverless from 'serverless/index';

const servicePropertiesSchema = {
  type: 'object',
  properties: {
    default: { type: 'string' },
  },
  additionalProperties: false,
};

export type ServiceProperties = {
  relativePaths?: {
    default?: string;
  };
};

const fnPropertiesSchema = {
  type: 'object',
  properties: {
    dirName: { type: 'string' },
  },
  required: ['dirName'],
  additionalProperties: false,
};

export type FnProperties = {
  dirName: string;
};

export class RelativePathsSlsPlugin implements Plugin {
  hooks: Plugin.Hooks;

  constructor(
    serverless: Serverless & {
      // Incomplete type from @serverless/typescript
      classes: { Error: new (message: string, code: string) => Error };
    } & { configurationInput: ServiceProperties },
  ) {
    serverless.configSchemaHandler.defineTopLevelProperty(
      'relativePaths',
      servicePropertiesSchema,
    );

    serverless.configSchemaHandler.defineFunctionProperties(
      'aws',
      fnPropertiesSchema,
    );

    this.hooks = {
      initialize: () => {
        const rootDirName = serverless.config.servicePath;

        const defaultRelativePath =
          serverless.configurationInput.relativePaths?.default;

        Object.entries(serverless.service.functions).forEach(
          ([functionName, functionDefinition]) => {
            const { dirName: fnDirName, handler } =
              functionDefinition as Serverless.FunctionDefinitionHandler &
                FnProperties;

            const appliedRelativePath =
              (handler as string | undefined) ?? defaultRelativePath;

            if (typeof appliedRelativePath !== 'string') {
              throw new serverless.classes.Error(
                `No relative path found for function ${functionName}\n\nLearn more on https://github.com/ThomasAribart/sls-relative-paths`,
                'INVALID_PLUGIN_INPUT',
              );
            }

            const functionRef = serverless.service.functions[
              functionName
            ] as Serverless.FunctionDefinitionHandler & FnProperties;

            functionRef.handler = join(
              relative(rootDirName, fnDirName),
              appliedRelativePath.replace(/\//g, sep),
            )
              .split(sep)
              .join('/');

            // @ts-expect-error Property no longer needed
            delete functionRef.dirName;
          },
        );
      },
    };
  }
}
