import { join, relative, sep } from 'path';
import type Plugin from 'serverless/classes/Plugin';
import type Serverless from 'serverless/index';

const customPropertiesSchema = {
  type: 'object',
  properties: {
    dirName: { type: 'string' },
  },
  required: ['dirName'],
  additionalProperties: false,
};

export type CustomProperties = {
  dirName: string;
};

export class RelativePathsSlsPlugin implements Plugin {
  hooks: Plugin.Hooks;

  constructor(serverless: Serverless) {
    serverless.configSchemaHandler.defineFunctionProperties(
      'aws',
      customPropertiesSchema,
    );

    this.hooks = {
      initialize: () => {
        const rootDirName = serverless.config.servicePath;

        Object.entries(serverless.service.functions).forEach(
          ([functionName, functionDefinition]) => {
            const { dirName: fnDirName, handler } =
              functionDefinition as Serverless.FunctionDefinitionHandler &
                CustomProperties;

            const functionRef = serverless.service.functions[
              functionName
            ] as Serverless.FunctionDefinitionHandler & CustomProperties;

            functionRef.handler = join(
              relative(rootDirName, fnDirName),
              handler.replace(/\//g, sep),
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
