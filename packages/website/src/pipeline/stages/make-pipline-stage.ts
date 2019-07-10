import { performance } from 'perf_hooks';

export type PipelineStage<T, U> = (input: T) => Promise<U>;

/**
 * Creates a stage for the website build pipeline with performance profiling
 * built in.
 */
export default <T, U>(
  id: string,
  buildStep: (input: T) => Promise<U>,
): PipelineStage<T, U> => {
  return async (input: T): Promise<U> => {
    const perfBeginId = `brisk-pipeline-stage-begin:${id}`;
    const perfEndId = `brisk-pipeline-stage-end:${id}`;

    performance.mark(perfBeginId);

    const result = await buildStep(input);

    performance.mark(perfEndId);
    performance.measure(
      `brisk-pipeline-stage-duration:${id}`,
      perfBeginId,
      perfEndId,
    );

    return result;
  };
};
