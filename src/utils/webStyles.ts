import { isWeb } from 'utils/checkPlatform';

export function webStyle<T>(style: T) {
  return isWeb ? style : undefined;
}
