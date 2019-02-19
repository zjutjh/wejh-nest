import * as request from 'request-promise-native';
import {getApiUrl} from '../library/helper';
import {Injectable} from '@nestjs/common';

interface Response {
  state: string;
  info: string;
  data: Map<string, string>
}

@Injectable()
export class UserCenterService {
  async checkJHPassport(username: string, password: string) {
    if (password.includes('../')) {
      return false;
    }
    const url: string = getApiUrl('jh.user');

    const data = {
      app: 'passport',
      action: 'login',
      passport: username,
      password,
    };
    const res: Response = await request.get(url, {
      qs: data,
      json: true,
      timeout: 200
    });
    return res.state === 'success';
  }

  async resetJhPassport(username: string, password: string, iid: string) {
    const url = getApiUrl('jh.user');
    const data = {
      app: 'passport',
      action: 'reset',
      passport: username,
      password,
      iid,
    };
    const res: Response = await request.get(url, {
      qs: data,
      json: true,
    });
    return res.state === 'success';
  }

  async activeJhPassport(username: string, password: string, iid: string, email: string) {
    const url = getApiUrl('jh.user');
    const data = {
      app: 'passport',
      action: 'active',
      passport: username,
      password,
      iid,
    };
    const res:Response =  await request.get(url, {
      qs: data,
      json: true,
    });
    return res.state === 'success';
  }
}
