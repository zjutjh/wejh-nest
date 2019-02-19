import * as request from 'request-promise-native';
import { getApiUrl } from '../library/helper';
import { Injectable } from '@nestjs/common';

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
    // tslint:disable-next-line
    console.log(url);
    return await request.get(url, {
      qs: data,
      json: true,
    });
  }
}
