import { libsSharedConfigUpload } from './libs/shared/config/upload';

describe('libsSharedConfigUpload', () => {
  it('should work', () => {
    expect(libsSharedConfigUpload()).toEqual('libs/shared/config/upload');
  });
});
