import dotenv from 'dotenv';
dotenv.config();

export default class ENV {
  public static BASE_URL: string = process.env.BASE_URL ?? '';
  public static END_POINT: string = process.env.END_POINT ?? '';
  public static AUTH_URL: string = process.env.AUTH_URL ?? '';
  public static LOGINUSER: string = process.env.LOGINUSER ?? '';
  public static PASSWORD: string = process.env.PASSWORD ?? '';
  public static API_BASE_URL: string = process.env.API_BASE_URL ?? '';
  public static API_END_POINT: string = process.env.API_END_POINT ?? '';
  public static API_LOGINUSER: string = process.env.API_LOGINUSER ?? '';
  public static API_PASSWORD: string = process.env.API_PASSWORD ?? '';

}