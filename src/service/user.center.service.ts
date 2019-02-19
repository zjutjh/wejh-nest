import * as request from 'request-promise-native';
import { getApiUrl } from '../library/helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserCenterService {
  async checkJHPassport(username: string, password: string) {
    if (password.includes('../')) {
      return false;
    }
    const url = getApiUrl('jh.user');

    const data = {
      app: 'passport',
      action: 'login',
      passport: username,
      password,
    };
    // tslint:disable-next-line
    console.log(url);
    // const res = await request.get(url, {
    //     formData: data,
    // });
    // console.log(res);
  }
}
