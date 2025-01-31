import { Test, TestingModule } from '@nestjs/testing';
import { WebsocetsGateway } from './websocets.gateway';

describe('WebsocetsGateway', () => {
  let gateway: WebsocetsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocetsGateway],
    }).compile();

    gateway = module.get<WebsocetsGateway>(WebsocetsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
