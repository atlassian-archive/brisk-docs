import { performance } from 'perf_hooks';

export type PipelineStage<StageInput, StageConfig, StageOutput> = (
  input: StageInput,
  configOptions: StageConfig,
) => Promise<StageOutput>;

/**
 * Creates a stage for the website build pipeline with performance profiling
 * built in.
 */
export default <StageInput, StageConfig, StageOutput>(
  id: string,
  buildStep: (
    input: StageInput,
    configOptions: StageConfig,
  ) => Promise<StageOutput>,
): PipelineStage<StageInput, StageConfig, StageOutput> => {
  return async (
    input: StageInput,
    configOptions: StageConfig,
  ): Promise<StageOutput> => {
    const perfBeginId = `brisk-pipeline-stage-begin:${id}`;
    const perfEndId = `brisk-pipeline-stage-end:${id}`;

    performance.mark(perfBeginId);

    const result = await buildStep(input, configOptions);

    performance.mark(perfEndId);
    performance.measure(
      `brisk-pipeline-stage-duration:${id}`,
      perfBeginId,
      perfEndId,
    );

    return result;
  };
};
