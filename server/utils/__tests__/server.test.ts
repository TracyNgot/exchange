import server from '../server';

describe('Server', () => {
  it('inits the app', () => {
    expect(server.getApp()).toBeDefined();
  });

  it('starts the app', () => {
    const spyOnListen = jest.spyOn(server.getApp(), 'listen');
    const spyOnConsole = jest.spyOn(console, 'log');

    server.start(999);
    expect(spyOnListen).toBeCalledTimes(1);
    expect(spyOnListen.mock.calls[0][0]).toEqual(999);

    spyOnListen.mock.calls[0][1]();
    expect(spyOnConsole).toBeCalledWith('Server started on port: 999');
  });
});
