import { sharedConfigUser } from './shared-config-user';

describe('sharedConfigUser', () => {
  it('should work', () => {
    expect(sharedConfigUser()).toEqual('shared-config-user');
  });
});
