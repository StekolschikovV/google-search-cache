import { Injectable } from '@nestjs/common';
import * as googleIt from 'google-it';
import { RequestInterface } from './request.model';
import * as dotenv from 'dotenv';

@Injectable()
export class CommandService {
  targetUrl: string =
    dotenv.config({ path: '.env' }).parsed.TARGET_URL ||
    'https://wavesenterprise.com/';
  requestCash: RequestInterface[] = [];

  public search(text: string): Promise<RequestInterface[]> {
    const cash = this.getFromCash(text);
    if (cash.length > 0) {
      console.log('cash');
      return new Promise((resolve) => {
        resolve(cash);
      });
    } else {
      console.log('request');
      return new Promise((resolve) => {
        googleIt({
          query: `site:${this.targetUrl} ${text}`,
          'no-display': true,
        }).then((results) => {
          this.requestCash.push({
            ...results,
            request: text,
          });
          resolve(results);
        });
      });
    }
  }

  private getFromCash(text: string): RequestInterface[] | null {
    text = this.prepareStr(text);
    return this.requestCash.filter(
      (el) => this.prepareStr(el.request) === text,
    );
  }

  private prepareStr(text: string): string {
    return text.trim().toLocaleLowerCase();
  }

  public clear(): RequestInterface[] {
    this.requestCash = [];
    return this.requestCash;
  }
}
