// stream.ts
export type StreamItem = {
  request: string;
  value: Promise<unknown>;
};

export type Stream = AsyncIterable<StreamItem>;

type StreamController = {
  push: (item: StreamItem) => void;
  complete: () => void;
  values: Stream;
};

export function createStream(): StreamController {
  const queue: StreamItem[] = [];
  const waiters: ((item: StreamItem | null) => void)[] = [];
  let done = false;

  function push(item: StreamItem) {
    if (done) return;
    if (waiters.length > 0) {
      waiters.shift()!(item);
    } else {
      queue.push(item);
    }
  }

  function complete() {
    if (done) return;
    done = true;
    while (waiters.length > 0) {
      waiters.shift()!(null);
    }
  }

  async function* values(): AsyncGenerator<StreamItem, void, void> {
    while (true) {
      if (queue.length > 0) {
        yield queue.shift()!;
        continue;
      }
      if (done) return;
      const item = await new Promise<StreamItem | null>((resolve) => {
        waiters.push(resolve);
      });
      if (item == null) return;
      yield item;
    }
  }

  return { push, complete, values: values() };
}
