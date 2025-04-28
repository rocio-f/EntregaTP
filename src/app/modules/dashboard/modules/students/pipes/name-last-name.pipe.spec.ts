import { NameLastNamePipe } from './name-last-name.pipe';

describe('NameLastNamePipe', () => {
  it('create an instance', () => {
    const pipe = new NameLastNamePipe();
    expect(pipe).toBeTruthy();
  });
});
