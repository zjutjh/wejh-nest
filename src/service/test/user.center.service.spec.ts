import {Test} from '@nestjs/testing';

import {INestApplication} from '@nestjs/common';
import {AppModule} from '../../app.module';
import {UserCenterService} from '../user.center.service';

describe('user center unit test ', () => {
  let app: INestApplication;
  let userCenterService: UserCenterService;
  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    userCenterService = app.get<UserCenterService>(UserCenterService);
  });

  it('/GET /', async () => {
    // tslint:disable-next-line
    console.log(await userCenterService.checkJHPassport('200703090222', 'q1w2e3r4'));
  });
});
