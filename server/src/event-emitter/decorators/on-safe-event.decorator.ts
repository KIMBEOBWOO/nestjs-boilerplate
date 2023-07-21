import { applyDecorators, Logger } from '@nestjs/common';
import { OnEvent, OnEventType } from '@nestjs/event-emitter';
import { OnEventOptions } from '@nestjs/event-emitter/dist/interfaces';

function _OnSafeEvent(): MethodDecorator {
  return function (
    _target: any,
    _key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    const metaKeys = Reflect.getOwnMetadataKeys(descriptor.value);
    const metas = metaKeys.map((key) => [
      key,
      Reflect.getMetadata(key, descriptor.value),
    ]);

    descriptor.value = async function (...args: any[]) {
      try {
        await originalMethod.call(this, ...args);
      } catch (e) {
        if (e instanceof Error) {
          Logger.error(e, e.stack, 'OnSafeEvent');
        } else {
          Logger.error(e, undefined, 'OnSafeEvent');
        }
      }
    };
    metas.forEach(([k, v]) => Reflect.defineMetadata(k, v, descriptor.value));
  };
}

/**
 * @link https://velog.io/@loakick/Nest.js-event-emitter%EC%97%90%EB%9F%AC-Error%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%98%EB%A9%B4
 */
export function OnSafeEvent(
  event: OnEventType,
  options?: OnEventOptions | undefined,
) {
  return applyDecorators(OnEvent(event, options), _OnSafeEvent());
}
