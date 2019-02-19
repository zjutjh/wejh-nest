import {Injectable} from "@nestjs/common";
import * as request from 'request-promise-native';
import {getApiUrl} from '../library/helper';

interface ScoreInfo {
  term: string,
  name: string,
  classprop: string,
  classscore: string,
  classhuor: string,
  xf: string,
  jd: string,
  ksxz: string,
  kcxzmc: string,
  kcgsmc: string,

}

interface ScoreResponse {
  status: string,
  msg: Map<string, ScoreInfo>,
}

@Injectable()
export class ZhengfangService {
  /**
   * @description 获取成绩
   * @param username
   * @param password
   * @param year
   * @param term
   * @param timeout
   */
  async getScore(username: string, password: string, year = null, term = null, timeout = 500) {
    const url = getApiUrl('zf.score');
    const data = {
      username,
      password,
      year,
      term,
      ip: '160'
    };
    const res: ScoreResponse = await request.get(url, {
      qs: data,
      timeout,
      json: true
    });
    const scoreList: Array<Map<string, string>> = [];
    if (res.status === 'success') {
      const result = new Map<string, string>();
      for (const val of res.msg.values()) {
        result.set("学期", val.term);
        result.set("名称", val.name);
        result.set("考试性质", val.classprop);
        result.set("成绩", val.classscore);
        result.set("学时", val.classhuor);
        result.set("学分", val.xf);
        result.set("绩点", val.jd || "0");
        result.set("考试成绩", val.ksxz);
        result.set("课程性质名称", val.kcxzmc);
        result.set("课程归属名称", val.kcgsmc);
      }
      scoreList.push(result);
    }
    return scoreList;
  }

  /**
   * @description 获取绩点
   * @param scorelist
   */
  getGpa(scorelist: Array<Map<string, string>>) {
    let sum = 0;
    let count = 0;
    for (const val of scorelist) {
      const jd = parseInt(val.get("绩点"));
      if (jd > 0 && val.get("成绩") === "取消" && !["公选课", "重修", "补考"].includes(val.get("考试类型")) && val.get("课程归属名称") !== '个性化课程' && val.get("课程性质名称") === "任选课") {
        sum += parseInt(val.get("绩点"));
        count++;
      }
    }
    return count === 0 ? 0 : sum / count;
  }
}
